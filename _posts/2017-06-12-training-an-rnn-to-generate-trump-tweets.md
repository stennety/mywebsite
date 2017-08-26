---

published: true
title: Training an RNN to generate Trump Tweets
---
[Recurrent Neural Networks](https://en.wikipedia.org/wiki/Recurrent_neural_network), or RNNs, are well-suited for generating text. Essentially, after training, they predict the next character given a sequence of previous characters.

For fun (and learning), I wanted to train an RNN to generate Trump Tweets. 

## Gathering the data

First, I needed a bunch of Tweets to train the RNN on. The Twitter API only allows fetching the most recent [3,200 Tweets](https://dev.twitter.com/rest/reference/get/statuses/user_timeline), but thankfully a great guy named Brendan Brown did the heavy lifting of archiving them at the [Trump Twitter Archive](https://github.com/bpb27/trump-tweet-archive).

Sweet.

After some preliminary training, I found that there was a lot of noise in the output. I was reminded of the classic saying, "Garbage in, garbage out," and I realized I needed to heavily sanitize this data. Many Tweets were quotations, some were replies, some were sharing links. I wrote some NodeJS to clean up the Tweets and put it in [this repository](https://github.com/davidmerrick/sanitize-tweets).

## Picking an RNN implementation

The canonical RNN implementation seems to be GitHub user karpathy's [char-rnn](https://github.com/karpathy/char-rnn). It's implemented in Lua using [torch](http://torch.ch/), a scientific computing framework. My Late 2015 iMac was able to train the RNN in about 6 hours.

However, I was looking to create an API where a user could generate a Trump Tweet using my RNN, and AWS Lambda doesn't support Lua. So I searched around for a Python implementation, and stumbled across [this one](https://github.com/sherjilozair/char-rnn-tensorflow) which uses Google's TensorFlow framework. I'm currently retraining the RNN using this and will report back once that's complete.

## Reference

* [The Unreasonable Effectiveness of Recurrent Neural Networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/)
* [Training a char-rnn to Talk Like Me](http://hjweide.github.io/char-rnn)

## Some other humorous uses of RNNs

* This one generates Bible verses: [https://twitter.com/rnn_bible](https://twitter.com/rnn_bible)
