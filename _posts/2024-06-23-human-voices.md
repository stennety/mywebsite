---
layout: post
title: In Their Own Words
---

It feels like ages ago now - the pre-meeting-transcript-summary days.  Being able to condense an hour of recorded conversation into an organized list of bullet points still feels like a magic trick.

Something I've thought about recently is that its not always *what* was said, it was the way it was said, that leads to some a-ha moment. Or I might have missed it completely the first time around, because I was looking at a cool bird outside or making the mistake of multi-tasking.

There's also the risk that even the best summaries start to all blend together.  If something starts to feel too 'automated,' my brain has a harder time latching onto it as important.  This is probably a side effect of learning to filter out automated noise vs human signals that I should actually pay attention to.  

So what can I do to keep some of those original statements intact? A very simple first experiment is to ask the model to include some quotes alongside the condensed version.  

So far, I've played around with some variations of:

"Include up to 3 unique, unusual, or especially illustrative quotes from each participant."

I can't share any real examples from my job, but here's examples of the results when I used it when summarizing a transcript from an interview with Jaron Latimer:

Source: [https://www.youtube.com/watch?v=kc_Jq42Og7Q](https://www.youtube.com/watch?v=kc_Jq42Og7Q)

(Video was transcribed with Tactiq's free transcript generator: [https://tactiq.io/tools/youtube-transcript](https://tactiq.io/tools/youtube-transcrip), and no other pre-processing was done.)


## Full prompt:

You are an expert at discourse on social media and its effects on society.  The following is a transcript of an interview with timestamps included. Your task is to:

1.) Identify the key points or takeaways from this discussion that relate to social media and its effects on society.
2.) Share up to 3 unique, unusual, or especially illustrative quotes from each participant. Add punctuation if necessary, to make them easier to understand.
3.) Identify at least one call to action.
4.) Ask at least one followup question of each participant to clarify something that they said.

## GPT4o:

### Key Points on Social Media and Its Effects on Society

1. **Manipulation by Algorithms**: Social media platforms use algorithms to subtly manipulate users' behavior, benefiting advertisers by slightly adjusting users' preferences without their knowledge.

2. **Impact on Society**: Social media has led to increased surveillance, behavior modification, political instability, and a rise in depression, particularly among teenagers.

3. **Addictive Nature**: Social media platforms are designed to be addictive, using schemes of rewards and punishments to keep users engaged, which can have severe psychological effects.

4. **Negative Feedback Loop**: The algorithms amplify negative responses faster than positive ones, leading to a more polarized and irritable society.

5. **Need for a Business Model Change**: The current business model of social media, which relies on manipulation for profit, needs to be replaced with alternatives that do not exploit users.

### Illustrative Quotes

#### Participant 1
1. "You're being subtly manipulated by algorithms that are watching everything you do constantly."
2. "Society has been gradually darkened by this scheme in which everyone is under surveillance all the time."
3. "The algorithms naturally catch the negativity and amplify it, introducing negative people to each other."

#### Participant 2
1. "The problem is that behavioral techniques are often invisible to the person who's being manipulated."
2. "If you're a young person and you've only lived with social media, your first duty is to yourself."
3. "We don't have to get rid of the smartphone; we just have to get rid of the manipulation machine in the background."

### Call to Action

- **For Individuals**: Take a break from social media for six months to gain perspective and understand yourself better without constant manipulation.
- **For Society**: Encourage a small percentage of the population to stay off social media to maintain diverse perspectives and enable real conversations.

### Follow-Up Questions

#### To Participant 1
- You mentioned that social media algorithms manipulate users by amplifying negativity. Could you provide specific examples of how this has played out in real-world scenarios?

#### To Participant 2
- You suggested that a different business model could address the issues with social media. What specific business models do you believe would be most effective in eliminating the manipulation aspect?

## Claude3 Opus:

Here are the key takeaways, quotes, call to action, and followup questions based on the interview transcript:

Key Points/Takeaways:

1. Social media platforms are manipulating users through algorithms that constantly observe behavior and subtly modify what people see to influence them, often in negative ways. This is bad for both individuals and society.

2. The business model of major social media companies is fundamentally about addiction and manipulation. Even with efforts to tweak the services, as long as the underlying incentives remain the same, the core problems will persist. 

3. There is strong evidence linking social media usage to concerning issues like teen depression and suicide. The rapid feedback loops and greater amplification of negativity online is having a detrimental impact.

Illustrative Quotes:

From the interviewee:

"You're being subtly manipulated by algorithms that are watching everything you do constantly and then sending you changes in your media feed, in your diet, that are calculated to adjust you slightly to the liking of some unseen advertiser."

"Society has been gradually darkened by this scheme in which everyone is under surveillance all the time, and everyone is under this mild version of behavior modification all the time. It's made people jittery and cranky. It's made teens especially depressed, which can be quite severe."

"As long as [Facebook's] business incentives are contrary to the interests of the people who use it, who are different from the customers, then no matter how serious, and I believe he's sincere, and no matter how clever he is, he can't undo that problem. He has to go back to the basics and change the nature of the business plan."

Call to Action: 

The interviewee urges people, especially young people, to take a extended break from social media (at least 6 months) in order to gain perspective and truly know themselves without the constant manipulation. He believes if at least some percentage of society can exist outside these platforms, it will allow for clearer thinking and important conversations about the impact of social media.

Followup Questions:

For the interviewee: 

You mention viable alternative business models for social media that don't rely on manipulation, such as subscription services or public utilities. Can you expand on what you think is the most promising path forward to evolve these platforms in a healthier direction?

For the interviewer:

You pushed back on whether social media can really be blamed for serious issues like teen suicide, suggesting correlation doesn't necessarily equal causation. If the evidence continues to mount that there is a direct link, at what point do you think regulatory action or major changes by the tech companies would be warranted? Where do you draw that line?

****

Looking at these results, it feels like a step in the right direction.  Instead of just paraphrasing, we get a taste of each person's way of saying things.

Since part of this experiment is to keep the essence of each participant's point of view intact, I also want to play around with:

"At least one of these quotes should illustrate the individual point of view of each participant, including statements that other participants might disagree with."

And to emphasize the commonalities to help find common ground for overcoming disagreements, it will be fun to play around with something like:

"At least one of these quotes should illustrate what the participants appear to agree on."

And so on.  

Of course, the calls to action and questions should also get tweaked according to my needs.  For example, some conversations are going to need a much more comprehensive, action-oriented breakdown (like a meeting to plan next steps on a complex project).  Others might focus more on diving even deeper with the followup questions to explore the topic in a less tactical way.  Maybe one way to approach this could also be using a Role of 'project manager' for the former, versus 'strategic researcher' for the latter.  The key step I'm focusing on here is to give people a chance to speak for themselves.
