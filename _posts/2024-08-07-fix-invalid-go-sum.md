---
layout: post
title: Fix invalid `GOSUMDB` error in golang 1.22
---

When I've checked out cri-o and run `BUILDTAGS='' make` I encountered the following error:

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
$ BUILDTAGS='' make
```

But this was only a temporary fix. After upgrading to `1.22.6` my setup worked again, but as soon as I required the toolchain again it failed.

```
$ GOTOOLCHAIN=go1.21.9 go build -v -a -n internal/godebugs
go: downloading go1.21.9 (linux/amd64)
go: download go1.21.9: golang.org/toolchain@v0.0.1-go1.21.9.linux-amd64: verifying module: invalid GOSUMDB: malformed verifier id
$ GOTOOLCHAIN=go1.21.9 GOSUMDB=off go mod tidy
go: downloading go1.21.9 (linux/amd64)
go: download go1.21.9: golang.org/toolchain@v0.0.1-go1.21.9.linux-amd64: verifying module: checksum database disabled by GOSUMDB=off
```

## Fix and root cause

My go env had an invalid setting. There is an `off` setting, but not an `on`.

```

$ go env | grep GOSUMDB
GOSUMDB=on

# Fix setting GOSUMDB to the correct default.
$ go env -w GOSUMDB='sum.golang.org'
$ GOTOOLCHAIN=go1.21.9 go build -v -a -n internal/godebugs
# some output...
```

**Read more:**
 - golang issue: [68782](https://github.com/golang/go/issues/68782)
 - documentation: [GOSUMDB-env.md](https://github.com/goproxyio/goproxy.io/blob/master/content/docs/GOSUMDB-env.md)
