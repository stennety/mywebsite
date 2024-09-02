---
layout: post
tags: least-squares algorithm varpro
#categories: []
date: 2024-08-18
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'The Jacobian for Variable Projection with Multiple Right Hand Sides'
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

!!!TODO INTRO


$$\begin{eqnarray}
\boldsymbol{C}_{p^\dagger} &=& \left(\boldsymbol{J}^T_{r_w}(\boldsymbol{p}^\dagger) \boldsymbol{J}_{r_w}(\boldsymbol{p}^\dagger) \right)^{-1} \label{cp-jrw}\tag{xx}\\
 &=& \left(\boldsymbol{J}^T_{r_w}(\boldsymbol{p}^\dagger) \boldsymbol{J}_{r_w}(\boldsymbol{p}^\dagger) \right)^{-1} \label{cp-jf}\tag{xx}\\
\end{eqnarray}$$

# VarPro Minimization: Recap and Rewrite

In the [previous article](/blog/2024/variable-projection-part-2-multiple-right-hand-sides/)
in our VarPro series on this blog, we saw that we can express Variable Projection
with multiple right hand side in a more matrix oriented approach or a more
vector oriented approach. Both approaches are equivalent, but this time it is 
the vector oriented approach that makes it a bit easier to tackle our problem.

TODO

I'll very briefly restate the problem of global fitting multiple right hand sides,
but if you haven't read the [previous article](/blog/2024/variable-projection-part-2-multiple-right-hand-sides/),
I highly suggest you do. Fitting multiple right hand sides, means we have
$$N_s$$ _vectors_ $$\boldsymbol{y}_1,\dots,\boldsymbol{y}_{N_s}\in \mathbb{R}^{N_y}$$, that we
want to fit with vector valued functions 
$$\boldsymbol{f}_1,\dots,\boldsymbol{f}_{N_s} \in \mathbb{R}^{N_y}$$,
respectively. Each function can be written in matrix form as a linear combination
of nonlinear functions like so:

$$\boldsymbol{f}_k(\boldsymbol{\alpha},\boldsymbol{c}_k) = \boldsymbol{\Phi}(\boldsymbol{\alpha})\, \boldsymbol{c}_k,$$

where $$\boldsymbol{\Phi}(\boldsymbol{\alpha}) \in \mathbb{R}^{N_y \times N_c}$$
is the matrix of the $$N_c$$ nonlinear basis functions and $$\boldsymbol{c}_k \in \mathbb{R}^{N_c}$$
are the *linear coefficients*, which can vary with $$j$$, and $$\boldsymbol{\alpha} \in \mathbb{R}^{N_\alpha}$$
are the *nonlinear parameters* of the problem, which are shared across all $$k$$.
This latter aspect is where the term _global fitting_ comes from. Now, let's
start writing the least squares fitting problem into vector form. We begin by
introducing a global parameter vector $$\boldsymbol{p}$$ bundling all the linear and
nonlinear parameters for the global fitting problem:

$$\boldsymbol{p}=\left[
\begin{matrix}
\boldsymbol{c}_1 \\
\vdots \\
\boldsymbol{c}_{N_s} \\
\boldsymbol{\alpha}
\end{matrix}
\right] \in \mathbb{R}^{N_s\cdot N_c + N_\alpha}
$$

Then, we write the weighted residual of the $$k$$-th dataset as

$$\boldsymbol{r}_{w,k}(\boldsymbol{p}) = \boldsymbol{W} (\boldsymbol{y}_n - \boldsymbol{f}_k(\boldsymbol{p})),$$

where the weight matrix $$\boldsymbol{W}\in \mathbb{R}^{N_y\times N_y}$$ is
shared across all $$k$$. Now we introduce two more concatenated vectors
for the dataset, for the function values, and for the weighted residuals,
respectively:

$$\boldsymbol{y}:=\left[
\begin{matrix}
\boldsymbol{y}_1 \\
\vdots \\
\boldsymbol{y}_{N_s} \\
\end{matrix}
\right] ,\;
\boldsymbol{f}(\boldsymbol{p}):=\left[
\begin{matrix}
\boldsymbol{f}_1 \\
\vdots \\
\boldsymbol{f}_{N_s} \\
\end{matrix}
\right] ,\;
\boldsymbol{r}_w(\boldsymbol{p}):=\left[
\begin{matrix}
\boldsymbol{r}_{w,1} \\
\vdots \\
\boldsymbol{r}_{w,N_s} \\
\end{matrix}
\right] \in \mathbb{R}^{N_s\cdot N_y}.
$$

Using these definitions, we can now write the residual vector as

$$
\boldsymbol{r}_w (\boldsymbol{p}) = \widetilde{\boldsymbol{W}} (\boldsymbol{y}-\boldsymbol{f}(\boldsymbol{p})),
$$

where $$\widetilde{\boldsymbol{W}}$$ is a block-diagonal matrix with the weights
$$\boldsymbol{W}$$ on the diagonal, like so:

$$
\widetilde{\boldsymbol{W}} :=\left[
\begin{matrix}
\boldsymbol{W} & & \\
 & \ddots \\
& & \boldsymbol{W} \\
\end{matrix}
\right] \in \mathbb{R}^{N_s\cdot N_y \times N_s \cdot N_y}.
$$

For our least squares minimization, we want to minimize the $$\ell_2$$ norm of 
$$\boldsymbol{r}_w(\boldsymbol{p})$$: 

$$
\boldsymbol{p}^\dagger = \arg \min_{\boldsymbol{p}} \Vert\boldsymbol{r}_w (\boldsymbol{p}) \Vert^2.
$$

The goal of this article is to give an expression for the covariance matrix of the best fit parameters
$$\boldsymbol{p}^\dagger$$. 

Before we jump into those
calculations, note that I mentioned in the previous article that this vector-oriented
approach is less benefitial _when implementing_ VarPro than a more matrix oriented approach
taken in said article. This is true from an implementation perspective, but mathematically
both lead to the same minimization problem. Thus, the following calculations will
be true regardless how the residuals are actually calculated.

# Calculating the Jacobian

The first step in calculating the covariance matrix is to calculate the Jacobian
matrix $$\boldsymbol{J}_{r_w}$$ of the weighted residuals. First, we express it
in terms of the Jacobian matrix $$\boldsymbol{J}_{f}$$ of $$\boldsymbol{f}$$:

$$\boldsymbol{J}_{r_w}(\boldsymbol{p}) := \frac{\partial \boldsymbol{r}_w}{\partial \boldsymbol{p}} (\boldsymbol{p})= -\widetilde{\boldsymbol{W}}\boldsymbol{J}_{f}(\boldsymbol{p}),$$

where we can write $$\boldsymbol{J}_f$$ as

$$
\boldsymbol{J}_f(\boldsymbol{p}) := 
\frac{\partial \boldsymbol{f}}{\partial \boldsymbol{p}}(\boldsymbol{p}) =
\left[
\begin{matrix}
\boldsymbol{J}_{f_1} (\boldsymbol{p})\\
\vdots \\
\boldsymbol{J}_{f_{N_s}} (\boldsymbol{p})\\
\end{matrix}
\right],
$$

where $$\boldsymbol{J}_{f_k}= \frac{\partial \boldsymbol{f}_k}{\partial \boldsymbol{p}}$$
is the Jacobian of $$\boldsymbol{f}_k$$. Since the parameter vector $$\boldsymbol{p}$$ is
written as in !!!TODO REFERENCE!!!, we can write the Jacobian of $$\boldsymbol{f}_k$$
as

$$
\boldsymbol{J}_{f_k} (\boldsymbol{p})= \frac{\partial \boldsymbol{f}_k}{\partial \boldsymbol{p}}(\boldsymbol{p}) =
\left[\begin{matrix}
\frac{\partial \boldsymbol{f}_k}{\partial \boldsymbol{c_1}} (\boldsymbol{p})& \dots & \frac{\partial \boldsymbol{f}_k}{\partial \boldsymbol{c_k}} (\boldsymbol{p})& \dots & \frac{\partial \boldsymbol{f}_k}{\partial \boldsymbol{c_{N_s}}} (\boldsymbol{p})& \frac{\partial \boldsymbol{f}_k}{\partial \boldsymbol{\alpha}}(\boldsymbol{p})\\
\end{matrix}\right].
$$

There are two pieces to this expression that we need to look at separately. 
Firstly, there is $$\frac{\partial \boldsymbol{f}_k}{\partial \boldsymbol{c_j}}$$,
which we simplify to

$$\frac{\partial \boldsymbol{f}_k}{\partial \boldsymbol{c_j}}(\boldsymbol{p}) =
\left\{
\begin{matrix}
\boldsymbol{\Phi}(\boldsymbol{\alpha}) & ,\; j = k \\
\boldsymbol{0}_{N_y \times N_c} & ,\; j \ne k .\\
\end{matrix}
\right.$$

Next, there is the expression $$\frac{\partial \boldsymbol{f}_k}{\partial \boldsymbol{\alpha}}$$.
There is a way to write this expression in tensor form, but keeping it in matrix
notation comes easier to me. So let's do that and call it $$\boldsymbol{B}_k$$.

$$
\boldsymbol{B}_k (\boldsymbol{\alpha})
:= \frac{\partial \boldsymbol{f}_k}{\partial \boldsymbol{\alpha}} (\boldsymbol{\alpha})
= \left[
\begin{matrix}
\frac{\partial \boldsymbol{\Phi}(\boldsymbol{\alpha})}{\partial \alpha_1} \boldsymbol{c}_k & \dots &
\frac{\partial \boldsymbol{\Phi}(\boldsymbol{\alpha})}{\partial \alpha_{N_\alpha}} \boldsymbol{c}_k
\end{matrix}
\right]
\in \mathbb{R}^{N_y \times N_\alpha}
$$

TODO !!!! TEXT

$$
\frac{\partial \boldsymbol{f}_k}{\partial \boldsymbol{p}}(\boldsymbol{p}) =
\left[\begin{matrix}
\underbrace{\boldsymbol{0}_{N_y \times N_c}}_{\text{block } 1} & \dots & \boldsymbol{0}_{N_y \times N_c} 
& \underbrace{\boldsymbol{\Phi}(\boldsymbol{\alpha})}_{\text{block } k} &
\boldsymbol{0}_{N_y \times N_c} & \dots & \underbrace{\boldsymbol{0}_{N_y \times N_c}}_{\text{block } N_s}& 
\underbrace{\boldsymbol{B}_k(\boldsymbol{\alpha})}_{\text{block } N_s+1} 
\end{matrix}\right].
$$

TODO

$$
\boldsymbol{J}_f(\boldsymbol{p}) = \frac{\partial \boldsymbol{f}}{\partial \boldsymbol{p}}(\boldsymbol{p}) =
\left[\begin{matrix}
\underbrace{
\begin{matrix}
\boldsymbol{\Phi}(\boldsymbol{\alpha}) & &  \\
 & \ddots & & \\
 & & \boldsymbol{\Phi}(\boldsymbol{\alpha}) \\
\end{matrix}
}_{N_s \times N_s \text{ blocks}}
&
\begin{matrix}
\boldsymbol{B}_1(\boldsymbol{\alpha}) \\
\vdots \\
\boldsymbol{B}_{N_s}(\boldsymbol{\alpha}) \\
\end{matrix}
\end{matrix}\right] 
$$

TODO!!!!

$$
\boldsymbol{J}_{r_w}(\boldsymbol{p}) = \widetilde{\boldsymbol{W}} \boldsymbol{J}_{f}(\boldsymbol{p}) =
\left[\begin{matrix}
\boldsymbol{W}\boldsymbol{\Phi}(\boldsymbol{\alpha}) & & &\boldsymbol{W} \boldsymbol{B}_1(\boldsymbol{\alpha})  \\
 & \ddots & &  \vdots \\
 & &\boldsymbol{W} \boldsymbol{\Phi}(\boldsymbol{\alpha}) &\boldsymbol{W} \boldsymbol{B}_{N_s}(\boldsymbol{\alpha}) 
\end{matrix}\right]
$$

For downstream calculations, it's helpful to rewrite this expression by introducing the
block diagonal matrix $$\boldsymbol{A}(\boldsymbol{\alpha})$$ and the block
matrix $$\boldsymbol{B}(\boldsymbol{\alpha})$$ as

$$\begin{eqnarray}
\boldsymbol{J}_{r_w}(\boldsymbol{p}) &=& \left[ 
\begin{matrix}
\boldsymbol{A}(\boldsymbol{\alpha}) & \boldsymbol{B}(\boldsymbol{\alpha})
\end{matrix}
 \right],  \\
\\
\boldsymbol{A}(\boldsymbol{\alpha}) &:=&
\left[\begin{matrix}
\boldsymbol{W}\boldsymbol{\Phi}(\boldsymbol{\alpha}) & &  \\
 & \ddots & \\
 & &\boldsymbol{W} \boldsymbol{\Phi}(\boldsymbol{\alpha}) 
\end{matrix}\right],\;
\boldsymbol{B}(\boldsymbol{\alpha}) :=
\left[\begin{matrix}
\boldsymbol{W} \boldsymbol{B}_1(\boldsymbol{\alpha})  \\
\vdots  \\
\boldsymbol{W} \boldsymbol{B}_{N_s}(\boldsymbol{\alpha}) 
\end{matrix}\right]
\end{eqnarray}$$
