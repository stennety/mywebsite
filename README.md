My personal website, built with [Jekyll](https://jekyllrb.com/).

https://www.davidmerrick.me

# Running locally

Run `docker-compose up`
Visit http://localhost:4000

# Infrastructure

This site has CloudFormation templates for deployment to AWS. Its infrastructure consists of:
* S3 bucket
* Route53 Domain
* CloudFront distribution for edge caching
* Lambda@Edge to redirect non-www requests to the www subdomain

To create the AWS resources from the template, do the following.

Package the templates:
`aws cloudformation package --template-file etc/root.yaml --output-template packaged.yaml --s3-bucket merrick-cf-templates-east`

Deploy the templates:

_Note: Make sure to customize the parameter values_

`aws cloudformation deploy --template-file packaged.yaml --capabilities CAPABILITY_IAM --parameter-overrides Referer=myReferer --stack-name davidmerrickdotcom`

# Gotchas
- Lambda@Edge doesn't allow env vars, so gotta hardcode that domain name.
- Lambda@Edge has a 5-second limit on timeouts.
