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

```bash
export AWS_PROFILE=cloudformation
export AWS_REGION=us-east-1
```

Manually create the S3 bucket. Then run: 
```bash
aws s3api put-public-access-block \
        --bucket davidmerrick.me \
        --public-access-block-configuration \
          "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

Package the templates:
`aws cloudformation package --template-file etc/root.yaml --output-template packaged.yaml --s3-bucket io.github.davidmerrick.davidmerrickme.cloudformation`

Deploy the templates:

_Note: Make sure to customize the parameter values_

`aws cloudformation deploy --template-file packaged.yaml --capabilities CAPABILITY_IAM --parameter-overrides Referer=myReferer --stack-name davidmerrickdotme`

# Gotchas
- You need to manually create the S3 bucket which is annoying.
- Lambda@Edge doesn't allow env vars, so we've got to hardcode the domain name.
- Lambda@Edge has a 5-second limit on timeouts.

# Todo
- Convert CloudFormation templates to Terraform
