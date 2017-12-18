---
published: true
title: My macOS workflows
---
The following is a list of workflows I use on macOS to boost my productivity. 

## macOS

Here are some tips for getting the most out of macOS itself.

## Useful hotkeys

### Finder

| Hotkey        | Function           |
|-------------|-------------|
| ⌘ + ⇧ + D | Open Desktop folder |
| ⌘ + ⇧ + H | Open home folder |
| ⌥ + ⌘ + L | Open Downloads folder |
| ⇧ + ⌘ + R | Open AirDrop window |
| ⇧ + ⌘ + U | Open Utilities folder |
| ⌘ + ⇧ + ⌫ | Empty the trash |

### Reference

[Mac keyboard shortcuts](https://support.apple.com/en-us/HT201236)

## Toggle Do Not Disturb

⌥ + clicking on the upper right-hand corner of the screen toggles Do Not Disturb mode.

![]({{site.cdn_path}}/2017/10/24/toggle_dnd.gif)

## Alfred

[Alfred](https://www.alfredapp.com/) is an excellent app switcher, clipboard manager, and all-around Swiss Army Knife for macOS. I recommend picking up the [Powerpack](https://www.alfredapp.com/powerpack/buy/). It's abous $22 as of the time of this writing and opens up tons of functionality.

### Launching URLs

I add URLs to Alfred for dashboards and things at work that I access frequently. That way I can launch them directly in the event that my browser isn't open or is hidden.

[https://www.alfredapp.com/help/features/web-search/custom-searches/](https://www.alfredapp.com/help/features/web-search/custom-searches/)

### Snippets

Alfred [snippets](https://www.alfredapp.com/help/features/snippets/) are basically stored text clips that you can search and add to your clipboard for pasting. There's also [text expansion](https://www.alfredapp.com/help/features/snippets/#expansion) functionality that you can make use of. I have snippets set up for things that I type frequently, like the CDN path to this website. Another use case would be for your address or phone number. There are also some useful bundles of snippets that you can download [here](https://www.alfredapp.com/extras/snippets/) and add to Alfred. Here are a few of the ones I use:

- [Mac symbols](https://www.alfredapp.com/media/snippets/Mac%20symbols.alfredsnippets)
- [Ascii Art](https://www.alfredapp.com/media/snippets/Ascii%20Art.alfredsnippets)
- [Emojis](http://joelcalifa.com/blog/alfred-emoji-snippet-pack/)

### Workflows

Alfred has a feature called [Workflows](https://www.alfredapp.com/workflows/). These are essentially plugins that extend Alfred to be able to interact with other apps and services.

I use these workflows:

- [Venmo](https://www.alfredapp.com/workflows/)
- [Wunderlist](https://github.com/idpaterson/alfred-wunderlist-workflow)

There are several other ones that look useful, including flows for [Spotify](http://alfred-spotify-mini-player.com/) and [LastPass](http://www.packal.org/workflow/lastpass-cli-workflow-alfred).

## iTerm 2

[iTerm 2](https://www.iterm2.com/) is a more full-featured upgrade from macOS's built-in Terminal app.

### Global hotkey

Register a global hotkey to bring iTerm 2 to the front of your screen with a keypress. [http://www.iterm2.com/features.html#hotkey-window](http://www.iterm2.com/features.html#hotkey-window).

### Jumping between words

In addition to the standard bash commands, alt + B and alt + f, you can configure iTerm to jump between words using alt + ← and alt + → using a Profile. [This](https://coderwall.com/p/h6yfda/use-and-to-jump-forwards-backwards-words-in-iterm-2-on-os-x) is a good guide on how to do that.

### ZSH

I switched to ZSH about a year ago and am a huge fan. It's got tons of useful plugins, aliases for frequently-used git commands, etc. Get it at [https://github.com/robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh).

### imgcat

It's like the `cat` command, but for images. 

![]({{site.cdn_path}}/2017/10/24/imgcat.png)

Install the script by running
```
curl https://www.iterm2.com/utilities/imgcat > ~/bin/imgcat
chmod +x ~/bin/imgcat
```

And then make sure `~/bin` is in your $PATH.
