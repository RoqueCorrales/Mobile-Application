import React from 'react';

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';


//Screens
import HomeScreen from "../screens/Home";
import AirportsScreen from "../screens/Airports";
import AirlinesScreen from '../screens/Airlines';
import AirportLocationScreen from '../screens/AirportLocation';
import AirlineDetailScreen from '../screens/AirlineDetail';



const HomeStack = createStackNavigator({
  Home: HomeScreen,
  AirlinesScreen: AirlinesScreen,
});

const AirportsStack = createStackNavigator({
  AirportsScreen: AirportsScreen,
  AirportLocationScreen: AirportLocationScreen,
});

const AirlinesStack = createStackNavigator({
  Airlines: AirlinesScreen,
  AirlineDetailScreen: AirlineDetailScreen,
})
export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={20} />
        )
      }
    },
    Airports: {
      screen: AirportsStack,
      navigationOptions: {
        tabBarLabel: 'Airports',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="local-airport" size={20} />
        )
      }
    },
    Airlines: {
      screen: AirlinesStack,
      navigationOptions: {
        tabBarLabel: 'Airlines',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="local-airport" size={20} />
        )
      }
    }
  },


  {
    /* Other configuration remains unchanged */
  }
);