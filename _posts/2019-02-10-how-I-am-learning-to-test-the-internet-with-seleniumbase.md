---
title: How I am learning to test The Internet with SeleniumBase
date: '2019-02-10 14:00:00 +0000'
categories:
  - Automation
redirect_from:
  - /how-I-am-learning-to-test-the-internet-with-seleniumbase/
---

Goal: I have a simple, ambitious big hairy goal Learn how to "Automate all the (test) things, in Python". This is Part 1 on my journey towards this goal.

For context I consider myself experienced as a tester, but a relative newbie as a developer. I have been involved in one successful automation project using Powershell, and one failed automation project using .NET Framework and Selenium.

## Go learn Python! Somewhere else

What I won't be touching on in any point during this series, is how to install or use the basics of Python. This is well covered ground, and the Python Docs are a great place to start if this is what your after. [https://docs.python.org/3/](https://docs.python.org/3/)

## SeleniumBase

SeleniumBase is a test framework that wraps Selenium and extends Pytest, and also works with Nose test. I have selected SeleniumBase as my web test framework of choice, after a brief evaluation for a few reasons:

* Low barrier to entry, it's really easy to write and run your first test
* The competition where mostly based in JavaScript (WebDriver.io and NightWatch.js), I found them flaky to get running out of the box
* I wanted to avoid Java, for personal preference *The maintainer is VERY responsive via Twitter and Git issues, and has helped me and added functionality. I can't emphasis enough how much confidence this gives me.
* Finally and maybe most important, I was moments away from taking another direction, and got a recommendation from the kind folks at the Ministry of Testing Testers.Chat slack community to make use of Python and SeleniumBase to start my automation journey, 100 times thank you!

I found Getting up and running with SeleniumBase is easy, following their own instructions, so I am not going to cover this ground. [http://seleniumbase.com/](http://seleniumbase.com/)

## The Internet

Sure I could, and have, tried creating some automation against client projects. But here is where I come across some problems in terms of developing my skills:

1. I cannot share details of this work with others, my nature it is confidential 
2. I am limited to solving the challenges for the given project
3. Things change, so a lot of what I learned is about maintaining references to page elements

The solution? The Internet! no, not that internet. [http://the-internet.herokuapp.com](http://the-internet.herokuapp.com).

### Easy, right?

On first glance, the list of individual pages of isolated examples looks like it should be super easy to automate with any Selenium based framework. Turns out, for me at least, each example I have tried to automate so far has thrown up some interesting mini challenge I have had to spend time thinking about and researching. This is great news! Because it validates it as a useful resource to hone my skills.

## Follow along, on GitHub

If you want to follow me on my journey, feel free to check out my GitHub repository: [https://github.com/dowenb/seleniumbase-example/tree/master/the_internet](https://github.com/dowenb/seleniumbase-example/tree/master/the_internet).

## Examples so far

At the time of writing, I have taken on automating tests against 3 of the examples on The Internet. Let's take a closer look at each. As some background my work is contained in two files:

* The Internet Objects (Page Object model)
* The Internet Test (Tests, run in Pytest)

### Helper _url(path) function

```Python
def _url(path, prefix='http://'):
    base_url = 'the-internet.herokuapp.com'
    return prefix + base_url + path
```

Using this helper function allows me to manage my base URL in one place. It's probably a little over complicated, but you will understand why I did this in the first example below, basic auth.

### Basic Auth

```Python
#the_internet_objects.py
class BasicAuth(object):
    url = _url('/basic_auth', prefix='http://admin:admin@')
    success_text = '#content > div > p'
```

The basic problem I had to solve for this example, is how to pass the username and password for basic auth. I understand, the method I have choosen is far from production ready. If i find myself in a situation where I am testing pre-production code that uses basic auth, happy days.

```Python
#the_internet_test.py
from seleniumbase import BaseCase
from the_internet_objects import BasicAuth, BrokenImages, CheckBoxes

class MyTestClass(BaseCase):

    def test_basic_auth(self):
        self.open(BasicAuth.url)
        self.assert_text(
            'Congratulations! You must have the proper credentials.',
            BasicAuth.success_text
            )
```

Note the class inheriting from BaseCase, self.open and self.assert. This is SeleniumBase in action. For more details on basic SeleniumBase functionality, read the examples in the docs: [https://github.com/seleniumbase/SeleniumBase/tree/master/examples](https://github.com/seleniumbase/SeleniumBase/tree/master/examples)

One gotcha, if you don't name your test definition 'test_thing', Pytest won't find it.

### Broken Images

```Python
#the_internet_objects.py
class BrokenImages(object):
    url = _url('/broken_images')
    image1 = '#content > div > img:nth-child(2)'
    image2 = '#content > div > img:nth-child(3)'
    image3 = '#content > div > img:nth-child(4)'
```

Again I am making use of the Page Object model pattern. Following the SeleniumBase examples, all I am doing is storing strings that are the selectors for the elements I will find in my tests. I am not returning objects here, but I am abstracting the locators so I have a "single source of truth" to update when the web app I am testing is updated, and my references break.

```Python
#the_internet_test.py
from seleniumbase import BaseCase
from the_internet_objects import BasicAuth, BrokenImages, CheckBoxes

class MyTestClass(BaseCase):
    def test_broken_images(self):
        self.open(BrokenImages.url)
        self.assertGreater(int(self.get_attribute(BrokenImages.image1, 'naturalWidth')), 0)
        self.assertGreater(int(self.get_attribute(BrokenImages.image2, 'naturalWidth')), 0)
        self.assertGreater(int(self.get_attribute(BrokenImages.image3, 'naturalWidth')), 0)
```

This was my first experiment using the get_attributes function. I adapted this method from an equivalent I found researching the challenge online. Getting naturalWidth of 0 appeared to be a widely accepted method to assert if an image is broken. Note, this is a failing test, and that is to be expected a two of the images ARE broken, and I am asserting that they should not be.

I can think of at least two things I have not done to make this example elegant:

\*The check for a broken image could be abstracted into a helper method
\*Instead of static references to three images, all images could be iterated

Feel free to send me a pull request if you find time to do either of these enhancements, or folk my examples and do this for yourself. Either way, let me know!

### Check Boxes

```Python
#the_internet_objects.py
class CheckBoxes(object):
    url = _url('/checkboxes')
    checkbox1 = '#checkboxes > input[type="checkbox"]:nth-child(1)'
    checkbox2 = '#checkboxes > input[type="checkbox"]:nth-child(3)'
```

Nothing exciting here, just another basic object model. the only gotcha is that checkbox 2 is the 3rd child, not he 2nd. I believe this is because the 2nd child is the text label for checkbox 1. Answers on a postcard.

```Python
#the_internet_test.py
from seleniumbase import BaseCase
from the_internet_objects import BasicAuth, BrokenImages, CheckBoxes

class MyTestClass(BaseCase):

    def isChecked(self, checkBox):
        try:
            self.get_attribute(checkBox, 'checked')
            return True
        except:
            return False

    def test_checkboxes(self):
        self.open(CheckBoxes.url)
        #checkbox1 should default unchecked, and a click should leave it checked
        self.assert_false(self.isChecked(CheckBoxes.checkbox1), 'Checkbox1 should be unchecked')
        self.click(CheckBoxes.checkbox1)
        self.assert_true(self.isChecked(CheckBoxes.checkbox1), 'Checkbox1 should be unchecked')
         #checkbox2 should default checked, and a click should leave it unchecked
        self.assert_true(self.isChecked(CheckBoxes.checkbox2), 'Checkbox2 should be checked')
        self.click(CheckBoxes.checkbox2)
        self.assert_false(self.isChecked(CheckBoxes.checkbox2), 'Checkbox2 should be unchecked')
```

Unlike in the Broken Images example, here I have created a helper method. I am using .get_attribute(), this time I need to work around the fact the method throws an example if the attribute is not found. It turns out, the "checked" attribute is added and removed from the element when the check-box is checked and unchecked.

If you think if anything more interesting I can test with checkboxes, or again a way to more elegantly iterate them, let me know!

## Thanks

A big thank you to the folks at SeleniumBase, who can be found on Twitter [https://twitter.com/SeleniumBase](https://twitter.com/SeleniumBase)
Another big shout out to the folks at Ministry of Testing [https://www.ministryoftesting.com](https://www.ministryoftesting.com) for an inspiring community and excellent collection of resources.
And finally thank you to Dave Haeffner, [http://davehaeffner.com/](http://davehaeffner.com/), for The Internet [https://github.com/tourdedave/the-internet](https://github.com/tourdedave/the-internet)
