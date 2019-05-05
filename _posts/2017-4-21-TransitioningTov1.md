---
layout: post
title: Hyperledger Fabric transitions to version 1.0
tags: hyperledger fabric v1.0 smartcontracts chaincode
---

This piece addresses those of you out there, who've been swept off by the Blockchain buzz; particularly those who got their hands dirty with everything pivoted around the words- consensus, distributed ledger, smart contracts and so on.

For the unacquainted, a quick gist is as follows. [Hyperledger](https://www.hyperledger.org/), a Linux Foundation project, "_is an open source collaborative effort created to advance cross-industry blockchain technologies. It is a global collaboration, hosted by The Linux Foundation, including leaders in finance, banking, Internet of Things, supply chains, manufacturing and Technology_". Hyperledger [Fabric](https://github.com/hyperledger/fabric) is an active Hyperledger project. The fabric is an implementation of the blockchain technology, leveraging existing proven technologies, using container technologies for easier deployment and experimentation.

Hyperledger Fabric recently rolled out ```v1.0```, as a successor to it's existing ```v0.6```. While ```v0.6``` provided for pluggable modules for the membership service, the consensus algorithm to be used, and for smart contract execution, ```v1.0``` introduced various design and architectural changes, including channels promoting sub-ledgers and transactional privacy.
Although ```v1.0``` is significantly [different](https://www.altoros.com/blog/hyperledger-fabric-v1-0-to-bring-improved-transactions-and-a-pluggable-data-store/) in design and architecture from ```v0.6```, migration or some bit of modification suffices at the chaincode level to get solutions compliant with Fabric ```v1.0```.

### Putting REST to rest:
Besides the code level changes it must also be noted that the REST API that was present in ```v0.6``` has now been deprecated, and [gRPC](http://www.grpc.io/) is being used instead. gRPC is being chosen over REST, for better performance and bacause it provides the ability to control the flow with full-duplex streaming (since most of the API calls are asynchronous). This also implies that a peer won't have to open up any additional ports for ```http/https``` as gRPC was already being used for inter-component communication.

This leaves users with CLI (for development/debugging) and an SDK. The SDK is under continuous development, parallel to the Fabric itself and Java, Go, Python, and Nodejs [implementations](https://github.com/hyperledger?utf8=%E2%9C%93&q=fabric-sdk&type=&language=) of the Fabric SDK are expected.

## Changes at the chaincode level
To understand the differences at the chaincode level, we shall consider one of the examples provided as part of the Hyperledger Fabric code base- [chaincode_example02](https://github.com/hyperledger/fabric/blob/master/examples/chaincode/go/chaincode_example02/chaincode_example02.go).

This example takes as input two entitites, ```A``` and ```B```, their asset holdings, denoted by ```Aval``` and ```Bval``` in the code, and carries out a transaction of given units ```X```, from ```Aval``` to ```Bval```.

### 1. Changes in interfaces:

The interface of Fabric ```v1.0``` provides for only ```Init``` and ```Invoke``` calls, and the ```Query``` is included as part of ```Invoke```.

#### v1.0
```go
func (t *SimpleChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
    fmt.Println("ex02 Invoke")
    function, args := stub.GetFunctionAndParameters()
    if function == "invoke" {
        // Make payment of X units from A to B
        return t.invoke(stub, args)
    } else if function == "delete" {
        // Deletes an entity from its state
        return t.delete(stub, args)
    } else if function == "query" {
        // the old "Query" is now implemtned in invoke
        return t.query(stub, args)
    }

    return shim.Error("Invalid invoke function name. Expecting \"invoke\" \"delete\" \"query\"")
}
```

Contrast this, with the independent ```Query``` [function](https://github.com/hyperledger/fabric/blob/v0.6/examples/chaincode/go/chaincode_example02/chaincode_example02.go#L153) in ```v0.6```.

Further, the method signatures for ```Init``` and ```Invoke``` have also undergone changes, from having three parameters (_stub_, _function name_ and _args_) in ```v0.6``` to just one (_stub_) in ```v1.0```. Likewise, the return values from these have also changed, as we shall see below.
 
This certainly affects the parameter parsing, which is now handled by a newly added function:

```go
func (stub *ChaincodeStub) GetFunctionAndParameters() (function string, params []string) {...}
```
as seen [here](https://github.com/hyperledger/fabric/blob/master/core/chaincode/shim/chaincode.go).

__TL;DR__:  the function name that used to be received as a passed parameter in ```v0.6``` is now retrieved by making a call to the ```GetFunctionAndParameters()``` function, in ```v1.0```.

#### CLI commands to supplement the changes
Since we're now setting up and joining peers to channels, those are the additional parameters on the CLI commands previously used in ```v0.6```. The [Getting Started](http://hyperledger-fabric.readthedocs.io/en/latest/getting_started.html) page for Fabric documentation provides a complete walkthrough.

### 2. Changes in return values/error handling:

#### v0.6
```go
func (t *SimpleChaincode) Init(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	var A, B string    // Entities
	var Aval, Bval int // Asset holdings
	var err error

	if len(args) != 4 {
	    return nil, errors.New("Incorrect number of arguments. Expecting 4")
	}

	// Initialize the chaincode
	A = args[0]
	Aval, err = strconv.Atoi(args[1])
	if err != nil {
	    return nil, errors.New("Expecting integer value for asset holding")
	}
	B = args[2]
	Bval, err = strconv.Atoi(args[3])
	if err != nil {
	    return nil, errors.New("Expecting integer value for asset holding")
	}
	fmt.Printf("Aval = %d, Bval = %d\n", Aval, Bval)

	// Write the state to the ledger
	err = stub.PutState(A, []byte(strconv.Itoa(Aval)))
	if err != nil {
	    return nil, err
	}

	err = stub.PutState(B, []byte(strconv.Itoa(Bval)))
	if err != nil {
	    return nil, err
	}

	return nil, nil
}
```

In ```v0.6```, an error object was being returned from the function, along with a ```byte``` array. This is seen above in the ```Init``` function. In case there were no errors, the error object and the byte array had their values set to ```nil``` as seen in the final ```return``` statement.


#### v1.0
```go
func (t *SimpleChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
    fmt.Println("ex02 Init")
    _, args := stub.GetFunctionAndParameters()
    var A, B string    // Entities
    var Aval, Bval int // Asset holdings
    var err error

    if len(args) != 4 {
        return shim.Error("Incorrect number of arguments. Expecting 4")
    }

    // Initialize the chaincode
    A = args[0]
    Aval, err = strconv.Atoi(args[1])
    if err != nil {
        return shim.Error("Expecting integer value for asset holding")
    }
    B = args[2]
    Bval, err = strconv.Atoi(args[3])
    if err != nil {
        return shim.Error("Expecting integer value for asset holding")
    }
    fmt.Printf("Aval = %d, Bval = %d\n", Aval, Bval)

    // Write the state to the ledger
    err = stub.PutState(A, []byte(strconv.Itoa(Aval)))
    if err != nil {
        return shim.Error(err.Error())
    }

    err = stub.PutState(B, []byte(strconv.Itoa(Bval)))
    if err != nil {
        return shim.Error(err.Error())
    }

    return shim.Success(nil)
}

```

In ```v1.0```, a ```Response``` object (described [here](https://github.com/hyperledger/fabric/blob/master/core/chaincode/shim/response.go)) is being returned instead. The attributes of this object vary depending on the outcome of the operation.

If the operation was successful, a ```shim.Success(...)``` call is returned with a byte array as arguments. The array could be nil, or any data that needs to be returned to the higher layer (or caller). In case the operation was unsuccessful, a ```shim.Error(...)``` call is returned with a ```string``` message as arguments. This message provides information about the error, to the caller. Instead of an on the fly created ```string``` message, it could also be an ```error``` object converted into ```string``` using the ```error.Error()``` call.

<style>
.tablelines table, .tablelines td, .tablelines th {
        border: 2px solid black;
        }
</style>
To summarize changes in return values, 

| **v0.6** | **v1.0** |
| :--------: | :--------: |
| ([]byte, error) | pb.Response |
| errors.New(...) | shim.Error(...)|
| return nil, nil | return shim.Success(nil)|
| return nil, err | return shim.Error(err.Error())|
| return nil, errors.New(...) | return shim.Error(...) |
{: .tablelines}

----
__Next up__:
- Channels and the SDK

----

*Disclaimer: The views expressed in the article are my own and do not reflect the position of any of the entities mentioned in the article.*

