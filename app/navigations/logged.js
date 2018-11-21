import React from 'react';

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';


//Screens
import HomeScreen from "../screens/Home";
import AirportsScreen from "../screens/Airports";
import AirlinesScreen from '../screens/Airlines';
import AirportLocationScreen from '../screens/AirportLocation';



const HomeStack = createStackNavigator({
    Home: HomeScreen,
    AirlinesScreen: AirlinesScreen,
  });
  
  const AirportsStack = createStackNavigator({
    AirportsScreen: AirportsScreen,
    AirportLocationScreen: AirportLocationScreen,
  });
  
  export default createBottomTabNavigator(
    {
      Home: {screen: HomeStack,
            navigationOptions:{
                tabBarLabel: 'Inicio',
                tabBarIcon: ({tintColor})=>(
                    <Icon name="home" size={20} />
                )
            }
    },
      Airports: {screen: AirportsStack,
                navigationOptions:{
                    tabBarLabel: 'Aeropuertos',
                    tabBarIcon: ({tintColor})=>(
                        <Icon name="local-airport" size={20} />
                    )
                }
        },
    },


    {
      /* Other configuration remains unchanged */
    }
  );