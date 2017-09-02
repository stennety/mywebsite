---
layout: post
title: Custom T-SQL Functions
tags: sql, t-sql, MSSQL, DBA, Development, Transact
comments: true
---

The purpose of this post is to make known some functions, which do not exist natively in SQL Server and which I usually use in SQL Server.
First I highlight the dbo.CleanString function, which aims to clean up special characters that are "hidden" in a string such as commands like the ENQ (Inquiry) character. When you execute a query and export it to Excel, the Excel app crash or it completely deform the structure of the Excel workbook cells.

![_config.yml]({{ site.baseurl }}/images/CleanStringFunction.PNG)

In second place, I highlight the dbo.Split function which, as the name implies, it divides a list of text in a string, separated by a separator into a resultset with as many rows as the separate records.
See some exemples blow:

![_config.yml]({{ site.baseurl }}/images/SplitFunction.PNG)

Thirdly I use the dbo.UDTToLocalTime function that dynamically converts a UTC time date to a Daylight Saving Time Date. Very useful whenever it is necessary to compare dates between several periods that encompass different Daylight Saving Time, with date records stored in UTC.
Here's [Bobman's original version](http://stackoverflow.com/questions/3404646/how-to-calculate-the-local-datetime-from-a-utc-datetime-in-tsql-sql-2005/8842966#8842966) on StackOverflow. I'm using this same function at least in 2 diferent reports that compare some UTC DateTime in Portugal (GMT).

You can find on [GitHub](https://github.com/HelderViana/TSQL-Handy-Functions) some of the examples of functions I sometimes need to use in SQL Server instances of functions that do not exist in transact sql.
