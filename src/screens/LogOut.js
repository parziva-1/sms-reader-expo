import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useAuth } from '../components/provider/AuthProvider'
import { Button } from 'react-native-paper'

export default function LogOut () {
  const { signOut } = useAuth()
  return (
    <View style={styles.container}>
      <Button onPress={() => signOut()} mode='contained' elevation={5}>
        Logout
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
