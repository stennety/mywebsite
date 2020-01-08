---
layout: post
title: Logistic Regression
---

A logistic regression unit is the base unit of an Artificial Neural Network. Therefore, an understanding of Logistic Regression is essential to Deep Learning principles.

![_config.yml]({{ site.baseurl }}/images/config.png)

The easiest way to make your first post is to edit this one. Go into /_posts/ and update the Hello World markdown file. For more instructions head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) on GitHub.

Deep neural networks and their potential have come to the fore with a new verve in the last two decades. Developments in Natural Language Processing, face recognition technologies to the latest breakthroughs in pharma like protein folding, compound reactions attest to the improved and more robust deep learning architectures of today. This field has brought together neural sciences, probability theories, computational geometry and topology, convex analysis and so on.  A logistic regression unit is the base unit of an Artificial Neural Network. Therefore, understanding logistic regression is essential to Deep learning principles. 

### Logistic Regression and Activation Functions

![_config.yml]({{ site.baseurl }}/images/lr2-01-reg-vs-class.png)

Above figures show the classical difference between a regression (left) and a classification (right). In machine learning, when problems surrounding classification came up, we needed to predict the probability of belonging to a class. But the linear equation

![_config.yml]({{ site.baseurl }}/images/lr2-02-eqn.png)

In order to depict probability, we now need a device that will output values between 0 and 1 (0 ≤p ≤1 )  For eg , for a Binary classification problem  _P(Y=1| X)  = 1 - P(Y=0 |X)_  . Also, P(Y) = 0.5 would mean that the data point could belong to either of the class with equal chance. (in other words, right on the hyperplane dividing the two classes) 
