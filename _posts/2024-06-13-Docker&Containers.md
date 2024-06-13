---
layout: post
title: Docker_And_Containers 13/06/2024
---

# DOCKER & CONTAINERS:

- WHAT IS DOCKER AND WHY?

- Docker is a container technology, a tool for creating & running containers.
- Docker simplifies the creation & management of such containers.

# VIRTUAL MACHINE VS CONTAINERS:

- CONTAINERS:

- Lightweight: Containers share the host system's OS kernel and isolate the application at the process level. This makes them more lightweight compared to VMs.
- Faster Startup: Containers can start up almost instantly because they don't need to boot an entire operating system.
- Resource Efficiency: Since containers share the host OS, they use less memory and CPU resources than VMs.
- Portability: Containers package applications and their dependencies in a consistent environment, making it easy to move them between different environments (development, testing, production).
- Isolation: While containers provide process-level isolation, they are less isolated than VMs because they share the same OS kernel. However, this isolation is usually sufficient for many applications.
- Management: Tools like Docker and orchestration platforms like Kubernetes are widely used to manage containers.

- VIRTUL MACHINE:
- Heavyweight: VMs include a full copy of an operating system, a hypervisor, and the application itself, making them more resource-intensive.
- Slower Startup: VMs take longer to start because they need to boot the guest operating system.
Resource Usage: VMs require more resources (CPU, memory, storage) because each VM runs a full operating system.
- Isolation: VMs provide strong isolation since each VM runs a separate OS. This can be beneficial for running multiple, potentially conflicting applications on the same hardware.
- Flexibility: VMs can run different operating systems on the same hardware, providing more flexibility for certain use cases.
- Management: Hypervisors like VMware, Hyper-V, and KVM are used to manage VMs, which can be more complex than managing containers.



