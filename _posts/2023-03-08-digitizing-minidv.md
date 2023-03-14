---
published: true
title: 'How I digitized a bunch of old MiniDV tapes'
excerpt: Dongles all the way down - A lesson in how quickly a technology can become obsolete.
---
Back in 2001, I saved up my paper route money for several months
and bought a shiny new [Canon ZR30MC camcorder](https://global.canon/en/c-museum/product/dvc675.html). For the next several years,
that camera was glued to my face (only slightly exaggerating) and captured dozens of hours of my life on MiniDV tapes.

Fast-forward 22 years, and I returned home from a trip to visit my family
with that camera and several boxes full of tapes. Thus began my journey into 
digitizing them.

# The hardware

I was surprised to find that MiniDV players are really difficult to come by
these days. I was hoping to find a machine that could play back several of them in parallel,
so I could capture multiple streams at once and speed up the process, but no dice. The ones I did find were on the order of 
$300-$500 and could only play a single tape at a time.

Luckily, the camera's tape deck still worked for playback, so I didn't need to 
solve that problem (for now, anyway. Time will tell if the tape heads hold up for the duration of this project 🤞🏼️).

The camera had a 4-pin Firewire 400 connection for output. I ultimately needed to connect 
that to my 2015 iMac, which takes either USB or Thunderbolt 2 as input. 

In subsequent years, before the whole [Firewall interface was scrapped](https://arstechnica.com/gadgets/2017/06/the-rise-and-fall-of-firewire-the-standard-everyone-couldnt-quite-agree-on/#:~:text=The%20decision%2Dmakers%20in%20the,be%20first%20to%20push%20it.), 
Firewire 800 was introduced as the successor to 400. Luckily,
it's backwards-compatible with 400. So I'd need to convert from Firewire 400 to 800 to Thunderbolt 2.

So, essentially, I needed:
* Firewire 400 4-pin to 6-pin cable
* Firewire 400 to 800 adapter
* Firewire 800 to Thunderbolt 2 adapter

I was able to find all the cables and converters I needed from [B&H](https://www.bhphotovideo.com/).

![]({{site.cdn_path}}/2023/03/08/donglesForDays.jpg)

# The software

This is where things got a little hairy. I was able to get the camera connected to the computer fine, and even
see a video feed via Quicktime. Quicktime kept pausing recording if there were any gaps on the tape. I tried
capturing via Premiere and, while it could control the camera, there was no video output or a way to record it.
I subsequently discovered that Premiere [just doesn't support MiniDV at all anymore](https://helpx.adobe.com/x-productkb/multi/video-applications-macos-catalina-compatibility.html#:~:text=no%20longer%20support,over%20FireWire), 
as of January 2022.

I was able to get iMovie to capture video, but there was no audio.

🤦🏼‍♂️️

Then I stumbled across [this post](https://leolabs.org/blog/capture-minidv-on-macos) by Léo Bernard, who solved a similar
problem using a set of open-source tools. In particular:

* [ffmpeg-decklink](https://github.com/amiaopensource/homebrew-amiaos/blob/master/ffmpegdecklink.rb) for video capture.
* [DV Packager](https://git.io/JqT1O) for splitting the video into clips post-capture.

And this worked for me! Both video and audio are now capturing ✅️. The one downside to these tools is that 
neither of them has a GUI, so they require some terminal commands. If you're comfortable with that, though,
the capture process was pretty straightforward.

For posterity, the commands to set up those tools are:

```shell
brew tap amiaopensource/amiaos
brew tap mediaarea/homebrew-mediaarea
brew install ffmpegdecklink dvrescue mediainfo
brew link --force ffmpegdecklink
```

To use them, list the input devices with:

```shell
ffmpeg -f avfoundation -list_devices true -i ""
```

In my case, I found that the camera was called `FV20`.

Then, capture the raw DV footage with:

```shell
ffmpeg-dl -f avfoundation -capture_raw_data true -i "FV20" -c copy -map 0 -f rawvideo video.dv
```

I've found that an hour of raw DV footage uses up 12-14GB. I'm thinking that I probably won't re-encode it, as storage
is cheap. I've got on the order of about 100 tapes to capture, so at worst, that's 1TB. 

To split the raw footage into clips, use:

```shell
dvpackager -e mov -s video.dv
```
