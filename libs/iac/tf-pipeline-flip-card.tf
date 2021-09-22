
# 1) function: get-game, pass entire game w/ cards to next function
# 2) function: flip card: get the actual sub-INDEX of the card we want to update, and then call UpdateItem


# PIPELINE 
resource "aws_appsync_resolver" "flip_card_pipeline_resolver" {
  kind              = "PIPELINE"
  api_id            = aws_appsync_graphql_api.GuaranteedRateTest.id
  field             = "flipCard"
  type              = "Mutation"
  request_template  = file("./AppSync/resolvers/_generic/generic-request-mapping-EMPTY.vtl")
  response_template = file("./AppSync/resolvers/card-resolvers/flipCard/pipeline/response-mapping.vtl")
  pipeline_config {
    functions = [
      "${aws_appsync_function.get_game_function.function_id}",
      "${aws_appsync_function.flip_card_function.function_id}",
    ]
  }
}







