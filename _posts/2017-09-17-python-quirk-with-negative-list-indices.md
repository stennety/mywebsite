---
published: true
title: Python quirk with negative list indices
---
A friend recently pointed out a quirk in Python with negative indices in lists.

Let's say you have this code:

```
#!/usr/bin/python

myArray = ["a","b","c","d"]
print(myArray[-1])
```

Intuitively, what do you think this should print? It should probably throw an error, right?
Well, you'd be wrong. It actually prints "d".

Why is this? In Python, specifying a positive number n for a list index means to access the element n items to the right of the beginning of the list. Specifying a negative number actually means the inverse. It means to access the element at the index n places to the left of the end of the list. In essence, count backwards from the end of the sequence.

So, in our example, ```myArray[-2]``` would refer to "c", and so on.

This Python quirk is documented [here](https://www.python.org/ftp/python/doc/quick-ref.1.3.html#LexEnt).
