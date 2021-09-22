##################################################################################
# GAME
##################################################################################

# (GET SINGLE) GAME
resource "aws_appsync_resolver" "get_game_resolver" {
  api_id            = aws_appsync_graphql_api.GuaranteedRateTest.id
  field             = "game"
  type              = "Query"
  data_source       = aws_appsync_datasource.ratetest_dynamodb_game_datasource.name
  request_template  = file("./AppSync/resolvers/game-resolvers/game/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-SINGULAR.vtl")
  depends_on = [
    aws_appsync_graphql_api.GuaranteedRateTest,
    aws_appsync_datasource.ratetest_dynamodb_game_datasource,
  ]
}
