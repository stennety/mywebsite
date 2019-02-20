---
title: 'Automated REST API Testing with Python'
date: 2019-02-19 00:00:00 +0000

---

Last time out I introduced you to the start of my journey to automate all the "test" things in Python. I continue that journey now by switching focus away from frontend, to Restful Web APIs. You can look back at my last post [here](https://www.dowen.me.uk/how-I-am-learning-to-test-the-internet-with-seleniumbase/ "How I am learning to test The Internet with SeleniumBase").

# Explore, Request, Assert

For this leg of the Journey, I will be using the python modules [requests](https://pypi.org/project/requests/ "Requests: HTTP for Humans") and [pyassert](https://pypi.org/project/pyassert/ "pyassert is an assertion library for the Python programming language.").

## Exploring APIs

Before you can make requests and you need to understand the API your testing. For this I recommend using a Rest Client. While you may already have mad skills in cURL, for the rest of us I suggest using [Postman](https://www.getpostman.com "Postman Simplifies API Development."), [Insomnia](https://insomnia.rest "Insomnia Debug APIs like a human, not a robot Finally, a REST client you'll love") or [SoapUI](https://www.soapui.org "SoapUI The Most Advanced REST & SOAP Testing Tool in the World").

If, like me, you want to develop your API testing skills in a safe place, outside of any work projects, there are some great options!

Ministry of Testing has a resource page listing some of those options [Websites To Practice Testing](https://www.ministryoftesting.com/dojo/lessons/websites-to-practice-testing "Here's a handy list of websites for software testers to practice their testing on that you might find it useful."). The one I am using is [Restful Booker](https://restful-booker.herokuapp.com "An API playground created by Mark Winteringham for those wanting to learn more about API testing and tools") by [Mark Winteringham](https://www.mwtestconsultancy.co.uk "MW Test Consultancy").

Start your exploration using API documentation. For Restful booker, you can find that [here](https://restful-booker.herokuapp.com/apidoc/index.html "API documentation for the playground API restful-booker."). 

To learn more about testing APIs and using Postman, I suggest the free course [Exploring Service APIs through Test Automation](https://testautomationu.applitools.com/exploring-service-apis-through-test-automation/ "Exploring Service APIs through Test Automation") by [Amber Race](https://twitter.com/ambertests "Amber Race on Twitter").

## Making Requests

## Asserting That