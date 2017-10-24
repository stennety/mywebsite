---
published: false
title: Fluent Interfaces and the Builder Pattern
---
I'd been using [fluent interfaces](https://en.wikipedia.org/wiki/Fluent_interface) for a long time without realizing that there was a distinction between some implementations of them and the [Builder Pattern](https://en.wikipedia.org/wiki/Builder_pattern).

A fluent interface allows method chaining to relay the context to subsequent calls. The term, "fluent interface," was coined in 2005, although this style can be found being used much earlier than that.

You may come across something like this (seen in an implementation of [OpenAPI](https://github.com/swagger-api/swagger-core)):

```
public void setInfo(Info info) {
    this.info = info;
}

public OpenAPI info(Info info) {
    this.info = info;
    return this;
}
```

The `setInfo()` method has a void return type. It simply sets a parameter on an object, without returning the object back or any context. It cannot be chained with other methods, so in this way, it's not fluent. If used in the builder pattern, it would look like this:

```
OpenApiBuilder openApiBuilder = new OpenApiBuilder;
openApiBuilder.setInfo(myInfo);
openApiBuilder.setReader(myReader);
openApiBuilder.setScanner(myScanner);
OpenApi openApi = openApiBuilder.build();

```

The `info()` method, however, is a fluent interface that returns the object being built.

This allows for chaining. For example:

```
OpenApi openApi = new OpenApiBuilder.info(myInfo)
				  .reader(myReader)
                  .scanner(myScanner)
                  .build();
```

Which is much cleaner and more readable.