import React from 'react';

import HomeScreen from "../screens/Home";
import AirportsScreen from "../screens/Airports";
import AirlinesScreen from '../screens/Airlines';
import AirportLocationScreen from '../screens/AirportLocation';

import {DrawerNavigator, StackNavigator} from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';

const navigationOptions = {
	navigationOptions: {
		headerStyle: {
			backgroundColor: 'rgba(200, 38, 74, 1)',
			marginBottom: 0
		},
		headerTitleStyle: {
			textAlign: 'center',
			alignSelf: 'center',
			fontSize: 20,
			color: '#fff',
			fontWeight: 'bold'
		}
	}
};

const leftIcon = (navigation, icon) => <Icon
	name={icon}
	style={{marginLeft: 20}}
	size={20}
	color="white"
	onPress={() => navigation.navigate('DrawerOpen')}
/>;

const rightIcon = (navigation, icon) => <Icon
	name={icon}
	style={{marginLeft: 20}}
	size={30}
	color="white"
	onPress={() => navigation.navigate('ListAirports')}
/>;

const airportsScreenStack = StackNavigator(
	{
		ListAirports: {
			screen: AirportsScreen,
			navigationOptions: ({navigation}) => ({
				title: 'Airports',
				drawerIcon: ({tintColor}) => (<Icon name="home" size={24} style={{color: tintColor}} />),
				headerLeft: leftIcon(navigation, 'bars')
			})
		}/*,
		AddRestaurant: {
			screen: AddRestaurantScreen,
			navigationOptions: ({navigation}) => ({
				title: 'Añadir restaurante',
				headerRight: rightIcon(navigation, 'home'),
				headerLeft: leftIcon(navigation, 'bars'),
			})
		}*/
	},
	navigationOptions
);

const homeScreenStack = StackNavigator(
	{
		HomeScreen: {
			screen: HomeScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Home',
				drawerIcon: ({ tintColor }) => (<Icon name="home" size={24} style={{ color: tintColor }} />),
				headerLeft: leftIcon(navigation, 'bars'),
				headerRight: rightIcon(navigation, 'home'),
			})
		}
	},
	navigationOptions
);

const airlinesScreenStack = StackNavigator(
	{
		ListAirlines: {
			screen: AirlinesScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Airlines',
				drawerIcon: ({ tintColor }) => (<Icon name="home" size={24} style={{ color: tintColor }} />),
				headerLeft: leftIcon(navigation, 'bars')
			})
		}
	},
	navigationOptions
);

const airportLocationScreenStack = StackNavigator(
	{
		AirportLocation: {
			screen: AirportLocationScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Airport Location',
				drawerIcon: ({ tintColor }) => (<Icon name="home" size={24} style={{ color: tintColor }} />),
				headerLeft: leftIcon(navigation, 'bars')
			})
		}
	},
	navigationOptions
);
/*
const logoutScreenStack = StackNavigator({
	LogoutScreen: {
		screen: LogoutScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Cerrar sesión',
			drawerIcon: ({ tintColor }) => (<Icon name="sign-out" size={24} style={{color: tintColor}} />)
		})
	}
});*/

export default DrawerNavigator(
	{
		AirportsScreen: {
			screen: airportsScreenStack
		},
		HomeScreen: {
			screen: homeScreenStack
		},
		AirlinesScreen: {
			screen: airlinesScreenStack
		},
		AirportLocationScreen: {
			screen: airportLocationScreenStack
		}
	},
	{
		drawerBackgroundColor : 'rgba(128, 35, 60, 0.7)',
		contentOptions: {
			activeTintColor: 'white',
			activeBackgroundColor : 'transparent',
			inactiveTintColor : 'white',
			itemsContainerStyle: {
				marginVertical: 0,
			}
		},
	}
)