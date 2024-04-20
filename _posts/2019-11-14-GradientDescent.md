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

![_config.yml]({{ site.baseurl }}/images/gd4-05-logy.png)

But wait a minute, our logistic function is made up of log(y) & log (1 -y). Logarithmic expressions are always linear, and how come we have a plot similar to a parabola here?. The trick is mini stepping. In this case, I used a step of 0.025   → p = np.arange(0,1,0.025) . (Remember, a circle is made up of infinitesimally small straight lines). So, our descension from the top of the plot was in small magnitude of 0.025. Had I increased the stepping, the convergence at the Global minima would have been quicker. Hence this rate is also called **Learning rate** in ML lingo.

### Gradient Descent

This is an optimization technique adopted to learn and converge to global minimum. In essence, you find out the slope of a random point on plot and descend or ascend the plot in search of ‘minima’. When the direction of the slope changes, that is an indication that we have swung past the minima and hence need to move back in the opposite direction.  

Generally, we learn the optimum parameters (weights or biases) by adjusting and readjusting as below 

![_config.yml]({{ site.baseurl }}/images/gd4-06-wnew.png)

### Gradient descent on cross entropy function

![_config.yml]({{ site.baseurl }}/images/gd4-07-lpy.png)

#### i)

![_config.yml]({{ site.baseurl }}/images/gd4-08-step1.png)

#### ii)

![_config.yml]({{ site.baseurl }}/images/gd4-09-step2.png)

### iii)

![_config.yml]({{ site.baseurl }}/images/gd4-10-step3.png)

More important than the extensive calculation is that, to find the overall effect w_1has on the Loss function we first derive the effect of  z on minimum Likelihood function

In other words, if we denote

![_config.yml]({{ site.baseurl }}/images/gd4-11-dlpy.png)

and so on, we could state as follows

![_config.yml]({{ site.baseurl }}/images/gd4-12-dlw1.png)

In order to find the derivative on current node, we only need to take into consideration the derivative of its immediate successor node. And this makes it an easier technique to start the derivation from the outer and work backwards.   This is an important concept to keep in mind when we do back propagation calculations in neural networks.  
