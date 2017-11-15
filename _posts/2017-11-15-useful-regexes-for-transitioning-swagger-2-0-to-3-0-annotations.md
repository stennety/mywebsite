---
published: false
title: Useful Regexes for transitioning Swagger 2.0 to 3.0 annotations
---
The following are some useful regexes for transitioning Swagger 2.0 annotations to version 3.0 in Java.

## Remove @Api annotation

2.0:

```
@Api\(.*\)
```

3.0: Annotation no longer exists.

## @ApiOperation to @Operation

2.0:

```
@ApiOperation\(value = \"(.*)\"
```

3.0:

```
@Operation\(summary = "$1"
```

2.0:

```
response = (\w+).class
```

3.0:

```
content = @Content(schema = @Schema(implementation = $1.class))
```

## @ApiParam to @Parameter

2.0:

```
@ApiParam\(value
```

3.0: 

```
@Parameter\(description
```