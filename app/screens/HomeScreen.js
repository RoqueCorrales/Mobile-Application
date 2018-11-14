import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }

  static navigationOptions = {
    title: 'Home',
    headerLeft: null
  }

  render() {
    //const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button
          title="Airports"
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
