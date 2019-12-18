---
published: true
title: Useful IntelliJ Defaults
---
The following are some global IntelliJ defaults that I use. Hope they're helpful to you as well.

# Default directory

I use `~/code` for my projects, but IntelliJ defaults to opening my home directory. To save myself a step, I set the default directory to `~/code`. This is configured with Preferences -> System Settings -> Default Directory.

![]({{site.cdn_path}}/2017/11/21/defaultOpenDir.png)

# Disable folding of Java imports during optimize imports

IntelliJ has a useful "optimize imports" feature that I use frequently (hotkey: ⌘+⇧+o). Unfortunately, one side effect of it is that, if you've imported a few classes from the same package, it will fold the imports. This pulls in all classes from that package, resulting in extraneous classes being imported. To prevent this, go to File -> Other Settings -> Default Settings -> Editor -> Code Style -> Imports, and set the threshold values to 999 for importing packages.

![]({{site.cdn_path}}/2017/11/21/optimizeImports.png)

# Enable annotation processing

If you work with frameworks that require annotation processing, such as [Lombok](https://projectlombok.org/), enabling annotation processing globally will save you the headache of configuring this for each of your projects. To do this, go to File -> Other Settings -> Default Settings -> Build, Exec, Deploy -> Compiler -> Annotation Processor, and check the box to enable annotation processing.

![]({{site.cdn_path}}/2017/11/21/annotationProcessing.png)
