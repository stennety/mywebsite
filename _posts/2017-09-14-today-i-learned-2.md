---
ID: 165
post_title: 'Today I Learned #2'
author: dreat
post_excerpt: ""
layout: post
permalink: >
  http://dreat.info/2017/09/14/today-i-learned-2/
published: true
post_date: 2017-09-14 07:00:35
---
While a back ago I did a little test. I read the <a href="https://leanpub.com/deliberatevim" target="_blank" rel="noopener">Deliberate Vim</a> book, did the exercises and decided to go full Vim. So I installed <a href="http://www.viemu.com/">ViEmu</a> to my VisualStudio 2015. Aaaand had a few struggles. Some shortcuts conflicts that I had to solve manually and still it wasn't so convenient to use.

I ended up skipping ViEmu for VS2017. But it didn't last for long - one day I noticed I'm really used to some of the Vim commands and it's more difficult to work now without them. So I did some research, and got a great recipe!

If you have anything keyboard-changing installed already (like Resharper) - reset all shortcuts to default - so you get only VisualStudio's default key bindings. After that install ViEmu and let it take all the shortcuts it needs. Finally, install Resharper/apply Resharper scheme. Those are the steps that will provide minimal friction while working with Vim in VS.

&nbsp;

Bonus round: For VisualStudio Code - just install a <a href="https://github.com/VSCodeVim/Vim">plugin</a>, it works great!