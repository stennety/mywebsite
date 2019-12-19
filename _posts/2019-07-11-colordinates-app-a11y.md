---
Title: Colordinates App A11Y
Description: An explainer of the accessibility(A11Y) features included in Colordinates web app - an app that returns a colour value based on your geolocation
Date: 19-07-11
Source: 
Tags: a11y, app, colordinates, code, sideproject
---
I continue to update [Colordinates](/blog/colordinates/) from time to time as part of my [side project learning](/blog/side-project-learning/) to improve my knowledge and coding.

My first web app and a good opportunity to learn something new and apply it in a new situation. One area I am always keen to improve is accessibility(abbreviated A11Y).
 
## A11Y Features Used

For an app which is essentially a button and an output - it’s surprising how many ARIA(Accessible Rich Internet Application) tweaks are required to get an accessible user experience.
 
### Relationship and Markup

I used the header, main, article, footer tags to denote important landmarks of the app.

I considered the `<output>` tag, which is for [results of a calculation](https://www.scottohara.me/blog/2019/07/10/the-output-element.html) - while technically true - I'm still unsure if it would be appropriate in this case.

### Button

```html
<button class="block" id="huebutton" aria-controls="output">Find My Hue</button>
```
 
I used `aria-controls` property on the ‘find hue’ button, to indicate the relationship and that an action will occur. 

### Colour Swatch

The colour swatch is the purpose of the app so its important it returns an accessible result.

```html
<div class="block swatch" id="output" role="status" tabindex="0" aria-label="Location Result" aria-live="polite" style="background-color: rgb(154, 101, 101);">
<div class="color txt-small notranslate">HSLA(0, 21%, 50%, 1)</div>
</div>
```

Adding `tab-index="0"` enables the user to tab to the swatch in markup order. 

The swatch element includes `role="status"` to indicate that the contents will change interactively with user feedback messages. To do this I used the `aria-live` property which announces any changes to the swatch element. I used the `polite` attribute so it won't interrupt the screen reader, it waits until after the current speaking flow.

When a user clicks to get a colour value, I show a ‘finding...’ visual indication that something is happening. Getting a geolocation position can take some time, so it is important to feedback that it is in progress. This benefits every user, people may not notice, see or understand the geolocation symbol.

After the colour value is generated I move the `focus()` to the swatch element. This ensures the keyboard focus is on the element that changed, and is a more predictable place to expect it to be.

## Testing
 
It's important to test, as I discovered.

I tested with Voiceover in iOS and the Chrome Vox extension in Chrome desktop. Just simply using them is an eye opening experience, I struggle controlling them, let alone understanding what they speak back.

The colour swatch output is a HSLA colour value. I initially used lowercase letters until I discovered this was spoken as 'Haslar' instead of 'H S L A'. A style over substance fail. Making this uppercase let the screen reader know its an abbreviation.

I removed `maximum-scale=1,user-scalable=no` from the viewport meta tag which was [a damaging recommendation](https://timkadlec.com/2013/11/avoiding-the-300ms-click-delay-accessibly/) which prevented the click delay but has ultimately cost a lot of accessibility for users worldwide, for the sake of 300 milliseconds wait.
 
## App Accessiblity

I recommended getting very familiar with the [Mozilla accessibility docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility) and the W3C [WAI hub](https://www.w3.org/WAI/).

It’s surprising how much accessibility you need to layer back on to the markup when native elements don't quite line up with what you want to achieve. Its a fine balance between working with the markup, layering on ARIA attributes and the user experience you want to achieve.
 
There is another interesting consideration - Mozilla is currently working on a voice based browser. Increasingly voice assistants skills come from the web too. With the changes I have made, in theory I should be able to perform the same actions using my voice, with spoken feedback. In future, everyone may be doing a lot more of our browsing by ear. 