---
layout: post
title: "Swapping out MongoDB for FerretDB v2.0 (RC)"
date: 2025-02-13
categories: [blog, tech]
---

![Image of a Ferret](https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Mustela_putorius_furo_profile.JPG/640px-Mustela_putorius_furo_profile.jpg)
{: .center-image }

### Introduction
MongoDB dominates the world of NoSQL databases and is often appreciated for its developer experience as a result of its mature ecosystem of drivers, libraries and tools. Well, I recently read about a viable alternative called FerretDB which is close to releasing v2.0 which now incorporates a compelling set of components. So, I thought to do a quick test and see how it goes! For the purpose of this test, the release candidate (RC) version was used since the full 2.0 release is not quite ready yet.

<br />

### MongoDB is 'mostly' open, so what's the problem?
For most intents and purposes, MongoDB's Server Side Public License (SSPL) is as open as we'd ever need. It appears to be an eminently sensible license, on the face of it. Providing MongoDB, as a managed service, requires the provider to also open source their entire service stack. So, you couldn't just suddenly develop a competing service and have the associated source code locked down. Now, it's obviously the business interests of MongoDB Inc that drove a need for such a license, and is not be a problem for the overwhelming majority of adopters who utilise this NoSQL document database as a store for unstructured data. The following, however, are possible reasons we'd want an alternative:

 - For keeping MongoDB Inc on its toes: competition is good.
 - As a hedge against any possible future tightening of current license.
 - Where enterprise policies restrict the usage of tools or services that are not fully open source.

 That second point is important. MongoDB benefits from being open, but one can never predict what goes on in the minds of their executives, especially during the AI-filled sugar-rush we're living through!
 
<br />

### Unleash the Ferret!
Firstly, FerretDB on its own is not going to store anything because it's essentially a proxy for the MongoDB API; a proper database is still needed and for this the FerretDB team have focused on Postgres with its huge community of users and unstructured data storage. Unlike MongoDB, however, Postgres stores unstructured data in JSONB format, while MongoDB uses BSON; both are binary and therefore provide efficiency and indexing, but still different. Microsoft's DocumentDB extension for Postgres provides the missing piece, enabling storage in the BSON format and enabling a smooth pathway between the MongoDB API and the ultimate storage destination, Postgres (see below).

<figure>
    <img src="/images/ferret-db-postgres-documentdb.png" alt="How FerretDb works">
    <figcaption style="background-color: #f0f0f0; font-size: smaller; padding:2px 5px">How FerretDB Works.
    <small style="float: right; padding-right:5px">Source: <a href="https://docs.ferretdb.io">Ferret DB Documentation</a></small></figcaption>
</figure>

<br />

### Evaluating FerretDB Locally on Linux
Given that most deployments in production happen on Linux servers, to me it makes sense to then develop on a linux platform. For the purposes of this evaluation, I took a currently under development private project where MongoDB has already been used. The idea being that I'd make minimal adjustments when swapping MongoDB for FerretDB. After an initial unsuccessful attempt at installing the above components separately using Linux native packages, I quickly utilised their production image, generated via Docker Compose, which wraps up all necessary components in a single networked image. In the spirit of Open Source, I used Podman Compose and Podman Desktop, to see how these stacked up against native Docker tools (see below).

#### Docker Compose YAML (Source: <a href="https://docs.ferretdb.io/installation/ferretdb/docker/">FerretDB Production Image</a>):

```yaml
services:
  postgres:
    image: ghcr.io/ferretdb/postgres-documentdb:16
    restart: on-failure
    environment:
      - POSTGRES_USER=username
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=postgres
    volumes:
      - ./data:/var/lib/postgresql/data

  ferretdb:
    image: ghcr.io/ferretdb/ferretdb:2
    restart: on-failure
    ports:
      - 27017:27017
    environment:
      - FERRETDB_POSTGRESQL_URL=postgres://username:password@postgres:5432/postgres

networks:
  default:
    name: ferretdb
```

<figure>
    <img src="/images/PodmanDesktopRunningFerretDBContainer.png" alt="Podman Desktop Running FerretDB Container">
    <figcaption style="background-color: #f0f0f0; font-size: smaller; padding:2px 5px">Podman Desktop running FerretDB as a networked container.</figcaption>
</figure>

<br />

### The Results
The above solution worked like a charm, I could quite literally 'swap' MongoDB for FerretDB, having uploaded the relevant data, and with practically no adjustment to the codebase: it just worked! The codebase used the Mongoose ODM, which correctly mapped the database fields and the Compass frontend tool connected to the alternative database with no issues whatsoever (see below).

<figure>
    <img src="/images/UsingMongoDBCompassWithFerretDB.png" alt="Using MongoDB Compass with FerretDB">
    <figcaption style="background-color: #f0f0f0; font-size: smaller; padding:2px 5px">MongoDB Compass tool connected to FerretDB.</figcaption>
</figure>

<br />

### Closing Comments:
This was only a very basic test and a much more comprehensive evaluation is required before getting too excited. As of v2.0, FerretDB is said to have achieved compatibility with v6.0 of MongoDB. However, we'll only know the extent of this claim when utilising in anger, to ensure there are no show-stopping feature omissions. Nevertheless, for the open source absolutists, FerretDB is a clever solution built on top of solid foundations. It will be interesting to see how MongoDB Inc responds. My personal take is that they shouldn't really mind: anything that entrenches the MongoDB API and tooling within the NoSQL database space may 'secretly' be seen as a positive? 

<br />

### Useful Links:  
The following are some links related to the tools and packages used for this test.

- [FerretDB GitHub page](https://github.com/FerretDB/FerretDB?tab=readme-ov-file)
- [Microsoft's recent DocumentDB Announcement](https://opensource.microsoft.com/blog/2025/01/23/documentdb-open-source-announcement/)
- [Podman](https://podman.io)
- [MongoDB Compass Tool](https://www.mongodb.com/products/tools/compass)
- [Mongoose JS ODM](https://mongoosejs.com)
- [Linux Mint](https://www.linuxmint.com)
