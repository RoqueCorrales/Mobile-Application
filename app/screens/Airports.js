import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
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

  render() {
    if (this.state.loading) {
      return (
        <Preloader />
      );
    }

    if (this.state.airports.length > 0) {
      return (
        <View style>
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
						routeName: 'AirportLocation',
						params: {
							latitude: item.latitude,
							longitude: item.longitude
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
  }
});
