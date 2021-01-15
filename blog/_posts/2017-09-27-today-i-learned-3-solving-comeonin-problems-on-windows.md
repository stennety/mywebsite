---
post_title: 'Today I Learned #3: Solving Comeonin problems on Windows!'
author: dreat
layout: post
published: true
post_date: 2017-09-27 07:00:52
tags: [archived, til, elixir, windows]
categories: [til, old_blog]
---
Hello there!

I did some Elixir tutorial back in the day and there was a need for <a href="https://github.com/riverrun/comeonin" target="_blank" rel="noopener">Comeonin lib</a>. It's used for hashing passwords, so you store them securely. I had enormous problems with <strong>mix deps.compile</strong> because of it.

Here's what you do if you stumble with deps error
<ol>
 	<li>The long way:
<ol>
 	<li>Open cmd</li>
 	<li>Go to Program Files (x86)\Microsoft Visual Studio 14.0\VC</li>
 	<li>Type vcvarsall.bat amd64</li>
 	<li><strong>!important! </strong>using THE SAME cmd window go to you project</li>
 	<li>Compile - you have to redo all the steps everytime :(</li>
</ol>
</li>
 	<li>Easy way:
<ol>
 	<li>Use Pbkdf2 algorithm. It needs no C compiler :D</li>
</ol>
</li>
</ol>
And I used the second way while developing something mine. Works like a charm. As for me algorithm didn't really matter (each own has it's own pros and cons) I went with the least problematic one.

PS: What's funny for some there's no need for being in the same console/repeating those steps, but I wasn't that lucky :(
