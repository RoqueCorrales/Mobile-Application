import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Preloader from '../components/Preloader'
import { Card } from 'react-native-elements'


export default class AirlineDetail extends React.Component {

  constructor(props) {
    super(props);

    const { params } = props.navigation.state;
    this.state = {
      loading: false,
      airline: {},
      airlineId: params.airlineId,
      url: 'https://api.flightstats.com/flex/airlines/rest/v1/json/fs/active?appId=44cee9e5&appKey=8a2ebed0d4d47e7005a060f5f20fa118'
    }
  }

  componentDidMount() {
    this.getAirlineById();
  }

  getAirlineById = () => {
    this.setState({ loading: true })
    fetch(`https://api.flightstats.com/flex/airlines/rest/v1/json/fs/${this.state.airlineId}?appId=44cee9e5&appKey=8a2ebed0d4d47e7005a060f5f20fa118`)
      .then(res => res.json()
        .then(resJson => {
          this.setState({
            airline: resJson.airline,
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

    const {airline} = this.state;
    return (
      <Card
        title={`Name: ${airline.name}`}
        image={require('../../assets/avion.jpg')}>
        <Text style={{ marginBottom: 10 }}>
          ICAO: {airline.icao}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          IATA: {airline.iata}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          {airline.phoneNumber ? `Phone Number: ${airline.phoneNumber}` : ''}
        </Text>
      </Card>
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
