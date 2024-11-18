---
layout: post
title: Build a Cost-Effective Highly Available Local AI System
tags: [AI, local-AI-System, hardware]
---

If you're reading this, chances are you're planning to build a local AI system with a single RTX 4090. But before you dive in, let me share some valuable insights that can help you save a significant amount of money while achieving your goals.

CPU-ONLY build will work and will be cheap. but also 10x slower, it is **not intended to be usable for productivity**.

**Lower your Carbon Footprint**
---------------------------------------------

When building an AI system, it's essential to consider the environmental impact of your setup. The power consumption of this system will be around 80-120WH when idle and 1KWH on  heavy-load with 4 GPUs.

Here are some tips to minimize your carbon footprint:

* **Second-hand**: Avoid buying brand-new components like RTX 4090, which can be expensive and contribute to e-waste, consider second-hand at first if possible, especially for graphic cards.
* **Low energy consumption CPU**: Opt for CPUs that consume less power while still providing excellent performance (AMD).
* **Nvidia eco performance mode**: Reduce to ~15W the idle power consumption per card.


**Local AI ChatGPT and Image Generation**
---------------------------------------------------------

If you're looking to build a local AI system for chatGPT-like functionality and image generation, we recommend the following open-source tools:

* **Ollama**: The LLM backend that handles computations for text.
* **Open-webui**: A chatGPT-like interface for seamless user interaction.
* **ComfyUI**: Stable diffusion for images generation.

**How Many GPUs Do You Need?**
-----------------------------

The number of GPUs required depends on your specific use case and desired performance. 
Generally you want one application running on only one GPU which size is tailored to it. Otherwise you will be constantly loading new data into the VRAM. That will not work for a concurrent use unless you use a GPU workload orchestrator.

Here are some guidelines:

* **Same quality as GPT4**: 2 RTX 3090 or more
* **Same quality as GPT3.5**: 1 RTX 3090 or more
* **No waiting for image/text generation**: You'll need 1 additional GPU to host images on 1 RTX 3090 and 2 other RTX 3090 for the LLM (text generation), as they don't interact well with each other.

**Only Images Generation**
---------------------------

If you only need image generation capabilities, a single RTX 3090 is sufficient. However, if budget is not a concern, an RTX 4090 will speed up image generation by 50%, which is a significant boost.

**Scaling for Multiple Users**
------------------------------

The number of users accessing your AI system affects the quality and size of the models you will probably want to use. 
Also note that for a production application, scalability will become a thing if you successfully integrate the system into your products or services.

As a general rule:

* **1-10 users**: 2 second-hand RTX 3090 (costing around $600 each) should suffice.
* **10-30 users**: 3 RTX 3090 or more
* **30-50 users**: 4 RTX 3090

**Renting your GPUs**
------------------------------

Some provider such as Runpod or VastAI offers you to rent your GPU to other to earn extra money when you do not use your server. This is a very good way to make this crazy build usefull to others as well as your wallet. It's only to consider if linux is not a problem for you.

* **1-10 users**: 2 second-hand RTX 3090 (costing around $600 each) should suffice.
* **10-30 users**: 3 RTX 3090 or more
* **30-50 users**: 4 RTX 3090

**First Things First: Be Flexible**
--------------------------------------

Before investing in a high-end AI system, consider the following:

* You may not know what services will run on your server in the future
* You need to experiments some time until the requirements are clear enough
* Start small to tune and mature your use case

If you want assistance in your build you can telegram https://t.me/+_G7A01Ue45FhMGE0
