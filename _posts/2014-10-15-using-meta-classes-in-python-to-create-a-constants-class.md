---

published: true
title: Using meta classes in Python to create a Constants class
---
I was writing some Python code for a project and needed a class to hold constants. Unfortunately, Python doesn't natively support constants or static classes. After trying several different methods of implementing a constants class in this language, I decided to use a meta class. The code looks like this:

{% highlight python %}
class MetaConstants(type):
    """This is a meta-class for Constants that forces all the properties to be read-only."""

    _CONSTANT_ONE = "foo"
    _CONSTANT_TWO = "bar"

    @property
    def CONSTANT_ONE(cls):
        return cls._CONSTANT_ONE

    @property
    def CONSTANT_TWO(cls):
        return cls._CONSTANT_TWO

class Constants(object):
    __metaclass__=MetaConstants
{% endhighlight %}

In Python, a metaclass defines how a class behaves. A class is an instance of a metaclass.  Setting a "\_\_metaclass\_\_" attribute in a class tells Python to use the metaclass specified to construct the new class.

The way that my class is implemented, I can easily add new read-only constants using private variables and properties in the MetaConstants class and call them statically using the Constants class.

{% highlight python %}
print Constants.CONSTANT_ONE
# prints "foo"
{% endhighlight %}

These are effectively immutable; the metaclass prevents changes to the properties.

{% highlight python %}
Constants.CONSTANT_TWO = "Hello World"
# Result: AttributeError: can't set attribute
{% endhighlight %}

Reference: [Stack Overflow: What is a Meta Class in Python?](http://stackoverflow.com/questions/100003/what-is-a-metaclass-in-python)
