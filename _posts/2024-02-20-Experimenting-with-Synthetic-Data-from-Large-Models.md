---
layout: post
title: Experimenting with Synthetic Data from Large Models 
excert: Learning from models is surprisingly quick, and speed of experimentation is magical.
---

How well can your phone detect that you are, in fact, wearing a helmet? This matters for [safety in shared micro-mobility](https://www.captur.ai/case-studies/micromobility-atom-mobility) (alongside parking compliance of course). 

At Captur, we get asked questions like this all the time. As an AI Product manager, I can struggle with quick & confident answers for technical risk - how quickly can we build a model to handle that? What factors should we consider? 

Typically, this is a process that requires getting representative data from the client, and doing user interviews to understand what the policy is today (without any AI or feedback).

I’m a huge fan of quickly learning-by-doing, and that applies to [early releases of models too](https://carolus4.github.io/Zero-to-One-for-AI-Product/). But what if we could answer the feasibility question empirically, and address value risk in the same step? 

[Learning Vision from Models Rivals Learning Vision from Data](https://arxiv.org/html/2312.17742v1) was the inspiration for a January hackathon experiment, led by Isao from Captur ML Ops. Here’s what we learned.

### 1. Synthetic? Will it even work?
Isao and I were pretty confident this would work. [Fake it till you make it](https://microsoft.github.io/FaceSynthetics/) and [Simulation city](https://waymo.com/blog/2021/07/simulation-city/) are great examples of kick-starting or augmenting training data with high-quality generated ground-truth. 

![Fake It Till You Make It dataset illustration](/images/synthetic-data-fake-it-till-you-make-it-dataset.png)

![Simulation city journey illustration](/images/synthetic-data-simulation-city-example.png)

We did discuss using Blender, or simpler augmentation through other generative techniques, but in the end creating a varied ground truth dataset at scale was too big an opportunity for us.

### 2. Defining the Problem 
When we look at a compliance problem at Captur, we analyse policy, and break it down into the key scenarios we’re looking for, and the level of risk. 

For a new problem, in the context of a hackathon, we used LLMs to generate the policy itself. What scenarios should we look for? What real-world factors should we take into account? 

For the scope of the test, we decided that we would keep the model simple (helmet vs no helmet), ignoring whether it was securely fastened. 

We wanted to lean into the strength of synthetic data to generate diverse images of people and conditions. This is typically both hardest to do, and most impactful to end-users on the ground.


### 3. Generating Prompts
The original paper used Llama 2 to create prompts directly. This makes sense when trying to generate millions of images, to detect thousands of different objects and relationships between them. 

![Learning from Models figure 3 - Generating Prompts](/images/synthetic-data-learning-from-models-fig3.png)

Since we had a much more narrow scope, we were able to pick a single relationship (rider, helmet) and use a template where we varied their context (e.g. ‘a dark skinned older woman’). 

Fast is better than perfect - with only a little python, and half a dozen variables we had hundreds of thousands of prompts to choose from!

### 4. Generating Images
Here, we hemmed pretty close to the paper recommendations, with only small changes to make sure the image dimensions defaulted to portrait selfie. 

![Generated images examples](/images/synthetic-data-generated-images-examples.png)

A really interesting finding here is that model-generated images can be wrong, or very far out-of-sample compared to real life.  In the original work, we saw "mislabels" e.g. `electric locomotive` prompt led to what seems like images of steam locos. Give our dataset size, it’s really important to have clean labels.

### 5. Model Training & Evaluation
One of our product tenets at Captur is rapid iteration, and it was really gratifying to see this made possible in our new pipelines. Getting results within the span of our one-day hackathon was great! 

![Generated images examples](/images/synthetic-data-gossamer-condor.png)

On the other hand, I felt a very real frustration that some of our best tools to evaluate model performance are in progress. I can’t wait for the next set of prototypes, where we quickly build and quickly measure what matters!

### 6. Findings and Conclusions
Initial tests are positive, and have led to some interesting conversations about this part of supporting rider safety. Regardless, we’re pretty excited about how synthetic data can boost performance for a new use-case, or a new detection scenario! 

## Next steps
Any ideas you’d like us to test out? Get in touch!

### Credits 
#### Papers referenced
Y. Tian, L. Fan, K. Chen, D. Katabi, D. Krishnan, and P. Isola, "Learning Vision from Models Rivals Learning Vision from Data," arXiv, 2312.17742. [Online]. Available: https://doi.org/10.48550/arXiv.2312.17742.


#### Image Credits
Casting innovative aerospace design case studies in the parameter analysis framework to uncover the design process of experts - Scientific Figure on ResearchGate. Available from: https://www.researchgate.net/figure/The-structure-of-the-Gossamer-Condor-Copyright-Don-Monroe_fig3_296484546 [accessed 20 Feb, 2024]