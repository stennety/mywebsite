---
published: false
title: What's up with the "zz" convention in Java?
---
Sometimes you'll come across a `clazz` variable in Java code. I got curious and dug into where this originated from. I found [this answer](https://stackoverflow.com/questions/2529974/why-do-java-programmers-like-to-name-a-variable-clazz) on StackOverflow:

> clazz has been used in Java in place of the reserved word "class" since JDK 1.0. "class" is what you want, but abbreviating or inserting junk ("a", "the", "_", etc) reduces clarity. clazz just says class. "International" English speakers (those reading both English and American) are used to transposing 's' and 'z'. Since Java has had disclosed source and a suitable culture right from the start, worthwhile Java code and tutorials pick up the same conventions. That's one of the great things about the Java ecosystem, which I think has been an important part of its success.


