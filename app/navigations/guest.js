import React from 'react';
import {createStackNavigator } from "react-navigation";
import LoginScreen from "../screens/Login";

export default createStackNavigator (
	{
		LoginScreen: {
			screen: LoginScreen
		}
	},
	{
		initialRouteName: 'LoginScreen',
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#1e68f4'
			},
			headerTitleStyle: {
				textAlign: 'center',
				alignSelf: 'center',
				fontSize: 20,
				color: '#fff',
				fontWeight: 'bold'
			}
		}
	}
)