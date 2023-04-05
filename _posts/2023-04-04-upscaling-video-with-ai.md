---
published: true
title: 'How to upscale video with AI'
excerpt: Upscaling old 480p video to 4k using Topaz Labs Video AI.  
---

I've been in the process of [digitizing a bunch of old MiniDV and VHS tapes]({% post_url 2023-03-08-digitizing-minidv %}).

Along the way, with AI at maximum hype this year, I've wondered if it were possible to use it to upscale the footage to 4k. 

Indeed it is!

Here's an example of some old interlaced 480p footage on the left, with a processed frame on the right.

![]({{site.cdn_path}}/2023/04/04/original_enhanced.png)

I rendered this using [Topaz Labs AI](https://www.topazlabs.com/topaz-video-ai). After doing a bit of research,
the options for using AI to enhance your videos boil down to:
* Training your own AI (no thanks)
* [CUpscale](https://github.com/n00mkrad/cupscale): Open-source app with a GUI. Free, but slow on anything except NVidia GPUs. 
* Topaz Labs. $300 but very user-friendly, fast, and the models are all pre-trained.

I initially downloaded the trial of Topaz, but they have this watermark they throw over your footage, so I didn't feel
like I could tell how it was performing. I took the plunge and spent the money on it, because they offer a 30-day 
return policy. I ended up being really impressed with it.

# Upscaling using Topaz Labs AI

Okay, so you shelled out the money for Topaz. Now what?

The best place to start is with the models. Topaz provides these pre-trained models for enhancing your footage:

* Artemis: Denoises and sharpens footage.
* Gaia: Upscales footage.
* Proteus: Fine-tunes and enhances footage
* Theia: improves details and clarity. Preserves textures well.

They also have some frame-interpolation models:
* Chronos: Fast frame interpolation.
* Apollo: Newer model that's optimal for slow-motion video, and handles motion blurs. Topaz recommends trying Apollo before Chronos if the video has any blurriness.

There's also a non-AI film grain option. I found that adding a little bit of grain helped make my upscaled footage look more natural. 
Without it, sometimes footage would look a little too much like a painting.

My version (v3.2.0) doesn't allow manually picking the models, which I notice that earlier versions did. Instead, it 
seems more focused on the use-case first, and then it picks the model for you. I wish I had the option for more manual control, 
or chaining the models together in a pipeline, but there's not a way to do that as far as I'm aware.

The footage I'm working with is interlaced 480p NTSC. I found the best results using these options:

![]({{site.cdn_path}}/2023/04/04/best_results.png)

Note that yours may be different, depending on the input encoding and resolution! Do some experimenting and find out what 
works best for you. Topaz has a "preview" option for quickly rendering a small amount of your video so you can get a sense
for the output.

# Going forward

I've been really impressed with Topaz, overall. I've got an aging 2015 iMac that buckles under the load of rendering any clips
longer than a couple minutes. I'd like to see if I can spin up an EC2 instance with a beefed-up GPU to see how quickly I can 
render clips with it.

# Reference

Some additional reading:
* [What Video AI Upscalers Can and Can't Do, and How to Make Them Do It Better](https://www.extremetech.com/extreme/338403-what-video-ai-upscalers-can-and-cant-do)
* [Topaz Labs Video AI review: the best just got better](https://www.todddominey.com/2022/11/21/topaz-labs-video-ai-review-even-better-than-before/#:~:text=Enhancement%20improves%20image%20quality%20using,to%20see%20which%20looks%20better)