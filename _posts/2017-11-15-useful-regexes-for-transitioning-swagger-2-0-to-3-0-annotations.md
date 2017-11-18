---
published: true
title: Transitioning Swagger 1.5 to 2.0 annotations
---
Transitioning Swagger annotations from version 1.5 to 2.0 can be a chore, as a lot changed with Swagger falling under the banner of the [Open API Initiative](https://www.openapis.org/). I wrote some RegExes that I found helpful for transitioning the annotations, and I hope they're useful for you as well.

## Remove [@Api](https://github.com/swagger-api/swagger-core/wiki/annotations-1.5.x#api)

In annotations 1.5, the `@Api` annotation was used at the class level to apply Swagger definitions to the operations. This is no longer the case. So, to update to annotations 2.0, remove all instances of `@Api`.

## Transition [@ApiOperation](https://github.com/swagger-api/swagger-core/wiki/annotations-1.5.x#apioperation) to [@Operation](https://github.com/swagger-api/swagger-core/wiki/Annotations-2.X#operation)

First, replace all instances of `@ApiOperation` with `@Operation`.

Then, run the following search-and-replace RegExes:

| Search        | Replace |
| ------------- |-------------|
| `(@Operation\([\s\S]*?)\bvalue\b` | `$1summary` |
| `(@Operation\([\s\S]*?)\bnotes\b` | `$1description` |
| `(@Operation\([\s\S]*?)\bresponse\b[\s]*?\=[\s]*?(\w+.class)` | `$1responses = {@ApiResponse(content = @Content(schema = @Schema(implementation = $2.class)))}` |

For reference, here's an example of the `@Operation` annotation in action.

```
@Operation(summary = "Finds Pets by status",
	description = "Multiple status values can be provided with comma seperated strings",
    responses = {
    	@ApiResponse(
        	content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = Pet.class))),
        @ApiResponse(
        	responseCode = "400", description = "Invalid status value"
        )
    }
)
```

## Transition [@ApiParam](https://github.com/swagger-api/swagger-core/wiki/annotations-1.5.x#apiparam) to [@Parameter](https://github.com/swagger-api/swagger-core/wiki/Annotations-2.X#parameter)

First, replace all instances of `@ApiParam` with `@Parameter`. 

Then, run the following search-and-replace RegExes:

| Search        | Replace |
| ------------- |-------------|
| `(@Parameter\([\s\S]*?)\bvalue\b` | `$1description` |


# Reference
- [Annotations-2.0.x](https://github.com/swagger-api/swagger-core/wiki/Annotations-2.X)
- [Annotations-1.5.x](https://github.com/swagger-api/swagger-core/wiki/annotations-1.5.x)
- [https://www.jetbrains.com/help/idea/regular-expression-syntax-reference.html](https://www.jetbrains.com/help/idea/regular-expression-syntax-reference.html)