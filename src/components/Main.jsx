import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, PermissionsAndroid, FlatList } from 'react-native'
import {
  requestReadSMSPermission,
  startReadSMS,
  stopReadSMS
} from '@maniac-tech/react-native-expo-read-sms'

import { Button, DataTable } from 'react-native-paper'
import parser, { SMS_WITHDRAWAL } from '../helpers/smsParser'

import * as Notifications from 'expo-notifications'

export default function Main () {
  const [state, setState] = useState(null)
  const [sms, setSms] = useState([
    {
      banck: 'Bancolombia',
      value: '$80,000.00',
      place: null,
      rootAcc: '8996',
      destAcc: '0000003145578002',
      date: new Date(),
      type: 'transferencia'
    }
  ])
  const [error, setError] = useState(null)
  const [hasReceiveSMSPermission, setHasReceiveSMSPermission] = useState(null)
  const [hasReadSMSPermission, setHasReadSMSPermission] = useState(null)

  const [statusSmsRead, setStatusSmsRead] = useState(false)

  const checkPermissions = async () => {
    const hasReceiveSmsPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
    )
    const customHasReadSMSPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_SMS
    )
    setHasReceiveSMSPermission(hasReceiveSmsPermission)
    setHasReadSMSPermission(customHasReadSMSPermission)
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      autoDismiss: 'sticky'
    })
  })

  const formatSms = (status, sms, error) => {
    setState(status)
    setSms((oldSms) => [parser(sms), ...oldSms])
    setError(error)
  }

  const handleStartReadSMS = () => {
    setStatusSmsRead((value) => !value)
    startReadSMS(formatSms, (v, a) => console.log(v, a))
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Look at that notification',
        body: "I'm so proud of myself!",
        autoDismiss: false,
        sticky: true
      },
      trigger: null,
      identifier: 'notification-sms'
    })
  }

  const handleStopReadSMS = () => {
    setStatusSmsRead((value) => !value)
    stopReadSMS()
    Notifications.cancelScheduledNotificationAsync('notification-sms')
  }

  useEffect(() => {
    checkPermissions()
  }, [])

  const sendOneSms = () => {
    setSms((oldSms) => [parser(SMS_WITHDRAWAL), ...oldSms])
  }

  const stopLocal = () => {
    setStatusSmsRead((value) => !value)
    Notifications.dismissNotificationsAsync('notification-sms')
  }

  const startLocal = () => {
    setStatusSmsRead((value) => !value)
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Look at that notification',
        body: "I'm so proud of myself!",
        autoDismiss: false,
        sticky: true
      },
      trigger: null,
      identifier: 'notification-sms'
    })
  }

  return (
    <View style={styles.container}>
      <Text>state: {JSON.stringify(state)}</Text>
      <Text>error: {JSON.stringify(error)}</Text>

      <StatusBar style='auto' />
      <SmsList
        sms={sms}
        stop={() => handleStopReadSMS()}
        start={() => handleStartReadSMS()}
        statusSmsRead={statusSmsRead}
        READ_SMS_PERMISSION_STATUS={hasReadSMSPermission}
        RECEIVE_SMS_PERMISSION_STATUS={hasReceiveSMSPermission}
        stopLocal={stopLocal}
        startLocal={startLocal}
      />
      <Button onPress={() => sendOneSms()} mode='contained' elevation={5}>
        Send
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

const renderItem = ({ item: { banck, value, place, rootAcc, destAcc, date, type } }) => {
  return (
    <DataTable.Row>
      <DataTable.Cell>{banck}</DataTable.Cell>
      <DataTable.Cell>{value}</DataTable.Cell>
      <DataTable.Cell>{place}</DataTable.Cell>
      <DataTable.Cell>{rootAcc}</DataTable.Cell>
      <DataTable.Cell>{destAcc}</DataTable.Cell>
      {/* <DataTable.Cell>{date}</DataTable.Cell> */}
      <DataTable.Cell>{type}</DataTable.Cell>
    </DataTable.Row>
  )
}

const SmsList = ({
  sms,
  start,
  stop,
  READ_SMS_PERMISSION_STATUS,
  RECEIVE_SMS_PERMISSION_STATUS,
  statusSmsRead,
  stopLocal,
  startLocal
}) => {
  return (
    <DataTable>
      <Text>{JSON.stringify(sms[0])}</Text>
      <DataTable.Header>
        <DataTable.Title>Sms</DataTable.Title>
      </DataTable.Header>
      <FlatList
        data={sms}
        renderItem={renderItem}
        keyExtractor={(sms) => `${sms.value} ${sms.type}`}
      />

      {(!READ_SMS_PERMISSION_STATUS || !RECEIVE_SMS_PERMISSION_STATUS) && (
        <Button onPress={requestReadSMSPermission} mode='contained'>
          Request Permission
        </Button>
      )}

      {statusSmsRead
        ? (
          <Button onPress={() => stop()} mode='contained' elevation={5}>
            Stop
          </Button>
          )
        : (
          <Button onPress={() => start()} mode='contained' elevation={5}>
            Start
          </Button>
          )}

      {statusSmsRead
        ? (
          <Button onPress={() => stopLocal()} mode='contained' elevation={5}>
            StopLocal
          </Button>
          )
        : (
          <Button onPress={() => startLocal()} mode='contained' elevation={5}>
            StartLocal
          </Button>
          )}
    </DataTable>
  )
}
