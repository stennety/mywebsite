---
layout: post
title: Fix invalid `GOSUMDB` error in golang 1.22
---

When I've checked out cri-o and run `make install` I encountered the following error:

```
$ cd $GOPATH/src/github.com/cri-o/cri-o
$ make install
go: golang.org/toolchain@v0.0.1-go1.22.2.linux-amd64: verifying module: invalid GOSUMDB: malformed verifier id
go: golang.org/toolchain@v0.0.1-go1.22.2.linux-amd64: verifying module: invalid GOSUMDB: malformed verifier id
/bin/sh: line 1: [: too many arguments``
```

To fix this clean the go cache and remove its `go.sum`:

```
$ go clean -modcache
$ rm go.sum
$ go mod tidy

# re-run 
$ make install
```
