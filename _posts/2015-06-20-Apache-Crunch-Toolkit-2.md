---
layout: post
title: 'Apache Crunch Toolkit #2: Viewing Pipeline Execution Plan Visualisations'
---

## What is a pipeline execution plan visualisation?

Apache Crunch has in-built support for creating `dot` files which visually show how Crunch pipelines are executed under-the-hood. For example, a simple operation involving a `GroupByKey()` and a `count()` may produce the following diagram:

<img src="http://i.imgur.com/UdrddPO.png" alt="A pipeline execution plan visualisation for Apache Crunch" />

## Why are they useful?
Crunch can sometimes provide several different ways to solve a problem, and it can be difficult to know which solution is best without delving into source code. Viewing a graph representation of the execution plan allows you to ensure that the job is being processed in the way you expect. In future blogs on Crunch I'll be looking at different ways in which problems can be solved and using these graphs often.

## How do I create a pipeline execution plan visualisation?
Simply add an output directory for the file to be stored in into the `Configuration()` object - this currently only works with the `MRPipeline`. I am using Crunch version `0.11.0-hadoop2`:

```java
...
public int run(String[] args) throws Exception {
    Configuration conf = getConf();
    conf.set("crunch.planner.dotfile.outputdir", "/tmp/crunch-demo/dot/");
    ...
```

and run the job. A file will now be created in that location.

## How do I view the visualisation?

There are several options for viewing `.dot` files. [Graphviz] appears to be the most popular tool, and there is also the browser-based [Erdos]. However I have experienced some issues with Erdos being unable to display more complicated graphs.


[Graphviz]:http://www.graphviz.org/
[Erdos]:http://sandbox.kidstrythisathome.com/erdos/
