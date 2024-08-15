---
published: true
title: How to print a Notion page
excerpt: Notion printing is awful. Here's a workaround.
---

Notion is great--I use it for basically everything. But, surprisingly, it's really awful at the very basic task of printing,
which I ran into recently when I wanted to print a family birthdays and anniversaries page.

When you go to print a view, it prints out a bunch of properties and the resulting page doesn't look anything like what you see on the screen. 

After banging my head against the wall for a bit, I found a workaround that's a little technical but works well. Here's how to do it:

1. Install [this Chrome extension](https://chromewebstore.google.com/detail/gofullpage-full-page-scre/fdpohaocaechififmbbbbbknoalclacl?hl=en) that does full-page screen captures.
2. Add a bookmark to your browser with the following URL (this is a bookmarklet that cleans up the Notion page before printing):
```javascript
javascript:!function(){document.querySelectorAll('div[role="button"][tabindex="0"][style*="user-select: none;"][style*="display: flex;"][style*="align-items: center;"][style*="height: 30px;"][style*="border-radius: 6px;"][style*="font-size: 14px;"]').forEach(function(e){e.remove()}),document.querySelectorAll(".notion-topbar").forEach(function(e){e.remove()});var e=document.querySelector('div[contenteditable="false"][data-content-editable-void="true"][style*="min-height: 40px;"][style*="position: sticky;"][style*="z-index: 86;"]');e&&e.remove()}();
```
3. Open the Notion page in your browser.
4. Click the bookmarklet you just created. 
5. Click the full-page screen capture extension you installed in step 1.
6. You can either print the resulting image or save it as a PDF.

Hopefully Notion fixes this soon, but it's been a problem for a long time and they seem more focused on adding shiny AI features,
so I wouldn't hold my breath. For now, this works well enough for me.
