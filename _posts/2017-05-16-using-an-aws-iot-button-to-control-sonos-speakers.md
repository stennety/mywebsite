---
layout: post
published: true
title: Using an AWS IoT button to control Sonos speakers
---
I set up an [AWS IoT button](https://www.amazon.com/All-New-AWS-IoT-Button-Generation/dp/B01KW6YCIM/ref=sr_1_1?ie=UTF8&qid=1494981420&sr=8-1&keywords=iot+button) 
to trigger a Lambda which toggles the play/pause state on my Sonos speakers.

Demo:
{% youtube xUQ8kxjlXlA %}

To control the Sonos speakers, I used a Raspberry Pi running [Sonos HTTP API](https://github.com/davidmerrick/rpi-node-sonos-http-api). 
I deployed this with [Resin.io](https://resin.io/) so that I could give it a public web address.

If you'd like to do this project yourself, follow these steps:


## 1. Deploy Sonos Node API 

If you haven't already, deploy an instance of the Node Sonos API using my instructions [here](/2017/05/16/setting-up-node-sonos-api/).

## 2. Add your IoT button to your network

AWS has instructions [here](http://docs.aws.amazon.com/iot/latest/developerguide/configure-iot.html) for how to do this.

For me, these didn't work and I had to set up the button manually. I did this by: 
1. Creating device certs with instructions [here](http://docs.aws.amazon.com/iot/latest/developerguide/create-device-certificate.html) 
2. Connecting to the wifi network on the button
3. Visiting http://192.168.0.1/
4. Filling out fields on the form, adding the cerds generated in step 1, then submitting the form.
  
![aws_iot_certs.png]({{site.cdn_path}}/2017/05/16/aws_iot_certs.png)

## 3. Create a Lambda function

The IoT button triggers a Lambda function, which I configured to talk to my Sonos endpoint. 

In AWS, create a Lambda function based on Node.js 6.10.
Use this code to run it: [https://github.com/davidmerrick/lambda-sonos-toggle](https://github.com/davidmerrick/lambda-sonos-toggle).
 
## 4. Configure the Lambda function

Set the following environment variables:

* *AUTH_USERNAME* Auth username you set in step 1 for your device.
* *AUTH_PASSWORD* Auth password you set in step 1 for your device.
* *SONOS_API_SERVER* Public URL of your device.

![lambda_sonos_env.png]({{site.cdn_path}}/2017/05/16/lambda_sonos_env.png)

## 5. Done!
 
Test your setup by pressing your AWS IoT button. It should now toggle the play/pause state of your Sonos system.
