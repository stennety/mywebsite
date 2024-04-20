---
layout: post
title: Information Theory and Cross Entropy Function
---

Next, let's learn about a concept that's applied to diverse areas such a Machine Learning, Information and Statistical Theories

### Best Fitting through Maximum Likelihood

Last time, we saw that a logistic unit adjusts and readjusts the weights {w1, w2, w3...}  or coefficients {β_0, β_1,β_2} to arrive at a generalized solution. This process is also known as Best Fitting as you can see in the diagram below - finding out the line that best fits the maximum number of data points. That would mean we are looking for a solution that has ‘maximum likelihood of correctness‘ of belonging to a certain category. 

### Maximum Likelihood Estimation

Remember our logit function ranges from (-∞, +∞), and that the dependent variable (Y) is binary (0, 1) since we are predicting the probability of belonging to a class.  Maximum likelihood can then be pivoted around the number of successes the σ  or 〖logit〗^(-1)  plot encapsulates (Probability Mass function). 

For eg, if a fair coin is tossed 2 times and the number of times H (head) appears is 4, then the   	

![_config.yml]({{ site.baseurl }}/images/ml3-01-prob.png)

Note this formula holds as Y is discrete and binary (Bernoulli Distribution).

Therefore, the Likelihood (logistic function) or _L(W|X)_, where W is coefficient set {w1, w2, w3...} when there are N independent and normally distributed samples can be given as 

![_config.yml]({{ site.baseurl }}/images/ml3-02-lwx.png)

The above equation can be simplified even more if we apply log. Maximizing the likelihood will also end up maximizing the log of likelihood. Moreover, a log (product of N samples) = sum of individual log, which is much easier to compute and compare. Hence, 

![_config.yml]({{ site.baseurl }}/images/ml3-03-log.png)

### Logistic Cost/Cross Entropy Function 

The inverse of the point where Maximum likelihood converges would give the least error function (Cross Entropy Function / Cost Function) which we denote as J. 

![_config.yml]({{ site.baseurl }}/images/ml3-04-entfn.png)

### Information Theory and Cross Entropy

In fact, the concept of Cross Entropy has come from Information theory founded by Claude Shannon, an American mathematician and Electrical Engineer. In his 1948 book,’ A Mathematical Theory of Communication ‘- a study on sending data with least error from one point to the other, he writes that the more predictable an outcome of a communication channel is, less un-certainty on the recipient side. 

Simply put, if there’s a communication channel that outputs a sequence of 2 letters [A,B ]  and the recipient is asked to predict the next letter that will come through the channel  , prediction is easier when there’s a heavy bias to either A or B  than when both having equal chance of being output. In other words, predicting A is easier when its probability is 75% than when it is 50 % or less. If this was represented by a binary decision tree ,  ‘A’ would come up much higher in level than B. Therefore, the total entropy =

![_config.yml]({{ site.baseurl }}/images/ml3-05-wtbias.png)

It is apparent from the figure (source: Wikipedia) that the maximum entropy is when it is uniformly distributed. In our example, therefore the entropy is

![_config.yml]({{ site.baseurl }}/images/ml3-06-entropy.png)

This will be the uncertainity of the network given the probability. But if the prediction by recipient doesn’t match with true prediction, and A’s probability is wrongly predicted to be 60%, then it brings in some divergence from the true entropy as the entropy rises to.  
This is Cross Entropy, given as

![_config.yml]({{ site.baseurl }}/images/ml3-07-xentropy.png)

It’s amazing to behold how the same concept is applied across diverse areas such as Machine learning, Information and Statistical theories. 



The easiest way to make your first post is to edit this one. Go into /_posts/ and update the Hello World markdown file. For more instructions head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) on GitHub.
