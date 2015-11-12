---
layout: post
title: 'Apache Crunch Toolkit #3: Secondary Sort in Apache Crunch'
---

Secondary sorting is one of the most common requirements in data processing, and a staple of MapReduce. Let's look at Apache Crunch's support for it. The [Apache Crunch User Guide] does include some useful information on this, and an example is provided in the [Crunch source code], but there isn't really a good walkthrough anywhere.

## What is Secondary Sort?

Secondary sorting means that a group operation is performed on one field in the key but another component of the key is sorted on. This enables reducers to receive sorted values. Let's take a look at an example. Say we have some (very simple) HTTP logs showing who within a network has visited which domains. Each time someone visits a domain, it is appended to this list.

```
internalIp  externalDomain
10.1.1.3    google.com
10.1.2.4    news.com 
10.1.1.3    google.com
10.1.1.3    bbc.com
```

Now we've been assigned the problem of working out how many unique domains each person has visited. Maybe the most obvious solution would be to group by internal IP and then count how many distinct values exist. However that is very risky and inefficient as it requires us to store in memory the complete set of domains visited by an internal IP. For each new internal IP we iterate over, we have to then see if it's in that set, and add it if it's not. Once we've exhausted all values for that key we can sum the length of the list. Not ideal!

Let's introduce secondary sorting to solve this problem. If we group by internal IP but sort by external domain, we will get domains in alphabetical order following the grouping operation (custom sorting algorithms can also be implemented). For example, our value iterator for the key `10.1.1.3` in the data above would now look like:

```
bbc.com
google.com
google.com
```

To calculate the number of distinct domains visited we now just need to simply store the last domain we saw, and only increase the distinct count if the next domain we see is different. We avoid having to maintain a set of domains in memory.

## Implementing Secondary Sort in Apache Crunch

My complete code for secondary sort can be found on my [GitHub page]. Let's start by discussing the main `SecondarySortRunner` class and the outline of the code.

```java SecondarySortRunner.java
Pipeline pipeline = new MRPipeline(SecondarySortRunner.class, getConf());
PCollection<String> lines = pipeline.readTextFile(inputPath);
		
// Parse the log data into the correct format to be accepted by
// secondary sort
PTable<String, Pair<String, String>> parsedLogTable = lines.parallelDo(
		new HttpLogProcessor(),Writables.tableOf(Writables.strings(),
			Writables.pairs(Writables.strings(),Writables.strings())));
	
// Performs the secondary sort
PCollection<String> output = SecondarySort.sortAndApply(parsedLogTable,
		new CountUniqueDomains(), Writables.strings());
pipeline.writeTextFile(output, outputPath);
```
There are two key parts to the secondary sort operation: that which creates `parsedLogTable` and that which creates `output`. Basically, `parsedLogTable` is created by the `HttpLogProcessor` method, which parses our raw input data into the format which is accepted by Crunch's secondary sort calculator. We then call the Crunch library method `SecondarySort.sortAndApply()` to perform the secondary sort.

```java HttpLogProcessor.java
public void process(String line,
		Emitter<Pair<String, Pair<String, String>>> emitter) {
	splitString = line.split(TAB_SEPARATOR);
	emitter.emit(Pair.of(splitString[0],
			Pair.of(splitString[1], NULL_STRING)));
}
```

This class is responsible for parsing our raw input data. Crunch requires that data be a `Pair<String,Pair<String,String>>` if it is to be processed by `SecondarySort`. The key of the `Pair` is the primary group key - in this case the internal IP address. The first element of the value `Pair` is the secondary sort field - the field to be sorted on - in this case the domain. The second element is the value to be pulled through as normal. We leave this null as we don't use it.



As a disclaimer, this code has no error handling and should not be used in any kind of production environment. I just prefer to keep it short to aid in understanding.

```java CountUniqueDomains.java
public void process(Pair<String, Iterable<Pair<String, String>>> input,
		Emitter<String> emitter) {
	this.domainsVisited = 0L;
	this.currentDomain = "";
	this.previousDomain = "";

	// Looping through each external domain. Domains are sorted so a count
	// can be maintained rather than a set
	for (Pair<String, String> pair : input.second()) {
		this.currentDomain = pair.first();
		if (!this.currentDomain.equals(this.previousDomain)) {
			this.domainsVisited++;
			this.previousDomain = this.currentDomain;
		}
	}
	emitter.emit(input.first() + StringUtils.COMMA_STR
			+ this.domainsVisited);
}
```

This method demonstrates where we get the advantage of secondary sort. We don't have to maintain a set of domains here, and can instead rapidly iterate over our values, increasing a counter when the domain changes. We finish by emitting the internal IP and a count of the number of domains visited by it.


[Apache Crunch User Guide]:http://crunch.apache.org/user-guide.html#sorting
[Crunch source code]:http://grepcode.com/file/repo1.maven.org/maven2/org.apache.crunch/crunch-examples/0.4.0-incubating/org/apache/crunch/examples/SecondarySortExample.java
[GitHub page]:https://github.com/benwatson528/secondary-sort
