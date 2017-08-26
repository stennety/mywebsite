---

published: true
title: 'Java trick: Use an implicit "finally" block to automatically close a stream'
---
In Java 7, an implicit _finally_ block will automatically close an output stream. Meaning that, instead of all this:

{% highlight java %}
PrintWriter writer = new PrintWriter(targetFile, "UTF-8");
try{
    writer.write("Hello World");
    writer.close();
} catch(FileNotFoundException | UnsupportedEncodingException e){
    // Handle exception
}
{% endhighlight %}

You really only need this:

{% highlight java %}
try(PrintWriter writer = new PrintWriter(targetFile, "UTF-8")){
    writer.write("Hello World");
} catch(FileNotFoundException | UnsupportedEncodingException e) { 
    // Handle exception 
}
{% endhighlight %}

The implicit _finally_ block will automatically close the output stream.
