---
title: 'So you''ve been asked to do some testing, where do you start?'
date: '2022-10-05 01:00:00 +0100'
tags:
  - testing
  - beginner
categories:
  - How to
redirect_from:
  - /so-youve-been-asked-to-do-some-testing/
---

So, you're minding your own business, enjoying life. Maybe you're working as a Project Manager, a Product Owner, a Team Lead, or maybe you just happen to work for a University and are the one who knows your Excel from your USB port.

And then it happens. You have the need to Test some software. Maybe it is the new version of a system being rolled out in the office, or it might be the product your team is working on, depending on your context.

However it happened, Software Testing isn't normally your job, but here you are, being asked to do it anyway. If this is you, read on! I'm here to help.

## Don't panic

The first thing I'm here to tell you, is don't panic! I can't promise everything will be OK, but I can reassure you that you're not the first, and won't be the last person to get this request. And I hope I can give you enough pointers here so you can make a fair job of it. How knows, you maybe even enjoy it.

## Why test software

I recently contributed, via Twitter, to a Blog post by James Tomas [Why do they test software](https://qahiccupps.blogspot.com/2022/03/why-do-they-test-software.html). If you want some inspiration on why you might want to test software, beyond having been asked to, I suggest you check it out.

You might also want to consider some definitions of Software Quality, here are a few links that can help you do that:

* "Quality is value to some person." - Gerald Marvin Weinberg
* [The Quality and Testing Information Model - Ministry of Testing](https://www.ministryoftesting.com/dojo/lessons/the-quality-and-testing-information-model)
* [What does quality mean to me? - Ben Dowen](https://www.dowen.me.uk/posts/what-does-quality-mean-to-me)
* [Adapting Crosby’s 4 absolutes of quality into a software context](https://danashby.co.uk/2019/09/30/adapting-crosbys-4-absolutes-of-quality-into-a-software-context/)

## Where to start

### Start to figure your scope and context

It can be overwhelming starting to test software if you haven't done it before. One great thing to do early on is to start mapping out your context and understand the scope of what you're being asked to do.
Scope is another what if saying, what is and isn't included. It is a very different prospect if you are being asked to test a single new feature, or assess the suitability of an entire application or hosted solution.

If the scope of what you are being asked to do isn't clear, start by making some assumptions and then check these against whomever passed you on this work.

**You can ask things like:**

* Who is the testing for?
* Who will want to hear about what I find?
* What testing has already been done?
* What functionality is new, and what existed already?
* Can I see notes from anything that has been done so far?
* Will additional testing be done after I'm done?
* Who can I speak to if I have questions about the product/feature?
* If I find issues, where can I raise them?
* Is there time budgeted to fix any issues I find?

As well as the scope, trying to understand what you will and won't be expected to do, you may want to get other context.

**You should find out:**

* Are there any rules, regulations or standards that need to be met?
* Who makes the judgement on if we are compliant with these standards?
* Are aspects like security, performance and accessibility already being considered by others?
* Are there other parts of the company that need to get involved in accepting or releasing this software?

### Choosing what to test

OK, so you now have a potentially scary amount of context. Stay calm! Now you need to choose what to test, or at least what to test first.

We can split this down into parts:

* Figure out some things you could test
* Choose the best thing to test next
* Do some testing
* Understand and discuss what you found so far
* Cycle around until you have done enough testing

### Figure out some things you could test

On anything beyond the most trivial of software applications, there is so much that could be tested that it isn't possible to test it all, and definitely not quickly enough to be useful.

So our first task is going broad, what could we test? For this, I like to do a number of things that I hope should be very doable without a huge amount of prior experience:

* Speak to people involved in the software project. If you can, speak to the Developers, or the Vendor.
  * Why do they need the new product/feature, what problem is it solving?
  * What is keeping people up at night, what are they worried might go wrong?
  * How people imagine the system/product/feature will typically be used?
  * Who is expected to be using the system, if you can speak to these people ask them how they hope to use it?
  * When do they expect to be using it?
* Then I like to use a mind map to capture the answers
  * To go one step further, for each node in the mind map, start asking "What if?" and record additional questions to be answered
  * Review the mind map with others involved in the project, and record the feedback on the mind map too

There are many free and paid tools to help build Mind Maps. [Miro](https://miro.com/) and [FreeMind](http://freemind.sourceforge.net/wiki/index.php/Main_Page) are popular. If you prefer you can use Pen and Paper, although this is more difficult to do collaboratively if you are not co-located with your team.

### Choose the best thing to test next

A [Risk Based Testing](https://www.guru99.com/risk-based-testing.html) approach can be very useful, and it is about understanding what might go wrong, how likely it is to go wrong and what impact it will have if it does go wrong.

If you followed the steps above, you have a mind map of some things you could test. Have a think what the impact would be if you found a defect in one of the areas you identified? What impact would it have?

As well as identifying those things that higher impact if they go wrong, also consider how easy or even possible it will be to test. Try and choose something that would be bad if it went wrong, and you have a fair chance of being able to do!

## Do some testing

You may be asking by now, [what do tests look like](https://www.ministryoftesting.com/dojo/lessons/what-do-tests-look-like)? And the answer, of course, is it depends.

There are many different types of tests, the mainly fit into two basic categories:

* Checks for what we know to expect
* Investigations to learn

Test Cases, also known as Test Scripts, fit into the Checks category. While these can take many formats they typically include some common parts:

* Pre-conditions, the system state before the test starts
* Steps to be carried out
* Expected results, the desired system state after the test is done
* Actual result, the observed sate of the system after the test is done

You make hear these called different things. In the world of Unit Testing, there is the pattern [Arrange, Act, Assert](https://docs.microsoft.com/en-us/visualstudio/test/unit-test-basics?view=vs-2022#write-your-tests) and in [Behavior Driven Development (BDD)](https://cucumber.io/docs/bdd/) there is the Given, When, Then pattern.

In a typical check the actual result is recorded and compared against the expected result, and if the two fail to match the test fails. In some cases instead of an exact match, a test might check the actual result is similar to the expectation, or close enough to be acceptable. A check that expects a numerical result may accept values within a range, or one that is equal or lower then the expectation.

Investigative testing can take different forms, typically [Exploratory Testing](https://callumakehurstryansblog.wordpress.com/2021/09/17/ask-me-anything-exploratory-testing/). In Exploratory Testing we are investigating to learn answers to questions where we don't have explicit expectations or a pre-defined set of steps to follow. This doesn't mean Exploratory Testing is chaotic or unstructured, [Exploratory Testing is not Ad-Hoc Testing](https://callumakehurstryansblog.wordpress.com/2021/11/02/why-adhoc-testing-is-not-exploratory-testing/). Learn more about [How to Explore with Intent - Exploratory Testing Self-Management](https://www.ministryoftesting.com/dojo/lessons/how-to-explore-with-intent-exploratory-testing-self-management).

### Take notes

Taking testing notes is a skill, and one worth practicing and learning more about. It is a great start to make notes for yourself, to document what you did for future reference, and help you answer questions when people ask you what you covered in your testing.

For exploratory sessions, where you are not looking at "pass / fail" but instead doing investigative testing to discover information, notes are even more important, because they will form  part of the communication back to the team, or others in the project.

For taking notes of exploration, I like to use a very simple template:

***

**Mission**

What was the intention of this testing session. You could put a charter here, like "Explore <target>, using <resources> to discover <information>", but equally you could use any format that makes sense for you. This is simply your statement of intent.

**Summary**

* Write this last
* Use bullet points
* Cover findings, outcomes and actions
* This should help make notes more consumable for folks who won't read the detail

**Notes**

Free form notes, that includes thoughts, questions, answers, things you did and found.

I also like to capture snippets of log messages, any commands I typed, screenshots of things I found interesting.

***

You can read more about testing notes, and other more structure templates like Session Based Testing:

* [Notes on notes, James Thomas](https://qahiccupps.blogspot.com/2022/04/notes-on-testing-notes.html)
* [Testing IRL - Session Based Test Management, Cassandra H. Leung](https://www.cassandrahl.com/blog/how-to-document-testing-with-sbtm-testing-irl-part-2/)

## What to avoid

### Being forced to play gatekeeper

It is very likely, now you have assumed the role of Tester, willingly or otherwise, that you will be asked to pass judgement on the release of the product, or acceptance of the service.

If you can resist the pressure to make this choice alone, instead focus on gathering facts (use your testing notes!) and having discussions with the team. Together, you can make an informed choice as to if you should proceed.

### Believing misconceptions about testing

There are many myths, legends and misconceptions about Software Testing. Don't fall for it!

Here are some great place to go for some myth busting:

* [Ten Misconceptions About Software Testing - That Non-Testers Share, Kate Paulk]()

## Starting and finishing on time

### How long will it take?

You may well be asked, how long will testing take? While this sounds like an innocent question, there is no one right answer, so don't feel bad if you don't have one!

Unless you have prior art, that is you have done a similar thing before, you're very unlikely to be able to produce an accurate estimation as to how long work will take.

I'm sorry I'm not being much help on this one, mainly because while I've been working in testing for 10 years, and tried loads of ways to try and do estimates, they are all awful and they rarely stand up to reality.

I appreciate this may not be very helpful, and if I get some better advice for you I'll come back and update this article!

### When to stop testing

So, you may not know how long it was going to take, but when do you stop?

The answer for this is, again, tricky but you can consider a few things:

* Does your team have confidence they understand enough about the change, and how it will impact users?
* Do you have more open questions you need to answer?
* Do you have any good ideas left on what testing could be done?
* Is there a good way to know if the change has been successfully received by users?
  * Monitoring of the system
  * Feedback loop with real users
* Can you roll back the change, or or get it fixed quickly, if there is a problem?

Finally I will mention, testing is never really _done_, until the system you are testing is used for the last time by it's last user. But what is important, is are you done testing for now, enough to give it to the users to start using?

### When is testing done, done?

I like the way Callum talks about being done, in his Exploratory Testing AMA, and I paraphrase "You're done when you stop learning useful information".

* [Ask Me Anything: Exploratory Testing, Callum Akehurst-Ryan](https://cakehurstryan.com/2021/09/17/ask-me-anything-exploratory-testing/)
* [Ask Me Anything: Exploratory Testing \[Recording\], Callum Akehurst-Ryan]()

Of course, you may have a time-box or a deadline for testing a feature. In this case, you may need to set expectations, communicate what you would like to do, and how much you might expect to do within the time available.

This can be especially tricky if you're also holding down a different role, and testing is just yet another task with urgent priority. Be kind to yourself, learn what you can and work with others make the choice to finish.

## Other unanswered questions for another day

I'm confident, because I've had good feedback (Thanks sis!) that this won't answer all your questions. And I appreciate, I may of gone way too deep in some areas if you truly are jumping in for the first time, or in a non-testing role.

Here are some topics I may visit in the future, and when I do I'll update this article, or link to the new one:

* Testing terms explained, what is a defect anyway, and is it the same as a bug?
* What is the difference between a _product_, a _system_ and _software_?
* How to test a system we didn't build, say one provided by a vendor?
* Example testing session, what does testing really LOOK like?

## Resources

### Books

* [Agile Testing Condensed - by Janet Gregory and Lisa Crispin](https://leanpub.com/agiletesting-condensed)
* [Explore it! By Elisabeth Hendrickson](https://www.amazon.co.uk/Explore-Increase-Confidence-Exploratory-Testing/dp/1937785025)
* [Would Heu-Risk it? by Lena Wiberg](https://leanpub.com/wouldheuriskit)
* [Exploratory Testing by Maaret Pyhäjärvi](https://leanpub.com/exploratorytesting)
* [Testing Stories - by Melissa Fisher and an ensemble of great testers](https://leanpub.com/testing_stories)

### Blog posts and articles

* [How to Test Anything - James Thomas](https://qahiccupps.blogspot.com/2020/05/how-to-test-anything.html)
* [Why do they test software - James Thomas](https://qahiccupps.blogspot.com/2022/03/why-do-they-test-software.html)
* [What does quality mean to me? - Ben Dowen](https://www.dowen.me.uk/posts/what-does-quality-mean-to-me/)
* [Adapting Crosby’s 4 absolutes of quality into a software context](https://danashby.co.uk/2019/09/30/adapting-crosbys-4-absolutes-of-quality-into-a-software-context/)
* [Testing is an underrated skill in Testing (Test Automation isn’t everything) - Louise Gibbs](https://louisegibbstest.wordpress.com/2022/03/24/testing-is-an-underrated-skill-in-testing-test-automation-isnt-everything/)
* [What Is Exploratory Testing? An Alternative To Scripted Testing And Try To Break It Testing - Ministry of Testing](https://www.ministryoftesting.com/dojo/lessons/what-is-exploratory-testing-an-alternative-to-scripted-testing-and-try-to-break-it-testing)

### Testing Communities

* [Ministry of Testing Club](https://club.ministryoftesting.com)
* [The Test Chat - Telegram](https://bit.ly/TTCTelegram)
* [The Test Tribe](https://www.thetesttribe.com)
* [Testers Hangout - Discord](https://discord.gg/Nu64rg3EC2)
* [Testers Hangout - Google Hangouts](https://bit.ly/testerhangout)

### Cheat sheets

* [Software Test Planning Checklist - Ministry of Testing](https://www.ministryoftesting.com/dojo/series/the-testing-planet-2019/lessons/the-software-testing-planning-checklist)
* [Test Heuristics Cheat Sheet - Ministry of Testing](https://www.ministryoftesting.com/dojo/lessons/test-heuristics-cheat-sheet)
* [Testing Guid - Chris Kenst](https://guides.kenst.com/)

### Tools

* [FreeMind](http://freemind.sourceforge.net/wiki/index.php/Main_Page)
* [Miro](https://miro.com/)
* [Postman](https://www.postman.com)
  [Insomnia](https://insomnia.rest/)
* [Chrome Dev tools Docs](https://developer.chrome.com/docs/devtools/)
* [Resources for Software Testers - Ministry of Testing](https://www.ministryoftesting.com/dojo/series/resources) - Requires free login.
