import React from 'react';

import HomeScreen from "../screens/Home";
import AirportsScreen from "../screens/Airports";
import AirlinesScreen from '../screens/Airlines';
import AirportLocationScreen from '../screens/AirportLocation';

import {createDrawerNavigator, createStackNavigator} from "react-navigation";
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
	onPress={() => navigation.openDrawer()}
/>;

const rightIcon = (navigation, icon) => <Icon
	name={icon}
	style={{marginLeft: 20}}
	size={30}
	color="white"
	onPress={() => navigation.navigate('ListAirports')}
/>;

const airportsScreenStack = createStackNavigator(
	{
		ListAirports: {
			screen: AirportsScreen,
			navigationOptions: ({navigation}) => ({
				title: 'Airports',
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

const homeScreenStack = createStackNavigator(
	{
		HomeScreen: {
			screen: HomeScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Home',
				headerLeft: leftIcon(navigation, 'bars'),
				headerRight: rightIcon(navigation, 'home'),
			})
		}
	},
	navigationOptions
);

const airlinesScreenStack = createStackNavigator(
	{
		ListAirlines: {
			screen: AirlinesScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Airlines',
				headerLeft: leftIcon(navigation, 'bars')
			})
		}
	},
	navigationOptions
);

const airportLocationScreenStack = createStackNavigator(
	{
		AirportLocation: {
			screen: AirportLocationScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Airport Location',
				headerLeft: leftIcon(navigation, 'bars')
			})
		}
	},
	navigationOptions
);

export default createDrawerNavigator(
	{
		AirportsScreen: {
			screen: airportsScreenStack,
			navigationOptions: ({ navigation }) => ({
				drawerLabel: 'Airports',
				drawerIcon: ({tintColor}) => (<Icon name="home" size={30} style={{color: tintColor}} />),
			  })
		},
		HomeScreen: {
			screen: homeScreenStack,
			navigationOptions: ({ navigation }) => ({
				drawerLabel: 'Home',
				drawerIcon: ({tintColor}) => (<Icon name="home" size={30} style={{color: tintColor}} />),
			  })
		},
		AirlinesScreen: {
			screen: airlinesScreenStack,
			navigationOptions: ({ navigation }) => ({
				drawerLabel: 'Airlines',
				drawerIcon: ({tintColor}) => (<Icon name="home" size={30} style={{color: tintColor}} />),
			  })
		},
		AirportLocationScreen: {
			screen: airportLocationScreenStack,
			navigationOptions: ({ navigation }) => ({
				drawerLabel: 'Airport Location',
				drawerIcon: ({tintColor}) => (<Icon name="home" size={30} style={{color: tintColor}} />),
			  })
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