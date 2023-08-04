---
layout: post
title: 5 ways testing mobile is different from web
date: 2023-08-13T23:00:00.000Z
draft: true
categories: Testing
tags:
  - specialist
  - web
  - mobile
image: /uploads/pexels-jessica-lewis-583842.jpg
---

## 1 Hardware

Web runs on almost any device from a games console to a tricked out multi-core desktop PC with a huge high resolution screen. In contrast, mobile apps typically run on Android, iOS or both across many generations of mobile phones, tablets and smart watches.

Locally running simulators and hosted device farms do exist, and can be very helpful to get device coverage. However really test the user experience of mobile apps, having physical devices is a huge advantage, although it can get expensive fast.

## 2 Automation

Automating against web has both very mature tools, as well as a huge range of options, many of them use Selenium and the WebDriver protocols at their core. For web, locators are relatively easy to obtain via either CSS selectors or XPATH, and plenty of tooling exists to help you out there.

On mobile, it's a little trickier to get going, you can't just dev tools in a browser to look up selectors, although there is tooling to help you out depending on your app architecture, for example the studio mode on Maestro. As far as I can tell, mobile automation relies on identifying elements based on accessibility labels or types and indexes.

The mobile equivalent for Selenium is Appium, and there are again other tools build on top. As well as Appium and other cross platform solutions, each platform has native tools for testing native apps, I haven't used these myself but I know they are out there. Do you have experience writing automation using native tooling? I'd love to hear how it's different from cross platform tools.

One tool I've been learning recently is [Maestro](https://maestro.mobile.dev/), it seems pretty promising so far. One tool I know of that can test both web and apps, although I haven't used it in anger, is [NightWatch.js,](https://nightwatchjs.org/guide/mobile-app-testing/introduction.html) it's on my list of options to checkout in the future.

## 3 Accessibility

## 4 Running locally

## 5 Running in CI/CD

Hero image: [Photo by Jessica Lewis](< https://www.pexels.com/photo/iphone-6-earpods-and-macbook-on-flat-lay-photography-583842/>)
