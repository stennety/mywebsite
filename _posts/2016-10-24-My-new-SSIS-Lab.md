---
layout: post
title: My fresh new SSIS Lab
comments: true
---

I just finished installing my new SQL Server Integration Services (SSIS) lab. The aim of this new laboratory is to provide all the necessary tools for the exercises and tests for my next exam 70-463 for the SQL Server MSCA certification.

![_config.yml]({{ site.baseurl }}/images/vm_list.png)

The approach that I followed here is a little different from that microsoft provides the courses and the MIA machines. Here I chose to install SSIS on a machine dedicated to SQL Server (called SQL2) and installed Visual Studio (VS) and Data Tools in another machine (with the name of DEV1). As already given to understand, the first is intended to be dedicated to SQL Server (2016 version to start experimenting) and the second for developments, as with VS2015.

![_config.yml]({{ site.baseurl }}/images/sql_server_machine.PNG)

After I installed the software, it was necessary to download files from 20-463C and D labs, change the script so that the set-ups work well in 2 separate machines, unlike what happens in Microsoft's labs.

![_config.yml]({{ site.baseurl }}/images/dev_machine_vs.png)

Both machines belong to a domain and my user has to SQL Server sysadmin access to be able to perform all the exercises, I also created a share on the domain's file share to be able to conveniently share files between the 2 machine if necessary to perform the exercises.

![_config.yml]({{ site.baseurl }}/images/explorer.PNG)

After I have all ready configurations have my Lab environment ready to start doing the exercises again and to refresh my memory I'm following the [Implementing a Data Warehouse with SQL Server Jump Start](https://mva.microsoft.com/en-US/training-courses/implementing-a-data-warehouse-with-sql-server-jump-start-8257) MVA Course.
