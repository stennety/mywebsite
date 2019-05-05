---
layout: post
title: Hyperledger Fabric and the JavaSDK
tags: hyperledger fabric v1.0 JavaSDK 
---

In this post, I shall shed some light on the Java SDK for Hyperledger Fabric. We'll begin with a brief mention of the `v0.6` SDK (for consistency with my [previous post]({{ site.baseurl }}{% link _posts/2017-4-21-TransitioningTov1.md %})) and then we'll dive into `v1.0`.

One of the easy ways to get a platform easily adopted and developed is to keep the learning curve associated with it simple. One way to do so, is by providing support for existing popular languages. Hyperledger Fabric offers a number of SDKs for a wide variety of programming languages. There exist SDKs in [Java](https://github.com/hyperledger/fabric-sdk-java), [Node](https://github.com/hyperledger/fabric-sdk-node), [Python](https://github.com/hyperledger/fabric-sdk-py) and [Golang](https://github.com/hyperledger/fabric-sdk-go) so far.

## v0.6
For communicating with the underlying Hyperledger Fabric network, a Chain instance was to be instantiated:

``` java
// Create a chain instance
Chain testChain = new Chain("chain1");`

// Add the membership service:
testChain.setMemberServicesUrl("grpc://localhost:7054", null);

// Set a keyValueStore:
testChain.setKeyValStore(new FileKeyValStore(System.getProperty("user.home")+"/test.properties")); 

// Add a peer to the chain:
testChain.addPeer("grpc://localhost:7051", null); 

// Get a member:
Member registrar = testChain.getMember("admin"); 

// Enroll a member:
Member member = testChain.enroll("user", "secret"); 
```

Additionally, for events,
``` java 
testChain.eventHubConnect("grpc://localhost:7053", null);
```

Further, deploying a chaincode consisted of the following steps:
``` java
DeployRequest request = new DeployRequest();
// Setting path to the chaincode:
request.setChaincodePath(System.getenv("GOPATH")+"/src/github.com/hyperledger/fabric/examples/chaincode/java/Example");

// Setting chaincde arguments
request.setArgs(new ArrayList<>(Arrays.asList("init", "a", "700", "b", "20000")));

// Using a particular member (User1) of an organization (bank_a) to deploy the chaincode
Member member = getMember("User1", "bank_a");
request.setChaincodeName("myccj");
request.setChaincodeLanguage(ChaincodeLanguage.JAVA);
return member.deploy(request);
```
(The above snippets have been taken from the `v0.6` [branch](https://github.com/hyperledger/fabric-sdk-java/tree/v0.6) of Hyperledger Fabric-SDK-Java repository.)

#### Transactions
Under `v0.6`, the Peer had a `sendTransaction` method, that would take a `Transaction` instance argument, build a transaction using it and then process it to get a `Response` object. It then responded to the caller depending on the `txType` submitted in the Transaction object that it had received.

``` java
    /**
     * Send a transaction to this peer.
     * @param transaction A transaction
     * @throws PeerException 
     */
    public Response sendTransaction(Transaction transaction) throws PeerException {

        logger.debug("peer.sendTransaction");

        // Send the transaction to the peer node via grpc
        // The rpc specification on the peer side is:
        //     rpc ProcessTransaction(Transaction) returns (Response) {}
        Response response = peerClient.processTransaction(transaction.getTxBuilder().build());

        if (response.getStatus() != Response.StatusCode.SUCCESS) {
            return response;
        }

        logger.debug(String.format("peer.sendTransaction: received %s", response.getMsg().toStringUtf8()));

        // Check transaction type here, as invoke is an asynchronous call,
        // whereas a deploy and a query are synchonous calls. As such,
        // invoke will emit 'submitted' and 'error', while a deploy/query
        // will emit 'complete' and 'error'.

        Fabric.Transaction.Type txType = transaction.getTxBuilder().getType();
        switch (txType) {
            case CHAINCODE_DEPLOY: // async
                String txid = response.getMsg().toStringUtf8();
                // Deploy transaction has been completed
                if (txid == null || txid.isEmpty()) {
                    throw new ExecuteException("the deploy response is missing the transaction UUID");
                } else if (!this.waitForDeployComplete(txid)) {
                    throw new ExecuteException("the deploy request is submitted, but is not completed");
                } else {
                    return response;
                }
            case CHAINCODE_INVOKE: // async
                txid = response.getMsg().toStringUtf8();
                // Invoke transaction has been submitted
                if (txid == null || txid.isEmpty()) {
                    throw new ExecuteException("the invoke response is missing the transaction UUID");
                } else if(!this.waitForInvokeComplete(txid)) {
                    throw new ExecuteException("the invoke request is submitted, but is not completed");
                } else {
                    return response;
                }
            case CHAINCODE_QUERY: // sync
                return response;
            default: // not implemented
                throw new ExecuteException("processTransaction for this transaction type is not yet implemented!");
        }
    }

```

The `waitFor`* methods explicitly wait for some amount of time to ensure syncing across peers, since deploy and invoke take more time than a query does.

The detailed and complete Peer implementation can be found [here](https://github.com/hyperledger/fabric-sdk-java/blob/v0.6/src/main/java/org/hyperledger/fabric/sdk/Peer.java).

----
## The 'Chain'-ged notion
Hyperledger Fabric aims to support privacy and confidentiality via the channel and ledger design itself, and in `v1.0` these are together referred as the _chain_, unlike in `v0.6` where _chain_ was simply a handle for the SDK to communicate with the underlying Hyperledger Fabric ledger. 

Communication is restricted to the participants of the channel while the blocks get saved to a private ledger, distributed only among those participants. Peers part of the network, but not of the channel do not have access to either of these entities.

Once a channel is constructed, the application sends transactions to the peers on the channel, in a private manner and the transactions get committed to the private ledger. It is this combination of the channel and the ledger, that the SDK refers to as the `Chain` class.

----

## v1.0
With `v1.0` there have been several changes, the biggest one being the introduction of `channels`.

In `v1.0`, an HFClient instance is used to interact with the network:

``` java
// Create instance of client.
client = HFClient.createNewInstance();
```

For now, let's just have a sample file store, without any persistence:
``` java
File sampleStoreFile = new File(System.getProperty("java.io.tmpdir") + "/HFCSampletest.properties");
            
final SampleStore sampleStore = new SampleStore(sampleStoreFile);
```

Next, we traverse through all the orgs to get Users from each of them:

``` java
for (SampleOrg sampleOrg : SampleOrgs) {
    HFCAClient ca = sampleOrg.getCAClient();
    final String orgName = sampleOrg.getName();
    final String mspid = sampleOrg.getMSPID();
    System.out.println("OrgName: " + orgName + "; mspID: " + mspid);

    SampleUser admin = sampleStore.getMember(config.getAdmin(), orgName);

    sampleOrg.setAdmin(admin); // The admin of this org --

    SampleUser user = sampleStore.getMember(config.getUser(), orgName);

    sampleOrg.addUser(user);

    final String sampleOrgName = sampleOrg.getName();
    final String sampleOrgDomainName = sampleOrg.getDomainName();

    SampleUser peerOrgAdmin = sampleStore.getMember(sampleOrgName +"Admin", sampleOrgName,
            sampleOrg.getMSPID(),
            findFileSk(Paths.get(config.getChannelPath(), "crypto-config/peerOrganizations/",
                    sampleOrgDomainName, format("/users/Admin@%s/msp/keystore", sampleOrgDomainName))
                    .toFile()),
            Paths.get(config.getChannelPath(), "crypto-config/peerOrganizations/", sampleOrgDomainName,
                    format("/users/Admin@%s/msp/signcerts/Admin@%s-cert.pem", sampleOrgDomainName,
                            sampleOrgDomainName))
                    .toFile());

    sampleOrg.setPeerAdmin(peerOrgAdmin);

}
```

Next, we get the `org` to connect to, the _channel name_ and other timeout values, off some config file and setup the channel.
```java 
SampleOrg sampleOrg = config.getSampleOrg(orgName); // org to bind to 
String channelName = config.getChannelName();   // channel name 
Channel fooChain = reconstructChain(channelName, client, sampleOrg); // setup channel using the above config
fooChain.setTransactionWaitTime(config.getTransactionWaitTime());
fooChain.setDeployWaitTime(config.getDeployWaitTime());
return fooChain;
```


#### Transactions
Below we see some snippets utilizing the invoke and query APIs in `v1.0`. The example chaincode chosen for this is `mycc`, and is initialized as in the following snippet:
```java
// a class member for global access:
private static ChaincodeID mycc;

// during init:
String CHAINCODE_NAME, CHAINCODE_PATH, CHAINCODE_VERSION;
CHAINCODE_NAME = "mycc";
CHAINCODE_PATH = "github.com/hyperledger/fabric/examples/chaincode/go/map";
CHAINCODE_VERSION = "1.0";
mycc = ChaincodeID.newBuilder().setName(CHAINCODE_NAME).setVersion(CHAINCODE_VERSION).setPath(CHAINCODE_PATH)
                .build();
```



###### Invoke

```java
public String runInvoke(Channel channel, String chaincodeName,
            String functionName, String[] args) {
        TransactionProposalRequest transactionProposalRequest = client newTransactionProposalRequest();

        Collection<ProposalResponse> successful = new ArrayList<>();
        Collection<ProposalResponse> failed = new ArrayList<>();
        transactionProposalRequest.setFcn(functionName);
        transactionProposalRequest.setArgs(args);

        if (chaincodeName.equals("mycc"))
            transactionProposalRequest.setChaincodeID(mycc);
        else {
            System.err.println("Wrong chaincode name supplied for invoke");
            return null;
        }
        String TxID = null;
        Collection<ProposalResponse> invokeProposalResponse;
        try {
            invokeProposalResponse = channel.sendTransactionProposal(transactionProposalRequest, channel.getPeers());

            for (ProposalResponse response : invokeProposalResponse) {
                if (response.getStatus() == ProposalResponse.Status.SUCCESS) {
                    out("Successful transaction proposal response Txid: %s from peer %s",
                    response.getTransactionID(),response.getPeer().getName());
                    TxID = response.getTransactionID();
                    String payload = response.getProposalResponse().getResponse().getPayload().toStringUtf8();
                    System.out.println("--------------- Payload is --> " + payload);
                } else {
                    failed.add(response);
                }
            }

            // Fails even if 1 proposal failed
            if (failed.size() > 0) {
                ProposalResponse firstTransactionProposalResponse = failed.iterator().next();
                throw new ProposalException(format(
                        "Not enough endorsers for invoke %s :%d endorser error:%s. Was verified:%b", functionName,
                        firstTransactionProposalResponse.getStatus().getStatus(),
                        firstTransactionProposalResponse.getMessage(), firstTransactionProposalResponse.isVerified()));
            }
            channel.sendTransaction(successful);
            return TxID;
        } catch (Exception e) {
            throw new CompletionException(e);
            return null;
        }
    }
```



###### Query
```java
public String runQuery(Channel channel, String chaincodeName, String functionName, String[] args) throws Exception {
        String payload = "";
        QueryByChaincodeRequest queryByChaincodeRequest = client.newQueryProposalRequest();
        queryByChaincodeRequest.setArgs(args);
        queryByChaincodeRequest.setFcn(functionName);

        if (chaincodeName.equals("mycc"))
            queryByChaincodeRequest.setChaincodeID(mycc);
        else {
            System.err.println("Wrong chaincode name supplied for Query");
            return null;
        }

        Collection<ProposalResponse> queryProposals = channel.queryByChaincode(queryByChaincodeRequest);
        for (ProposalResponse proposalResponse : queryProposals) {
            if (!proposalResponse.isVerified() || proposalResponse.getStatus() != ProposalResponse.Status.SUCCESS) {
                out("Failed Query Proposal from peer" + proposalResponse.getPeer().getName() + " status: "
                        + proposalResponse.getStatus() + ".Messages " + proposalResponse.getMessage()
                        + ".Was Verified: " + proposalResponse.isVerified());
                payload = "FAIL";
            } else {
                payload = proposalResponse.getProposalResponse().getResponse().getPayload().toStringUtf8();
                out("Query [%s] from peer %s, returned %s", queryByChaincodeRequest.getArgs().get(0), proposalResponse.getPeer().getName(), payload);
            }
        }
        return payload;
    }
```

The `out` method is the following and serves the purpose of formatting `println` calls:

```java
static void out(String format, Object... args) {

    System.err.flush();
    System.out.flush();

    System.out.println(format(format, args));
    System.err.flush();
    System.out.flush();

}
```

###### EventListener
The SDK also allows us to listen for events produced by the peer. There are three kinds of events supported by Hyperledger Fabric.

- **Transaction events**: generated when the transaction by the given id has been committed into a block
- **Chaincode events**: generated when the given event set by the given chaincode ID has occurred
- **Block events**: generated on block commits


We can register a listener and on receiving events, parse them for various purposes- notifying other applications, for instance.

As there's only so much one can do with the `invoke` and `query` calls pre-defined in a deployed chaincode, the CLI commands (`peer chaincode ...`) become limiting. With the SDK, as we saw above, one can do everything that the CLI can, and so much more. 

I'll take this up in more detail in a future post.

----
__Next up__:
- Event Listening using the Java SDK

---
_Note: The above code snippets have been tested to work with `v1.0.0-beta` and should work with subsequent releases with minor changes_
