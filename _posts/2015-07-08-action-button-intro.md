---
Title: Action Button Intro Effect
Description: Intro effect highlighting a primary action button, using the Material Design Light framework.
Date: 2015-07-08
Source: http://codepen.io/plfstr/pen/MwVGxR
Tags: [codepen, material design, css]
---
With the release of [Material Design Lite](http://www.getmdl.io), an official framework smoothing the way for Material Design everywhere, it seemed like  perfect timing to put this simple intro effect out there. 

(codepen: http://codepen.io/plfstr/pen/MwVGxR height: 310)

Based on my [Hop Over Notification](/blog/hop-over-navigation/) demo - hey, everything is a remix - the effect reinforces the principle of layers and animation in Material Design language reinforcing hierarchy. Perfect for highlighting your primary action button to new users.

This effect is as simple (un-prefixed!) as adding `mdl-button--primaryintro` to the `<button>` which is your primary action and including the following style to the Material Design Lite framework:

```language-css
.mdl-button--primaryintro {
	animation: primaryintro ease-out .5s both 1.5s;
	}

@keyframes primaryintro {
	0%   {
		transform: translate(0, -36px);
	  	z-index: -1;
	}
	50% {
	  	transform: translate(0, 27px);
	  	z-index: -1;
	}
	51% {
	  	z-index: 999;
	}
	100% {
	  	transform: translate(0, 0);
  	}
}
```

*To see the effect again click ‘rerun’ on the CodePen embed or on the Action Button itself*