import React from 'react'
import GameContainer from '../app/game-container/GameContainer'
import { createUrqlClient } from '@rate-test-karlgolka/react-data-access'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'

const Index: NextPage = () => {
  return <GameContainer />
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Index)
