---
layout: post
title: Networking 12/06/2024
---

# NETWORKING

- Networking : Multiple computers,devices or servers connected with each other.

- World wide web (www) : it is a information system where data resources are identified by URL.

- Protocols : A network protocol is a combination of set of rules & conventions that govern how data is transmitted & recieved across networks.

- Client server architecture :

- Client : a client is a device or software application that requests and uses resources or services provided by a server. Clients initiate communication sessions with servers to access data, applications, or network resources, typically forming part of a client-server architecture.

- Server : server is basically a system that controls the data in masses.

- Data centre : Collection of huge numbers of computers. it contains static IP addresses that do not change. and provides the data response on each and every request.

Network Protocols :

- Web protocol : 
- 1. HTTP Protocol : The Hypertext Transfer Protocol (HTTP) is a protocol used for transmitting hypertext documents on the World Wide Web. It defines the rules and standards for web browsers and servers to communicate, allowing users to access and interact with websites by requesting and receiving web pages, images, and other resources.

HTTP methods : It define the actions to be performed on resources identified by a URL. The primary HTTP methods are:

- GET: Retrieves data from a server.
- POST: Submits data to be processed by a server.
- PUT: Updates or creates a resource on the server.
- DELETE: Removes a resource from the server.

2. DHCP (Dynamic Host Control Protocol) : It allocates the ip address to the devices.

3. SMTP (Simple Mail Transfer Protocol) : It defines how emails get send and recieved over internet.

4. SSH (Secured Shell Protocol): If we want to login to a terminal of another computer, we uses ssh for that.

- PORTS : In networking, ports are logical endpoints used to distinguish different services or applications on a single device. Each port is identified by a number.ranging from 0 to 65535, and helps direct incoming and outgoing data packets to the appropriate application or service, enabling multiple simultaneous communications on the same network device.

- Ephemeral ports : It is a short lived transport protocol port used by ip networking for client side communication.

# OSI MODEL : 

- It stands for 'Open System Interconnection Model'. it is a standard way about how 2 or more computers communicates with each other.

- There are 7 main layers in the architecture of OSI model.

- Physical Layer: Handles the transmission and reception of raw bit streams over a physical medium (e.g., cables, switches).
- Data Link Layer: Ensures reliable data transfer across a physical network link, dealing with error detection and correction, as well as framing.
- Network Layer: Manages packet forwarding including routing through different routers and addressing (e.g., IP addresses).
- Transport Layer: Provides reliable data transfer services to the upper layers, including flow control, error detection, and correction (e.g., TCP, UDP).
- Session Layer: Manages sessions or connections between applications, establishing, maintaining, and terminating communication sessions.
- Presentation Layer: Translates data between the application layer and the network, handling data encoding, encryption, and compression.
- Application Layer: Provides network services directly to end-user applications, such as email, file transfer, and web browsing (e.g., HTTP, FTP).


