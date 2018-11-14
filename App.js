import React, {Component} from 'react';
import { AsyncStorage } from 'react-native';

import Preloader from "./app/components/Preloader";
import GuestNavigation from './app/navigations/guest';
import LoggedNavigation from './app/navigations/logged';


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
      return (<LoggedNavigation />);
    } else {
      return (<GuestNavigation />);
    }
  }
}

