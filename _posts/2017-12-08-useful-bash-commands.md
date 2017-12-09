---
published: true
title: Useful Bash commands
---
# Navigating the terminal

| Hotkey | Function |
|---|---|
| ⌃A | Go to beginning of input |
| ⌃E | Go to end of input |
| ⌥B | Jump to previous word |
| ⌥F | Jump to next word |
| ⌃U | Delete to beginning of input |
| ⌃K | Delete to end of input |
| ⌥D | Delete to end of word |
| ⌥W | Delete to beginning of word |

Useful commands:

| Command | Function |
|---|---|
| open . | In macOS, open a Finder window of current directory |
| open <url> | In macOS, open the specified URL in the default browser window |
  
# Variables

| Command | Function |
|---|---|
| $? | Exit status of previous command. 0 for success, nonzero for failure. |
| $$ | Process id of currently running script. |
| !! | [History expansion](http://ftp.gnu.org/old-gnu/Manuals/bash/html_chapter/bashref_9.html#SEC115) of contents of previous command. |
| !n | History expansion of command with number "n". |
| !-n | History expansion of command "n" commands behind current one in the history. |
| !ssh | Execute the last "ssh" command with this. |


Reference: [http://tldp.org/LDP/abs/html/internalvariables.html](http://tldp.org/LDP/abs/html/internalvariables.html)
  
# Brace expansion 

There's a ton of useful things you can do with brace expansion.
Expand integers:
```
➜  ~ git:(master) ✗ echo {1..10}
1 2 3 4 5 6 7 8 9 10
```

Expand characters:
```
➜  ~ git:(master) ✗ echo {a..z}
a b c d e f g h i j k l m n o p q r s t u v w x y z
```

Combine expansions:
```
➜  ~ git:(master) ✗ echo {a..f}{0..5}
a0 a1 a2 a3 a4 a5 b0 b1 b2 b3 b4 b5 c0 c1 c2 c3 c4 c5 d0 d1 d2 d3 d4 d5 e0 e1 e2 e3 e4 e5 f0 f1 f2 f3 f4 f5
```

Reference: [http://wiki.bash-hackers.org/syntax/expansion/brace](http://wiki.bash-hackers.org/syntax/expansion/brace)

# Bash history

To navigate history, you can use the up and down arrow keys, or the combinations `⌃p` and `⌃n` to navigate to previous and next commands, respectively.

## Searching Bash history

Use the `⌃r` hotkey to trigger a reverse search through your Bash history. Type in a string to query. If it matches, press `↵` to execute it. If not, press `⌃r` again to see the next result. To see the previous result, use `⌃s`.

Reference: [https://www.digitalocean.com/community/tutorials/how-to-use-bash-history-commands-and-expansions-on-a-linux-vps](https://www.digitalocean.com/community/tutorials/how-to-use-bash-history-commands-and-expansions-on-a-linux-vps)

# Configuration

The `HISTSIZE` variable controls how many commands will be stored in Bash history. It defaults to 10,000, but you can change this in your .bashrc file.