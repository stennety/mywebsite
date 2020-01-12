---
layout: post
title: Gradient Descent and Global Minimum
---

The next concept is important when we do back propagation calculations in neural networks.  

![_config.yml]({{ site.baseurl }}/images/gd4-01-entfn.png)

Our aim is to minimize this error function to its least possible value , to adjust the coefficients ( β_0,β_1,β_2...)  or in other words the weights (w_0,w_1,w_2... ) of our logisitic unit because Minimizing error → Maximizing efficiency 

### Convex Minimization

Convexity of a function in a way can be defined as ALL lines connecting two points on the graph appears on/above the graph or function.

![_config.yml]({{ site.baseurl }}/images/gd4-02-convex.png)

Let’s translate our error function to a 3D landscape, say a Golf course, and assume our current position in the field relate to the current coefficients in our error function . In order to optimize the function, we may want to find the lowest point in the entire field, which will be our **Global Minimum**. Mind you, there might be low lying areas which could be categorized as **Local Minimum**, but your machine learning algorithm should keep going looking for its lowest point without getting caught in these mini contours.  In order to reach this global minimum, we scale the landscape in small steps using an optimization method called **Gradient Descent**.

![_config.yml]({{ site.baseurl }}/images/gd4-03-gdgraph.png)

In linear regression the Cost function usually resorted to is Mean Squared Error (MSE) , where

![_config.yml]({{ site.baseurl }}/images/gd4-04-mse.png)

Being a quadratic equation, it surely promised a topology close to an upward parabola. However, we soon found out that on logistic parameters, this can generate more than one local minimum rendering optimization difficult.  In contrast, the logistic cost function when plotted gives a symmetric convex plot with single minima, which is its global minima.  Figure below shows when logistic cost function was plotted. The global minimum is at point 0.5.

![_config.yml]({{ site.baseurl }}/images/config.png)

The easiest way to make your first post is to edit this one. Go into /_posts/ and update the Hello World markdown file. For more instructions head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) on GitHub.
