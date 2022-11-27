import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Main from './src/components/Main';
import { MD3LightTheme as DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import AuthProvider from './src/components/provider/AuthProvider';
import Navigation from './src/components/navigation';


const theme = {
	...DefaultTheme,
	colors: {
	  ...DefaultTheme.colors,
	  primary: 'tomato',
	  secondary: 'yellow',
	},
  };

export default function App() {
  return (
    <PaperProvider theme={theme}>
		<AuthProvider>
			<Navigation/>
		</AuthProvider>
      <StatusBar />
    </PaperProvider>
  );
}
