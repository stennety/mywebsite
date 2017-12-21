---
published: false
title: 'CompletableFutures: A Primer '
---
[CompletableFutures](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html) are constructs in Java that are very useful for writing clean, concurrent code. Most of the methods around CompletableFutures return stages, which represent asynchronous tasks that can trigger other stages, or return values in the future.

Three of the most useful methods in CompletableFutures are:
- [thenAccept](https://docs.oracle.com/javase/9/docs/api/java/util/concurrent/CompletableFuture.html#thenAccept-java.util.function.Consumer-): Takes the result of a previous CompletionStage, does something with it, and returns a void CompletableFuture.
- [thenApply](https://docs.oracle.com/javase/9/docs/api/java/util/concurrent/CompletionStage.html#thenApply-java.util.function.Function-): Takes the result of a previous CompletionStage and applies a function to it. This method behaves analogously to a [map](https://www.mkyong.com/java8/java-8-streams-map-examples/) operation.
- [thenCompose](https://docs.oracle.com/javase/9/docs/api/java/util/concurrent/CompletableFuture.html#thenCompose-java.util.function.Function-): Takes the result of a previous CompletionStage and asynchronously applies a function to it.

It's easy to mix up thenCompose and thenApply. [This thread](https://stackoverflow.com/questions/43019126/completablefuture-thenapply-vs-thencompose) on StackOverflow helps to shed some light on the differences.






