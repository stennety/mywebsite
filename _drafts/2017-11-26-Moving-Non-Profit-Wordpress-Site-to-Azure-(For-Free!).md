---
layout: post
title: Moving a Non-Profit Wordpress Site to Azure (For Free!)
---

So let's start with the easy and fun stuff first: the **for free** part! Microsoft has a fantastic donation program setup for most non-profits to get $5000 per year in free Azure computing. It's pretty fantastic. If you have 501(c)3 status (or the equivalent in your country) pop over to the [Azure donation website](https://www.microsoft.com/en-us/nonprofits), double check that you meet the [eligibility requirements](https://www.microsoft.com/en-us/nonprofits/eligibility) (no political orgs, no government orgs, stuff like that) and start the application process. It costs you nothing to apply and even if you aren't planning to use it to host your website like I outline here, $5000 in free compute is never a liability. Spin up a massive GPU instance and mine bitcoin or something at the least!

I'm a board member for a [small Christian non-profit](https://ctimusic.org) that does leadership and character development in young musicians. I figured after getting my hands on this free Azure compute, that it made sense to move the organization's website to there. Azure has their versions of containers called "Azure Web Apps" that make it pretty brain dead simple to manage web applications. You just worry about keeping Wordpress up to date, and Azure handles all the security updates, redundancy and maintenance of the underlying infrastructure. Much faster than your standard $10 a month shared webhosting without too much more pain. 

## General Caveats and Liability Disclaimer
Hey, does regular shared webhosting actually meet your needs? You should probably checkout [Dreamhost's 100% free shared webhost plan](https://help.dreamhost.com/hc/en-us/arti,cles/215769478-Non-profit-discount) for 501(c)3 non-profits instead. They're fantastic, and you can get your website up and going faster, 24/7 support and the whole nine yards. They weren't enough for the level of traffic my org starting to get, but they were a great home for us for the first few years we were expanding our web presence.

Second, if you're mucking around with your non-profit's wordpress website **take backups.** Take a bunch of them. Have two copies of the files in different places, and don't forget backing up the database as well. If you screw up your website, make sure you can go back and restore to a copy that you know works.

Third, I'll try to outline this as simple and straightforwardly as I can, but even with my own technical background I found migrating these sites to be not particularly straightforward, and if you have some requirement for your site that wasn't part of mine, you may need to get your hands dirty troubleshooting on your own. At a minimum, you should be okay using an FTP client to upload and download files to follow these steps, and a tiny bit of experience with clicking around phpMyAdmin would probably be helpful, but not entirely required.

**If you break your website, it's not my fault. I'm not going to fix your website just because you read my blog post, okay?**

## Okay I get the warning. I made my backups and redundant backups of the backups. Now how do I do this?

You still with me? Cool. Let's go about setting up a copy of your org's Wordpress site on Azure. First, we need to download a copy of the files and a database dump to play around with. If your own WordPress backup solution let's you grab a copy of those, that's great! Jump ahead to the next section.

For everyone else, go ahead and install the [BackWPup extension](https://wordpress.org/plugins/backwpup/) on your Wordpress site. It's free, and it does all the backups that we need. Install it, activate it, and then go to the settings and make the first backup job. You want to check the Database Backup and File Backup options.
 
![Files and Database](https://blog.benjamin-hering.com/images/azure-wordpress/backwpup-files-database.png)

Scroll down and select the Job Destination as "Backup to Folder" (storing it at the same place as your current WordPress site)

![Backup to folder](https://blog.benjamin-hering.com/images/azure-wordpress/backwpup-to-folder.png)

And then when you hit the save button, hit the link that pops up at the top of the screen to run the backup job now. Once it finishes, download the zip backup file that it made.

![Run backup now](https://blog.benjamin-hering.com/images/azure-wordpress/backwpup-run-now.png)

## Spinning up a blank Wordpress instance in Azure

Now that we have a backup copy of your site, let's spin up where it is that you want your site to go.

Log into your nifty free Azure portal you got donated to you, and the left side menu hit "All Resources" and then the "+ Add" button at the top of the page.

![Add resource](https://blog.benjamin-hering.com/images/azure-wordpress/azure-add-resource.png)

Azure has their own blank WordPress web app configuration published directly from the WordPress maintainers all set to go. We'll use that as our original baseline. Search "WordPress" in the resource menu.

![Search Wordpress](https://blog.benjamin-hering.com/images/azure-wordpress/azure-search-wordpress.png)

And select the one that just says "Wordpress" When you do, you'll get a short blurb about Wordpress and the option to hit the "create" button down at the bottom.

![Wordpress Create](https://blog.benjamin-hering.com/images/azure-wordpress/azure-wordpress-create.png)

## Setting up the Azure Resources for WordPress

Azure is going to ask you for a bunch of parameters. It looks more complicated than it actually is.

* App Name - A nice friendly name for the site. This is going to become part of the name for the website that we'll hit during development of the site; App-Name.azurewebsites.net. We'll be able to change it later to respond to your supercoolorgname.com domain, but it's still a good idea to make it simple and easy for your to remember.
* Subscription - You should just have the one for the sponsorship. Make sure that's what's selected.
* Resource Group - This isn't really important for our needs, but you'll have to make one. Name it whatever you want.
* Database Provider - Select the ClearDB

![Wordpress Settings](https://blog.benjamin-hering.com/images/azure-wordpress/azure-wordpress-creation-parameters.png)

For App Service plan / Location you'll be choosing what raw hardware in what location you want behind your application. For my site, I chose the P1V2 service plan as it was the cheapest with solid state drives for the storage. ~$205 per month is certainly pricy if we were paying out of pocket, and will eat up about half of our sponsorship, but you can certainly experiment with smaller app sizes if you wish. Note that the Premium V2 service plans (with SSD) are only available in certain regions. South Central US is one, and is closer to our main office than the coasts, but the specific US region doesn't matter too much.

![Wordpress Settings](https://blog.benjamin-hering.com/images/azure-wordpress/azure-app-service-plan.png)

![ClearDB Settings](https://blog.benjamin-hering.com/images/azure-wordpress/azure-mysql-database-creation.png)