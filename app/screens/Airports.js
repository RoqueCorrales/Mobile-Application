import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Preloader from '../components/Preloader';
import { NavigationActions } from 'react-navigation';


export default class Airports extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      airports: [],
      url: 'https://api.flightstats.com/flex/airports/rest/v1/json/active?appId=44cee9e5&appKey=8a2ebed0d4d47e7005a060f5f20fa118'
    }
  }

  static navigationOptions = {
    title: 'Airports'
  }

  componentDidMount() {
    if (this.state.airports && this.state.airports.length === 0) this.getAirports();
    console.log(this.state.airports);
  }

  getAirports = () => {
    this.setState({ loading: true })
    fetch(this.state.url)
      .then(res => res.json()
        .then(resJson => {
          this.setState({
            airports: resJson.airports,
            url: res.next,
            loading: false
          })
        })
        .catch(error => {
          console.log(error)
        }));
  }

  // navigateToFinder = () => {
  //   const navigateAction = NavigationActions.navigate({
  //     routeName: 'AirportFinderScreen',
  //   });
  //   this.props.navigation.dispatch(navigateAction);
  // }

  render() {
    if (this.state.loading) {
      return (
        <Preloader />
      );
    }

    if (this.state.airports.length > 0) {
      const navigateToFinderAction = NavigationActions.navigate({
        routeName: 'AirportFinderScreen',
      });
      return (
        <View style>
          <Button 
            title='Find near airports'
            onPress={() =>
              this.props.navigation.dispatch(navigateToFinderAction)
            }
          />
          <List>
            <FlatList
              data={this.state.airports}
              keyExtractor={(x, i) => i}
              renderItem={({ item }) =>
                <ListItem
                  title={item.name}
                  subtitle={`${item.city} - ${item.countryName}`}
                  onPress={() => {
                    const navigateAction = NavigationActions.navigate({
                      routeName: 'AirportLocationScreen',
                      params: {
                        latitude: item.latitude,
                        longitude: item.longitude,
                        name: item.name
                      }
                    });
                    this.props.navigation.dispatch(navigateAction);
                  }}
                />
              }
            />
          </List>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>No se pudo descargar!</Text>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    flex: 1,
    justifyContent: 'center'
  }
});
