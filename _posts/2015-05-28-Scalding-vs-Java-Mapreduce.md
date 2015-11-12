---
layout: post
title: 'Scalding vs Java MapReduce'
---

## Introduction

A while ago I was fortunate enough to attend a great talk from [Antonios Chalkiopoulos], one of the creators of Scalding. It's basically a Scala interface on top of Cascading which purports to enable much faster development of MapReduce jobs by providing an easy abstraction. Additionally, it is much easier to use than Java MapReduce when it comes to chaining jobs - large workflows with multiple splits, merges and joins can be implemented, and the user doesn't have to worry about writing code to deal with writing to and reading from disk inbetween stages.

Its word count example (taken from [Scalding - Getting Started]) is achingly concise:

```scala
import com.twitter.scalding._

class WordCountJob(args : Args) extends Job(args) {
  TypedPipe.from(TextLine(args("input")))
  .flatMap { line => line.split("""s+""") }
  .groupBy { word => word }
  .size
  .write(TypedTsv(args("output")))
}
```

That's eight lines of code. The [official] Java MapReduce word count example is over fifty!

## So RIP Java MapReduce?

Let's not burn our Java MapReduce textbooks just yet... As a developer, I tend to use Java MapReduce when no other solution will work. Java MR might be old, but it is still the only tool that can solve certain large-scale problems. Sometimes development might take a while, but in the end I'm left with a job that does exactly what I want, and about as efficiently as I can get it on a Hadoop environment. This is achieved through several things, such as re-use of variables (i.e. never creating a variable inside a map or reduce method) and custom byte comparators.

Whenever I see a new tool offering a replacement to MapReduce (OK maybe Scalding isn't so new any more), there are always three questions I ask:

### 1. Will it still enable a sufficient level of configurability?

To cut a long story short, yes. Scalding offers configurable source and tap creation, so reading or writing any format shouldn't be a problem.

### 2. Will it be as efficient as Java MapReduce?

To answer this question, we really need to know what is going on under the hood. Currently, the [official Cascading docs] indicate that a Scalding flow will be transformed into a set of Java MapReduce jobs before being executed. So whilst the developer doesn't have to deal with writing to disk after each stage, the job itself still does. We can't really complain here though, as aside from the expected overhead from coding an abstraction this can't make it any less efficient than Java Mapreduce.

There's also good news on the horizon as Hortonworks have enabled [Tez support] for Cascading, and are currently in the process of enabling it for Scalding. This will enable much more efficient processing of jobs with multiple stages, as Tez is created to run exactly the kinds of workflows that Scalding can create, and removes the overheads of intermediate reducer writes, map reads and long job launch times.

Another efficiency issue is around Scala itself. With Java it's possible to be very efficient by re-using variables, and being sure to never create a new variable within a mapper or reducer. Scala might not be able to offer that level of efficiency. Additionally, [Benchmarks Game] indicates that Scala is only about 80% as fast as Java.

The final main efficiency worry is around joining. In Java MapReduce it's possible to implement byte comparators to ensure that joins are as efficient as needed. It doesn't appear as though Scalding offers that level of configuration, which may be an issue for some jobs. However Scalding does come with several different types of joins built-in, so it should be possible to get decent performance in most circumstances.

### 3. Will developers be able to pick it up and understand it easily?

Scala isn't a language that many people use on a regular basis. Combine that with the still relatively-uncommon knowledge of MapReduce, and it doesn't look good for Scalding. It's not much use converting 500 lines of Java MR into 15 beautiful lines of Scalding if you're the only person in the development team who can understand it.

However, Scalding has some advantages. Scala is really accelerating in popularity, especially with its use in Apache Spark. This [Typesafe] survey indicates that 88% of Apache Spark users use Scala, and so it's clearly a language worth leaning for anyone dealing with big data. It's also pretty well-supported, and there are lots of good tutorials online for anyone who's interested in learning it.

Scalding's main advantage comes into play here too - it's very easy to use it to write MapReduce jobs after picking up the basics. Chaining six MapReduce jobs together would be a nightmare in Java and would take days to implement for even simple operations, but in Scalding it's almost effortless. Additionally, whilst it isn't possible to write jobs as efficiently as in Java MapReduce, it's a lot more difficult to write a job to be as inefficient as an inefficient MapReduce job. This will aid newer developers. It's also much quicker to "sketch out" a job in Scalding than in Java, so would be very useful for planning jobs before they're productionised.

## Summary

Clearly Java MapReduce isn't dead. For use cases requiring very efficient jobs, it's the winner. However, Scalding looks very interesting for jobs requiring multiple stages that maybe don't need to squeeze every ounce of efficiency from a job.

[Antonios Chalkiopoulos]:http://scalding.io/
[Scalding - Getting Started]:https://github.com/twitter/scalding/wiki/Getting-Started
[official]:http://hadoop.apache.org/docs/r1.2.1/mapred_tutorial.html#Example%3A+WordCount+v1.0
[Hortonworks Sandbox 2.2]:http://hortonworks.com/hdp/downloads/
[official Cascading docs]:http://docs.cascading.org/cascading/2.6/userguide/html/ch14.html
[Tez support]:http://hortonworks.com/blog/cascading-on-apache-tez/
[Typesafe]:https://typesafe.com/blog/why-enterprises-of-different-sizes-are-adopting-fast-data-with-apache-spark
[Benchmarks Game]:http://benchmarksgame.alioth.debian.org/u32/which-programs-are-fastest.php?java=on&scala=on&calc=chart
