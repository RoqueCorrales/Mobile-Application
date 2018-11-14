import React, {Component} from 'react';
import { Text, AsyncStorage, View } from 'react-native';

import Preloader from "./app/components/Preloader";
import GuestNavigation from './app/navigations/guest';
import HomeScreen from './app/screens/HomeScreen';
import AiportsScreen from './app/screens/AirportsScreen';




export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLogged: false,
      loaded: false
    }
  }

  async componentDidMount () {
    const token = await AsyncStorage.getItem('token');
    if(token !== null) {
      this.setState({
        isLogged: true,
        loaded: true
      });
    } else {
      this.setState({
        isLogged: false,
        loaded: true
      });
    }
  }

  render() {
    const {isLogged, loaded} = this.state;

    if ( ! loaded) {
      return (<Preloader/>);
    }

    if(isLogged) {
      return (<AiportsScreen/>);
      //this.props.navigation.navigate('Home');	  
    } else {
      return (<GuestNavigation />);
    }
  }
}

