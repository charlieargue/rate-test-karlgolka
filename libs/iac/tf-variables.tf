##################################################################################
# VARIABLES
##################################################################################
variable "AWS_REGION" { default = "us-west-2" }
variable "ORGANIZATION_NAME" { default = "rate-test-karlgolka" }
variable "ENVIRONMENT" { default = "dev" }


##################################################################################
# LOCALS
##################################################################################
locals {
  common_tags = {
    OrgName     = "${var.ORGANIZATION_NAME}"
    Environment = "${var.ENVIRONMENT}"
    AppPrefix   = "rate-test-karlgolka_",
  }
}
