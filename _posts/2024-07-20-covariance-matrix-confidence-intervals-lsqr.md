---
layout: post
tags: least-squares image-processing algorithm math varpro
#categories: []
date: 2024-07-20
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Understanding the Covariance Matrix and Confidence Intervals in Nonlinear Least Squares Fitting'
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

This post summarizes what I have learned in the ongoing process of implementing the
capability to calculate confidence intervals and covariance matrices into my nonlinear least squares
fitting library. All of the results are known, but it is easy to make subtle mistakes
by applying formulas that one finds on the internet. This post dives into the
topic in a way that will make it clear where the formulae of interest come from
and how to apply them correctly. 

# The Basics

Assume we have a vector of observations $$\boldsymbol{y} \in \mathbb{R}^{N_y}$$
that we want to "fit" with a (also vector valued) function
$$\boldsymbol{f}(\boldsymbol{p}) \in \mathbb{R}^{N_y}$$ that depends on $$N_p$$
parameters $$\boldsymbol{p} \in \mathbb{R}^{N_p}$$. Then the process of least
squares _fitting_ a function is to find the parameters that minimize the weighted
difference of the function and the observations. We call those parameters
$$\boldsymbol{p}^\dagger$$, formally:

$$ \boldsymbol{p}^\dagger = \arg\min_{\boldsymbol{p}} \frac{1}{2} \lVert W \left(\boldsymbol{y} - \boldsymbol{f}(\boldsymbol{p})\right) \rVert_2^2 \label{lsqr-fitting}\tag{1},$$

where $$\boldsymbol{W} \in \mathbb{R}^{N_y \times N_y}$$ is a diagonal matrix
of weights for the elements of the observation vector. Note, that in this article
the weights, due to their position, are also squared. There are multiple --ultimately
equivalent-- ways of applying the weight matrix. Those change whether the weights
should be interpreted as inverse variances or standard deviations. I am using this
way of phrasing the minimization problem, but any way is fine as long as the
calculations are applied consistently. We'll learn more about the weights in
the next section. For now, let's note that least squares _fitting_ is just a
special case of least squares _minimization_, which is:

$$ \boldsymbol{p}^\dagger = \arg\min_{\boldsymbol{p}} \frac{1}{2} \lVert \boldsymbol{r}(\boldsymbol{p}) \rVert_2^2 \label{lsqr-minimization}\tag{2}.$$

In case of the fitting problem, $$\boldsymbol{r}(\boldsymbol{p})$$ is usually called the
(weighted) residual vector, where

$$
\boldsymbol{r}(\boldsymbol{p}) = \boldsymbol{W} (\boldsymbol{y} - \boldsymbol{f}(\boldsymbol{p})), \label{residual-vector}\tag{3}
$$

but in general it can just be any vector valued function of $$\boldsymbol{p}$$.

For this article we are interested in statistical measures (such as estimated
variance) of the best fit parameters. We are further interested in providing
confidence bands of the best model. To understand how to calculate those, it
is useful to take a probabilistic approach to least squares fitting.

# A Bayesian Perspective on Least Squares

We'll now take a step back and quickly recap the fundamentals of least squares 
fitting from a Bayesian point of view. That will allow us to understand a couple of 
things about the probability densities involved in the process and derive
the desired properties. Crucially,
we will also understand what the weights are supposed to signify. First, let's
recap why we minimize the sum of squares in the first place.

To start, we assume that
for each index $$j$$, the data is normally distributed around the expected
value, which is given by the model $$f_j(\boldsymbol{p})$$. Thus, the
conditional probability of observing value $$y_j$$, given the parameters
$$\boldsymbol{p}$$ is:

$$P(y_j | \boldsymbol{p}) = \frac{1}{\sqrt{2\pi}\sigma_j}\exp\left( -\frac{1}{2}\frac{(y_j-f_j(\boldsymbol{p}))^2}{\sigma_j^2} \right).$$

Assuming [statistical independence](https://en.m.wikipedia.org/wiki/Independence_(probability_theory)) for the $$y_j$$,
we can write the probability of observing the vector $$\boldsymbol{y}$$ given $$\boldsymbol{p}$$
as

$$P(\boldsymbol{y}|\boldsymbol{p}) = \prod_j P(y_j|\boldsymbol{p}) \propto \exp(-\frac{1}{2}\lVert\boldsymbol{W}(\boldsymbol{y} - \boldsymbol{f}(\boldsymbol{p}))\rVert_2^2)=\exp(-\frac{1}{2}\lVert \boldsymbol{r}(\boldsymbol{p})\rVert_2^2), \label{likelihood}\tag{4}$$

with $$\boldsymbol{r}(\boldsymbol{p})$$ as in eq. $$\eqref{residual-vector}$$, provided that we choose the weights as

$$\boldsymbol{W} = \text{diag}(1/\sigma_1, \dots, 1/\sigma_{N_y}), \label{bayes-weights}\tag{5}$$

where $$\sigma_j$$ is the standard deviation of data point $$y_j$$. Thus, the
weights must contain at least an estimate of the standard deviation of the
data at index $$j$$ for the arguments to work. If we just put arbitrary
numbers in there, the logic is not sound. Note that this implies that
unweighted least squares can also not be justified by this approach, unless the
variances of all data points are $$1$$, which is unlikely. But there is a way
we can salvage this important case. I'll get to it later,
let's return to the calculations for now.

From a Bayesian point of view, we are interested in the posterior distribution that describes
the probability density of $$\boldsymbol{p}$$ given our observations $$\boldsymbol{y}$$,
which is related to the likelihood $$\eqref{likelihood}$$ via Bayes' Theorem:

$$P(\boldsymbol{p}|\boldsymbol{y}) = \frac{P(\boldsymbol{y}|\boldsymbol{p})\cdot P(\boldsymbol{p})}{P(\boldsymbol{y})}.$$

Now we assume a uniform prior[^uniform-prior] distribution $$P(\boldsymbol{p})=\text{const}$$, which let's us write the
posterior probability as the proportionality:

$$P(\boldsymbol{p}|\boldsymbol{y}) \propto P(\boldsymbol{y}|\boldsymbol{p}), \label{posterior}\tag{6}$$

keeping in mind that the _marginal probability_ $$P(\boldsymbol{y})$$ does not depend on the parameter
$$\boldsymbol{p}$$ and will thus only act as a scaling factor. Now it's trivial[^log-likelihood]
to show that maximizing the posterior probability with respect to $$\boldsymbol{p}$$
is equivalent to the minimization $$\eqref{lsqr-fitting}$$, provided we choose
the weigths as in $$\eqref{bayes-weights}$$. That means least squares fitting arises 
as maximum likelihood estimation with uniform priors from a Bayesian perspective.
Now let's understand what that implies for the shape of the posterior probability.

# The Covariance Matrix for the Best Fit Parameters

We will now derive an approximation for the covariance matrix $$\boldsymbol{C}_{p^\dagger}$$
of the best fit parameters. This matrix is of interest e.g. because on the diagonal 
it contains the variances of the elements of the parameter vector. If we know
those, we can give estimates of probable ranges for the parameters. We can
also use the covariance matrix to calculate [correlations](https://en.wikipedia.org/wiki/Correlation#Correlation_matrices)
between the parameters. Let's start by examining the posterior probability
for the parameters.

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

$$P(\boldsymbol{p}|\boldsymbol{y}) \approx K \cdot \exp\left(-\frac{1}{2} (\boldsymbol{p}-\boldsymbol{p}^\dagger)^T\, \boldsymbol{H}_g(\boldsymbol{p}^\dagger) (\boldsymbol{p}-\boldsymbol{p}^\dagger), \label{posterior-p-approximation}\tag{8}\right)$$

where $$K\in\mathbb{R}$$ is a constant of integration that also absorbs the constant
first term in $$\eqref{taylor-approx-g}$$. It acts as the normalization. This
turns out to be the a [multivariate Gaussian distribution](https://en.wikipedia.org/wiki/Multivariate_normal_distribution)
with expected value $$\boldsymbol{p}^\dagger$$ and covariance matrix $$\boldsymbol{H}_g^{-1}(\boldsymbol{p}^\dagger)$$.

In least squares fitting, the Hessian of $$g$$ is often approximated[^approximate-hessian]
as

$$\boldsymbol{H}_g(\boldsymbol{p}) \approx \boldsymbol{J}_r(\boldsymbol{p})^T \boldsymbol{J}_r(\boldsymbol{p}),$$

where $$\boldsymbol{J}_r(\boldsymbol{p})$$ is the Jacobian Matrix of $$\boldsymbol{r}(\boldsymbol{p})$$.
Often the Jacobian is only denoted by a simple $$\boldsymbol{J}$$, but for this post we'll
encounter many Jacobians that we have to distinguish. Thus, it pays to be more explicit
with the notation here. For now, this approximation allows us to write the
covariance matrix $$\boldsymbol{C}_{p^\dagger}$$ of the best fit parameters $$\boldsymbol{p}^\dagger$$ as

$$\boldsymbol{C}_{p^\dagger} = \boldsymbol{H}_g(\boldsymbol{p}^\dagger) \approx \left( \boldsymbol{J}_r^T (\boldsymbol{p}^\dagger) \boldsymbol{J}_r(\boldsymbol{p}^\dagger)\right)^{-1} = ((\boldsymbol{W}\boldsymbol{J}_f(\boldsymbol{p}^\dagger))^T \, \boldsymbol{W}\boldsymbol{J}_f(\boldsymbol{p}^\dagger))^{-1}, \label{covariance-matrix} \tag{9}$$

where $$\boldsymbol{J}_f$$ is the Jacobian of $$\boldsymbol{f}(\boldsymbol{p})$$
and thus $$\boldsymbol{J}_r = \boldsymbol{W}\boldsymbol{J}_f$$. 

Note that this is the covariance for _weighted least squares_, where the weights
must be related to the standard deviations of the data points as specified above.

## Unweighted Least Squares

Since the formula above is derived for weighted least squares with the weights
given as in $$\eqref{bayes-weights}$$, how do we make it work for the unweighted case?
We cannot simply set $$\boldsymbol{W}= \boldsymbol{I}$$, because that would mean
the standard deviations of all our data are specified as the value $$1$$, which 
is usually nonsensical. To make sense from a Bayesian perspective,
we have to specify a meaningful standard deviation.

To salvage this, we can assume that the standard deviations for all data points
are the same $$\sigma_j=\sigma$$, which means that the weights are

$$\boldsymbol{W} = \frac{1}{\sigma}\boldsymbol{I}. \label{equal-weights}\tag{10}$$

Now if we use this in $$\eqref{covariance-matrix}$$ this comes out to

$$\boldsymbol{C}_{p^\dagger} \approx \sigma^2(\boldsymbol{J}_f^T (\boldsymbol{p}^\dagger)\, \boldsymbol{J}_f(\boldsymbol{p}^\dagger))^{-1}, \label{covariance-matrix-unweighted} \tag{11},$$

and [we can estimate](https://www.gnu.org/software/gsl/doc/html/nls.html#covariance-matrix-of-best-fit-parameters)
the $$\sigma^2$$ as the variance of the residuals around the best fit

$$\sigma^2 = \frac{\lVert \boldsymbol{y}-\boldsymbol{f}(\boldsymbol{p}^\dagger)\rVert_2^2}{N_y-N_p} = \frac{\lVert\boldsymbol{r}(\boldsymbol{p}^\dagger)\rVert^2}{N_y-N_p}. \label{sigma-unweighted}\tag{12}$$

Although the formula $$\eqref{covariance-matrix-unweighted}$$ is sometimes
used universally, it is only applicable for _unweighted_ least squares fitting.
Unweighted least squares, from a Bayesian perspective, means we assign equal
standard deviations to all data points and we use an estimate for the standard
deviations. There is no such thing as not using standard deviations. If we use
weighted least squares where we _explicitly_ provide the standard deviations,
we cannot use $$\eqref{covariance-matrix-unweighted}$$, but we must instead
use $$\eqref{covariance-matrix}$$. This is also explained in the 
[corresponding docs](https://www.gnu.org/software/gsl/doc/html/nls.html#covariance-matrix-of-best-fit-parameters)
in the GNU Scientific Library[^gsl-weights].

# Confidence Bands

Let's take a step back and look at what we have done above: we have related
how the uncertainties in $$\boldsymbol{y}$$ [propagate to the uncertainties](https://en.wikipedia.org/wiki/Propagation_of_uncertainty)
in $$\boldsymbol{p}^\dagger$$. The covariance matrix now allows us to give confidence intervals of the
parameters via their standard deviations. Now we will do the same thing again,  
which is learn what the uncertainties in $$\boldsymbol{p}^\dagger$$ tell
us about the uncertainties of the best-fit solution $$\boldsymbol{f}(\boldsymbol{p})$$.
The information we are most interested in, are the standard deviations for each
element $$f_j$$. If we know those, we can give intervals around each $$f_j$$, which
together make up the confidence band around the best fit solution.

We treat $$\boldsymbol{z}=\boldsymbol{f}(\boldsymbol{p})$$ as a new variable
and we are interested in the probability distribution of $$\boldsymbol{z}$$,
which we can obtain from the posterior probability distribution of $$\boldsymbol{p}$$
by performing a [change of variables](https://en.wikipedia.org/wiki/Probability_density_function#Function_of_random_variables_and_change_of_variables_in_the_probability_density_function),
where I am following the notation of Sivia and Skilling (Sivia06):

$$
P(\boldsymbol{z}|\boldsymbol{y}) = P(\boldsymbol{p}=\boldsymbol{f}^{-1}(\boldsymbol{z})|\boldsymbol{y})\cdot \left| \frac{d\boldsymbol p}{d \boldsymbol{z}} \right| \label{change-of-var}\tag{13},
$$

where the factor on the right hand side is the determinant of the Jacobian of $$\boldsymbol{p}$$
with respect to $$z$$. To get a grip on this expression we approximate $$\boldsymbol{y}$$
around the best fit parameters by a first order Taylor series:

$$\boldsymbol{z} = \boldsymbol{f}(\boldsymbol{p}) \approx \boldsymbol{f}(\boldsymbol{p}^\dagger) + \boldsymbol{J}_f(\boldsymbol{p}^\dagger)\,(\boldsymbol{p}-\boldsymbol{p}^\dagger),$$

where $$\boldsymbol{J}_f(\boldsymbol{p}^\dagger)$$ is the Jacobian of $$\boldsymbol{f}(\boldsymbol{p})$$
evaluated at $$\boldsymbol{p}^\dagger$$. Note, that there is nothing about $$\boldsymbol{p}^\dagger$$
that would make this approximation particularly well-suited, in contrast to
the approximation in eq. $$\eqref{taylor-approx-g}$$.
We just use it because it is analytically convenient. This allows us to write

$$ \boldsymbol{p} = \boldsymbol{f}^{-1}(\boldsymbol{z}) \approx \boldsymbol{J}_f^{-1}(\boldsymbol{p}^\dagger) (\boldsymbol{z}-\boldsymbol{f}(\boldsymbol{p}^\dagger))+\boldsymbol{p}^\dagger$$

If we go ahead and plug
this approximation and eq. $$\eqref{posterior-p-approximation}$$ into eq. $$\eqref{change-of-var}$$, the determinant becomes
a constant and we can write:

$$\begin{eqnarray}
P(\boldsymbol{z}|\boldsymbol{y}) &\approx& K'\cdot \exp\left(-\frac{1}{2} (\boldsymbol{J_f}^{-1}(\boldsymbol{p}^\dagger)(\boldsymbol{z}-\boldsymbol{f}(\boldsymbol{p}^\dagger)))^T\, \boldsymbol{H}_g(\boldsymbol{p}^\dagger) (\boldsymbol{J_f}^{-1}(\boldsymbol{p}^\dagger)(\boldsymbol{z}-\boldsymbol{f}(\boldsymbol{p}^\dagger))) \right) \\
  &=&  K'\cdot \exp\left(-\frac{1}{2} (\boldsymbol{z}-\boldsymbol{f}(\boldsymbol{p}^\dagger))^T\, (\boldsymbol{J_f}^T)^{-1}(\boldsymbol{p}^\dagger)\boldsymbol{H}_g(\boldsymbol{p}^\dagger) \boldsymbol{J_f}^{-1}(\boldsymbol{p}^\dagger)(\boldsymbol{z}-\boldsymbol{f}(\boldsymbol{p}^\dagger)) \right) \\
  &=&  K'\cdot \exp\left(-\frac{1}{2} (\boldsymbol{z}-\boldsymbol{f}(\boldsymbol{p}^\dagger))^T\, (\boldsymbol{J_f}^T)^{-1}(\boldsymbol{p}^\dagger) \boldsymbol{C}_{p^\dagger}^{-1} \boldsymbol{J_f}^{-1}(\boldsymbol{p}^\dagger)(\boldsymbol{z}-\boldsymbol{f}(\boldsymbol{p}^\dagger)) \right) \\
  &=&  K'\cdot \exp\left(-\frac{1}{2} (\boldsymbol{z}-\boldsymbol{f}(\boldsymbol{p}^\dagger))^T\, (\boldsymbol{J_f}(\boldsymbol{p}^\dagger) \boldsymbol{C}_{p^\dagger} \boldsymbol{J_f}^{T}(\boldsymbol{p}^\dagger))^{-1} (\boldsymbol{z}-\boldsymbol{f}(\boldsymbol{p}^\dagger)) \right) \\
  &=&  K'\cdot \exp\left(-\frac{1}{2} (\boldsymbol{z}-\boldsymbol{f}(\boldsymbol{p}^\dagger))^T\, \boldsymbol{C}_f^{-1} (\boldsymbol{z}-\boldsymbol{f}(\boldsymbol{p}^\dagger)) \right) ,
\end{eqnarray}$$

where we have absorbed all constant factors into $$K'$$. We can see that this is
again a [multivariate normal](https://en.wikipedia.org/wiki/Multivariate_normal_distribution)
with a covariance matrix of $$\boldsymbol{C}_f$$. That means that we can calculate
the covariance of the model values at the best fit parameters under this approximation
as:

$$\boldsymbol{C}_f = \boldsymbol{J_f}(\boldsymbol{p}^\dagger) \boldsymbol{C}_{p^\dagger} \boldsymbol{J_f}^{T}(\boldsymbol{p}^\dagger) \label{cov-f}\tag{14}.$$

In essence, we have derived the law of [Propagation of Uncertainty](https://en.wikipedia.org/wiki/Propagation_of_uncertainty),
for our special case. The well-known formula for propagation of uncertainty
is also derived under the approximation of linearity of the transformation.

## From Covariance Matrix to Confidence Bands




# References
(Sivia06) D Sivia & J Skilling: Data Analysis - A Bayesian Tutorial, Oxford University Press, 2nd ed, 2006

# Endnotes
[^a-posteriori]: Maximizing the likelihood is the equivalent to maximizing the posterior probability, given uniform priors.
[^uniform-prior]: Some problems arise when thinking in depth about the meaning of uniform priors. Those don't have a lot of practical importance, but are interesting nonetheless. They are discussed e.g. in Sivia's brilliant [Data Analysis - A Bayesian Tutorial](https://global.oup.com/academic/product/data-analysis-9780198568322https://global.oup.com/academic/product/data-analysis-9780198568322).
[^approximate-hessian]: See e.g. Nocedal & Wright _Numerical Optimization_, 2nd edition or [this nice thesis](https://kops.uni-konstanz.de/entities/publication/9197ed25-a358-4fd9-943f-1897414eb6df) by Marius Kaltenbach.
[^log-likelihood]: Maximizing the posterior is the same as minimizing the negative logarithm of the posterior $$L(p)=-\log\,P(p\vert y)$$, which leads us again to the least squares minimization expression at the start of the article.
[^gsl-weights]: Note that they use a slightly different definition for the weight matrix. The meaning is equivalent, but they don't square the weight matrix with the residual, so that it appears differently in the formulae.
