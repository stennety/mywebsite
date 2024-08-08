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

### Misc - Debug commands

**Check toolchain directories**

```
$ cd $GOPATH
$ cat $GOPATH/pkg/sumdb/sum.golang.org/latest
go.sum database tree
28891140
++pUIeKTwGvykMUkmM3AT97PwQipMT6H/p7t86E0Sp0=

— sum.golang.org Az3grqNvOILDz7xwAKugtVFZwd+I9IyB/mHrUYzcVaS9zKsRVdRLNGLFpnAcLhyoBBkdIYEzK/+7Eu4wanYttLrPsQo=
$ find . -name 'toolchain@v0.0.1-*'
./pkg/mod/cache/download/sumdb/sum.golang.org/lookup/golang.org/toolchain@v0.0.1-go1.22.3.linux-amd64
./pkg/mod/cache/download/sumdb/sum.golang.org/lookup/golang.org/toolchain@v0.0.1-go1.22.5.linux-amd64
./pkg/mod/cache/download/sumdb/sum.golang.org/lookup/golang.org/toolchain@v0.0.1-go1.23rc2.linux-amd64
./pkg/mod/cache/download/sumdb/sum.golang.org/lookup/golang.org/toolchain@v0.0.1-go1.21.9.linux-amd64
./pkg/mod/golang.org/toolchain@v0.0.1-go1.22.3.linux-amd64
./pkg/mod/golang.org/toolchain@v0.0.1-go1.22.5.linux-amd64
./pkg/mod/golang.org/toolchain@v0.0.1-go1.23rc2.linux-amd64
./pkg/mod/golang.org/toolchain@v0.0.1-go1.21.9.linux-amd64
$ ls -l ./pkg/mod/cache/download/sumdb/sum.golang.org/lookup/golang.org/toolchain@v0.0.1-go1.21.9.linux-amd64
-rw-r--r-- 1 4200660 4200660 399 Aug  8 08:54 ./pkg/mod/cache/download/sumdb/sum.golang.org/lookup/golang.org/toolchain@v0.0.1-go1.21.9.linux-amd64
[go]$ cat ./pkg/mod/cache/download/sumdb/sum.golang.org/lookup/golang.org/toolchain@v0.0.1-go1.21.9.linux-amd64
24929362
golang.org/toolchain v0.0.1-go1.21.9.linux-amd64 h1:rRL9rPpsjKfpdDFcppvNgw1/dynUMrpDcTxdIwtyFR0=
golang.org/toolchain v0.0.1-go1.21.9.linux-amd64/go.mod h1:8wlg68NqwW7eMnI1aABk/C2pDYXj8mrMY4TyRfiLeS0=

go.sum database tree
28905453
f3f8U0MoQmXkWAgAEKDtXcaI3c2y6N9+55KNSRefF/w=

— sum.golang.org Az3grr4J9x4SApup87osjthKONInbYdbN37ZskrLF12HIbhDuxOBTzt8Z2jUKbCvxYWrw0yNgshddOzt7pZEl7aSCw8=
```

**Build internal tools without running commands**

```
❯ GOTOOLCHAIN=go1.21.9 go build -v -a -n internal/godebugs
go: downloading go1.21.9 (linux/amd64)
go: download go1.21.9: golang.org/toolchain@v0.0.1-go1.21.9.linux-amd64: verifying module: invalid GOSUMDB: malformed verifier id
❯ GOTOOLCHAIN=go1.21.9 GOSUMDB=off go mod tidy
go: downloading go1.21.9 (linux/amd64)
go: download go1.21.9: golang.org/toolchain@v0.0.1-go1.21.9.linux-amd64: verifying module: checksum database disabled by GOSUMDB=off
```

**Try to find malformed ID in file via strace**

Wasn't helpful because it couldn't list syscalls from threads.

```
$ GOTOOLCHAIN=go1.21.9 strace -e open go mod tidy
--- SIGURG {si_signo=SIGURG, si_code=SI_TKILL, si_pid=35360, si_uid=4200654} ---
--- SIGURG {si_signo=SIGURG, si_code=SI_TKILL, si_pid=35360, si_uid=4200654} ---
--- SIGURG {si_signo=SIGURG, si_code=SI_TKILL, si_pid=35360, si_uid=4200654} ---
go: downloading go1.21.9 (linux/amd64)
--- SIGURG {si_signo=SIGURG, si_code=SI_TKILL, si_pid=35360, si_uid=4200654} ---
--- SIGURG {si_signo=SIGURG, si_code=SI_TKILL, si_pid=35360, si_uid=4200654} ---
--- SIGURG {si_signo=SIGURG, si_code=SI_TKILL, si_pid=35360, si_uid=4200654} ---
--- SIGURG {si_signo=SIGURG, si_code=SI_TKILL, si_pid=35360, si_uid=4200654} ---
--- SIGURG {si_signo=SIGURG, si_code=SI_TKILL, si_pid=35360, si_uid=4200654} ---
--- SIGURG {si_signo=SIGURG, si_code=SI_TKILL, si_pid=35360, si_uid=4200654} ---
--- SIGURG {si_signo=SIGURG, si_code=SI_TKILL, si_pid=35360, si_uid=4200654} ---
--- SIGURG {si_signo=SIGURG, si_code=SI_TKILL, si_pid=35360, si_uid=4200654} ---
go: download go1.21.9: golang.org/toolchain@v0.0.1-go1.21.9.linux-amd64: verifying module: invalid GOSUMDB: malformed verifier id
+++ exited with 1 +++
```
