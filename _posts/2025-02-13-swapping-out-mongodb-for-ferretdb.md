---
layout: post
title: "Swapping out MongoDB for FerretDB"
date: 2025-02-13
categories: [blog, tech]
---

![Image of a Ferret](https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Mustela_putorius_furo_profile.JPG/640px-Mustela_putorius_furo_profile.jpg)
{: .center-image }

### MongoDB is 'mostly' open, so what's the problem?
For most intents and purposes, MongoDB's Server Side Public License (SSPL) is as open as we'd ever need. It appears to be an imminently sensible license, on the face of it. Providing MongoDB, as a managed service, requires the provider to also open source their entire service stack. So, you couldn't just suddenly develop a competing service and have the associated source code locked down. Now, it's obviously the business interests of MongoDB Inc that drove a need for such a license, and is not be a problem for the overwhelming majority of adopters who utilise this NoSQL document database as a store for unstructured data. The following, however, are possible reasons we'd want an alternative:

 - For keeping MongoDB Inc on its toes: competition is good.
 - As a hedge against any possible future tightening of current license.
 - Where enterprise policies restrict the usage of tools or services that are not fully open source.

 That second point is important. MongoDB benefits from being open, but one can never predict what goes on in the minds of their executives, especially during the AI-filled sugar-rush we're living through!   

### Here comes the Ferret!
Firstly, FerretDB on its own is not going to store anything because it's essentially a proxy for the MongoDB API; a proper database is still needed and for this the FerretDB team have focused on Postgres with its huge community of users and unstructured data storage. Unlike MongoDB, however, Postgres stores unstructured data in JSONB format, while MongoDB uses BSON; both are binary and therefore provide efficiency and indexing, but still different. This is where the nice people at Microsoft developed an extension for Postgres that enables storage in the BSON format that is native to MongoDB.

<figure>
    <img src="/images/ferret-db-postgres-documentdb.png" alt="How FerretDb works">
    <figcaption style="background-color: #f0f0f0; font-size: smaller; padding-left:5px">How FerretDB Works.
    <small style="float: right; padding-right:5px">Source: <a href="https://docs.ferretdb.io">Ferret DB Documentation</a></small></figcaption>
</figure>

### Key Features
- **Open Source:** Fully open source under an Apache 2.0 license, encouraging community participation and contributions.
- **Compatibility:** Designed to be highly compatible with existing MongoDB applications, minimizing migration efforts.
- **Performance:** Optimized for high performance and scalability, making it suitable for a variety of use cases.

### Why Choose FerretDB?
If you value freedom, community, and performance in your database solutions, FerretDB is worth considering. It aligns with the principles of free and open source software (FOSS), ensuring that you have complete control over your database infrastructure.

### Closing Comments:
The database landscape is continuously evolving, and FerretDB represents a significant step forward in providing a community-driven alternative to MongoDB. Whether you're a developer, a tech enthusiast, or an enterprise looking for reliable database solutions, FerretDB offers a compelling option.
