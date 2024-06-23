---
layout: post
tags: least-squares image-processing algorithm math varpro
#categories: []
date: 2024-07-20
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Least Squares Fitting: Confidence Intervals (not only) for Variable Projection with Multiple Right Hand Sides'
#
#
# Make sure this image is correct !!!
og_image: 
#
#
# make sure comments are enabled
comments_id: 
math: true
---

This post summarizes what I have learned in the ongoing process of implementing
functionality to calculate confidence intervals into my nonlinear least squares
fitting library. It performs least squares fitting for so called separable
models using [Variable Projection](/blog/2020/variable-projection-part-1-fundamentals/)
and also offers [global fitting](/blog/2024/variable-projection-part-2-multiple-right-hand-sides/)
of multiple right hand sides. In this article I'll first recap the process of
calculating confidence intervals for general nonlinear least squares fitting. After
that I'll apply it to the special case of variable projection with single and
multiple right hand sides.

# Least Squares Fitting

Assume we have a vector of observations $$\boldsymbol{y} \in \mathbb{R}^{N_y}$$
that we want to "fit" with a (also vector valued) function
$$\boldsymbol{f}(\boldsymbol{p}) \in \mathbb{R}^{N_y}$$ that depends on $$N_p$$
parameters $$\boldsymbol{p} \in \mathbb{R}^{N_p}$$. Then the process of least
squares _fitting_ a function is to find the parameters that minimize the weighted
difference of the function and the observations. We call those parameters
$$\boldsymbol{p}^\dagger$$, formally:

$$ \boldsymbol{p}^\dagger = \arg\min_{\boldsymbol{p}} \frac{1}{2} \lVert W \left(\boldsymbol{y} - \boldsymbol{f}(\boldsymbol{p})\right) \rVert_2^2 \label{lsqr-fitting}\tag{1},$$

where $$\boldsymbol{W} \in \mathbb{R}^{N_y \times N_y}$$ is a diagonal matrix
of weights for the elements of the observation vector. !!TODO!! ADD PROBABILISTIC
DESCRIPTION AND INTERPRETATION OF WEIGHTS AS SIGMAS OF GAUSSIANS (NOT FORMULA
BUT QUICK SENTENCE!!
Least squares _fitting_ is just a special case of least squares _minimization_,
which is:

$$ \boldsymbol{p}^\dagger = \arg\min_{\boldsymbol{p}} \frac{1}{2} \lVert \boldsymbol{r}(\boldsymbol{p}) \rVert_2^2 \label{lsqr-minimization}\tag{2}.$$

For the fitting problem, $$\boldsymbol{r}(\boldsymbol{p})$$ is usually called the
(vector of) residuals, where

$$
\boldsymbol{r}(\boldsymbol{p}) = \boldsymbol{W} (\boldsymbol{y} - \boldsymbol{f}(\boldsymbol{p})), \label{residual-vector}\tag{3}
$$

but in general it can just be any vector valued function of $$\boldsymbol{p}$$.

# A Bayesian Perspective

We'll now take a step back and quickly recap the fundamentals of least squares 
fitting from a Bayesian point of view. That will allow us to understand a couple of 
things about the probability densities involved in the process. First, let's
recap why we minimize the sum of squares in the first place.

## The Sum of Squares

To start, we assume that
for each index $$j$$, the data is normally distributed around the expected
value, which is given by the model $$f_j(\boldsymbol{p})$$. That means the
conditional probability of observing value $$y_j$$, given the parameters
$$\boldsymbol{p}$$ is:

$$P(y_j | \boldsymbol{p}) = \frac{1}{\sqrt{2\pi}\sigma_j}\exp\left( -\frac{1}{2}\frac{(y_j-f_j(\boldsymbol{p}))^2}{\sigma_j^2} \right).$$

Assuming [statistical independence](https://en.m.wikipedia.org/wiki/Independence_(probability_theory)) for the $$y_j$$,
we can write the probability of observing the vector $$\boldsymbol{y}$$ given $$\boldsymbol{p}$$
as

$$P(\boldsymbol{y}|\boldsymbol{p}) = \prod_j P(y_j|\boldsymbol{p}) \propto \exp(-\frac{1}{2}\lVert\boldsymbol{W}(\boldsymbol{y} - \boldsymbol{f}(\boldsymbol{p}))\rVert_2^2)=\exp(-\frac{1}{2}\lVert \boldsymbol{r}(\boldsymbol{p})\rVert_2^2), \label{likelihood}\tag{4}$$

with $$\boldsymbol{r}(\boldsymbol{p})$$ as in eq. $$\eqref{residual-vector}$$, provided that we chose the weights as

$$\boldsymbol{W} = \text{diag}(1/\sigma_1, \dots, 1/\sigma_{N_y}), \label{bayes-weights}\tag{5}$$

where $$\sigma_j$$ is the standard deviation of data point $$y_j$$. From a Bayesian
point of view, we are interested in the posterior distribution that describes
the probability density of $$\boldsymbol{p}$$ given our observations $$\boldsymbol{y}$$,
which is related to the likelihood $$\eqref{likelihood}$$ via Bayes' Theorem:

$$P(\boldsymbol{p}|\boldsymbol{y}) = \frac{P(\boldsymbol{y}|\boldsymbol{p})\cdot P(\boldsymbol{p})}{P(\boldsymbol{y})}.$$

Now we assume a uniform prior[^uniform-prior] distribution $$P(\boldsymbol{p})$$, which let's us write the
posterior probability as the proportionality:

$$P(\boldsymbol{p}|\boldsymbol{y}) \propto P(\boldsymbol{y}|\boldsymbol{p}), \label{posterior}\tag{6}$$

keeping in mind that the _marginal probability_ does not depend on the parameter
$$\boldsymbol{p}$$ and will thus only act as a scaling factor. Now it's trivial
to show that maximizing the posterior probability with respect to $$\boldsymbol{p}$$
is equivalent to the minimization $$\eqref{lsqr-fitting}$$, provided we choose
the weigths as in $$\eqref{bayes-weights}$$. That means least squares fitting arises 
as maximum likelihood estimation with uniform priors from a Bayesian perspective.
Now let's understand what that implies for the shape of the posterior probability.

## Gaussian Posteriors and the Covariance Matrix

In general, we won't be able to say much about the functional form of the
posterior probability, which is proportional to $$\eqref{likelihood}$$,
because it depends on $$\boldsymbol{f}(\boldsymbol{p})$$. However, in the vicinity
of the best fit parameters $$\boldsymbol{p}^\dagger$$, we can make some 
useful approximations. For ease of notation let's denote the sum of the squared
residuals as

$$g(\boldsymbol{p}) = \frac{1}{2} \lVert \boldsymbol{r}(\boldsymbol{p}) \rVert_2^2,$$

where $$g: \mathbb{R}^{N_p} \rightarrow \mathbb{R}$$. Using a Taylor expansion 
we can write $$g$$ around the best fit parameter $$\boldsymbol{p}^\dagger$$
as

$$
g(\boldsymbol{p}) = g(\boldsymbol{p}^\dagger) + \nabla g(\boldsymbol{p}^\dagger) \cdot (\boldsymbol{p}-\boldsymbol{p}^\dagger) + \frac{1}{2} (\boldsymbol{p}-\boldsymbol{p}^\dagger)^T\, \boldsymbol{H}_g(\boldsymbol{p}^\dagger) (\boldsymbol{p}-\boldsymbol{p}^\dagger) + \mathcal{O}(\lVert \boldsymbol{p}-\boldsymbol{p}^\dagger\rVert^3_2)
$$

where $$\nabla g(\boldsymbol{p}^\dagger)$$ is the gradient of $$g$$ and $$\boldsymbol{H}_g(\boldsymbol{p}^\dagger)$$
is the Hessian of $$g$$, both evaluated at $$\boldsymbol{p}^\dagger$$. Since
$$\boldsymbol{p}^\dagger$$ minimizes $$g$$, we know that the gradient must vanish, 
such that we can approximate $$g$$ up to second order as

$$
g(\boldsymbol{p}) \approx g(\boldsymbol{p}^\dagger) + \frac{1}{2} (\boldsymbol{p}-\boldsymbol{p}^\dagger)^T\, \boldsymbol{H}_g(\boldsymbol{p}^\dagger) (\boldsymbol{p}-\boldsymbol{p}^\dagger). \label{taylor-approx-g}\tag{7}
$$

We can use these results to approximate the posterior probability distribution
around the best fit parameters:

$$P(\boldsymbol{p}|\boldsymbol{y}) \approx K \cdot \exp\left(\frac{1}{2} (\boldsymbol{p}-\boldsymbol{p}^\dagger)^T\, \boldsymbol{H}_g(\boldsymbol{p}^\dagger) (\boldsymbol{p}-\boldsymbol{p}^\dagger), \label{posterior-p-approximation}\tag{8}\right)$$

where $$K\in\mathbb{R}$$ is a constant of integration that also absorbs the constant
first term in $$\eqref{taylor-approx-g}$$. It acts as the normalization. This
turns out to be the a [multivariate Gaussian distribution](https://en.wikipedia.org/wiki/Multivariate_normal_distribution)
with expected value $$\boldsymbol{p}^\dagger$$ and covariance matrix $$\boldsymbol{H}_g^{-1}(\boldsymbol{p}^\dagger)$$.

In least squares fitting, the Hessian of $$g$$ is often approximated[^approximate-hessian]
as

$$\boldsymbol{H}_g(\boldsymbol{p}) \approx \boldsymbol{J}_r(\boldsymbol{p})^T \boldsymbol{J}_r(\boldsymbol{p}),$$

where $$\boldsymbol{J}_r(\boldsymbol{p})$$ is the Jacobian Matrix of $$\boldsymbol{r}(\boldsymbol{p})$$.
Often the Jacobian is only denoted by $$\boldsymbol{J}$$, but for this post we'll
encounter many Jacobians that we have to distinguish, so it pays to be more explicit
with the notation here. For now, this approximation allows us to write the
covariance matrix $$\boldsymbol{C}_p$$ of the parameters $$\boldsymbol{p}$$ as

$$\boldsymbol{C}_p = \left(!!!!!!!!!!!!!!!!!!!! \right)$$

!!! see Kaltenbach thesis AND ADD FACTOR of 1/2 everywhere!!! also for Gaussians we need 1/2!!!! 
!!! then we can actually derive the covariance matrix!!!


## Covariance of the Parameters

Once we find a solution $$\boldsymbol{p}^\dagger$$, we know !!!TODO LINK!!
the stackoverflow comment!!! that the covariance matrix !!TODO LINK!! for the parameters is given as:

$$\boldsymbol{C}_\boldsymbol{p} = \chi^2_r \boldsymbol{J}\{\boldsymbol{r}\}(\boldsymbol{p}^\dagger)^T \, \boldsymbol{J}\{\boldsymbol{r}\}(\boldsymbol{p}^\dagger), \label{cov-p-minimization} \tag{4},$$

where $$\boldsymbol{J}\{\boldsymbol{r}\}(\boldsymbol{p}^\dagger)$$ is the Jacobian
Matrix !!TODO LINK!! of $$\boldsymbol{r}(\boldsymbol{p})$$ evaluated at
$$\boldsymbol{p}^\dagger$$. The factor $$\chi^2_r$$ is called the _reduced $$\chi^2$$_

$$\chi^2_r = \frac{\lVert \boldsymbol{r}(\boldsymbol{p}) \rVert_2^2}{N_y-N_p},$$

where $$N_y$$ are the number of observations and $$N_p$$ are the number of parameters.

The Jacobian in $$\eqref{cov-p-minimization}$$ is often just written as $$J$$,
but for this article I have to be a bit more verbose. We'll be dealing
with all sorts of other Jacobians and it would quickly become confusing, if we
did not have a clear notation to distinguish between them.

For the fitting problem $$\eqref{lsqr-fittin}$$ we have
$$\boldsymbol{r} = W(\boldsymbol{y} - \boldsymbol{f})$$, which implies
$$\boldsymbol{J}\{\boldsymbol{r}\} = -\boldsymbol{J}\{f\}$$, so that we can write

$$\boldsymbol{C}_\boldsymbol{p} = \chi^2_r \left(\boldsymbol{W}\boldsymbol{J}\{\boldsymbol{f}\}(\boldsymbol{p}^\dagger)\right)^T \, \boldsymbol{W} \boldsymbol{J}\{\boldsymbol{r}\}(\boldsymbol{p}^\dagger), \label{cov-p-fitting} \tag{5}.$$

The covariance matrix is our key to unlocking some interesting statistics of
our parameters. For example, the diagonal elements of the matrix contain the
variance of each parameter.

## Confidence Interval of the Best Fit
!!TODO REMOVE!!
When considered form a (Bayesian) statistical perspective, least squares fitting
is the same as maximizing the likelihood[^a-posteriori] (with respect to $$\boldsymbol{p})
of observing the values $$\boldsymbol{y}$$, assuming that they are Gaussian
distributed around the model $$\boldsymbol{f}(\boldsymbol{p})$$. As a matter of
fact, the parameters $$\boldsymbol{p}$$ are also assumed as Gaussian distributed
around $$\boldsymbol{p}^\dagger$$.

 !!IS THAT AN ASSUMPTION OR IS THAT IMPLIED??!!



# Endnotes
[^a-posteriori]: Maximizing the likelihood is the equivalent to maximizing the posterior probability, given uniform priors.
[^uniform-prior]: Some problems arise when thinking in depth about the meaning of uniform priors. Those don't have a lot of practical importance, but are interesting nonetheless. They are discussed e.g. in Sivia's brilliant [Data Analysis - A Bayesian Tutorial](https://global.oup.com/academic/product/data-analysis-9780198568322https://global.oup.com/academic/product/data-analysis-9780198568322).
[^approximate-hessian]: See e.g. Nocedal & Wright _Numerical Optimization_, 2nd edition or [this nice thesis](https://kops.uni-konstanz.de/entities/publication/9197ed25-a358-4fd9-943f-1897414eb6df) by Marius Kaltenbach.
