---
layout: post
title: Logistic Regression
---

A logistic regression unit is the base unit of an Artificial Neural Network. Therefore, an understanding of Logistic Regression is essential to Deep Learning principles.

Deep neural networks and their potential have come to the fore with a new verve in the last two decades. Developments in Natural Language Processing, face recognition technologies to the latest breakthroughs in pharma like protein folding, compound reactions attest to the improved and more robust deep learning architectures of today. This field has brought together neural sciences, probability theories, computational geometry and topology, convex analysis and so on.  A logistic regression unit is the base unit of an Artificial Neural Network. Therefore, understanding logistic regression is essential to Deep learning principles. 

### Logistic Regression and Activation Functions

![_config.yml]({{ site.baseurl }}/images/lr2-01-reg-vs-class.png)

Above figures show the classical difference between a regression (left) and a classification (right). In machine learning, when problems surrounding classification came up, we needed to predict the probability of belonging to a class. But the linear equation

![_config.yml]({{ site.baseurl }}/images/lr2-02-eqn.png)

In order to depict probability, we now need a device that will output values between 0 and 1 _(0 ≤ p ≤1 )_  For eg , for a Binary classification problem  _P(Y=1| X)  = 1 - P(Y=0 |X)_  . Also, _P(Y) = 0.5_ would mean that the data point could belong to either of the class with equal chance. (in other words, right on the hyperplane dividing the two classes) 

How do we transform the equation above to something that restrains itself between 0 and 1, without having to sacrifice the ease of a linear representation? Let’s do that in two steps:

1. Make it greater than 0
   From my previous article, one can see that _e^z_  ( exponential function )is always greater than 0.  So, if we assign
   
   ![_config.yml]({{ site.baseurl }}/images/lr2-03-abovex.png)

2. Bring _p_ down from infinity to 1 or less
   Any fraction with a denominator slightly higher than its numerator is always less than 1.  Therefore, if we assign
   
   ![_config.yml]({{ site.baseurl }}/images/lr2-04-pbetween.png)

   , p duly falls in between -1 & 1. Voila, we have grabbed it by horns and tamed our unruly linear relation to be represented as probability.  

### Logistic Sigmoid Function

![_config.yml]({{ site.baseurl }}/images/lr2-05-sigmoidfn.png)

This function is also known as Sigmoid function. As depicted here, it takes an ‘S’ form and at 0, _f(0) = 0.5_.The Sigmoid function is usually denoted as _σ_.  

![_config.yml]({{ site.baseurl }}/images/lr2-06-siggraph.png)

### Tanh Function

This is also used as a sigmoid function where in it also generates an ‘S’ form, except that the range is between _-1 < f(x) < 1_. 

![_config.yml]({{ site.baseurl }}/images/lr2-07-Hyptanfunction.png)

We’ll discuss more on this when we get to neural networks.  

![_config.yml]({{ site.baseurl }}/images/lr2-08-tanhgraph.png)

### Logit Function

![_config.yml]({{ site.baseurl }}/images/lr2-09-logitfn.png)

, which is also called the odds of likelihood. In other words, the ratio of the _P(event)_ to _P(non-event)_

![_config.yml]({{ site.baseurl }}/images/lr2-10-oddslh.png)

This function,

![_config.yml]({{ site.baseurl }}/images/lr2-11-lnf.png)

is also called logit function, using which a Machine learning model adjusts its coefficients 

![_config.yml]({{ site.baseurl }}/images/lr2-12-beta.png)

A simple logistic regression model is shown here.  The weight set _{w1, w2, w3...}_ is the coefficient set _{β0, β1, β2,...}_ we try to find with the help of logit function.

![_config.yml]({{ site.baseurl }}/images/lr2-13-graph.png)
