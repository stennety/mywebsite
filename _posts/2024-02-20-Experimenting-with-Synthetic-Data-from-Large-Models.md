---
layout: post
title: Hacking on Learning directly from Large Models 
excerpt: This is surprisingly quick, and speed of experimentation is magical. A practical look at our hackathon project.
---

At Captur, we get asked questions like "how well can your phone detect that you're wearing a helmet" - a lot. As an AI Product manager, I can struggle with quick & confident answers for technical risk: how quickly can we build a production-quality model? Related data on how we've done related in work parking safety only helps so much (1)

I’m a huge fan of learning-by-doing, and especially early releases of models (2). There can be a huge blocker though, as getting representative data is hard, with genuine concerns about data privacy and a long tail of user behaviour.

We can address feasability and technical risk with synthetic data (3). In this post, I'll share our learnings trying to achieve this  based on the key paper "Learning Vision from Models Rivals Learning Vision from Data" (4). 

The powerful insight is that we can 

- generate ground truth prompts for diffusion models like Stable Diffusion, 
- use those generated images to train a new model, 
and achieve state-of-the-art results.

Here's the practical write-up of a January hackathon project, led by Isao from Captur ML Ops.

### 1. Synthetic? Will it even work?
Isao and I were pretty confident this would work. I always refer back to "Fake It Till You Make It", the aptly named Microsoft paper (5). 

![Fake It Till You Make It dataset illustration](/images/synthetic-data-fake-it-till-you-make-it-dataset.png)
_Fake It Till You Make It dataset sample, showing uncanny training data of human faces_

We did consider synthetic data from a games engine, or using public datasets like COCO. We focused on prompt -> stable diffusion, on the basis that it would be quick to test, and work at scale. 

### 2. Defining the Problem 
When we look at a compliance problem at Captur, we analyse the guidance policy. What is being shared with the users to educate them on the correct behaviour? We then break it down into the key scenarios we’re looking for, and the level of risk. To be clear, our focus isn't legal enforcement; we care about encouraging responsible & safe behaviours. 

For a new problem, in the context of a hackathon, we used LLMs to generate the policy itself. What scenarios should we look for? What real-world factors should we take into account? 

For the scope of the test, we decided that we would keep the model simple (helmet vs no helmet), ignoring whether it was securely fastened. 

We wanted to lean into the strength of synthetic data to generate diverse images of people and conditions. This is typically both hardest to do, and most impactful to end-users on the ground.


### 3. Generating Prompts
The original paper used Llama 2 to create prompts directly. This makes sense when trying to generate millions of images, to detect thousands of different objects and relationships between them. 

![Learning from Models figure 3 - Generating Prompts](/images/synthetic-data-learning-from-models-fig3.png)

Since we had a much more narrow scope, we were able to pick a single relationship (rider, helmet) and write a script with a simple template where we varied their context for skin color, light conditions, accessories and background images (e.g. ‘a dark skinned older woman in a coat at night’). 

Fast is better than perfect - with only a little python, and half a dozen variables we had hundreds of thousands of prompts to choose from!

### 4. Generating Images
Here, we hemmed pretty close to the paper recommendations, with only small changes to make sure the image dimensions defaulted to portrait selfie. 

![Generated images examples](/images/synthetic-data-generated-images-examples.png)

A really interesting finding here is that model-generated images can be wrong, or very far out-of-sample compared to real life.  

In the original Learning from Models data, we saw "mislabels" e.g. `electric locomotive` prompt led to what seems like images of steam locos. Give our dataset size, it’s really important to have clean labels. 

As the authors called out, we can get even better results with even more targeted / curated approaches.

### 5. Model Training & Evaluation
One of our product tenets at Captur is rapid iteration, and it was really gratifying to see this made possible in our new pipelines. 

Getting results within the span of our one-day hackathon was great! Simple tests we threw at it worked well, and in head-to-head matchup with the COCO experiment both survived basic tyre-kicking.

![Generated images examples](/images/synthetic-data-gossamer-condor.png)

On the other hand, I felt a very real frustration that some of our best tools to evaluate model performance are still in progress. 

### 6. Findings and Conclusions
There are some interesting next steps
- Generated images can be wrong, which might be especially bad where these are ambiguous.
- As we productionise, we will be gathering better data about model performance (maybe a part 2 of this post?)

Regardless, we’re pretty excited about how synthetic data can boost performance for a new use-case, or a new detection scenario!

--

(1) Captur has been working on safe parking, and we're used to thinking about similar scenarios like seated scooters, new geographies, etc. See more here:
https://www.captur.ai/#how-captur-works

(2) I made a whole hour presentation on Zero-to-One in AI Product, available here:
https://carolus4.github.io/Zero-to-One-for-AI-Product/.

(3) This Hugging Face post has a lot more interesting detail on the wider trends in synthetic data: https://huggingface.co/blog/synthetic-data-save-costs

(4) Y. Tian, L. Fan, K. Chen, D. Katabi, D. Krishnan, and P. Isola, "Learning Vision from Models Rivals Learning Vision from Data," arXiv, 2312.17742. [Online]. Available: [https://doi.org/10.48550/arXiv.2312.17742](https://doi.org/10.48550/arXiv.2312.17742).

(5) E. Wood, T. Baltrušaitis, C. Hewitt, S. Dziadzio, M. Johnson, V. Estellers, T. J. Cashman, and J. Shotton, "Fake It Till You Make It: Face analysis in the wild using synthetic data alone," in ICCV, 2021. [Online]. Available: [https://doi.org/10.48550/arXiv.2109.15102](https://doi.org/10.48550/arXiv.2109.15102)


#### Image Credits
Casting innovative aerospace design case studies in the parameter analysis framework to uncover the design process of experts - Scientific Figure on ResearchGate. Available from: [https://www.researchgate.net/figure/The-structure-of-the-Gossamer-Condor-Copyright-Don-Monroe_fig3_296484546](https://www.researchgate.net/figure/The-structure-of-the-Gossamer-Condor-Copyright-Don-Monroe_fig3_296484546) [accessed 20 Feb, 2024]