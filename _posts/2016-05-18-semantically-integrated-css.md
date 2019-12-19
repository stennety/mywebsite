---
Title: Semantically Integrated CSS
Description: A personal example using ARIA state roles to progressively enhance and style an interactive element
Date: 16-05-18
Source: 
Tags: css, semantics, framework, theory, personal
---
A recent A List Apart article [Meaningful CSS: Style Like You Mean It](http://alistapart.com/article/meaningful-css-style-like-you-mean-it), by Tim Baxter has caused a lot of furious posts in the frontend community. Personally, I think the subtext of the article is a response to class-happy and div-tastic reinvention of the wheel using non-semantic markup, rather than a call to abandon current CSS approaches that its been taken as.

The article makes the case for basing CSS styling hooks upon the semantic elements of HTML5, over the use of additional classes in markup. 

>	Why reinvent the semantic meanings already defined in the spec in our own classes? Why duplicate them, or muddy them?

I don't agree with this blanket approach to the extent suggested in the article but I have used this method on my site and it works particularly well in styling interactive elements.

## Styling using ARIA State properties

I took this approach when building my mobile navigation drop down. I use the CSS [attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) to toggle the nav and button states. 

>	Why can’t our CSS be as semantic and meaningful as our markup? Why can’t both be more semantic and meaningful, moving forward in tandem?

Right around the time I learned about [state rules](https://smacss.com/book/type-state) (.is-state) class based approach, I was also trying to improve my sites accessibility. I realised I was already applying state attributes and any `.is-active` class based toggling approach would be duplication of the semantic ARIA State properties of the nav menu.

This method reduced duplication in JS too. No need to toggle both a ARIA state and a class state ([aria-selected="true"] vs .is-active) and is the embodiment of progressive enhancement, browsers which do not understand ARIA attributes (very few) don’t receive the drop down menu styles and display the graceful fallback static menu by default. 

Ambiguity is less problematic too in a larger project. No wondering if you settled on .show/.hide, .is-open, .is-active, .is-toggled for active menus, tabs, forms etc.

When applied to interactive components it is self policing and encourages accessibility. Styling and functionality are progressive and integrated. You gain the maximum accessible web component for your site, with the minimal markup.