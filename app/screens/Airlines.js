import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
import { List, ListItem } from 'react-native-elements';
import Preloader from '../components/Preloader';
import { NavigationActions } from 'react-navigation';


export default class Airlines extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      airlines: [],
      url: 'https://api.flightstats.com/flex/airlines/rest/v1/json/active?appId=44cee9e5&appKey=8a2ebed0d4d47e7005a060f5f20fa118'
    }
  }

  static navigationOptions = {
    title: 'Airlines'
  }

  componentDidMount() {
    if (this.state.airlines && this.state.airlines.length === 0) this.getAirlines();
  }

  getAirlines = () => {
    this.setState({ loading: true })
    fetch(this.state.url)
      .then(res => res.json()
        .then(resJson => {
          this.setState({
            airlines: resJson.airlines,
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

    if (this.state.airlines.length > 0) {
      return (
        <View style={styles.list}>
          <List>
            <FlatList
              data={this.state.airlines}
              keyExtractor={(x, i) => i}
              renderItem={({ item }) =>
                <ListItem
                  title={item.name}
                  subtitle={item.icao ? `IATA: ${item.iata} - ICAO ${item.icao}` : `IATA: ${item.iata}`}
                  onPress={() => {
                    const navigateAction = NavigationActions.navigate({
                      routeName: 'AirlineDetailScreen',
                      params: {
                        airlineId: item.fs,
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
  list: {
    flex: 1
  }
});
