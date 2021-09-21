## ------------------------------
resource "aws_appsync_graphql_api" "GuaranteedRateTest" {
  name   = "${local.common_tags.AppPrefix}${local.common_tags.Environment}"
  schema = file("./AppSync/schema/schema.gql")

  # USER AUTHENTICATION for all PRIVATE endpoints:
  authentication_type = "API_KEY"
  log_config {
    cloudwatch_logs_role_arn = aws_iam_role.ratetest_appsync_logging_role.arn
    field_log_level          = "ALL"
  }
  tags = merge(local.common_tags, {
    Description = "GraphQL AppSync API for GuaranteedRateTest"
  })
}

resource "aws_appsync_api_key" "key" {
  api_id  = aws_appsync_graphql_api.GuaranteedRateTest.id
  expires = "2022-08-16T04:00:00Z" # approx. 1 year from now 
}
