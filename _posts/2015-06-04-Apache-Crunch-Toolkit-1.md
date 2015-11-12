---
layout: post
title: 'Apache Crunch Toolkit #1: Easily Run Jobs in Apache Crunch'
---

## Introduction to Apache Crunch

[Apache Crunch] is an incredibly useful Hadoop tool for extracting away the boilerplace produced by Java MapReduce jobs. Instead of clunky `map()` and `reduce()` methods, jobs are created as pipelines, similarly to Cascading. I've written a summary of Cascading vs Java MapReduce [here], and the majority of the discussion also applies to Crunch. There's also a great discussion of Cascading vs Crunch over at [Quora] - basically Cascading is good for jobs using basic data types with straightforward functionality, whereas Crunch is useful for more complex data types and algorithms.

Crunch has some pretty good credentials: it recently became a top-level Apache project and it's used in production by [Spotify]. Its in-built support for Avro is fantastic, and it provides enough control that it's possible to still write highly-efficient operations (with custom comparators) where required.

For the basics, read the official [Apache Crunch] Getting Started page. I found it to be very useful, but I think it misses one step that makes working with Crunch a breeze. That is the ability to easily run jobs. The Getting Started page requires you to have a Hadoop environment, and then requires you to spend time getting input data onto the HDFS, getting the Jar onto a job submission node... For someone just wanting to try out Crunch, it's unnecessary and could prove to be a turn-off. In facy, using Hadoop's local mode (which runs the job in a single JVM), it's possible to run a Crunch job incredibly easily and on a local machine. Here's how.

**This will only work with UNIX-based operating systems - sorry Windows users!**

## Using Local Mode with Apache Crunch
I've placed my modified fork of the [official Crunch demo] in my [GitHub repository]. I have modified one class (`WordCount.java`) and created another (`WordCountTest.java`). Simply fork as you would the `Getting Started` demo:

    git clone https://github.com/benwatson528/crunch-demo.git
    
To then run the pipeline (assuming `/tmp/crunch-demo/output/` is a directory that can be written to), execute:

    mvn package

And you've run a Crunch job! Alternately you can import the job into your favourite IDE and run the `WordCountTest.java` unit test. It's that simple! Let's look at how this works.

```java
public static void main(String[] args) throws Exception {
	Main(args, new Configuration());
}

/**
 * Having main() call this method means that we're able to grab exit codes
 * within unit tests.
 */
public static int Main(String[] args, Configuration conf) throws Exception {
	return ToolRunner.run(conf, new WordCount(), args);
}
```

Here my only changes are to modify the `main()` method and create a `Main()` method. The `Main()` method returns an integer based on the success of the job and so by extracting it from the `main()` method we're able to grab these integers.

```java
package com.example;

import static org.junit.Assert.assertEquals;
import java.io.File;
import org.apache.commons.io.FileUtils;
import org.apache.hadoop.conf.Configuration;
import org.junit.Before;
import org.junit.Test;

public class WordCountTest {
	Configuration conf;
	// An input file residing in /src/test/resources
	String sampleInput = Thread.currentThread().getContextClassLoader()
			.getResource("sample-text.txt").getPath();
	// The output is placed on my local file system
	String outputFolder = "/tmp/crunch-demo/output/";

	@Before
	public void setup() {
		FileUtils.deleteQuietly(new File(outputFolder));
		this.conf = new Configuration();
		// Runs any MapReduce jobs locally
		this.conf.set("mapreduce.framework.name", "local");
		// Uses the local file system instead of the HDFS
		this.conf.set("fs.defaultFS", "file:///");
	}

	@Test
	public void testWordCount() throws Exception {
		String[] args = new String[] { this.sampleInput, this.outputFolder };
		int result = WordCount.Main(args, this.conf);
		assertEquals(0, result);
	}
}
```

First we need to give the job input. `sampleInput` simply retrieves the path to a file in `/src/test/resources/` - in this case it's just a sample text file I found online. `outputFolder` refers to the machine's local file system. You can feel free to pipe the output into a location within the project directory; I'm just demonstrating that you can use any part of your local file system.

Next we use `setup()` to clear down the output folder and tell the job to run locally and using files on the local file system.

Finally the job itself is run from `testWordCount()`. `args` is constructed in the same way that it would be if the job was run using the standard `hadoop jar` syntax. `WordCount.Main()` kicks off the job and returns a `0` if the job has run successfully. That's all there is to it!

I should point out that it's unlikely a production-quality unit test would be written in this way. Here, our only verification that the job has run successfully is the return of an integer.


## Summary
This technique has many advantages. It makes testing a pipeline a one-second affair rather than a painful "build->scp->clear output directory->run" process. Additionally, nothing here is being mocked or hidden. A real Crunch job is being run, albeit on one node. If it runs in this framework it will run on a cluster. That means there's no need to hold your breath when running a new job on a cluster only to find that your unit tests have failed to test core Hadoop functionality.

It's also worth mentioning `MemPipeline` here. It enables Crunch pipelines to be run in-memory, so is also a good candidate for unit tests. However it doesn't have the full functionality of the `MRPipeline`, and I don't see the point of having tests that run differently to how the real job would run, especially when it's so easy to simulate the real thing.

[Apache Crunch]:http://crunch.apache.org/getting-started.html
[Spotify]:https://labs.spotify.com/2014/11/27/crunch/
[here]:https://hadoopathome.wordpress.com/2015/02/07/scalding-vs-java-mapreduce/
[Quora]:http://www.quora.com/What-are-the-differences-between-Crunch-and-Cascading
[GitHub repository]:https://github.com/benwatson528/crunch-demo
[official Crunch demo]:https://github.com/jwills/crunch-demo
