# ROLE for DDB
# - allows AppSync service to assume IAM role for accessing DynamoDB tables
resource "aws_iam_role" "iam_role_for_dynamo" {
  name               = "${local.common_tags.AppPrefix}iam_role_for_dynamo_${local.common_tags.Environment}"
  assume_role_policy = file("./AppSync/policies-roles/AppSync/role.json")
}

# POLICY for DDB Role
resource "aws_iam_role_policy" "iam_role_policy_for_dynamo" {
  name = "${local.common_tags.AppPrefix}iam_role_policy_for_dynamo_${local.common_tags.Environment}"
  role = aws_iam_role.iam_role_for_dynamo.id
  policy = templatefile("./AppSync/policies-roles/DynamoDB/policy.json", {
    GAME_TABLE_ARN = aws_dynamodb_table.game_dynamo_table.arn,
  })
}

# CLOUDWATCH loggin for APP SYNC
# appsync logging (w/ assumed roles/IAM for cloudwatch)
resource "aws_iam_role" "ratetest_appsync_logging_role" {
  name               = "${local.common_tags.AppPrefix}appsync_logging_role_${local.common_tags.Environment}"
  assume_role_policy = file("./AppSync/policies-roles/AppSync/logging_role_policy.json")
}
resource "aws_iam_role_policy_attachment" "appsync_logging_role_attachment" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSAppSyncPushToCloudWatchLogs"
  role       = aws_iam_role.ratetest_appsync_logging_role.name
  depends_on = [
    aws_iam_role.ratetest_appsync_logging_role,
  ]
}
