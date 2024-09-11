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

In this article, I explore how to efficiently calculate the covariance matrix
of the best fit parameters for global fitting problems that use the
variable projection algorithm. It's a very niche topic, but I do need it for
my open source library so I might as well write it down.

# VarPro Minimization: Recap

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

# Jacobian of the Residuals

The first step in calculating the covariance matrix is to calculate the Jacobian
matrix $$\boldsymbol{J}_{r_w}$$ of the weighted residuals. First, we express it
in terms of the Jacobian matrix $$\boldsymbol{J}_{f}$$ of $$\boldsymbol{f}$$:

$$\boldsymbol{J}_{r_w}(\boldsymbol{p}) := \frac{\partial \boldsymbol{r}_w}{\partial \boldsymbol{p}} (\boldsymbol{p})= -\widetilde{\boldsymbol{W}}\boldsymbol{J}_{f}(\boldsymbol{p})\in \mathbb{R}^{(N_s\cdot N_y) \times N_p},$$

where 

$$N_p:=(N_s\cdot N_c+N_\alpha)$$ 

is the total number of parameters. We can write $$\boldsymbol{J}_f$$ as

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
\end{matrix}\right] \tag{xx}\label{jac-f}
$$

TODO!!!!

$$
\boldsymbol{J}_{r_w}(\boldsymbol{p}) = - \widetilde{\boldsymbol{W}} \boldsymbol{J}_{f}(\boldsymbol{p}) =
-\left[\begin{matrix}
\boldsymbol{W}\boldsymbol{\Phi}(\boldsymbol{\alpha}) & & &\boldsymbol{W} \boldsymbol{B}_1(\boldsymbol{\alpha})  \\
 & \ddots & &  \vdots \\
 & &\boldsymbol{W} \boldsymbol{\Phi}(\boldsymbol{\alpha}) &\boldsymbol{W} \boldsymbol{B}_{N_s}(\boldsymbol{\alpha}) 
\end{matrix}\right] \tag{xx}\label{jac-rw}
$$

# The Covariance Matrix of the Best Fit Parameters

> *Remark on Notation*
> 
> From now on, we'll see a couple of long-ish expressions involving parametrized
> matrices. I'll omit the parameters in the matrices inside the expression
> and just stick them in once at the end. So instead of $$\boldsymbol{X}(\boldsymbol{p})\boldsymbol{Y}(\boldsymbol{p})$$,
> I'll just write $$\boldsymbol{X}\boldsymbol{Y}(\boldsymbol{p})$$. I'll also
> do this for more complicated expressions.


For the following calculations, it's helpful to rewrite eq. $$\eqref{jac-rw}$$ by introducing the
block diagonal matrix $$\boldsymbol{A}(\boldsymbol{\alpha})$$ and the block
matrix $$\boldsymbol{B}(\boldsymbol{\alpha})$$ such that

$$\begin{eqnarray}
\boldsymbol{J}_{r_w}(\boldsymbol{p}) &=& -\left[ 
\begin{matrix}
\boldsymbol{A}(\boldsymbol{\alpha}) & \boldsymbol{B}(\boldsymbol{\alpha})
\end{matrix}
 \right],  \tag{xx} \label{jac-rw-ab} \\
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
\end{matrix}\right]. \tag{xx}\label{def-ab}
\end{eqnarray}$$

From my article on [Bayesian Nonlinear Least Squares](/blog/2024/bayesian-nonlinear-least-squares/),
we know that we can write the covariance matrix $$\boldsymbol{C}_{p^\dagger}$$ of
the best fit parameters $$\boldsymbol{p}$$ as 

$$
\boldsymbol{C}_{p^\dagger} = \hat{\sigma} \left(\boldsymbol{J}^T_{r_w} \boldsymbol{J}_{r_w}(\boldsymbol{p}^\dagger) \right)^{-1} \in \mathbb{R}^{N_p \times N_p} \label{cov-jrw}\tag{xx},
$$

where $$\hat{\sigma}$$ is a scalar that depends on our prior assumptions. Let's
find an expression for this step by step, starting with the matrix product
$$\boldsymbol{J}^T_{r_w} \boldsymbol{J}_{r_w}$$. 


$$\begin{eqnarray}
\boldsymbol{J}^T_{r_w} \boldsymbol{J}_{r_w}(\boldsymbol{p}^\dagger) &=&
\left[
\begin{matrix}
\boldsymbol{A}^T \boldsymbol{A}(\boldsymbol{\alpha}^\dagger) & \boldsymbol{A}^T \boldsymbol{B}(\boldsymbol{\alpha}^\dagger) \\
\boldsymbol{B}^T \boldsymbol{A}(\boldsymbol{\alpha}^\dagger) & \boldsymbol{B}^T \boldsymbol{B}(\boldsymbol{\alpha}^\dagger) \\
\end{matrix}
\right] \label{jtj-ab} \tag{xx} \\
\\
&=&
\left[
\begin{matrix}
(\boldsymbol{W}\boldsymbol{\Phi})^T \boldsymbol{W}\boldsymbol{\Phi}(\boldsymbol{\alpha}^\dagger)  & & & (\boldsymbol{W}\boldsymbol{\Phi})^T W\boldsymbol{B}_1(\boldsymbol{\alpha}^\dagger) \\
&\ddots  & & \vdots \\
& & (\boldsymbol{W}\boldsymbol{\Phi})^T \boldsymbol{W}\boldsymbol{\Phi}(\boldsymbol{\alpha}^\dagger)   & (\boldsymbol{W}\boldsymbol{\Phi})^T W\boldsymbol{B}_{N_s}(\boldsymbol{\alpha}^\dagger) \\
(W\boldsymbol{B}_1)^T \boldsymbol{W}\boldsymbol{\Phi}(\boldsymbol{\alpha}^\dagger)  & \dots & (W\boldsymbol{B}_{N_s})^T \boldsymbol{W}\boldsymbol{\Phi}(\boldsymbol{\alpha}^\dagger) & \sum_{k=1}^{N_s}(W\boldsymbol{B}_{k})^T W\boldsymbol{B}_{k}(\boldsymbol{\alpha}^\dagger) \\
\end{matrix} \label{jtj-full} \tag{xx}
\right] 
\end{eqnarray}$$

We could invert eq. $$\eqref{jtj-full}$$ directly to get to the covariance matrix
in eq. $$\eqref{cp-jrw}$$. But keep in mind that it's an $$N_p \times N_p$$ matrix,
where $$N_p = N_s \cdot N_c + N_\alpha$$.
so it's probably okay if we have a small amount of right hand sides and 
linear coefficients. If, however, the number of linear coefficients $$N_c$$
gets large-ish, say $$\mathcal{O}(10)$$, and / or the number of right hand sides $$N_s$$ gets huge, 
say $$\mathcal{O}(10^5)$$, then this matrix quickly reaches billions or even
trillions of elements. That's why it makes sense to exploit the special structure
of the matrix a bit more to help calculate its inverse.

Since $$\boldsymbol{J}^T_{r_w} \boldsymbol{J}_{r_w}$$ is a $$2 \times 2$$ block
diagonal matrix, we can use it's [Schur complement](https://en.wikipedia.org/wiki/Schur_complement#Properties)
to help us express the inverse. It's Schur complement with respect to it's upper
left block is defined as:

$$
\boldsymbol{S}(\boldsymbol{\alpha}) := \boldsymbol{B}^T \boldsymbol{B}(\boldsymbol{\alpha}^\dagger) -\boldsymbol{B}^T \boldsymbol{A}  (\boldsymbol{A}^T \boldsymbol{A})^{-1}\boldsymbol{A}^T \boldsymbol{B}(\boldsymbol{\alpha}^\dagger) \in \mathbb{R}^{N_\alpha \times N_\alpha}. \label{schur}\tag{xx}
$$

where the inverse to $$(\boldsymbol{A}^T \boldsymbol{A})$$ must exist[^inverse]<sup>,</sup>[^existence]. Since
$$(\boldsymbol{A}^T \boldsymbol{A})$$ is a block diagonal matrix containing
$$(\boldsymbol{W \Phi})^T \boldsymbol{W \Phi} (\boldsymbol{\alpha}^\dagger)$$ 
on the diagonal, it's actually very simple to give it's inverse:

$$
(\boldsymbol{A}^T \boldsymbol{A})^{-1}(\boldsymbol{\alpha}) =
\left[\begin{matrix}
((\boldsymbol{W \Phi})^T \boldsymbol{W \Phi})^{-1} (\boldsymbol{\alpha}^\dagger)& &  \\
 & \ddots & \\
 & &((\boldsymbol{W \Phi})^T \boldsymbol{W \Phi})^{-1} (\boldsymbol{\alpha}^\dagger)
\end{matrix}\right]. \label{ata-inv} \tag{xx}
$$

For this expression, we only need to calculate the inverse of the relatively small matrix
$$(\boldsymbol{W \Phi})^T \boldsymbol{W \Phi} \in \mathbb{R}^{N_c \times N_c}$$,
which for a typical number of basefunctions only has tens or hundreds of elements,
rather than billions. This allows us to simplify the expression for the Schur
complement considerably. After a bit of calculating, we come up with:

$$
\boldsymbol{S}(\boldsymbol{\alpha}^\dagger) := \sum_{k=1}^{N_s}(W\boldsymbol{B}_{k})^T W\boldsymbol{B}_{k}(\boldsymbol{\alpha}^\dagger) + ((\boldsymbol{W \Phi})^T \boldsymbol{W B}_k)^T ((\boldsymbol{W \Phi})^T \boldsymbol{W \Phi})^{-1} (\boldsymbol{W \Phi})^T \boldsymbol{W B}_k)(\boldsymbol{\alpha}^\dagger). \label{schur-sum}\tag{xx}
$$

Well, it might not look like a simplification at first, but remember it's essentially a 
sum of pretty small $$N_\alpha \times N_\alpha$$ matrices. Also the inverse
of $$((\boldsymbol{W \Phi})^{-1}\boldsymbol{W \Phi})$$ does not change with $$k$$
and can be pre-calculated. Further, note that the matrix product on the right
hand side has the structure $$\boldsymbol{X}^T \boldsymbol{YX}$$. Note also that
for our case $$\boldsymbol{S}(\boldsymbol{\alpha}^\dagger)  = \boldsymbol{S}^T(\boldsymbol{\alpha}^\dagger)$$,
i.e. the Schur complement is symmetric.

Using its Schur complement, we can give an 
[expression for the inverse](https://en.wikipedia.org/wiki/Schur_complement#Properties)
of $$\boldsymbol{J}_{r_w}^T\boldsymbol{J}_{r_w}$$ in a block diagonal form:

$$
(\boldsymbol{J}_{r_w}^T\boldsymbol{J}_{r_w})^{-1}(\boldsymbol{p}^\dagger) =
\left[
\begin{matrix}
(\boldsymbol{A}^T \boldsymbol{A})^{-1}(\boldsymbol{\alpha}^\dagger) + \boldsymbol{G}\boldsymbol{S}^{-1}\boldsymbol{G^T}(\boldsymbol{\alpha}^\dagger) & -\boldsymbol{G S}^{-1}(\boldsymbol{\alpha}^\dagger) \\
- (\boldsymbol{G S}^{-1}(\boldsymbol{\alpha}^\dagger))^T & \boldsymbol{S}^{-1}(\boldsymbol{\alpha}^\dagger) \label{jtj-inv-schur} \tag{xx}\\
\end{matrix}
\right],
$$

where we have introduced the matrix $$\boldsymbol{G}$$ as

$$
\boldsymbol{G}(\boldsymbol{\alpha}^\dagger) 
=(\boldsymbol{A}^T \boldsymbol{A})^{-1} \boldsymbol{A}^T \boldsymbol{B} (\boldsymbol{\alpha}^\dagger)
=\left[
\begin{matrix}
((\boldsymbol{W \Phi})^T \boldsymbol{W \Phi})^{-1}(\boldsymbol{W \Phi})^T \boldsymbol{WB}_1(\boldsymbol{\alpha}^\dagger) \\
\vdots \\
((\boldsymbol{W \Phi})^T \boldsymbol{W \Phi})^{-1}(\boldsymbol{W \Phi})^T \boldsymbol{WB}_{N_s}(\boldsymbol{\alpha}^\dagger) \label{g-def}\tag{xx} \\
\end{matrix}
\right]
$$

The neat thing about calculating the inverse of $$\boldsymbol{J}_{r_w}^T\boldsymbol{J}_{r_w}$$
via eq. $$\eqref{jtj-inv-schur}$$ is, that we only have to calculate the inverse
of relatively small matrices: $$\boldsymbol{S}^{-1}$$ is pretty small and so is
$$((\boldsymbol{W \Phi})^T \boldsymbol{W \Phi})^{-1}$$, which we can use to build
the inverse of $$\boldsymbol{A}^T\boldsymbol{A}$$. This, in turn, gives us a
numerically efficient (and probably more stable) way of calculating the
covariance matrix using eq. $$\eqref{cov-jrw}$$.

# Endnotes
[^inverse]: One can see in the expressions below, that this inverse exists if $$\boldsymbol{W \Phi}(\boldsymbol{\alpha}^\dagger)$$ has linear independent columns. That means the base functions (at the best fit parameters) must be linearly independent, which should be the case for a correcly chosen set of basefunctions for VarPro.
[^existence]: Note that $$(\boldsymbol{A}^T\boldsymbol{A})^{-1}$$ existing is necessary but not sufficient for the existence of $$(\boldsymbol{J}_{r_w}^T\boldsymbol{J}_{r_w})^{-1}$$. We assume the latter also exists, because we need it to calculate the covariance matrix.
