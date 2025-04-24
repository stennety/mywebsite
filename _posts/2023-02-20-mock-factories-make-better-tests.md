# Mock factories make better tests

![The inside of an old factory](https://res.cloudinary.com/formidablelabs/image/upload/q_auto,f_auto,w_1500/dotcom/mock-factory.png)

**Developers need a good way to produce mock data.  Here’s how we implemented a mock factory for an e-commerce site that’s simple, flexible, and fun.**

As developers, we use many different tools to test our software. Development servers, component playgrounds (like Storybook), and automated tests (like unit, integration, end-to-end, visual, performance). And there's one thing that all these tools have in common: **they need data**.  Which means, as the developer, **you** need data.

However, **real data** can be difficult to work with.  It might not be available, it might be slow, it might not cover edge-cases, and it might not yet have new features.

Having a good way to produce **mock data** makes all aspects of development easier! A mock factory makes it easy to generate mock data, which results in a project that's easier to develop and test.

In this article, I will share how we created [this mock factory for an e-commerce site](https://github.com/FormidableLabs/nextjs-sanity-fe/blob/main/packages/nextjs/mocks/factory/index.ts). The end result is simple, powerful, flexible, and fun to use!

## Where do we need mock data?

Everywhere.  Seriously.

**Automated tests** is probably the first scenario most people think of.  Unit tests, integration tests, visual tests, performance tests, and end-to-end tests all need data. A reusable mock factory will help every aspect of automated testing.

**Component playgrounds**, like Storybook, also benefit greatly from having realistic mock data to display, so that components can be shown in their full glory.

**Development servers** can use mock data too.  I’ve been on projects where the frontend is working far ahead of the backend, so we used a mock server for development.  Having a semi-realistic mock factory helped us maintain a high velocity without getting blocked!

You might even need to **seed a test database**.  A mock factory is perfect for generating a ton of data.

The beauty is: a single mock factory implementation can be used for ALL these use-cases!

## What makes a good Mock Factory?

First I’m going to share our end result, and later I'll share our implementation details.

### Getting data is incredibly easy

Need a mock `Product` or a mock `Category`?  *Easier done than said*!

```ts
const product = mock.product({}); 
// Returns an object like { id, name, image, price, etc... }
const category = mock.category({}) 
// Returns an object like { id, name, image, products, etc... }
```

These methods return fully hydrated, realistic data objects, without any effort.  All fields have reasonable default values.

### We provide our own values when needed

We override the default values by providing our own:

```tsx
const product = mock.product({ price: 5.99 });
render(<ProductCard product={product} />);
expect(screen.findByText("$5.99")).toBeInTheDocument();
```

This way, our tests do not rely on default mock values.  Instead, we use overrides to specify ************what matters************ for each scenario.  Clearly the `price` matters for this test.

This results in tests that are easier to understand, and resilient to change.

### We use randomized data

Real-world data is hard to predict.  Fields can be missing, arrays can be extremely large, strings can be long or short.  If you hard-code your mock values, you probably won’t encounter many edge-case scenarios.

For our mocks, we randomize the default values, which helps us find more edge-cases during development and testing.  Here’s an example, using some of the excellent randomization helpers from Faker:

```tsx
// Price is random:
const msrp = faker.datatype.number({ min: 2, max: 99 });
// 20% of items are on sale:
const price = faker.helpers.maybe(() => faker.datatype.number({ min: 2, max: msrp }), { probability: 0.2 }) || msrp;
// Choose a random size:
const size = faker.helpers.arrayElement([ 'x-small', 'small', 'medium', 'large', 'x-large' ]);
// Could be null:
const description = faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.8 }) || null;
```

### Our randomization has a constant seed

Using randomized data has a fundamental flaw: the tests need to be CONSISTENT too!

What if we write a test that *accidentally* depends on randomized data? We might get lucky, and it passes a few times, so we merge.  But CI randomly starts failing, and we can't figure out why, and can't reproduce locally (within a few tries) ... what a nightmare.

Fortunately, this can all be fixed with 1 line of code! Since we use Faker for all our randomization, we simply need:

```tsx
faker.seed(0);
```

By setting the random seed, `faker` will always generate the *same* randomized data each run!
So, if our "accidentally-depends-on-randomized-data" test fails, it should consistently fail, both locally and in CI.  This helps us identify and fix the problem, and ultimately end up with a higher-quality test.

## Our Mock Factory implementation

Fortunately, creating a mock factory, with all the above features, is really easy, and kinda fun!

For our small application, we created a single `MockFactory` class in vanilla JS (TS), with methods for creating each of our various data types.  An example:

```tsx
class MockFactory {
  product(data: Partial<Product>): Product {
    return {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.datatype.number({ min: 5, max: 99, precision: 2 }),
      images: [this.productImage({})],
      ...data,
    };
  }
  productImage(data: Partial<ProductImage>): ProductImage {
    return {
      id: faker.datatype.uuid(),
      url: faker.image.food(),
      ...data,
    };
  }
  // ... more factory methods ... //
}
// Export this as a singleton:
export const mock = new MockFactory();

```

For larger applications, we'd probably scale by splitting the factory into multiple classes, but the idea would remain the same.

### Uses Faker to generate interesting data

This is the fun part!

Faker provides [tons of categories of fake data](https://fakerjs.dev/api/).  It gives our mocks personality and flair, and makes it really easy to create semi-realistic (albeit silly) mockups!

```tsx
import { faker } from '@faker-js/faker';

faker.commerce.productName()
// Returns silly names like "Awesome Rubber Fish", "Practical Granite Gloves", and "Ergonomic Cotton Salad"
faker.hacker.phrase()
// "If we override the card, we can get to the HDD feed through the back-end HDD sensor!"
```

> 💡 Be sure to use the correct Faker package: `@faker-js/faker`  … the original project [ended in controversy](https://stackoverflow.com/a/70649268/272072).

### Leaning on Strong Types

All of our methods have a similar signature, that accepts a `Partial<TData>` and returns a complete `TData`.

To ensure that we don’t forget to mock any optional fields:, we also [use a `Complete<T>` helper](https://github.com/FormidableLabs/nextjs-sanity-fe/blob/c9f3cac26a06aed03a915c0102068b80a4c9c7f4/packages/nextjs/mocks/factory/index.ts#L250-L252):

```tsx
product(data: Partial<Product>): Product {
  const result: Complete<Product> = {
    // All fields are required:
    description: faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.8 }),
    ...data,
  };
  return result;
}
```

In this project, most of our types are generated from our GraphQL queries, so it’s wonderfully easy to update a query and get “notified” (by TypeScript) that our mocks need an update too.

### Nested data is composable

The `productImage` method could have easily been inlined, especially since it feels very specific to the `product` data.

However, by exposing it as a separate method, it becomes easier to build overrides:

```tsx
const productWithTwoImages = mock.product({
  images: [ mock.productImage({}), mock.productImage({}) ]
});
```

We expose the factory methods for most nested types, so that it's really easy to compose new mocks with overrides.

### Much More

Our full implementation can be found [in our `nextjs-sanity-fe` repository](https://github.com/FormidableLabs/nextjs-sanity-fe/blob/main/packages/nextjs/mocks/factory/index.ts).

Take a look to see how we solved:

- [Circular references](https://github.com/FormidableLabs/nextjs-sanity-fe/blob/c9f3cac26a06aed03a915c0102068b80a4c9c7f4/packages/nextjs/mocks/factory/index.ts#L85)
- [Sequential ID generation](https://github.com/FormidableLabs/nextjs-sanity-fe/blob/c9f3cac26a06aed03a915c0102068b80a4c9c7f4/packages/nextjs/mocks/factory/index.ts#L50-L54)
- [Generating arrays](https://github.com/FormidableLabs/nextjs-sanity-fe/blob/c9f3cac26a06aed03a915c0102068b80a4c9c7f4/packages/nextjs/mocks/factory/index.ts#L29-L33)
- [Ensuring random elements are unique](https://github.com/FormidableLabs/nextjs-sanity-fe/blob/c9f3cac26a06aed03a915c0102068b80a4c9c7f4/packages/nextjs/mocks/factory/index.ts#L35-L47)

### Alternative Approaches

Our approach was pretty simple, and relies on vanilla JavaScript with a sprinkle of Faker.

An honorable mention goes to `@mswjs/data`, which shares most of features that we've built.  Its main addition, however, is that it provides a way to query and mutate the data too.  This obviously pairs very well with `msw`, and lets you build a mock GraphQL or mock REST server very easily.  But that’s a topic for another article!


