import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
import { List, ListItem } from 'react-native-elements';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      airports: [],
      url: 'https://api.flightstats.com/flex/airports/rest/v1/json/active?appId=44cee9e5&appKey=8a2ebed0d4d47e7005a060f5f20fa118'
    }
  }

  componentDidMount() {
    this.getPokemons();
    console.log(this.state.airports);
  }

  getPokemons = () => {
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
        <View style={styles.container}>
          <Text>Descargnado aeropuertos!</Text>
        </View>
      );
    }

    if(this.state.airports.length > 0) {
      return (
        <View style={{flex: 1, paddingTop: 50, paddingLeft: 5}}>
          <Text style={styles.heading}>Airports</Text>
          <List>
            <FlatList
              data={this.state.airports}
              keyExtractor={(x, i) => i}
              renderItem={({item}) => 
                <ListItem
                  title={item.name}
                  subtitle={`${item.city} - ${item.countryName}`}
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
