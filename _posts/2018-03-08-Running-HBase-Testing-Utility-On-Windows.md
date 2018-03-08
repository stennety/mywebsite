The [HBase Testing Utility] is a vital tool for anyone writing HBase applications. It sets up (and tears down) a lightweight HBase instance locally to allow local integration tests. I've previously discussed this and how to use it with BDD Cucumber tests in [this blog post, complete with working repo]. However, it is not trivially easy to get working on Windows machines, nor is it documented anywhere.

In this blog post, I'll show how to get the HBase Testing Utility running on Windows machines, no admin access required. There's no accompanying GitHub project for this post, as it's fairly short and generic. I'll assume you already have a working HBase Testing Utility test that runs on Unix, and you want to port it to Windows.

1. Download/clone `[Winutils]`. This contains several Hadoop versions compiled for Windows.
2. Go to `Control Panel`, and find `Edit environment variables for your account` in `System`.
3. Add the following user variables:
   - `hadoop.home.dir=<PATH_TO_DESIRED_HADOOP_VERSION>` (in my case `C:\Users\bwatson\apps\hadoop-2.8.3`)
   - `HADOOP_HOME=<PATH_TO_DESIRED_HADOOP_VERSION>` (as above)
   - append `%HADOOP_HOME%/bin` to `Path`
4. Before starting the `HBaseTestingUtility`, add `System.setProperty("test.build.data.basedirectory", "C:/Temp/hbase");` to the code. This path can be changed, but it's important to keep it short. Using the JUnit `TemporaryFolder` or the default path results in paths too long, and shows an error similar to `java.io.IOException: Failed to move meta file for ReplicaBeingWritten, blk_1073741825_1001, RBW`.
5. You may get the error: "Caused by: java.lang.NoSuchMethodError: com.google.common.hash.HashFunction.hashString(Ljava/lang/CharSequence;)Lcom/google/common/hash/HashCode;". This is caused by different versions of Guava being pulled in by various dependencies. I resolevd this by excluding Guava from my Hadoop dependencies, and forcing version `15.0` to be used. My Gradle `dependencies` sections looks like:

```
dependencies {
    compile group: 'com.google.guava', name: 'guava', version: '15.0'
    compile(group: 'org.apache.hbase', name: 'hbase-client', version: '1.4.2') {
        exclude group: 'com.google.guava', module: 'guava'
    }
    compile(group: 'org.apache.hbase', name: 'hbase-testing-util', version: '1.4.2') {
        exclude group: 'com.google.guava', module: 'guava'
    }
    testCompile group: 'junit', name: 'junit', version: '4.1.2'
    //Needed for JUnit
    testCompile group: 'org.hamcrest', name: 'hamcrest-all', version: '1.3'
}
```

Following these steps, the HBase Testing Utility should work on Windows machines.

[Winutils]:https://github.com/steveloughran/winutils
[HBase Testing Utility]:https://hbase.apache.org/testapidocs/org/apache/hadoop/hbase/HBaseTestingUtility.html
[this blog post, complete with working repo]:http://www.hadoopathome.co.uk/Testing-Hbase-Applications-with-BDD-Integration-Tests/
