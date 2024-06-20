---
layout: post
title: 5 ways testing mobile is different from web
date: 2023-08-08T23:00:00.000Z
draft: false
categories: Testing
tags:
  - specialist
  - web
  - mobile
image: /uploads/pexels-jessica-lewis-583842.jpg
---

## 1 Hardware

Web apps run on almost any device, from a games console to a tricked-out multi-core desktop PC with a giant high-resolution screen. In contrast, mobile apps typically run on Android, iOS, or both across many generations of mobile phones, tablets, and smartwatches.

For really testing the user experience for mobile apps, having physical devices is a huge advantage, although it can get expensive fast. Locally running simulators and hosted device farms can be very helpful to get device testing coverage but are less ideal for really feeling the experience users will get.

## 2 Automation

Automating against web has both very mature tools, as well as a huge range of options, many of them use Selenium and the WebDriver protocols at their core. For web, locators are relatively easy to obtain via either CSS selectors or XPATH, and plenty of tooling exists to help you out there.

On mobile, it's a little trickier to get going, you can't just dev tools in a browser to look up selectors, although there is tooling to help you out depending on your app architecture, for example, the studio mode on Maestro. As far as I can tell, mobile automation relies on identifying elements based on accessibility labels or types and indexes.

The mobile equivalent for Selenium is Appium, and there are again other tools built on top. As well as Appium and other cross-platform solutions, each platform has native tools for testing native apps, I haven't used these myself but I know they are out there. Do you have experience writing automation using native tooling? I'd love to hear how it's different from cross-platform tools.

One tool I've been learning recently is [Maestro](https://maestro.mobile.dev/), it seems pretty promising so far. One tool I know of that can test both web and apps, although I haven't used it in anger, is [NightWatch.js,](https://nightwatchjs.org/guide/mobile-app-testing/introduction.html) it's on my list of options to check out in the future.

## 3 Accessibility

Testing for web accessibility is way easier, not least before the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG21/) are written with the Web in mind. Two difficulties I've found so far with testing for mobile accessibility are the frustrating inconsistency in accessibility features and tooling to test on each platform.

Google's Android has [Accessibility Scanner](https://support.google.com/accessibility/android/answer/6376570?hl=en-GB), and Apple iOS has the [Accessibility Inspector,](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html) one comes as an app to install on your device, real or emulated, and the other is a tool built into Apple MacOS you use together with the iPhone Simulator.

In contrast, web has a ton of tools, from Axe-based inspectors and automation to browser extensions to simulate different colour blindness types, or even simulate cognitive and physical impairments.

## 4 Up and running

There are 3 main test environments you will need for mobile:

1. On a real mobile device, you can touch and hold
2. On a PC or Mac, using a simulator or emulator
3. Via CI/CD to run automated builds, tests, and deployments of your apps

CI/CD can be especially painful, especially for Apple devices where you still can't escape the need for an Apple device at some point in the chain. Hosted platforms do exist to solve this problem, at a price, such as [bitrise](https://bitrise.io/).

Oh did I mention, web will run on almost anything, so CI/CD can run pretty much anywhere, a win for web.

## 5 Risks

While web and mobile maybe share a bunch of common risks to quality, both need to be fast, secure, and usable, mobile does have some unique risks.

Is your app something people might try and use while driving? Therefore you might need to introduce a driving mode to reduce the risk users feel the need to get hands-on with their devices.

Hogging too much processing power and battery? Risk the automated management tools in Android and Apple laying the smack down on your Candy-Crushing ass and counting 1, 2, 3.

Not unique to mobile, especially as progressive web apps are a thing, but having a sudden lack of internet connection, or change of network is way more common on mobile, as is using VPN and switching between locations on a whim.

## That's all folks

I hope you found this interesting and valuable. What other differences, or similarities, between Web and Mobile apps can you think about? How might they impact your testing?

Hero image: [Photo by Jessica Lewis](< https://www.pexels.com/photo/iphone-6-earpods-and-macbook-on-flat-lay-photography-583842/>)
