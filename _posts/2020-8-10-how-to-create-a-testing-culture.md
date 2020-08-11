---
layout: post
title: How To Create a "Testing Culture"
---

I love writing unit tests.  I evangelize their value to teammates, and I'm always cultivating "testing culture" within my teams.  I've developed several projects that have very high coverage (~95%), and those projects are my absolute favorite to work in.

However, I've also seen many testing attempts fail. And it's always the same reasons:
- Deadlines - not enough time/resources to add tests
- Maintenance - Tests become outdated and obsolete
- Agility - specs aren't know ahead of time, so TDD doesn't really work
- Value - adding tests to existing code doesn't provide much value

**These failures are due to a common misunderstanding!**  There is a core testing concept that developers need to understand:

## Tests are not a finishing tool.  They're a building tool.  
If you're not using tests for building, you're missing the vast majority of their value!

Imagine you're building a **house of cards**.  The tests are like "scaffolding" built up, behind the cards, holding things securely in place.  
If you try to build the house first, and then add the scaffolding second, you're wasting your time!  The house is built; the scaffolding isn't critical. It might add ridgidity, but it becomes a hinderance as the house constantly changes.
Instead, imagine you add the scaffolding as you build each section of the card house.  Each section will be secure, and building on top of other sections is stable.  The scaffolding holds the little sections securely, and allows you to build faster on top. It allows you to move sections around, as the shape of the house changes.

So, to cultivate a "testing culture", **the tests need to be a development tool**.  In many cases, it could be your PRIMARY development tool!  Tests run fast, they can address every use case, they don't require user intervention or following instructions.  
So once you've started writing code, make it your top priority to run that code in a test runner.  You don't need assertions, you don't need to define all the specs just yet.  Just `console.log` something to the screen, so that you now have a **unit-test development environment**.  

When you have a unit-test development environment, the aforementioned problems are solved!  
- Deadlines - tests speed up the development process
- Maintenance - tests are updated during development
- Agility - specs are changed when the code changes
- Value - not only do the tests speed up development, but they also provide stability

When you see a codebase with a high test coverage, I can almost guarantee it's because the tests are the development environment.  That's how you maximize the value of tests, and how you cultivate a "testing culture".

# Real World Examples

Here are a few of the projects that I worked on that truly benefitted from unit-test development environments. Hopefully these demonstrate the value of the "unit-test development environment".

1. A deployment workflow chatbot. Manual testing was extremely difficult and time-consuming, due to many interconnected systems.  So I mocked them all out, and isolated the chatbot logic.  That allowed us to do 95% of our development from within unit tests, and only needed to manually test once ready to go into production.
2. A text-layout algorithm.  Manual testing involved running the entire application, getting text into the correct state, and visually inspecting it. Instead, the unit tests rendered the results directly to an image for inspection.  This allowed us to develop and test against 100s of scenarios and edge cases.
