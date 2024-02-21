---
layout: post
title: Hacking on "Learning directly from Large Models"
excerpt: This is surprisingly quick, and speed of experimentation is magical. A practical look at our hackathon project.
---

At Captur, we get asked questions like "how well can your phone detect that you're wearing a helmet" - a lot (1). We don't have access to representative data, so it's hard to assess the key product risks.

I’m a huge fan of learning-by-doing, and especially early releases of models (2). The game-changer is that we can now use synthetic data from Generative AI solutions to get a large amount of high-quality training images, including a long tail of user behaviours (3). 

In this post, I'll share our learnings implementing the parts of the Google/MIT paper "Learning Vision from Models Rivals Learning Vision from Data" (4). 

Within the limited time of a hackathon, Isao (Ml Ops) and I (Product) showed we can:
- generate ground truth prompts for diffusion models like Stable Diffusion, 
- use those generated images to train a new model, 

and achieve state-of-the-art results.

### 1. Synthetic? Will it even work?
AI models have been using uncanny game character faces for a while (5). 

![Fake It Till You Make It dataset illustration](/images/synthetic-data-fake-it-till-you-make-it-dataset.png)

_Fake It Till You Make It dataset sample, showing mid-to-low realism in training data for human faces_

We considered alternative approaches to prototype a model for "wearing a helmet", including using a 3D engine, or public datasets like COCO. 

We opted for ground truth prompts -> stable diffusion, on the basis that it would be quick to test, and work at scale for the variety of characters and conditions that we would want to support.

### 2. Defining the Problem 
Setting scope relies on understanding user behaviour. What is the ideal behaviour? What does it look like when users are not being safe? What are the expected edge cases? 

For a new problem, in the context of a hackathon, we used LLMs to generate these scenarios, which gave us a good view of breadth on the problem. We made some trade-offs to get good results in testing:
- Focus on "Wearing helmet" / "Not wearing a helmet"
- Leave "Safely fastened" to future discovery
- Target a breadth of users and scenes
- Assume logic for exceptions, would be handled outside the AI model
- Assume the model would be built as part of a fault tolerant release (6)

This test scope addresses the most important attributes of a prototype to answer the initial questions about feasibility & value. It means we can release a test model to your phone that should feel 'good enough', and start gathering practical feedback.

### 3. Generating Prompts
The original paper used Llama 2 to create prompts for stable diffusion. This makes sense when trying to generate millions of images, to detect thousands of different objects and relationships between them. 

![Learning from Models figure 3 - Generating Prompts](/images/synthetic-data-learning-from-models-fig3.png)

Since we had a much more narrow scope, we were able to pick a single relationship (rider, helmet) and write a script with a simple template where we varied their context for skin color, light conditions, accessories and background images

> e.g. ‘A dark skinned older woman in a coat at night, photoreal’. 

Fast is better than perfect - with only a little python, and half a dozen variables we had hundreds of thousands of prompts to choose from!

### 4. Generating Images
Here, we hemmed pretty close to the paper recommendations, with only small changes to make sure the image dimensions defaulted to portrait selfie. 

![Generated images examples](/images/synthetic-data-generated-images-examples.png)

_Generated images from Stable Diffusion on our prompts_

A really interesting finding here is that model-generated images can be wrong, or very far out-of-sample compared to real life.  

In the original Learning from Models data, we saw "mislabels" e.g. `electric locomotive` prompt led to what seems like images of steam locos. Give our dataset size, it’s really important to have clean labels. 

![Mislabel examples](/images/synthetic-data-mislabel.png)
_An example mis-label from "Figure 4:Random examples of synthetic captions and images generated in our SynCLR pipeline" in Learning from Models_

As the authors called out, we can get even better results with even more targeted / curated approaches.

### 5. Model Training & Evaluation
One of our product tenets at Captur is rapid iteration, and it was really gratifying to see this made possible in our new pipelines. 

Getting results within the span of our one-day hackathon was great! Simple tests we threw at it worked well, and in head-to-head matchup with the COCO experiment both survived basic tyre-kicking.

On the other hand, I felt a very real frustration that some of our best tools to evaluate model performance are still in progress. 

### 6. Findings and Conclusions
There are some interesting next steps
- Generated images can be wrong, which might be especially bad where these are ambiguous.
- As we productionise, we will be gathering better data about model performance (maybe a part 2 of this post?)

Regardless, we’re pretty excited about how synthetic data can boost performance for a new use-case, or a new detection scenario!

--

(1) Captur has been working on safe parking, and we're used to thinking about similar scenarios like seated scooters, new geographies, etc. More info:
[https://www.captur.ai/#how-captur-works](https://www.captur.ai/#how-captur-works)

(2) I made a whole hour presentation on Zero-to-One in AI Product, available here:
[https://carolus4.github.io/Zero-to-One-for-AI-Product/](https://carolus4.github.io/Zero-to-One-for-AI-Product/).

(3) This Hugging Face post has a lot more interesting detail on the wider trends in synthetic data: [https://huggingface.co/blog/synthetic-data-save-costs](https://huggingface.co/blog/synthetic-data-save-costs)

(4) Y. Tian, L. Fan, K. Chen, D. Katabi, D. Krishnan, and P. Isola, "Learning Vision from Models Rivals Learning Vision from Data," arXiv, 2312.17742. [Online]. Available: [https://doi.org/10.48550/arXiv.2312.17742](https://doi.org/10.48550/arXiv.2312.17742).

(5) E. Wood, T. Baltrušaitis, C. Hewitt, S. Dziadzio, M. Johnson, V. Estellers, T. J. Cashman, and J. Shotton, "Fake It Till You Make It: Face analysis in the wild using synthetic data alone," in ICCV, 2021. [Online]. Available: [https://doi.org/10.48550/arXiv.2109.15102](https://doi.org/10.48550/arXiv.2109.15102)

(6) This post about Fault Tolerant UX in AI is always relevant: [https://cdixon.org/2015/02/01/the-ai-startup-idea-maze](https://cdixon.org/2015/02/01/the-ai-startup-idea-maze)