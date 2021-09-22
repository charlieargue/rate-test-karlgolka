# AppSync "wrapper" FUNCTIONs so can be called from pipeline resolvers

## -------------------------------------
## CARD
## -------------------------------------

resource "aws_appsync_function" "get_game_function" {
  api_id                    = aws_appsync_graphql_api.GuaranteedRateTest.id
  data_source               = aws_appsync_datasource.ratetest_dynamodb_game_datasource.name
  name                      = "get_cart_function"
  request_mapping_template  = file("./AppSync/functions/getGame/request-mapping.vtl")
  response_mapping_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-SINGULAR.vtl")
}

resource "aws_appsync_function" "flip_card_function" {
  api_id                    = aws_appsync_graphql_api.GuaranteedRateTest.id
  data_source               = aws_appsync_datasource.ratetest_dynamodb_game_datasource.name
  name                      = "flip_card_function"
  request_mapping_template  = file("./AppSync/functions/flipCard/request-mapping.vtl")
  response_mapping_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-SINGULAR.vtl")
}