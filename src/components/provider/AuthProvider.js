import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';

const AuthContext = createContext({});

const AuthProvider = (props) => {
  // user null = loading
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const {data, error} = supabase.auth.getSession();
    console.log({error})
    setSession(data);
    if(session){
        const {data:{user}} = supabase.auth.getUser();
        console.log({user})
        if (user) {
            setUser(user);
          }
    }else{
        setUser(false)
    }
    
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'SIGNED_IN') {
        setUser(session?.user);
      }
      if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
  }, []);
console.log({user})
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signOut: () => supabase.auth.signOut(),
    signInWithPassword: (data) => supabase.auth.signInWithPassword(data),
    user,
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
