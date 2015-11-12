---
layout: post
title: 'Apache Flume Interceptors: Modifying Records'
---

## Overview
Apache Flume offers interceptors as a way of modifying records (known in Flume as events) as they pass through a Flume channel. This is fairly well-documented in the [official Flume documentation] and in a handful of blog posts, but most centre on implementations that only change the event header. In this blog post I'll be looking briefly at what Flume events are, and will then be showing an example of how to create a custom Flume interceptor that can modify an event body.

## Flume Events
Flume events consist of two components: the **header** and the **body**. The event header is useful for storing key-value information that can define how to deal with the data - for example the in-built Host interceptor adds the hostname of the Flume agent's host to the header. Flume configuration can then be used to send events to different channels based on which hostname is present.

![A Flume event](http://i.imgur.com/uIe8eQE.png "A Flume event")

The event body contains the event information itself - in most cases this will be a line of text converted into a byte array. In the event of an Avro source being used, the event header will contain the schema and the body will contain the Avro record itself.

## Modifying the Event Body
Interceptor tutorials and those bundled with Flume mostly concentrate on how to modify or use the header. These aren't much use if you want to modify the raw data records themselves as they flow through the channel. Uses of this include:
 - Adding additional information,
 - Data cleansing,
 - Filtering data based on information within the body.

Our example will look at the first situation. Let's assume we want to add the time in nanoseconds at which each record is processed to the file. It's worth noting here that Flume currently cannot guarantee order, so this can't be used to work out an ordering. Code for this is included in my [GitHub repository] - see that if you want the full code, including unit tests and Maven POM.

## Code

This code is an adapted version of `[org.apache.flume.interceptor.TimestampInterceptor]`. The key differences are:
 - Enabling a configurable separator to be added through configuration,
 - Changing the timestamp from seconds to nanoseconds,
 - Appending the timestamp to the event body rather than adding it to the header.

The key method here is:

```java
public Event intercept(Event event) {
   byte[] eventBody = event.getBody();
   event.setBody(appendTimestampToBody(eventBody, System.nanoTime()));
   return event;
}
```
in which the event body (a `byte[]`) is retrieved and modified.

The configurable separator is added through modifying the `Builder` class, which is responsible for instantiating the interceptor. The `configure(Context context)` method provides access to properties from the Flume `.conf`. We use this to retrieve the separator and pass it into the main `intercept(Event event)` method:

```java
...
@Override
public Interceptor build() {
    return new TimestampBodyInterceptor(this.separator);
}

@Override
public void configure(Context context) {
    this.separator = context.getString(Constants.SEPARATOR);
}
...
```

## Installing

To install this interceptor (assuming you have Flume installed and running):

 1. Check out this code: `git clone https://github.com/benwatson528/flume-timestamp-body-interceptor.git`
 2. Modify the `<flume.version>` property in `pom.xml` to correspond to your version of Flume
 3. Build it: `mvn clean package`
 4. Copy the jar generated in the `target` directory into `<flume-home>/lib`
 5. `vim <flume-home>/conf/flume.conf` (or whatever the config file is):
```
a1.sources.r1.interceptors = i1
a1.sources.r1.interceptors.i1.type = uk.co.hadoopathome.flume.timestampbodyinterceptor.TimestampBodyInterceptor$Builder
a1.sources.r1.interceptors.i1.separator = ,
```

Restart Flume and your data should now be appearing in the sink location with the timestamp appended to each record.

[official Flume documentation]:https://flume.apache.org/FlumeUserGuide.html#flume-interceptors
[GitHub repository]:https://github.com/benwatson528/flume-timestamp-body-interceptor
[org.apache.flume.interceptor.TimestampInterceptor]:http://grepcode.com/file/repo1.maven.org/maven2/org.apache.flume/flume-ng-core/1.2.0/org/apache/flume/interceptor/TimestampInterceptor.java
