import React from 'react';
import { Text, AsyncStorage, View } from 'react-native';

import Preloader from "./app/components/Preloader";
import GuestNavigation from './app/navigations/guest';


export default class App extends React.Component {
  constructor () {
    super();
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
      return (<View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}><Text>Hola</Text></View>);
    } else {
      return (<GuestNavigation />);
    }
  }
}
