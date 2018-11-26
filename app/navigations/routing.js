import React from 'react';

import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

//Components
import AuthLoadingComponent from "../components/AuthLoading";

//Screens
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import HomeScreen from "../screens/Home";
import AirportsScreen from "../screens/Airports";
import AirlinesScreen from '../screens/Airlines';
import AirportLocationScreen from '../screens/AirportLocation';
import AirlineDetailScreen from '../screens/AirlineDetail';
import AirportFinderScreen from '../screens/AirportFinder';
import AirportScreen from '../screens/Rating/Airport';
import FlightsScreen from '../screens/Rating/Flights';
import FlightRatingScreen from '../screens/Rating/FlightRating';

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
});

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    AirlinesScreen: AirlinesScreen,
});

const AirportsStack = createStackNavigator({
    AirportsScreen: AirportsScreen,
    AirportLocationScreen: AirportLocationScreen,
    AirportFinderScreen: AirportFinderScreen
});

const RatingStack = createStackNavigator({
    AirportScreen: AirportScreen,
    FlightsScreen: FlightsScreen,
    FlightRatingScreen: FlightRatingScreen
});

const AirlinesStack = createStackNavigator({
    Airlines: AirlinesScreen,
    AirlineDetailScreen: AirlineDetailScreen
})

const AppTabs =  createBottomTabNavigator(
    {
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
            <Icon name="home" color={tintColor} size={20} />
            )
        }
    },
    Airports: {
        screen: AirportsStack,
        navigationOptions: {
            tabBarLabel: 'Airports',
            tabBarIcon: ({ tintColor }) => (
            <Icon name="local-airport" color={tintColor} size={20} />
            )
        }
    },
    Rating: {
        screen: RatingStack,
        navigationOptions: {
            tabBarLabel: 'Ratings',
            tabBarIcon: ({ tintColor }) => (
            <Icon name="star" color={tintColor} size={20} />
            )
        }
    },
    Airlines: {
        screen: AirlinesStack,
        navigationOptions: {
            tabBarLabel: 'Airlines',
            tabBarIcon: ({ tintColor }) => (
            <Icon name="airline-seat-recline-normal" color={tintColor} size={20} />
            )
        }
    }
    },
    {
        initialRouteName: 'Home',
        order: ['Home', 'Airlines', 'Airports', 'Rating'],
        navigationOptions:{
            tabBarVisible: true
        },
        tabBarOptions:{
            activeTintColor: '#4286f4',
            inactiveTintColor: '#bcbcbc'
        }
    }
);

export default createSwitchNavigator({
    AuthLoading: AuthLoadingComponent,
    Auth: AuthStack,
    App: AppTabs
});