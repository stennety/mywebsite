---
layout: post
title: 'Kafka Streams and Drools - a lightweight real-time rules engine'
---

## Overview

About a year ago I delivered a POC for a client, combining [Spark Streaming](http://spark.apache.org/streaming/) and [Drools](http://www.drools.org/) to create a (near) real-time rules engine. Around the same time, Cloudera posted a [blog](http://blog.cloudera.com/blog/2015/11/how-to-build-a-complex-event-processing-app-on-apache-spark-and-drools/) in which they did the same thing. In both implementations, messages are delivered from an incoming Kafka topic to a Spark Streaming job which applies the Drools rules, and output is then placed onto an output Kafka topic.

However, this approach has downsides. Applying Drools rules to data isn't something that requires an advanced streaming engine, and so Spark is arguably overkill unless it's being used elsewhere in the solution. This is true of many of the ETL implementations of Spark that I see. Given that Cloudera's solution uses Kafka to move data to and from the Spark Streaming pipeline, it would be useful if Kafka itself could apply the Drools, cutting out Spark entirely.

## Kafka Streams

This is now possible thanks to the recent release of **Kafka Streams**. This new lightweight API (< 9000 lines of code) within Kafka allows data to be processed in real-time in the Kafka brokers themselves - no additional services need to be installed on the cluster, and no additional management or coordinator job is required. A full overview of Kafka Streams can be found on [Confluent's website](http://www.confluent.io/blog/introducing-kafka-streams-stream-processing-made-simple). For me the key sentence in that post is

> The gap we see Kafka Streams filling is less the analytics-focused domain these frameworks focus on and more building core applications and microservices that process data streams.

Clearly then Kafka Streams can provide a solution for allowing Drools to be applied in real-time, without the overhead and resource requirements of installing and maintaining Spark, especially in situations where Kafka is already being used as the messaging system.

## The Application

The application I have built uses a Kafka Streams pipeline to read data from a Kafka topic, apply a simple rule (if the input String contains an `e` it prepends the message with `0`), and write it to an output topic. The code for this application can be found [on my GitHub](https://github.com/benwatson528/kafka-streams-drools). It contains an integration test which sets up a local Kafka and Zookeeper environment (this won't work on Windows), which is probably the best starting point for investigating.

The application itself can be run by following the [Confluent Quickstart guide](http://docs.confluent.io/3.0.0/streams/quickstart.html), with the following amendments:

 1. Create the topics `inputTopic` and `outputTopic` (or change `config.properties` within the project before building it).
 2. Build the `kafka-streams-drools` project with `mvn clean install`, move the resulting far JAR onto the cluster, and then run it with `java -cp kafka-streams-drools-0.0.1-SNAPSHOT-jar-with-dependencies.jar uk.co.hadoopathome.kafkastreams.KafkaStreamsDroolsMain`. Do this step instead of executing the `./bin/kafka-run-class` command.

If a Kafka environment is already present, only follow step 2.

Part two of this blog post will look at using Docker to automate the Confluent Quickstart guide and automatically prepare the application.
