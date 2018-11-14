import React from 'react';
import {createStackNavigator } from "react-navigation";
import LoginScreen from "../screens/Login";
import HomeScreen from "../screens/HomeScreen";
import AirportsScreen from '../screens/AirportsScreen';

export default createStackNavigator (
	{
		Login: {
			screen: LoginScreen
		},
		Home: {
			screen: HomeScreen
		},
		Airports: {
			screen: AirportsScreen
		} 
	},
	{
		initialRouteName: 'Login',
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