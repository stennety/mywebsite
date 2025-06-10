---
layout: post
title: "Non-Functional Requirements (CS1040 – Program Construction)"
tags: [cs1040, software-engineering, requirements]
categories: [software-engineering, university-notes]
---

## 1. What is Program Construction?

**Program Construction** is the systematic process that takes you from understanding what the user wants, to delivering a fully working program.  
It covers everything: **hardware, software, users, the environment, and rules.**  
**Programming** is just the *coding part* of this big process.

---

## 2. Phases in Program Construction

- At the **system level**: You start with what the customer wants and define requirements, design the system, and validate if the design matches what the customer needs.
- At the **software level**: You analyze what the software must do, specify those requirements, design the software, break it into modules, code, test, deploy, and maintain it. You also check if the software does what you planned (verification).

---

## 3. Types of Requirements

### 1. Functional Requirements

- **What** the system does.
- Specific actions or functions (e.g., "The system must allow users to log in.")
- Often described by:
  - Functionality (what it must do)
  - Behavior (how it reacts to inputs)
- **Example:** “Record the start and end of a rainfall event.”

### 2. Non-Functional Requirements

- **How** the system works (qualities, properties, constraints).
- Usually end in “-ility” (like *usability*, *reliability*, *scalability*) or “-ness” (like *user-friendliness*).
- These are more about the “quality” of the system, not what it does, but *how well* it does it.
- **Examples:** Performance, security, efficiency, maintainability.

---

## 4. Non-Functional Requirements: Details

- Called **“illities”** because many end with *-ility* (e.g., usability, reliability).
- Often subjective, vague, or even conflict with each other (making something very fast might use more power, for example).

### Common Non-Functional Requirements:

- **Performance** (How fast? How responsive?)
- **Usability** (Is it easy to use?)
- **Security** (Is it protected against unauthorized access?)
- **Reliability** (Does it work consistently?)
- **Maintainability** (Is it easy to fix or update?)
- **Portability** (Does it work on different platforms?)
- **Scalability** (Can it handle growth?)
- **Efficiency** (Does it use resources well?)

And many more: flexibility, availability, safety, correctness, etc.

---

## 5. Examples from the Slides

- **Performance:** For a web app, it’s how quickly it loads. For ML, it’s how fast the model trains.
- **Usability:** How quickly and easily can a user get things done? (Jakob Nielsen’s 0.1s, 1s, 10s rule: under 0.1s feels instant, under 1s is OK, over 10s is too slow.)
- **Security:** Protecting data and processes from unauthorized use; mapped to functions like login (authentication), permissions, and encryption.

---

## 6. Summary Table

| Functional Requirements | Non-Functional Requirements                            |
| ----------------------- | ------------------------------------------------------ |
| What the product does   | How the product works                                  |
| Define features         | Define qualities/properties                            |
| Focus on user needs     | Focus on user expectations                             |
| Use Cases               | Quality attributes                                     |
| Mostly from user        | Often set by developers/experts                        |
| Tested as features      | Tested as qualities (performance, security, usability) |

---

## Why Does This Matter?

- Both types of requirements are **essential**: Functional requirements ensure the product does what users need; non-functional requirements make sure it’s *good to use* (fast, secure, reliable, etc.).
- Poorly defined non-functional requirements can ruin user satisfaction, even if all the functional features work!

---

*If you want detailed explanations or examples for any specific “-ility” or a certain non-functional requirement, let me know!*
