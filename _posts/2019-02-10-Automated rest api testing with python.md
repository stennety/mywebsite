---
title: Automated REST API Testing with Python
date: '2019-02-19 00:00:00 +0000'
categories:
  - Automation
tags:
  - automation
redirect_from:
  - /Automated-rest-api-testing-with-python/
---


Last time out I introduced you to the start of my journey to automate all the "test" things in Python. I continue that journey now by switching focus away from frontend, to Restful Web APIs. You can look back at my last post [here](https://www.dowen.me.uk/posts/how-I-am-learning-to-test-the-internet-with-seleniumbase/ "How I am learning to test The Internet with SeleniumBase").

## Explore, Request, Assert

For this leg of the Journey, I will be using the python modules [requests](https://pypi.org/project/requests/ "Requests: HTTP for Humans") and [pyassert](https://pypi.org/project/pyassert/ "pyassert is an assertion library for the Python programming language.").

## Exploring APIs

![I am a teapot](/uploads/418.jpg)

Before you can make requests and you need to understand the API your testing. For this I recommend using a Rest Client. While you may already have mad skills in cURL, for the rest of us I suggest using [Postman](https://www.getpostman.com "Postman Simplifies API Development."), [Insomnia](https://insomnia.rest "Insomnia Debug APIs like a human, not a robot Finally, a REST client you'll love") or [SoapUI](https://www.soapui.org "SoapUI The Most Advanced REST & SOAP Testing Tool in the World").

If, like me, you want to develop your API testing skills in a safe place, outside of any work projects, there are some great options!

Ministry of Testing has a resource page listing some of those options [Websites To Practice Testing](https://www.ministryoftesting.com/dojo/lessons/websites-to-practice-testing "Here's a handy list of websites for software testers to practice their testing on that you might find it useful."). The one I am using is [Restful Booker](https://restful-booker.herokuapp.com "An API playground created by Mark Winteringham for those wanting to learn more about API testing and tools") by [Mark Winteringham](https://www.mwtestconsultancy.co.uk "MW Test Consultancy").

Start your exploration using API documentation. For Restful booker, you can find that [here](https://restful-booker.herokuapp.com/apidoc/index.html "API documentation for the playground API restful-booker.").

To learn more about testing APIs and using Postman, I suggest the free course [Exploring Service APIs through Test Automation](https://testautomationu.applitools.com/exploring-service-apis-through-test-automation/ "Exploring Service APIs through Test Automation") by [Amber Race](https://twitter.com/ambertests "Amber Race on Twitter").

## Making Requests

Inspired by the article [API Integration in Python – Part 1](https://realpython.com/api-integration-in-python/ "How to Make Friends and Influence APIs"), I started by making a Python client to abstract interactions with the Restful Booker API. The article is not focused on testing, but instead shows us how to Constructing an API Library, using Requests.

This pattern of abstraction is great and we can use it along side an assertion framework to do some robust testing.

You can take a closer look at my API Library for Restful Booker, and my rest code on the [Pybooker](https://github.com/dowenb/pybooker "Example of making using and testing an API in python") GitHub Repository.

![basic example](/uploads/basic_py.png)

This basic example makes a GET request to the URL <https://restful-booker.herokuapp.com/booking/1/>, and prints the resulting JSON response body into the Python console. Running it gives us:

![example output](/uploads/basic_output.png)

Because the method returns the response object, we can not only get the JSON body, but also useful information like the HTTP Status code.

Requests can make use of a wide range of HTTP methods, explore it and see what you can do!

## Asserting That

OK so now we can make Requests, and access the returned response in an object. With this, we can start implementing some automated checks, to see if we are getting back what we expect.

To do this, I have made use of the module [pyassert](https://pypi.org/project/pyassert/ "pyassert is an assertion library for the Python programming language."), you could also use other assertion libraries such as [fluentcheck](https://github.com/csparpa/fluentcheck "Fluent assertions for Python"). I am using Pytest to run my tests.

![Test Restful Booker](/uploads/test_booker.png)

While you can assert on almost every aspect of the response, the most basic check is the response returned 'OK'. This means we made a valid request, and the service didn't throw an internal server error.

One step further would be to assert on the HTTP Status code. For example for a GET you expect to succeed you might expect "200 Success", and for creating a new item with POST you might expect "201 Created".

You can read more about http status codes [HTTP STATUS DOGS](https://httpstatusdogs.com "Hypertext Transfer Protocol Response status codes. And dogs.") or [HTTP Cats](https://http.cat "HTTP Cats").
