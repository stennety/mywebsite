---
published: false
title: How to fix "invalid target release" error in IntelliJ
---
Sometimes, after changing your project's JDK, you may run into an "invalid target release" error during compilation.

```
Error:java: invalid target release: 9
```

To fix this, open up `.idea/compiler.xml` and change the "target" parameter to the release that you're targeting.

![]({{site.cdn_path}}/2017/11/03/compilerxml.png)

Your build should now compile just fine. Er, without that error, at least :-).
