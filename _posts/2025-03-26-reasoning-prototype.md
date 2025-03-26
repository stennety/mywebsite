---
layout: post
title: "March 2025 AI Review"
tags: [AI, LLM, Open-Source]
---

AI as a General-purpose technology to understand what is going on

General-purpose technologies (GPTs) are technologies that can affect an entire economy (usually at a national or global level).GPTs have the potential to drastically alter societies through their impact on pre-existing economic and social structures. The archetypal examples of GPTs are the steam engine, electricity, and information technology.

They define a transforming GPT according to the four criteria listed below:

    is a single, recognisable generic technology
    initially has much scope for improvement but comes to be widely used across the economy
    has many different uses
    creates many spillover effects


Cool AI generated videos:

<iframe width="100%" height="350" src="https://packaged-media.redd.it/1fjjrjf8ip8e1/pb/m2-res_640p.mp4?m=DASHPlaylist.mpd&v=1&e=1743015600&s=1cdd9b402bb27aae2dc6a541effc955661865f81"></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/Xa9Sg-j62xY?si=839VdizR_m7x5npY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## March 2025: AI Highlights

## Papers:

DAPO: An Open-Source LLM Reinforcement Learning System at Scale

Inference scaling empowers LLMs with unprecedented reasoning ability, with reinforcement learning as the core technique to elicit complex reasoning. However, key technical details of state-of-the-art reasoning LLMs are concealed (such as in OpenAI o1 blog and DeepSeek R1 technical report), thus the community still struggles to reproduce their RL training results. We propose the Decoupled Clip and Dynamic sAmpling Policy Optimization (DAPO) algorithm, and fully open-source a state-of-the-art large-scale RL system that achieves 50 points on AIME 2024 using Qwen2.5-32B base model. Unlike previous works that withhold training details, we introduce four key techniques of our algorithm that make large-scale LLM RL a success. In addition, we open-source our training code, which is built on the verl framework, along with a carefully curated and processed dataset. These components of our open-source system enhance reproducibility and support future research in large-scale LLM RL. 

https://arxiv.org/pdf/2503.14476


<iframe width="560" height="315" src="https://www.youtube.com/embed/ZLlQWJ8FsDA?si=FTUFwlECJLSjm3Kq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Monitoring Reasoning Models for Misbehavior and the Risks of Promoting Obfuscation

Mitigating reward hacking--where AI systems misbehave due to flaws or misspecifications in their learning objectives--remains a key challenge in constructing capable and aligned models. We show that we can monitor a frontier reasoning model, such as OpenAI o3-mini, for reward hacking in agentic coding environments by using another LLM that observes the model's chain-of-thought (CoT) reasoning. CoT monitoring can be far more effective than monitoring agent actions and outputs alone, and we further found that a LLM weaker than o3-mini, namely GPT-4o, can effectively monitor a stronger model. Because CoT monitors can be effective at detecting exploits, it is natural to ask whether those exploits can be suppressed by incorporating a CoT monitor directly into the agent's training objective. While we show that integrating CoT monitors into the reinforcement learning reward can indeed produce more capable and more aligned agents in the low optimization regime, we find that with too much optimization, agents learn obfuscated reward hacking, hiding their intent within the CoT while still exhibiting a significant rate of reward hacking. Because it is difficult to tell when CoTs have become obfuscated, it may be necessary to pay a monitorability tax by not applying strong optimization pressures directly to the chain-of-thought, ensuring that CoTs remain monitorable and useful for detecting misaligned behavior. 

https://arxiv.org/pdf/2503.11926

<iframe width="560" height="315" src="https://www.youtube.com/embed/h1pSQRR4Hyw?si=UW_CGj1Y4k0VktJ9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Ollama: Efficient AI Backend

Since July 2024, **Ollama** has rapidly developed into a compelling backend solution for AI model deployment. While **vllm** remains popular in batch inference scenarios, Ollama distinguishes itself by natively supporting GGUF model formats, enabling versatile single-inference capabilities across various AI modalities (LLMs, Vision Models, VLMs, VLAs).

![Ollama Performance Comparison](/images/ollamaspeed.png "Ollama Performance Comparison")

In recent developments, reinforcement learning post-training is emerging as an effective and cost-efficient approach to enhancing Large Language Model (LLM) capabilities. Concurrently, significant discussions have arisen around diffusion models, which reportedly accelerate inference speeds by an order of magnitude.

> [**A diffusion-based 'small' coding LLM 10x faster in token generation than transformer-based LLMs (1000 tok/s on H100)**](https://www.reddit.com/r/LocalLLaMA/comments/1izoyxk/a_diffusion_based_small_coding_llm_that_is_10x/) by [u/Comfortable-Rock-498](https://www.reddit.com/user/Comfortable-Rock-498/) on [LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/).

---

### Chat3D: Next-Gen 3D Model Generation

[**Chat3D**](https://chat3d.ai/), based in Lyon, France, delivers cutting-edge text-to-3D and image-to-3D model generation capabilities.

---

### Enhancing AI-Driven Coding

[**Fasten your AI coding workflow**](https://www.reddit.com/r/ClaudeAI/comments/1jj2ucr/i_completed_a_project_with_100_aigenerated_code/): An insightful experience shared on Reddit highlights a project executed entirely using AI-generated code, demonstrating the transformative impact of AI coding assistants.

Model choice affects code quality. Attention to user intent, response style, and accuracy can create a big mess quickly.

![Python Code Size Metrics](../images/averagepythonsize.png)

---

### Vibe Coding by Andrej Karpathy

"There's a new kind of coding I call "vibe coding", where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. It's possible because the LLMs (e.g. Cursor Composer w Sonnet) are getting too good. Also I just talk to Composer with SuperWhisper so I barely even touch the keyboard. I ask for the dumbest things like "decrease the padding on the sidebar by half" because I'm too lazy to find it. I "Accept All" always, I don't read the diffs anymore. When I get error messages I just copy paste them in with no comment, usually that fixes it. The code grows beyond my usual comprehension, I'd have to really read through it for a while. Sometimes the LLMs can't fix a bug so I just work around it or ask for random changes until it goes away. It's not too bad for throwaway weekend projects, but still quite amusing. I'm building a project or webapp, but it's not really coding - I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works." — [Andrej Karpathy](https://twitter.com/karpathy/status/1886192184808149383)

---

### ComfyUI Integration with Unreal Engine

- [**ComfyUI Unreal Engine Workflow (Discussion)**](https://www.reddit.com/r/comfyui/comments/1jfiakn/unreal_engine_comfyui_workflow/)

---

## Additional Resources and Discussions

- [**DeepSeek R1 Ollama Hardware Benchmark**](https://www.reddit.com/r/LocalLLaMA/comments/1i69dhz/deepseek_r1_ollama_hardware_benchmark_for_localllm/)
- [**New Research: LLMs Could Think in Human-like Ways**](https://www.reddit.com/r/LocalLLaMA/comments/1inch7r/a_new_paper_demonstrates_that_llms_could_think_in/)
- [**Diffusion-Based Small Coding LLMs (Detailed Discussion)**](https://www.reddit.com/r/LocalLLaMA/comments/1izoyxk/a_diffusion_based_small_coding_llm_that_is_10x/)
- [**SmolDocLing 256M VLM for Document Understanding**](https://www.reddit.com/r/LocalLLaMA/comments/1je4eka/smoldocling_256m_vlm_for_document_understanding/)
- [**Project Completed with 100% AI-Generated Code**](https://www.reddit.com/r/ClaudeAI/comments/1jj2ucr/i_completed_a_project_with_100_aigenerated_code/)
- [**General Purpose Technology**](https://en.wikipedia.org/wiki/General-purpose_technology/)