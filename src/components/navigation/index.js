import React from 'react'
import { useAuth } from '../provider/AuthProvider'

import { NavigationContainer } from '@react-navigation/native'

import Main from './MainStack'
import Auth from './AuthStack'
import Loading from '../../screens/utils/Loading'

const index = () => {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      {user === null && <Loading />}
      {user === false && <Auth />}
      {user && <Main />}
    </NavigationContainer>
  )
}

export default index
