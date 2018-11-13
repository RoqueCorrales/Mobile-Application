import React from 'react';
import {StackNavigator} from "react-navigation";
import LoginScreen from "../screens/Login";

export default StackNavigator(
	{
		Login: {
			screen: LoginScreen
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