import React, { createContext, useState, useEffect, useContext } from 'react'
import { supabase } from '../../lib/supabase'

const AuthContext = createContext({})

const AuthProvider = (props) => {
  // user null = loading
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)

  useEffect(() => {
    const { data } = supabase.auth.getSession()
    setSession(data)
    if (session) {
      const {
        data: { user }
      } = supabase.auth.getUser()
      if (user) {
        setUser(user)
      }
    } else {
      setUser(false)
    }

    supabase.auth.onAuthStateChange((event, session) => {
      console.log({ session })
      console.log({ event })
      setSession(session)
      if (event === 'SIGNED_IN') {
        setUser(session?.user)
      }
      if (event === 'SIGNED_OUT') {
        setUser(false)
      }
      if (event === 'PASSWORD_RECOVERY') {
        supabase.auth.updateUser({ password: 'w' }).then(({ data, error }) => {

        })
      }
    })
  }, [])
  console.log({ user }, { session })
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signOut: () => supabase.auth.signOut(),
    signInWithPassword: (data) => supabase.auth.signInWithPassword(data),
    resetPasswordForEmail: (data) => supabase.authresetPasswordForEmail(data),
    user
  }

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

export default AuthProvider

export function useAuth () {
  return useContext(AuthContext)
}
