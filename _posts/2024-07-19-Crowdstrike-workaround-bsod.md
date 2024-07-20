---
layout: post
title: CrowdStrike workaround to bypass BSOD boot loop
category: blog
tags: Crowdstrike endpoint bsod outage workaround antivirus
comments: true
---
# What's the issue?
Recently on 2024-07-19, [CrowdStrike](https://en.wikipedia.org/wiki/CrowdStrike) released an update (apperently in the endpoint software solution) with an update that is now causing BSOD (Blue Screen Of Dead) in the Windows 10 workstations and also Windows Servers (no version reference yet) at a [global scale incident](https://en.wikipedia.org/wiki/2024_CrowdStrike_incident). The machine keeps trying to Boot, and looping with a BSOD, due to the update deployed.


![_config.yml]({{ site.baseurl }}/images/bsod.jpg)


# How to fix this behabiour?
1. Boot Windows into [Safe Mode](https://support.microsoft.com/en-us/windows/start-your-pc-in-safe-mode-in-windows-92c27cff-db89-8644-1ce4-b3e5e56fe234), or enter the Windows Recovery Environment;
2. Go to C:\Windows\System32\drivers\CrowdStrike directory;
3. Locate the file matching "C-00000291*.sys" and then Delete it;
4. Boot your machine.
(Repeat this procedure in all the impacted computers you manage)

After this procedure you should be able to boot windows on your PC or Server.
For More details follow Tom Warren's [article](https://www.theverge.com/2024/7/19/24201717/windows-bsod-crowdstrike-outage-issue) on this topic.
If you have BitLocker enabled, make sure you have your key near by, before you start, so you can unlock your drive.
