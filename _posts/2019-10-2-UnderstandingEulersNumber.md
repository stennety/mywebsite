---
layout: post
title: Understanding Euler's Number
---

Discover why mathematicians and statisticians are so enamored by the Exponential Constant _e_

Before one dives into the deep recesses of neural networks, it will benefit to take a good look at a peculiar number - Euler’s number (_e_ ≃ 2.71828...). Also called ‘exponential constant’, it is largely used in infinitesimal calculus - a tool relied upon by all engineering sciences and now hugely employed in Deep learning principles as well. 

Interestingly, though the constant is attributed to Euler - a versatile mathematician of 18th century who made major contributions in various fields from calculus, trignometry, physics to even music, it was Bernoulli that originally stumbled upon this number. Jacob Bernoulli was working on compounding principle when he noticed that when a dollar($1) with a 100% annual interest is compounded yields higher and higher as the frequency is increased, but that it approximates to a certain value between 2.69 and 3. 

![_config.yml]({{ site.baseurl }}/images/eu1-bernoullis.png)

The value of this approximation eluded Bernoulli, but his prodigious student Euler some years later found a clever approximation to this constant which he denoted as _e_. He found that

![_config.yml]({{ site.baseurl }}/images/eu2-econstant.png)

He established that the constant _e_ (2.7182824...) was irrational as well as transcendental.  Euler also generalized that

![_config.yml]({{ site.baseurl }}/images/eu3-expfunc.png)

which we now have come to call as exponential function, the base of many calculus problems. To appreciate this function better, let us check out how this great mathematician connected abstract mathematics to physical realm - a complex plane

### Euler's Formula and Euler's Identity

Let’s see how a complex number plane can be represented by the series

![_config.yml]({{ site.baseurl }}/images/eu3-expfunc.png)

Using __McLaurin’s Power Series__, we know the following

![_config.yml]({{ site.baseurl }}/images/eu4-mclaurins.png)

Substituting **_ix_** in place of **_x_** in the below

![_config.yml]({{ site.baseurl }}/images/eu3-expfunc.png)

, we get

![_config.yml]({{ site.baseurl }}/images/eu5-preeulers.png)

This gives us,

![_config.yml]({{ site.baseurl }}/images/eu6-eulerseqn.png)

popularly known as **Euler’s Formula**. 

This equation in turn gave way to findings like

![_config.yml]({{ site.baseurl }}/images/eu7-posteulers.png)

helpful tools in topics like Signal processing, etc. 


We can also see that when _x_ is substituted by _π_ ,  we arrive at the Euler’s Identity

![_config.yml]({{ site.baseurl }}/images/eu8-identity.png)

implying that in an imaginary plane, growth means rotating around a circle by so many radians while real growth scales up the magnitude. 

![_config.yml]({{ site.baseurl }}/images/eu9-circle.png)

### Its own Derivative

Given,

![_config.yml]({{ site.baseurl }}/images/eu9a-prediff.png)

Differentiating this expansion, we get 

![_config.yml]({{ site.baseurl }}/images/eu10-diff.png)

What does this mean? The rate of growth of e^x is equal to itself i.e., e^x. This very property makes it unique and popular as the base of any functions involving natural growth or continuous function.

![_config.yml]({{ site.baseurl }}/images/eu11-graph.png)

In other words, e^x is the amount to which continuous growth will happen from time unit _1_ to time unit _x_ when rate of growth is 100%.   

This should explain why _e_ is the preferred base for calculus based problems and not other digits like 2, 3  or 10.

### Natural Logarithm

We cannot discuss exponential function without also talking about its inverse - Natural logarithm

![_config.yml]({{ site.baseurl }}/images/eu12-lnx.png)

It can be interpreted as the unit of time an exponential function will take to reach a certain growth. For eg, with e^x as growth function, the number of time units required to reach y= 20 is _ln_ 20 

Given, 

![_config.yml]({{ site.baseurl }}/images/eu13-elnx.png)

, then differentiating on both sides wrt x, we get 

![_config.yml]({{ site.baseurl }}/images/eu14-lne1.png)

, meaning horizontal traversal on the x axis when e^x grows from 1 to _e_ is 1 unit. 

### Why e^x is favored for Calculus

Simply put, it is because of its unique property of being a derivative of itself 

![_config.yml]({{ site.baseurl }}/images/eu15-dex.png)

Let’s say we have a function y = 5^x . This can easily be represented in terms of _e_ as 

![_config.yml]({{ site.baseurl }}/images/eu16-ybar.png)

This can be easily be interpreted as the rate of growth for 5 ^(x ) is proportional to _ln_ 5.  This ease and beauty is what has made mathematicians and statisticians to be so enamoured by this magical number called the ‘exponential constant’. 
