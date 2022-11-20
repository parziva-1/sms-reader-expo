import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid, FlatList } from 'react-native';
import {
	requestReadSMSPermission,
	startReadSMS,
} from '@maniac-tech/react-native-expo-read-sms';


import { Button, DataTable } from 'react-native-paper';

import { usePermissions } from 'expo-permissions';

import { useEffect, useState } from 'react';

import parser, { SMS_WITHDRAWAL } from '../helpers/smsParser';

export default function Main() {
	const [state, setState] = useState(null);
	const [sms, setSms] = useState([
		{
			banck: 'Bancolombia',
			value: '$80,000.00',
			place: null,
			rootAcc: '8996',
			destAcc: '0000003145578002',
			date: new Date(),
			type: 'transferencia',
		},
	]);
	const [error, setError] = useState(null);
	const [hasReceiveSMSPermission, setHasReceiveSMSPermission] = useState(null);
	const [hasReadSMSPermission, setHasReadSMSPermission] = useState(null);

	const [permission] = usePermissions('sms', {
		ask: true,
	});

	const checkPermissions = async () => {
		const hasReceiveSmsPermission = await PermissionsAndroid.check(
			PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
		);
		const customHasReadSMSPermission = await PermissionsAndroid.check(
			PermissionsAndroid.PERMISSIONS.READ_SMS
		);
		setHasReceiveSMSPermission(hasReceiveSmsPermission);
		setHasReadSMSPermission(customHasReadSMSPermission);
		console.log(permission);
	};

	const formatSms = (status, sms, error) => {
		console.log(status, sms, error);
		setState(status);
		setSms((oldSms) => [parser(sms), ...oldSms]);
		setError(error);
	};

	const handleStartReadSMS = () => {
		startReadSMS(formatSms, (v, a) => console.log(v, a));
	};

	useEffect(() => {
		checkPermissions();
	}, []);

	const sendOneSms = () => {
		setSms((oldSms) => [parser(SMS_WITHDRAWAL), ...oldSms]);
	};

	return (
		<View style={styles.container}>
			<Text>state: {JSON.stringify(state)}</Text>
			<Text>error: {JSON.stringify(error)}</Text>

			<StatusBar style="auto" />
			<SmsList
				sms={sms}
				start={() => handleStartReadSMS()}
				READ_SMS_PERMISSION_STATUS={hasReadSMSPermission}
				RECEIVE_SMS_PERMISSION_STATUS={hasReceiveSMSPermission}
			/>
			<Button onPress={() => sendOneSms()} mode="contained" elevation={5}>
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

const renderItem = ({ item: { banck, value, place, rootAcc, destAcc, date, type } }) => {
	console.log(banck, value, place, rootAcc, destAcc, date, type);
	return (
		<DataTable.Row>
			<DataTable.Cell>{banck}</DataTable.Cell>
			<DataTable.Cell>{value}</DataTable.Cell>
			<DataTable.Cell>{place}</DataTable.Cell>
			<DataTable.Cell>{rootAcc}</DataTable.Cell>
			<DataTable.Cell>{destAcc}</DataTable.Cell>
			{/*<DataTable.Cell>{date}</DataTable.Cell>*/}
			<DataTable.Cell>{type}</DataTable.Cell>
		</DataTable.Row>
	);
};

const SmsList = ({ sms, start, READ_SMS_PERMISSION_STATUS, RECEIVE_SMS_PERMISSION_STATUS }) => {
	return (
		<DataTable>
			<Text>{JSON.stringify(sms[0])}</Text>
			<DataTable.Header>
				<DataTable.Title>Sms</DataTable.Title>
			</DataTable.Header>
			{console.log(sms)}
			<FlatList
				data={sms}
				renderItem={renderItem}
				keyExtractor={(sms) => `${sms.value} ${sms.type}`}
			/>

			{(!READ_SMS_PERMISSION_STATUS || !RECEIVE_SMS_PERMISSION_STATUS) && (
				<Button onPress={requestReadSMSPermission} mode="contained">
          Request Permission
				</Button>
			)}

			<Button onPress={() => start()} mode="contained" elevation={5}>
        Start
			</Button>
		</DataTable>
	);
};
