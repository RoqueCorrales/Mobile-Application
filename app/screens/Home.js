import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import AppButton from '../components/AppButton';

export default class Home extends Component {

  constructor() {
    super();

    this.state = {
      loading: false
    }
  }

  static navigationOptions = {
    title: 'Home'
  }

  logout(){
    try {
      AsyncStorage.removeItem('token');
      Toast.showWithGravity("Has cerrado sesión correctamente", Toast.LONG, Toast.BOTTOM);
      const navigateAction = NavigationActions.navigate({
        routeName: 'Auth'
      });
      this.props.navigation.navigate(navigateAction);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <AppButton
            bgColor="#0c961e"
            title="Log out"
            action={this.logout.bind(this)}
            iconName="sign-out"
            iconSize={30}
            iconColor="#fff"
          />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navBtn: {
    flexGrow: 10
  }
});
