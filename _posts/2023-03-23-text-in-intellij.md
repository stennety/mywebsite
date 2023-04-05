---
published: true
title: 'Working with text in IntelliJ'
excerpt: Some useful tips for working with text in IntelliJ. Bulk-editing, alphabetizing, text-substitution, text expansion, etc.
---

The following are some useful approaches I've found to performing bulk changes on text in IntelliJ.

Nota bene: In reading IntelliJ docs for this post, they refer to the "caret" to mean the blinking line in a text editor.
In all my years in software, I've always called it a "cursor." I realize now that I've been misinformed. According
to [this
wiki entry](https://en.wikibooks.org/wiki/Windows_Programming/Interfacing#:~:text=Cursor%20Vs%20CaretEdit&text=The%20cursor%20is%20the%20graphical,is%20used%20to%20enter%20text.)
on interfaces:

> The cursor is the graphical image that represents the mouse. It can either be an arrow for pointing, a hand, an
> hourglass, or an I-shaped text selector. The caret, on the other hand, is the blinking object that is used to enter
> text.

So I'll be calling it a caret here.

# Editing with multiple carets

This seems like a logical place to start. Say you've got a few lines of text,
and you want to quickly make a change to them. e.g. maybe you want to paste in a word at a fixed point on all of the
lines.

You can hold `alt` and drag your mouse to put a cursor on each line you want to make changes to.

![]({{site.cdn_path}}/2023/03/23/multi_caret.png)

# Toggle casing

To uppercase or lowercase your selection, use `⌘ + shift + u`.

# Selecting text

On macOS, you can expand the scope of your selection with `⌘ + w`. I can't tell you how many
times I've manually selected a method and didn't grab the correct number of closing brackets,
so this is one that I'll be making much more use of now that I'm aware of the hotkey for it.

Note that if that hotkey doesn't work for you or if you ever forget the hotkey,
the feature is called `extend selection` and you can look it up by that name
in the Actions menu (`⌘ + shift + a` on macOS).

# Rearrange lines in alphabetical order

As far as I can tell, there's not a way to do this out-of-the-box in IntelliJ, but there is a plugin for it called
[Lines Sorter Plus](https://plugins.jetbrains.com/plugin/18564-lines-sorter-plus).

Once installed, it can be invoked via the `Edit` menu or by `alt + shift + l`.

![]({{site.cdn_path}}/2023/03/23/lines_sorter.png)

# Text expansion with Live Templates

IntelliJ has this handy feature called [Live Templates](https://www.jetbrains.com/help/idea/using-live-templates.html),
which allow you to type out an abbreviation and the IDE will expand it for you. Live Templates are
context-aware, so the same abbreviation can be configured to work differently depending on which type of file
it's used in.

[Live Templates support variables](https://www.jetbrains.com/help/idea/template-variables.html),
and have expressions that can be used for their defaults.

For example, on this site, I have a CDN for images so I don't keep those in version control. I store the images by the
date of the post, and often end up repeating typing the date when I'm writing a post. Let's automate that.

First, I'll create a Live Template with variables.

![]({{site.cdn_path}}/2023/03/23/new_live_template.png)

Next, I'll add date expressions to default those variables.

![]({{site.cdn_path}}/2023/03/23/live_template_variables.png)

Et voila. When I expand that text, those are automatically filled in.

![]({{site.cdn_path}}/2023/03/23/live_template_in_action.png)

