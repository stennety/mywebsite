---
post_title: 'Today I Learned #0'
author: dreat
layout: post
published: true
post_date: 2017-04-08 07:00:54
---
<p style="text-align: center;"><em>This is Today I Learned - some nice things I learned, too short to be valid blog post, but too important/interesting/etc to not be written down</em></p>
While exposing classes to WCF service, you have to use <em>[DataContract]</em> (for class) and <em>[DataMember]</em> (for properties) attributes. Or do you?

Turns out that around 3.5 you don't have to do it. If you provide class with no attributes it will work out of the box! Where's the catch? There are two:
<ol>
 	<li>You will lose some of features, like naming, being able to serialize private properties, declaring something as required. While some can be more useful than others in specific scenarios - just ask yourself - should you really send private data? ;)</li>
 	<li><strong>And this is important!</strong> If you dare to use <em>[DataMember]</em> on <em>some</em> properties - only those will be serialized.</li>
</ol>
