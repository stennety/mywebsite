terraform {
  backend "s3" {
    bucket = "terraform-www.david-merrick.com"
    key    = "terraform.tfstate"
    region = "us-west-2"
  }
}

variable "region" {
  default = "us-east-1"
}

variable "bucketname" {}

provider "aws" {
  profile    = "terraform-sandbox"
  region     = var.region
}

resource "aws_s3_bucket" "website" {
  bucket = var.bucketname
  acl    = "public-read"

  tags = {
    Name        = "david-merrick.com"
    Environment = "production"
  }

  website {
    index_document = "index.html"
    error_document = "404/index.html"
  }
}

resource "aws_s3_bucket_policy" "website_policy" {
  bucket = var.bucketname

  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::www.david-merrick.com/*",
            "Condition": {
                "IpAddress": {
                    "aws:SourceIp": [
                        "103.21.244.0/22",
                        "103.22.200.0/22",
                        "103.31.4.0/22",
                        "104.16.0.0/12",
                        "108.162.192.0/18",
                        "131.0.72.0/22",
                        "141.101.64.0/18",
                        "162.158.0.0/15",
                        "172.64.0.0/13",
                        "173.245.48.0/20",
                        "188.114.96.0/20",
                        "190.93.240.0/20",
                        "197.234.240.0/22",
                        "198.41.128.0/17",
                        "199.27.128.0/21"
                    ]
                }
            }
        }
    ]
}
POLICY
}