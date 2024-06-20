---
title: Selenium IDE is back for Chrome and Firefox!
date: '2018-11-15 01:09'
categories:
  - Automation
redirect_from:
  - /selenium-ide-is-back-for-chrome-and-firefox/
---

Selenium's official IDE is back! with a "Record/Playback session overhaul". The old Selenium IDE Firefox plugin version from "back in the day", before it became unusable in 2017, with version 55 of Firefox ([https://seleniumhq.wordpress.com/2017/08/09/firefox-55-and-selenium-ide/](https://seleniumhq.wordpress.com/2017/08/09/firefox-55-and-selenium-ide/ "https://seleniumhq.wordpress.com/2017/08/09/firefox-55-and-selenium-ide/")).

Selenium IDE "Next Generation", has current Chrome and Firefox plugins, that work with the latest versions of the browsers.

![](/uploads/side.png)

### Does the new "Official" IDE offer any benefits?

I really need to spend some more time with the IDE to do it justice. My initial reaction so far:

* Debugging tests is pretty straightforward
* The "If, else if, else and end" logic if very useful for creating basic conditional flow
  * An example where this might be useful, is if you want to accept Cookie consent, but only if you haven't done so already
* The saved tests appear to be stored in JSON, and so far I don't see an obvious way to convert them into something more useful you can continue "real" development with in a framework of your choice. So your stuck loading the tests back into SIDE or..
* There is an Node/NPM Based "SIDE" test runner, I haven't had time to check this out yet but this is the suggested route for using SIDE tests in CI.

### Should you care?

First off, I didn't spend much time in the "old" IDE, and I've only had a very short look at the new. So I'm not yet very well placed to judge.

What I do know, is that in the absence of the Official IDE, alternatives have been created. For example if you want a Chrome plugin for Capture and Playback, you may already be using Katalon Recorder ([https://chrome.google.com/webstore/detail/katalon-recorder-selenium/ljdobmomdgdljniojadhoplhkpialdid](https://chrome.google.com/webstore/detail/katalon-recorder-selenium/ljdobmomdgdljniojadhoplhkpialdid "https://chrome.google.com/webstore/detail/katalon-recorder-selenium/ljdobmomdgdljniojadhoplhkpialdid")).

One of the nice things about Katalon Recorder, is that unlike SIDE, you can export into a number of useful formats. In fact you can match up Katalon Recorder and then convert these for using in SeleniumBase. [https://github.com/seleniumbase/SeleniumBase/tree/master/seleniumbase/utilities/selenium_ide](https://github.com/seleniumbase/SeleniumBase/tree/master/seleniumbase/utilities/selenium_ide "https://github.com/seleniumbase/SeleniumBase/tree/master/seleniumbase/utilities/selenium_ide"). This approach gives you flexibility to do capture and record, and then make more maintainable tests, using patterns such as the Page Object Model.

### Give it ago, and make up your own mind

**Release notes:**

[https://github.com/SeleniumHQ/selenium-ide/releases/tag/v3.4.0](https://github.com/SeleniumHQ/selenium-ide/releases/tag/v3.4.0 "https://github.com/SeleniumHQ/selenium-ide/releases/tag/v3.4.0")

**Download:**

Chrome extension: [https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd "https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd")

Firefox extension: [https://addons.mozilla.org/en-GB/firefox/addon/selenium-ide/](https://addons.mozilla.org/en-GB/firefox/addon/selenium-ide/ "https://addons.mozilla.org/en-GB/firefox/addon/selenium-ide/")
