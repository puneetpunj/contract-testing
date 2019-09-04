# PACT Framework

## **Introduction**

This is a simplified version of PACT example provided on official pact-foundation repo [pact-js](https://github.com/pact-foundation/pact-js)

Definition on https://docs.pact.io/

"Pact is a contract testing tool. Contract testing is a way to ensure that services (such as an API provider and a client) can communicate with each other. Without contract testing, the only way to know that services can communicate is by using expensive and brittle integration tests."

Pact is a way to unit test between API provider and consumer whether contract is established or not.

### **Consumer Driven Contracts**

Pact is a consumer-driven contract testing tool. This means the contract is written as part of the consumer tests. A major advantage of this pattern is that only parts of the communication that are actually used by the consumer(s) get tested. This in turn means that any provider behaviour not used by current consumers is free to change without breaking tests.

Unlike a schema or specification (eg. OAS), which is a static artifact that describes all possible states of a resource, a Pact contract is enforced by executing a collection of test cases, each of which describes a single concrete request/response pair - Pact is, in effect, "contract by example".

## **Detailed Explanation of this Framework**

This example is considering both consumer and provider. in a typical application development these two are different parties acting independently.

### **app**

This contains Provider's application who need to validate each consumer's contracts in its local enviroment.
provider.js is the actual application which provides stores and provides animal details.

### **pacts**

This is the centralised placed where consumer would generate pact file. In this example to run provider side tests this file would be referred for one type of execution.

File Name is derived from consumer and provider key names as memtioned in consumer test file

```js
const provider = new Pact({
  consumer: "Matching Service",
  provider: "Animal Profile Service",
  port: 3000, // You can set the port explicitly here or dynamically (see setup() below)
  log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
  dir: path.resolve(process.cwd(), "pacts"),
  logLevel: LOG_LEVEL,
  spec: 2
});
```

### **test**

It contains mocha tests to generate pact file.

**consumer.test.js**

- This test is mimicing consumer to generate pact file
- Each (it) block represents a contract
- Add an Interaction in before() of each it block
- It block is an assertion on this interaction (before block)

**provider.test.js**

- This test is mimicing if provider is running tests to verify pact generated by consumer
- Pact file reference can be provided as
  - File in respective path
  - From PACT Broker

**publish.js**

- this is to publish pact file to PACT Broker for centralised management of all pacts and draw visual represenation

## **How to Generate And Verify Pacts**

Execute below commands:

```bash
npm run consumer-test --> To generate pact file
npm run publish-pact --> publish it to PACT Broker
npm run provider-test --> Validate contracts against provider application
```

## **Execution Snapshot**

<p>
    <img src="/images/consumer-tests-execution.png"/>
</p>

<p>
    <img src="/images/publish-pacts.png"/>
</p>

<p>
    <img src="/images/provider-test-execution.png"/>
</p>

<p>
    <img src="/images/provider-tests-execution.png"/>
</p>

## **PACT Broker**

<p>
    <img src="/images/PACT Broker.png"/>
</p>

## **Network Diagram for this Pact**

<p>
    <img src="/images/pact network diagram.png"/>
</p>

## **Typical Network Diagram**

<p>
    <img src="/images/typical pact network diagram.png"/>
</p>
