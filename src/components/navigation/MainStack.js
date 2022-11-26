import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from "../Main";
import LogOut from "../../screens/LogOut";


const Tabs = createBottomTabNavigator()
const MainStack = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName="Main"
    >
      <Tabs.Screen name="Main" component={Main} />
      <Tabs.Screen name="Account" component={LogOut} /> 
    </Tabs.Navigator>
  );
};

export default MainStack;
