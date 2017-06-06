---
layout: post
published: false
title: How to use the ACTS tool for Combinatorics testing
---
## Background
 
ACTS is a tool developed by NIST for generating combinatorial test cases using parameters and constraints. To get a copy for yourself, and to read more about the benefits of combinatorial testing, please visit [this page](http://csrc.nist.gov/groups/SNS/acts/index.html).
 
## Usage
 
Let's run through a basic example of using it in order to understand how it works.
 
In our hypothetical scenario, say we're testing posting a blog post and a discussion. We need to test in IE and Chrome on Windows and OSX.
 
So, our parameters will be:
 
Content type
* Blog post
* Discussion
 
Operating system
* Windows
* macOS
 
Browser
* IE
* Chrome
 
We'll need a constraint around IE, because IE is not available on macOS.
 
1\. Download the attached zip file and extract it.
2\. Open the "acts_2.93.jar" file. You should see a window that looks like this:

![]({{site.cdn_path}}/2017/06/06/1.jpg)

3\. Let's create a system. A system is where all of our parameters and constraints will live.
Click System -> New.

![]({{site.cdn_path}}/2017/06/06/2.jpg)

4\. Name your system "Content create testing."

![]({{site.cdn_path}}/2017/06/06/3.jpg)

5\. Add parameters
Our first parameter is the ContentType. This will be an enum that can be a discussion or a blog post.
To add it, select Enum for the parameter type, and name the parameter "ContentType" (Note that parameters are not allowed to have spaces).

![]({{site.cdn_path}}/2017/06/06/4.jpg)

Now, add the possible values for the parameter.

![]({{site.cdn_path}}/2017/06/06/6.jpg)

Click "Add to Table" to add them to your system.
You'll now see them in the table on the right.

![]({{site.cdn_path}}/2017/06/06/7.jpg)

Add the other parameters for operating system and browser type.
 
6\. Add constraints.
For our hypothetical test case, we need a constraint around the browser, since IE is only available on Windows.
To add this constraint, click "Constraints."

![]({{site.cdn_path}}/2017/06/06/8.jpg)

The constraint, in this case, will look like:

![]({{site.cdn_path}}/2017/06/06/9.jpg)

Once you've added it, click the "Add System" button at the bottom of the window. You'll be taken back to the main screen, with your parameters and constraints in the left column.

![]({{site.cdn_path}}/2017/06/06/10.jpg)

7\. Now for the fun part. Generating test cases!
Click Operations -> Build. Use the default settings:

![]({{site.cdn_path}}/2017/06/06/11.jpg)

After you click "Build," your test cases will appear in the main window.

If you like, you can export them to CSV using Operations -> Export.

