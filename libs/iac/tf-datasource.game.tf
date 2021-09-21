
# GAME DYNAMODB DATASOURCE
resource "aws_appsync_datasource" "ratetest_dynamodb_game_datasource" {
  api_id           = aws_appsync_graphql_api.GuaranteedRateTest.id
  name             = "ratetest_dynamodb_game_datasource"
  service_role_arn = aws_iam_role.iam_role_for_dynamo.arn
  type             = "AMAZON_DYNAMODB"
  dynamodb_config {
    table_name = aws_dynamodb_table.game_dynamo_table.name
  }
  depends_on = [
    aws_appsync_graphql_api.GuaranteedRateTest,
  ]
}

## GAME TABLE
resource "aws_dynamodb_table" "game_dynamo_table" {
  name           = "GameTable_${local.common_tags.Environment}"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "id"
  attribute {
    name = "id"
    type = "S"
  }
  attribute {
    name = "createdAt"
    type = "S"
  }
  attribute {
    name = "updatedAt"
    type = "S"
  }
}



