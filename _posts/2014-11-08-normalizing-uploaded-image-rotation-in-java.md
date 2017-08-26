---

published: true
title: Normalizing uploaded image rotation in Java
---
EXIF (Exchangeable image file format) is a standard that specifies metadata for images. This allows digital cameras and phones to embed GPS coordinates, camera type, resolution, timestamps, and much more into the image file.

We had a bug recently in a software project I was working with in which uploaded images were not displaying at their correct rotation. After running a couple of tests, I realized that our software was ignoring the EXIF orientation tag on the images.

This flag is an integer, and there are 8 different ways it can be set. These values corresponding to 90-degree increments of rotation for the image and 90-degree increments of rotation for the flipped image.

![]({{site.cdn_path}}/2014/11/08/EXIF_Orientations-1.gif)

It turns out that the way devices handle image rotation and the way browsers render it is not standardized. At all.  Most browsers ignore this flag entirely. And image capture devices handle it in widely-varying ways. After taking a photo, some devices rotate the image, save it, and don't set the flag. Some of them just save the image as-is and set the flag. And some of them don't set the flag at all.

When you take a photo with an iPhone, for instance, the phone saves the image un-rotated, but sets the Orientation flag in the EXIF data. When you view the image on the phone, it reads this flag and rotates the image appropriately. This also happens when you view the image in Preview on OSX or using the mobile Safari browser. If you view this same image raw in a (non mobile Safari) browser, however, it will not be rotated properly.

Many web services do a [really bad job](http://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/) of handling this orientation flag. Most of them don't even touch it. Google Drive and Facebook are notable exceptions to this.

My coworker, Charles, and I, wrote a proof-of-concept web app that performs image processing to normalize the rotation of uploaded images. We made use of the [org.apache.commons.imaging library](http://commons.apache.org/proper/commons-imaging/) and the [javaxt.io.Image library](http://www.javaxt.com/javaxt-core/javaxt.io.Image/). Our app consisted of a simple web form. A user would upload an image, the app would process it, and the normalized (properly rotated) result is displayed. After upload, we used the Apache Commons Imaging library to read the metadata on the image. If the Orientation flag was set, we used the javaxt.io library to rotate it properly. Our app then stripped out the Orientation flag from the metadata, and wrote the rotated image and its new metadata to a file which would then be displayed in the user's browser.

Our git repo can be found [here](https://github.com/charlescapps/test-exif-image-stuff). 

### References:

Background on EXIF: [EXIF Orientation Handling is Ghetto](http://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/)
