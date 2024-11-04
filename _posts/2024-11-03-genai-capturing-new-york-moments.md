---
layout: post
title: "Testing GenAI to capture a Moment"
excerpt: "Exploring generative AI tools to capture moments in NYC and New Jersey - my first creative project using Runway, Udio, and Kling."
image: "/images/genai-nyc-runway_statue_of_liberty_waterfront.jpg"

---
I moved to New York last month. An exciting empty page - soon filled with too many bullet points of things to do... One has stuck with me: how can I capture this very specific moment? I started messing with different generative AI tools, and in this post I wanted to share some of the process and pain points. I'm more tech than creative, but would love to hear any suggestions!

## Idea
I stumbled on inspiration in our first week. My husband and I visited the Stonewall Inn, where Tree, [an activist](<https://punchdrink.com/articles/tree-sequoia-is-the-spirit-of-stonewall-inn-bar-nyc/)>), shared history and gossip. 

It brought back teenage memories of listening to *An Englishman in New York*. There’s something of a hero in characters like [Quentin Crisp](https://en.wikipedia.org/wiki/Quentin_Crisp). 

What if he'd been a Frenchman in Hoboken?

## Kick-off
It’s easier to edit than to create wholesale. I found that to be a theme in GenAI, and certainly in this project. 

I began planning with a stream of consciousness and ChatGPT. 
> "Help me plan a little creative project. My goal is to mess about and get hands-on with genAI…"

Talking through and writing down my thoughts this way helped a lot.

## Approach
- List the AI processes in scope
- Summarize the thematic elements
- Generate variations

## Music & Lyrics
I used [Udio](https://www.udio.com/home) for a 30s snippet.

I iterated on structure and theme without worrying about lyrics (1), before directly editing the text with ChatGPT. Focusing on one area at a time helped me feel like I was making smaller and easier decisions at every step.

<div class="responsive-iframe">
<iframe src="https://www.udio.com/embed/s2VLZbpyZyK7ZcMyUeNBBz?embedVariant=default" style="width:700px; height:228px; border-radius:12px;"></iframe>
</div>

## Base Images
I had high hopes for Runway on the image generation side. I stopped when I realized I was going down creative dead-ends. (2)

After a break, I started over with [Kling AI](https://klingai.com). I'd missed the UX for reference images in Runway, and Kling's [detailed prompting guide](https://docs.qingque.cn/d/home/eZQCtOj9fX_6cUjT_0yuk-yrL) made a huge difference.

![good result of a pedestrian](/images/genai-nyc-kling-walker.png)

## Animation
Lip sync was actually the least creative. It feels like animation will either mostly succeed, or very obviously fail. (3)

<video controls width="100%">
  <source src="{{ '//videos/genai-nyc-runway-lipsync.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Conclusion
"Done is better than perfect". Even though I wasn’t 100% satisfied with any specific step in the process, and I had a bunch of other ideas I wanted to try, I stopped here. (4)

I think AI today can get you 80% of the way there. And in the revenge of the [pareto principle](https://en.wikipedia.org/wiki/Pareto_principle), sometimes it feels like there's still 80% of the work left to do.

---

_Thanks to everyone who’s been so welcoming to my husband and me in the USA. It's been a magical month._

(1) Emphasis matters: This was very French, not very Sting:  
> "a song about a frenchman in new jersey, in the style of an englishman in new york, with reference to meeting Tree at stonewall, friends visiting or welcoming us, wicked musical, ferry from hoboken"

<div class="responsive-iframe">
<iframe src="https://www.udio.com/embed/7LKtzrHMMWx9c2c6UE2hbP?embedVariant=default" style="width:700px; height:228px; border-radius:12px;"></iframe>
</div>


(2) Creative dead-ends: Something about prompts like this one really didn't work. 
> “Medium-full shot of a cyclist singing while riding through an autumn street in New Jersey. The cyclist is dressed in casual, comfortable clothing, captured in a realistic, cinematic style. The person should appear detailed and expressive, with a focus on natural movements and facial expression while singing. The background is minimalist, with just a few fall leaves scattered and soft, natural light illuminating the scene. The Statue of Liberty is visible in the distance, but the emphasis is on the cyclist's realism, personality, and connection to the moment.”

![Suprisingly bad result of a biker](/images/genai-nyc-runway-biker.jpg)

(3) Side-on created a mouth on the nose:
<video controls width="100%">
  <source src="{{ '//videos/genai-nyc-lipsync-fail.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>

(4) Animating a walk cycle created blinks, rain, but some odd waves instead of any body movement:
<video controls width="100%">
  <source src="{{ '//videos/genai-nyc-animation-fail.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>
