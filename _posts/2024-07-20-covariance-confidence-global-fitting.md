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

This post summarizes what I have learned in the ongoing process on implementing
functionality to calculate confidence intervals into my nonlinear least squares
fitting library. My library performs least squares fitting for so called separable
models using [Variable Projection](/blog/2020/variable-projection-part-1-fundamentals/)
and also offers [global fitting](/blog/2024/variable-projection-part-2-multiple-right-hand-sides/)
of multiple right hand sides. Although this article explains confidence interval
calculations in this context, I have tried to write it in a way that is
useful for other least squares fitting applications as well.

# Least Squares Fitting

Assume we have a vector of observations $$\boldsymbol{y} \in \mathbb{R}^{N_y}$$
that we want to "fit" with a (also vector valued) function
$$\boldsymbol{f}(\boldsymbol{p}) \in \mathbb{R}^{N_y}$$ that depends on $$N_p$$
parameters $$\boldsymbol{p} \in \mathbb{R}^{N_p}$$. Then the process of least
squares _fitting_ a function is to find the parameters that minimize the weighted
difference of the function and the observations. We call those parameters
$$\boldsymbol{p}^\dagger$$, formally:

$$ \boldsymbol{p}^\dagger = \arg\min_{\boldsymbol{p}} \lVert W \left(\boldsymbol{y} - \boldsymbol{f}(\boldsymbol{p})\right) \rVert_2^2 \label{lsqr-fitting}\tag{1},$$

where $$\boldsymbol{W} \in \mathbb{R}^{N_y \times \N_y}$$ is a diagonal matrix
of weights for the elements of the observation vector. !!TODO!! ADD PROBABILISTIC
DESCRIPTION AND INTERPRETATION OF WEIGHTS AS SIGMAS OF GAUSSIANS (NOT FORMULA
BUT QUICK SENTENCE!!
Least squares _fitting_ is just a special case of least squares _minimization_,
which is:

$$ \boldsymbol{p}^\dagger = \arg\min_{\boldsymbol{p}} \lVert \boldsymbol{r}(\boldsymbol{p})\right) \rVert_2^2 \label{lsqr-minimization}\tag{2}.$$

For the fitting problem, $$\boldsymbol{r}(\boldsymbol{p})$$ is usually called the
(vector of) residuals, but in general it can just be any function of $$\boldsymbol{p}$$.

## Covariance of the Parameters

Once we find a solution $$\boldsymbol{p}^\dagger$$, we know !!!TODO LINK!!
the stackoverflow comment!!! that the covariance matrix !!TODO LINK!! for the parameters is given as:

$$\boldsymbol{C}_\boldsymbol{p} = \chi^2_r \boldsymbol{J}\{\boldsymbol{r}\}(\boldsymbol{p}^\dagger)^T \, \boldsymbol{J}\{\boldsymbol{r}\}(\boldsymbol{p}^\dagger), \label{cov-p-minimization} \tag{3},$$

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

$$\boldsymbol{C}_\boldsymbol{p} = \chi^2_r \left(\boldsymbol{W}\boldsymbol{J}\{\boldsymbol{f}\}(\boldsymbol{p}^\dagger)\right)^T \, \boldsymbol{W} \boldsymbol{J}\{\boldsymbol{r}\}(\boldsymbol{p}^\dagger), \label{cov-p-fitting} \tag{3}.$$

The covariance matrix is our key to unlocking some interesting statistics of
our parameters. For example, the diagonal elements of the matrix contain the
variance of each parameter.

## Confidence Interval of the Best Fit

When considered form a (Bayesian) statistical perspective, least squares fitting
is the same as maximizing the likelihood[^a-posteriori] (with respect to $$\boldsymbol{p})
of observing the values $$\boldsymbol{y}$$, assuming that they are Gaussian
distributed around the model $$\boldsymbol{f}(\boldsymbol{p})$$. As a matter of
fact, the parameters $$\boldsymbol{p}$$ are also assumed as Gaussian distributed
around $$\boldsymbol{p}^\dagger$$. !!IS THAT AN ASSUMPTION OR IS THAT IMPLIED??!!

# Endnotes
[^a-posteriori]: Maximizing the likelihood is the equivalent to maximizing the posterior probability, given uniform priors.
