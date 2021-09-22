
##################################################################################
# GAME
##################################################################################

# NEW GAME
resource "aws_appsync_resolver" "new_game_resolver" {
  api_id            = aws_appsync_graphql_api.GuaranteedRateTest.id
  field             = "newGame"
  type              = "Mutation"
  data_source       = aws_appsync_datasource.ratetest_dynamodb_game_datasource.name
  request_template  = file("./AppSync/resolvers/game-resolvers/newGame/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-SINGULAR.vtl")
  depends_on = [
    aws_appsync_graphql_api.GuaranteedRateTest,
    aws_appsync_datasource.ratetest_dynamodb_game_datasource,
  ]
}