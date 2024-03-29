import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { useAuth } from '../../components/provider/AuthProvider'

const Register = ({ navigation }) => {
  const { signUp } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function register () {
    setLoading(true)
    const { user, error } = await signUp({
      email,
      password
    })
    if (!error && !user) {
      setLoading(false)
      // eslint-disable-next-line no-undef
      alert('Check your email for the login link!')
    }
    if (error) {
      setLoading(false)
      // eslint-disable-next-line no-undef
      alert(error.message)
    }
  }

  return (
    <KeyboardAvoidingView behavior='height' enabled style={{ flex: 1 }}>
      <View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              resizeMode='contain'
              style={{
                height: 220,
                width: 220
              }}
              source={require('../../../assets/images/register.png')}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20
            }}
          >
            <Text
              fontWeight='bold'
              size='h3'
              style={{
                alignSelf: 'center',
                padding: 30
              }}
            >
              Register
            </Text>
            <Text>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder='Enter your email'
              value={email}
              autoCapitalize='none'
              autoCompleteType='off'
              autoCorrect={false}
              keyboardType='email-address'
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={{ marginTop: 15 }}>Password</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder='Enter your password'
              value={password}
              autoCapitalize='none'
              autoCompleteType='off'
              autoCorrect={false}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              mode='contained-tonal'
              onPress={() => {
                register()
              }}
              style={{
                marginTop: 20
              }}
              disabled={loading}
            >
              <Text>{loading ? 'Loading' : 'Create an account'}</Text>
            </Button>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                justifyContent: 'center'
              }}
            >
              <Text size='md'>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login')
                }}
              >
                <Text
                  size='md'
                  fontWeight='bold'
                  style={{
                    marginLeft: 5
                  }}
                >
                  Login here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Register
