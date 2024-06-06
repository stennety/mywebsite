---
layout: blog
title: 04/06/2024
---


- DAY 1 OF LEARNING WITH COREDGE.
- The brief introdution to cloud

# public cloud
- A public cloud is a internet service where services like storage, applications, and servers and other infrastructure delivered over the internet by a third-party service provider. These services are available to anyone who wants to use or purchase them, and they typically operate on a pay-as-you-go basis. these are more scalable platform and all tye infrastructure maintenance, updates, and security will be handled by the cloud provider.


# private cloud
- A private cloud is a computing model where the infrastructure is dedicated to a single organization. It can be hosted on-premises or by a third-party provider, but it is not shared with other organizations. it is more of a personal use. so all the maintenance and changes on the whole infrastructure will be done by that single organization. so they may not be that much scalable as public cloud.

# shell scripting
- A shell is a user interface for accessing an operating system's services.The shell is basically a command line interface that allows users to interact with the operating system by typing commands, which the shell interprets and executes.
- there are many types of shell we have like bash, zsh and many more. we'll look into bash for now.
- Bash scripting refers to writing scripts using the Bash (Bourne Again SHell) command language. Bash scripts are essentially sequences of commands that are executed by the Bash shell. They are commonly used for automating tasks, managing system operations, and performing repetitive tasks.

# git & git hub
- Git is a distributed version control system used to track changes in source code during any devlopment where multiple devlopers are contributing. It allows multiple developers to work on a project simultaneously, managing their changes efficiently and enabling collaboration. Git also maintains a history of all changes, enabling easy rollback and branch management.
- git hub is a plateform which allows us to host our git repository.
- what is a repository: it is just a folder where all the changes are saved.
- terminal : it allows us to manipulate the file structure using commands.

# Distributed Version Control System
- it is about managing multiple versions of documents, program , websites etc.
- it tracks history of collection of files.
- in this type of version control system each user has a complete local copy of a repository on his indivisual machine.
- To make a git repository, we'll go in any directory run the command git init. It will create a .git repository in that folder that will be hidden. we can see that repository by the command ls -a. this directory contains all the history of operations of files.
- command to get your changed files staged : git add .
- command to commit your changes to the local repository : git commit -m "your commit message"
- when you'll push the changes to the remote repository then the user who is pushing the changes, he we'll have to add his username and his emailid.
- git config --global user.email "email"
- git config --global user.name "user name"

# pushing the changes to the remote server
- create a remote repository on github
- to make the connection between local and remote repository, there are two ways:
- a. clone remote repository to local
- git clone "URL"
- b. from local repo to remote integration
- cd to local repo
- git remote add origin
- ssh://git@github.com/username/repository_name/.git
- git push

# note
- what is http?
- it is a web service that uses the hypertext transfer protocol(HTTP) to enable communication between a client  and a server.
- what is HTTPD?
- http daemon is a server software that handles http requests. it takes the request from the client and redirect the request to the desired address.
 
# branches in git
- branches in git is a concept where git allows devloppers to work on diffrent diffrent features of the same code or project without making changes to the main copy of the code.
- to create temporary branch from terminal: git branch -c "name the branch"
- to see all the branches: git branch -a
- to switch between branches: git checkout "branch_name"
- to merge other branches to main branch: git merge "branch_name"

# git rollback
- git rollback is a method to revert changes in a repository to a previous state. this allows devlopers to undo mistakes or unwanted changes efficiently.
- if you want to rollback changes before getting into staging area: git checckout "filename"
- if you've updated the file to staging area and then you want to rollback any changes: git restore --staged "filename"   

