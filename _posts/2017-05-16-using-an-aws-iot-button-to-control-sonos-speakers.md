---

published: true
title: Using an AWS IoT button to control Sonos speakers
---
I set up an [AWS IoT button](https://www.amazon.com/All-New-AWS-IoT-Button-Generation/dp/B01KW6YCIM/ref=sr_1_1?ie=UTF8&qid=1494981420&sr=8-1&keywords=iot+button) 
to trigger a Lambda which toggles the play/pause state on my Sonos speakers.

Demo:
{% include video id="xUQ8kxjlXlA" provider="youtube" %}

Here's how this works:

![lambda_sonos_diagram.png]({{site.cdn_path}}/2017/05/16/lambda_sonos_diagram.png)

The AWS IoT button triggers a Lambda function, which talks to a [Sonos API server](https://github.com/davidmerrick/rpi-node-sonos-http-api)
running on a Raspberry Pi. This server is deployed with [Resin.io](https://resin.io/) so that I could give it a public web address
without having to deal with NAT traversal/port forwarding.

If you'd like to do this project yourself, follow these steps:

## 1. Deploy Sonos Node API 

If you haven't already, deploy an instance of the Node Sonos API using my instructions [here](/2017/05/16/setting-up-node-sonos-api/).

## 2. Add your IoT button to your network

AWS has instructions [here](http://docs.aws.amazon.com/iot/latest/developerguide/configure-iot.html) for how to do this.

For me, these didn't work and I had to set up the button manually. How I managed to get it set up: 
1. Create device certs with instructions [here](http://docs.aws.amazon.com/iot/latest/developerguide/create-device-certificate.html). 
2. Connect to the wifi network on the button.
3. Visit [http://192.168.0.1/](http://192.168.0.1/).
4. Fill out fields on the form, add the cerds generated in step 1, then submit the form.
  
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
