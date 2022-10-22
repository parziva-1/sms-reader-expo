import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PermissionsAndroid, Platform } from "react-native";
import {
  requestReadSMSPermission,
  startReadSMS,
} from "@maniac-tech/react-native-expo-read-sms";

import { Permissions , Request, usePermissions } from 'expo-permissions'

import { useEffect, useState } from 'react';

export default function App() {
  const [p,setP]=useState("p")
  const [permission, askPermission, getPermission] = usePermissions("sms",{ask:true})

  const checkPermissions = async () => {
    setP(Platform.OS)
    //console.log(permission)
    const customHasReceiveSMSPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS
    );
    const customHasReadSMSPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_SMS
    );
    
    //await requestReadSMSPermission()
console.log(customHasReceiveSMSPermission, customHasReadSMSPermission)
console.log("Hola3")
  };

  useEffect(()=> {
    checkPermissions()
  },[])

  return (
    <View style={styles.container}>
      <Text>{p}</Text>
      <StatusBar style="auto" />
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
