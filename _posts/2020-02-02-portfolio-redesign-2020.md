---
title: Portfolio Redesign 2020
description: My portfolio has been redesigned for 2020! Read my thoughts on the design, code and platform choices I made.
date: 2020-02-02
tags: [paulfosterdesign, design, code, css, cms, html, personal, site, jekyll]
---

With my portfolio, my work needs to be the stand-out, everything else needs to get out of the way. I took this approach to the design, code and platform choice.

## Design 

The basis for the design was an idea I dropped from my [last redesign](/blog/portfolio-redesign/) - a rotated logo. This redesign I was determined to let the design form around that. The angled slashes of the logo are emulated throughout the sites design. 

The slash on the page title headings, the drop shadows for my images, the background gradient of the site, all follow this same angle from my logo.

The gradient acts as a kind of light source and I use drop shadows to highlight my project images.

### Homepage

![The redesigned paulfosterdesign.co.uk homepage](/assets/images/portfolio-redesign-2020.jpg)

The homepage spans the full width, highlighting three projects. The content sections follow the grid layout and highlight my work and blog content. The content is succinct to force you to explore my work.

## Styling

My site has few layouts and my use of [BEM class convention](https://www.smashingmagazine.com/2014/07/bem-methodology-for-small-projects/) for styling keeps things logical enough to me. 

I build in a mobile-first, progressive enhancement approach.

### Layout

CSS grid is used for the default page and homepage layouts. 

I kept the sidebar to provide structure to my portfolio work and highlight my blog posts. At desktop sizes, the primary column maximises the main project image width and the sidebar collapses responsively at medium screen sizes.

Using CSS grid requires some thought. The navigation sidebar was before the main content in markup, following the grid order: logo, header, sidebar, content, footer. I decided to move its markup _after_ the page content to act as footer navigation at narrow device widths. At wider desktop widths, I swap the navigation position ahead of the content as a sidebar, using CSS grid re-ordering. 

Flexbox is used for spacing the navigation elements in the header, footer and page pagination.

### Fonts

Tahoma is used for the base font for it's slight [humanist](https://en.wikipedia.org/wiki/Sans-serif#Humanist) appearance and Arial Black for the more slab-like headings, emulating my slab-like logo.

### Custom Properties

I used CSS custom properties for the first time. Its quite refreshing to be able to use these natively at last. They are useful to manipulate some of my transforms, colours for dark mode etc.

### Transforms

Transforms are used extensively to rotate the logo and highlight project images with drop shadows built from a pseudo-element, skewed and scaled.

## Platform

5 redesigns and 4 platforms (Mr. Site > WordPress > Kirby > Jekyll), [since 2006](/blog/early-days/).

I was using Kirby, a static-file PHP CMS. My content was already in Markdown with Front Matter-ish metadata and been happily database-free. 

Through [my side projects](/blog/side-project-learning/), I have used GitHub and GitHub Pages, so I have familiarity with that platform. 

My portfolio is now built via Jekyll and hosted on GitHub Pages. I like that the whole site will be under version-control and served by their CDN. I can even post and update the site via the web interface.

This sites content and coding will all continue to evolve. Portfolios are never finished.

I hope you enjoy my work.