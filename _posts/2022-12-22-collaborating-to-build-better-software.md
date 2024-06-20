---
layout: post
title: Collaborating to build better software
description: >-
  A journey talking about testing and building better software though
  collaboration
image:
  path: /uploads/ben_ensemble_talk_header_1000x337.jpg
  width: 1000
  height: 337
  alt: >-
    Ben dressed as an elf with a santa hat giving his talk at Automation
    Advocates
category: Testing
tags: null
date: '2022-12-23 10:50 +0000'
---


## A goal for growth

This year I set myself a goal:

*Increase my confidence talking about software testing and bring my joy of testing to people who build software but are not specialised in testing.*

To kick things off I went in search of an audience that included developers, product managers, designers or other people involved in building software, but don't identify as Testers. The "shout it from the roof tops" method, thankfully my direct approach paid off, and via the power of the excellent software testing and development community, I found some opportunities to speak.

Over 2022, I developed an interactive talk and over 4 events I was able to speak to people about testing. I was honoured to be able to speak with 3 private companies, and at the Automation Advocates meetup. At all the events there was a mix of people who worked in different roles, developers, designers, product and project managers and of course plenty of testers as well for good measure.

## Talk the talk

### Setting the scene

I intentionally selected audiences from mixed backgrounds, roles and experience of software testing and quality. As such, I start off my talk with my take on the key themes of Quality, Testing and Ensembles.

#### Quality in Software

![Quality in Software Testing, Services and Solutions](/uploads/quality_in_software_1920x1080.jpg)

In summary, I described quality as the combination of:

* **Goodness**, emotional response. How a product or service makes you feel.
* **Usefulness**, how well can the user archive their goal that won't be to use the software, but to complete their task.
* **Correctness**, often the main focus and still important, but to be balanced with the first two aspects.
* From a **Perspective**, the perception of quality will be influenced by the one experiencing the software, their current mood, situation, intentions and experience with similar or competing products.
* At a point in **Time**, the perception of quality will change over time as user expectations evolve. Windows XP moved the quality of the Windows Operating system on a huge step when it was released, but is now considered outdated and would likely not meet user expectations of a modern operating system.
* Quality needs to be **Good Enough**, that is it should be good, and it should meet expectations, but perfect doesn't exist and we must be pragmatic how we balance different aspects of quality. What is good enough is highly dependant on context, for example you don't want to rush a Medical Device, but a game may deliver joy when only half finished.

You can read more about how I think about quality in my post, [What does quality mean to me?](https://www.dowen.me.uk/posts/what-does-quality-mean-to-me/)

A shout-out to [Dan Ashby](https://twitter.com/DanAshby04) and his post [Adapting Crosby’s 4 absolutes of quality into a software context](https://danashby.co.uk/2019/09/30/adapting-crosbys-4-absolutes-of-quality-into-a-software-context/), that has significantly influence my current thinking on quality.

#### Why do we test software?

![Why do we test software?](/uploads/why_test_software_1920x1080.jpg)

There maybe many reasons why you might want to test software. These are some of the reasons I test software:

* To learn, though investigation, how the software behaves in a given scenario. This helps us understand how that might make users feel (Goodness), and if it delivers the value with expect (Usefulness). From those learnings, the team can make informed decisions including changes to the design or implementation.
* To observe how the software behaves in a given scenario, under load or with a set of variables. To attempt to disprove our current hypothesis on how the software currently operates so we can work towards making it work the way we intend (Correctness).
* To prevent predictable failures, this is very much inline with the formal definitions and is often the sole focus for testing. Preventing failures is important, but not sufficient in the context of my understanding of Quality.
* To improve, by getting a better understanding of the software we can notice opportunities to add functionality and improve quality. These are not defects, but opportunities to make improvements that may not have already been noticed.
* To ship software, with confidence we understand the current state of quality inline with our context and appetite for risk.
* Money, in many aspects. Including Software Testing being my career, I test because I get paid. But also, we test software to reduce avoidable costs from uncaught defects that become production incidents.

What might software testing look like tomorrow? I've already started thinking about this, in my post [The Future of Software Testing](https://www.dowen.me.uk/posts/the-future-of-software-testing/).

#### Pair and Ensemble Testing

![Ensemble Testing](/uploads/emsemble_testing_1920x1080.jpg)

Ensemble working is the new name for what you might know as mobbing or mob programming. It is a way of working where a multi-disciplinary team all work on the same thing, at the same time, around the same computer. Ensemble testing is using the ensemble way of working, to carry out a software testing activity. While this works especially well for Exploratory Testing, it could work for any testing activity including test analysis, design and even coding automated checks.

This year, I've focused on two complimentary elements of Software Testing, *Collaboration* and *Exploration*. I've carried out regular ensemble testing sessions with Medical Knowledge Engineers at Ada, the Medical Doctors who code our Medical Knowledge. This has been a hugely rewarding experience, where we have learned a lot together, including how to successfully work together working on the same work, at the same computer, at the same time (Ensemble).

Throughout our sessions we carried our regular reflections, and I gathered some great feedback. This is what I learned:

* In my experience, ensembles are very powerful in groups of 2-6. However I'm very keen to see how far I can scale to large groups in special contexts.
* Having different people, who have a range of live experience and expertise brings significant value that is hard to match with solo testing.
* Diversity of thought was a huge advantage time and time again during testing sessions, because by thinking about things in different ways and from different perspectives we found potential issues that would otherwise be easy to miss.
* Verbalising and taking deliberate actions as a group helped us share knowledge quickly as we worked on our ask. For example, engineers in the group picked up on different tools and using those tools in different context than they would normally do.
* We all learned more depth about why others do things a given way, that helps us reflect on why we do things our way.
* When the right people are in the room, we can take quick and decisive action, such as making the choice to change a model or design during a testing ensemble.
* Though the combination of diversity of background, thinking and roles we were able to notice and reduce some of our bias in our work. For example bringing understanding of the problems around access to health care in some regions into our shared context while testing medical models.
* The experience of working in paris and ensemble groups was sociable, and a lot of fun, compared to what was previously a lonely task. This was especially true for those working remote.

### Ensemble, Leaning Together

Each of the four times I've run the event so far, I have engaged with the audience to form an ensemble, and together we worked though 3 questions. Collectively we came up with talking points, thoughts, answers and further questions based on the ordinal questions posed.

Each time I ran the session, there were different unique points that the ensemble came up with. While there were some recurring themes, each time we had different examples and perspectives on the those common points, and some points there were unique to the group.

### 3 Questions

Let us take a look now at the 3 questions, I will include the output from the ensemble with the group for the [Automation Advocates Meet-Up](https://www.meetup.com/automation-advocates/), because this was the most recent and was a public event.

In order to provide a prompt, I used a prop for the discussion in the form of a very basic requirement with 3 acceptance criteria.

Requirement: *Users must be able to login to the web shop*

1. Login is accepted for valid users
2. Login is rejected for invalid users
3. Multiple failed attempts blocks further attempts

I also encouraged conversation from the experiences of teh group, that were not focused on the basic web shop example.

#### Why might it not be enough to simply check acceptance criteria have been met?

![Why might it not be enough to simply check acceptance criteria have been met?](/uploads/why_checking_acceptance_critira_is_not_enough_1920x1080.jpg)

Spoiler alert, it isn't enough simply to check acceptance criteria have been met. Discussion with this ensemble, similar to the past groups came up with some of the following themes:

* Missing detail not covered by the webshop requirement or the acceptance criteria for example:
  * What session management? Logout, session times out?
  * What happens with lost credentials, will there be password reset?
  * Can users ever be unblocked, after failed login attempts?
* Operational, or non-functional requirements that might be implied, such as:
  * Security
  * Performance
  * Accessability and other 'illities
* Vague, ambiguous, missing or unspecified details
* Validity of the acceptance criteria themselves
  * Where did these criteria come from?
  * Is there opportunity to add more criteria when we think of them later?
* And finally, do we understand the problem being solved sufficiently in the first place

In conclusion, user stories with acceptance criteria are an example of *explicit* requirements. The main reason checking these alone is not enough is because there are also many implicit requirements we need to consider.

Resources to learn more about these topics:

* [EXPLORING NON FUNCTIONAL REQUIREMENTS BY FINDING LOW HANGING FRUIT
](https://cakehurstryan.com/2022/01/13/exploring-non-functional-requirements-by-finding-low-hanging-fruit/) - by [Callum (Ryan) Akehurst-Ryan](https://www.linkedin.com/in/cakehurstryan/)
* [Testing Against Acceptance Criteria And Beyond | Interview with Ben Dowen](https://youtu.be/OKCQHOkve-E) - by [Nicola Lindgren](https://www.linkedin.com/in/nicolalindgren/)
* [Step by step guide: Testing without requirements little requirements](https://nicolalindgren.com/step-by-step-guide-testing-without-requirements-little-requirements/) - by [Nicola Lindgren](https://www.linkedin.com/in/nicolalindgren/)
* [A11Y WITH ADY: SIMPLE TESTS FOR ACCESSIBILITY EVERY TESTER SHOULD KNOW](https://www.thebigtesttheory.com/blog/2022/11/5/a11y-with-ady-simple-tests-for-accessibility-every-tester-should-know) - by [Ady Stokes](https://www.linkedin.com/in/a11yadystokes/)

#### How can we make implicit requirements explicit?

![How can we make implicit requirements explicit?](/uploads/make_requirements_explicit_1920x1080.jpg)

So, wer now know checking explicit requirements, such as user stories with acceptance criteria is not enough, and there are loads of missing or implicit requirements. So how can we expose those implicit requirements, and make them more explicit?

Again, as an ensemble we came up with some great answers and had some great discussions. I also got some good answers across other ensembles and I've done some thinking on this myself, collectively the highlights are:

* Conversations, with stakeholders, users, anyone involves in building or using the software
* Modelling, by capturing models of the way the system is expected to behave we can have better conversations, such as:
  * State transition diagram
  * Work flow and data flow diagrams
* Low fidelity wire-frames
* Mock ups and prototypes
* User testing
  * Interviews and observations
  * Focus groups
* Pair and ensemble testing
* Example Mapping and BDD
* Standards, guidance and recommendations
* Service Level Agreements and Service Level Objectives
  * Downtime
  * Response latency
  * How fast incidents are resolved
* Threat Modelling  
* Risk Storming

Resources to learn more about these topics:

* [Step by step guide: Testing without requirements little requirements](https://nicolalindgren.com/step-by-step-guide-testing-without-requirements-little-requirements/) - by [Nicola Lindgren](https://www.linkedin.com/in/nicolalindgren/)
* [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
* [UK Government Design System](https://design-system.service.gov.uk/)
* [The Open Web Application Security Project® (OWASP), Top Ten](https://owasp.org/www-project-top-ten/)
* [Let's Go Threat Modelling](https://www.ministryoftesting.com/dojo/lessons/let-s-go-threat-modelling) - by [Richard Adams](https://www.linkedin.com/in/richard-adams-9613b47/)
* [The Power of Example Mapping!
](https://www.ministryoftesting.com/dojo/lessons/the-power-of-example-mapping) - by [Kiruthika Ganesan](https://www.linkedin.com/in/kiruthikaganesan/)
* [RiskStorming In Agile Teams With TestSphere](https://www.ministryoftesting.com/dojo/lessons/riskstorming-in-agile-teams-with-testsphere) - by [Gem Hill](https://www.linkedin.com/in/gem-hill-69644a71/lisi)

#### How can we get a better outcome by testing together, in pairs and ensembles?

![How can we get a better outcome by testing together, in pairs and ensembles?](/uploads/better_outcomes_together_1920x1080.jpg)

The third and final question starts to get a bit meta, as ensemble we collaboratively come up with ways we can use collaborative working to get better outcomes. We need not limit ourselves to the activity of testing, although that is the main focus still.

The themes this time are:

* Benefits we get, when we do work together
  * Shortcuts we can learn from each other, be that literal keyboard shortcuts or ways of getting the system into a given state quickly
  * By bringing in people with coding skills, we can create tools to support our testing as we go
  * If we find problems during testing, we can dig deeper and go directly into debugging, even fixing issues together live
  * It's a great opportunity to build empathy and teamwork
* How we can best work together
  * Bringing in diverse skills and experience, "fresh eyes" can be very useful
  * Have conversations and communicate, within the ensemble and with the wider team
  * Find new, better questions to ask, of ourselves and the software

There are loads of amazing resources to learn more about working collaboratively, in an ensemble or otherwise. My esteemed colleague and international speaker [Lisi Hocke](https://www.lisihocke.com/p/about-me.html) has compiled a fantastic list, recommend you check it out if you want to learn more:
[Recommended Resources: Collaboration](https://www.lisihocke.com/p/collaboration.html#ensemble)

## In reflection

Well done on getting this far! I will now take a moment to reflect on how I think things went.

### Did I meet my goal?

Yes, I am now more comfortable speaking about testing to mixed groups. I have a long way to go to be as good as I want to be at both speaking and sharing the joy of testing, but I've made a start I'm proud of.

I really enjoyed the interactive, slides + short ensemble workshop style, and I want to see if I can build on this for future talks.

### What would I do differently?

I would put more effort into working my example requirement. I brought it in as a prop, based on feedback, shortly before the first time I gave the talk. And while I had time to improve it between events, I didn't invest such time.

Another thing I would do differently is try and keep the theme a bit tighter. This talk crossed purposes, talking about implicit and explicit requirements, and ensemble testing. While they did add together to add value, next time I want to either spell that out more explicitly, or pick a more tightly related theme.

### Whats next?

I don't currently have any plans to run this talk again, at least not in it's current form. I'm hoping to start dreaming up version 2.0, evolving the format and refining the theme. If you have any feedback for me, it would be very much appreciated and I will try and use it for future talks.

If you're very keen on me running the talk again with your team, or for your meetup, I could be convinced. So feel free to get in touch.

## Watch the Recording

In the mean time, the event for [Automation Advocates Meet-Up](https://www.meetup.com/automation-advocates/) was recorded, and is available for free on [YouTube](https://youtu.be/CvSTtOtx3BE), so if you want to watch it for yourself jump right in!

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/CvSTtOtx3BE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
