---
layout: post
title: 'Testing HBase Applications with BDD Integration Tests'
---

In this blog post, we'll look at how it's possible to easily test HBase applications using business-driven development (BDD) and integration tests. The accompanying code for this tutorial can be [found on my GitHub].


## Why?

Applications that rely on big data technologies are often challenging to test. They can require lots of confusing mocking and complex test frameworks, making it difficult to write useful tests. Far too often I've seen tests that, when painfully unravelled, are just mocks testing other mocks, while the business logic (the thing you actually want to test!) goes untested.

Wouldn't it be great if you were able to easily test business logic against an locally-running instance of the big data technology you're running, with minimal configuration or boilerplate? That's where this tutorial comes in. We'll combine the popular BDD tool [Cucumber] with HBase's own integration testing tools to enable an HBase application to be easily and fully tested.


## Cucumber in <100 words

Tools like [Cucumber] make it easy to test business logic - business analysts can write requirements in a `Given`, `When`, `Then` format (known as [Gherkin]) that developers can then turn into tests. For example, a Gherkin Scenario (a single test) may take the form:

```gherkin
Scenario: Add a new car to the system
  Given a car to be added with registration "AB56 XYZ", model "Vauxhall Vectra" and production year 2016
  When the car is added
  Then the car can be retrieved
```

If the test passes, the business analyst and client can sleep happily knowing that the developer has implemented exactly what they want. If the test breaks six months from now, any member of the team can quickly identify what has broken, because it's written in plain English.

If we can write Cucumber tests that run as integration tests - over an actual instance of the technology we're using - we can have high confidence that our application will work in production.


## Integration Testing HBase

HBase has an easy-to-use integration framework called the `HBaseTestingUtility`. It quickly (~10s) spawns up a single-node HBase instance within the JVM in two lines of code:

```java
hbaseUtility = new HBaseTestingUtility();
hbaseUtility.startMiniCluster();
```

`HBASE_UTILITY.getConnection()` then provides the `Connection` we use to interact with HBase via the standard Java API.


## Putting it All Together and Analysing the Application

Let's now analyse the application I created to demonstrate how HBase applications can be BDD integration tested. Clone the application if you haven't already:

```bash
git clone https://github.com/benwatson528/hbase-bdd.git
```

Once inside the folder, run `mvn clean test`. In about 15s you should see `BUILD SUCCESS` - in that time, an actual HBase instance has been set up on your machine, data has been inserted and retrieved from it via our application, and it has all been wiped down. No need for Docker, VMs, or any manual effort!

The application itself is fairly trivial - users can pass a `Car` into `CarWriter`, and it is written to HBase, with the registration as the rowkey. As a result, the tests are straightforward - they just need to pass Cars in, and confirm that they look right when they're retrieved. The `CarWriter` class that we're testing looks like:

```java
public class CarWriter {
...
    public CarWriter(Connection connection) {
        this.connection = connection;
    }

    public void addNewCar(Car car) throws IOException {
        LOGGER.debug("Adding new car with registration {}", car.getRegistration());
        Table table = this.connection.getTable(TABLE_NAME);
        Put p = new Put(Bytes.toBytes(car.getRegistration()));
        p.addColumn(COLUMN_FAMILY, MODEL_COLUMN_QUALIFIER, Bytes.toBytes(car.getModel()));
        p.addColumn(COLUMN_FAMILY, PRODUCTION_YEAR_COLUMN_QUALIFIER, Bytes.toBytes(car.getProductionYear()));
        table.put(p);
        LOGGER.debug("Car successfully added");
    }
}
```

Now moving onto our test classes, we use two features of JUnit's [Rules] to get HBase working:
 - `ExternalResource` sets up an external resource (in this case the HBase test cluster) before any tests run , and then tears it down once all tests have finished.
 - `ClassRule` then tells the current test class that we want to use a given `ExternalResource`.

So we define our `HBaseTestServer` class as an `ExternalResource`:

```java
public class HBaseTestServer extends ExternalResource {
    private HBaseTestingUtility hbaseUtility;

    @Override
    protected void before() throws Exception {
        this.hbaseUtility = new HBaseTestingUtility();
        this.hbaseUtility.startMiniCluster();
        this.hbaseUtility.createTable(TableName.valueOf("cars"), "c");
    }

    public Connection getConnection() {
        try {
            return this.hbaseUtility.getConnection();
        } catch (IOException e) {
            throw new RuntimeException("Unable to get HBase connection, has the test been initialised correctly?", e);
        }
    }

    @Override
    protected void after() {
        if (this.hbaseUtility != null) {
            try {
                this.hbaseUtility.shutdownMiniCluster();
            } catch (Exception e) {
                throw new RuntimeException("Unable to close HBase connection", e);
            }
        }
    }
}
```

and then call it from the Cucumber runner `TestRunner` using the `@ClassRule` annotation:

```java
@RunWith(Cucumber.class)
public class TestRunner {
    @ClassRule
    public static HBaseTestServer HBASE_TEST_SERVER = new HBaseTestServer();
}
```

The `@RunWith(Cucumber.class)` annotation tells JUnit to run the test as a Cucumber test, which makes it look for `.feature` files and their corresponding Step definitions (in this case in `AddCarScenarios`) within the same package.

The Scenarios themselves are in `add-cars.feature`:

```gherkin
Feature: Adding cars to HBase

  Scenario: Add a new car to HBase
    Given a car to be added with registration "AB56 XYZ", model "Vauxhall Vectra" and productionYear 2016
    When the car is added
    Then the car is available in HBase

  Scenario: Add an old car to HBase
    Given a car to be added with registration "OLD 1", model "Rover" and productionYear 1970
    When the car is added
    Then the car is available in HBase
```

Notice how easy it would be to add a new test - even the business analyst could add one.

Finally, `AddCarScenarios` contains the code that performs each Step of the tests:

```java
public class AddCarScenarios extends TestRunner {
    private Car inputCar;
    private Connection connection;

    @Before
    public void setup() {
        this.connection = HBASE_TEST_SERVER.getConnection();
    }

    @Given("^a car to be added with registration \"([^\"]*)\", model \"([^\"]*)\" and productionYear (\\d+)$")
    public void aCarToBeAdded(String registration, String model, int productionYear) {
        this.inputCar = new Car(registration, model, productionYear);
    }

    @When("^the car is added$")
    public void theCarIsAdded() throws IOException {
        CarWriter carWriter = new CarWriter(this.connection);
        carWriter.addNewCar(this.inputCar);
    }

    @Then("^the car is available in HBase$")
    public void theCarIsAvailableInHBase() throws IOException {
        Table table = this.connection.getTable(TableName.valueOf("cars"));
        Get get = new Get(Bytes.toBytes(this.inputCar.getRegistration()));
        Result result = table.get(get);
        Car returnedCar = convertResultToCar(result);
        assertEquals(inputCar, returnedCar);
    }

    private Car convertResultToCar(Result result) {
        String registration = Bytes.toString(result.getRow());
        String model = Bytes.toString(result.getValue(Bytes.toBytes("c"), Bytes.toBytes("model")));
        int productionYear = Bytes.toInt(result.getValue(Bytes.toBytes("c"), Bytes.toBytes("productionYear")));
        return new Car(registration, model, productionYear);
    }
}
```

To access HBase, we get the open `Connection` from the running HBase instance. The `Car` is added into HBase via the `CarWriter`, and the HBase Java API is then used to retrieve it and ensure it has been stored correctly.

Notice there are no mocks at all in this code! We're running easy-to-understand test cases on an actual instance of HBase, and all in under 20 seconds.


## Summary

By now you should have a good idea of how to easily BDD integration test HBase. I've intentionally kept the code as minimal as possible to allow it to be used as a base for future projects, so feel free to fork (or just copy and paste!). As an aside, this isn't just limited to HBase - I've got Cucumber-based integration tests running in production on a system that uses HBase, Kafka, Solr and Zookeeper.

   [HBase]: https://hbase.apache.org/book.html
   [on my GitHub]: https://github.com/benwatson528/hbase-bdd
   [Cucumber]: https://cucumber.io/docs/reference
   [Gherkin]: https://cucumber.io/docs/reference#gherkin
   [Rules]: https://github.com/junit-team/junit4/wiki/rules
