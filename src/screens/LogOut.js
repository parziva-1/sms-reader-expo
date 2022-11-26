import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid, FlatList } from 'react-native';
import { AuthContext } from '../components/provider/AuthProvider';
import { Button } from 'react-native-paper';

export default function LogOut() {
    const { signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Button onPress={() => signOut()} mode="contained" elevation={5}>
        Send
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

