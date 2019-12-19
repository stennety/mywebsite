---
Title: Colordinates
Description: Where the hue are you? A simple web app to return a colour value based on your location on the Earth.
Date: 15-03-09
Alt: Colordinates web app
Source: https://plfstr.github.io/colordinates/
Tags: [personal, webapp, project, github]
---
## Where the hue are you?

Colordinates takes your geographic location and converts your latitude and longitude position into a HSLA (Hue, Saturation, Lightness, Alpha) colour value. 

Created as a great excuse to use geolocation. The colour value is just for amusement, but could form the basis for a colour theme for  inspiration with projects of your own.

### Where the hue are you getting this from?

Getting a position value is straightforward using the browser Geolocation API and the support from browsers and users who are familiar with the it and have the feature enabled is quite high. The mathematics however were more complicated. 

Longitude (vertical lines as with the time zones) position east or west alters the colour hue value. Looking down on the Earth from one of its poles would resemble a colour wheel you would expect to see in a graphics editing tool.

Latitude (your position from the either side of the equator / how high the sun is in the sky) value alters saturation of colour. The range is almost colourless (black) at the North Pole to very saturated the further south. 

### Try it out

[Colordinates](https://plfstr.github.io/colordinates/) is available on GitHub and can be installed to function offline in the browser.