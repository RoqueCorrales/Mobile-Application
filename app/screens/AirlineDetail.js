import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Preloader from '../components/Preloader'
import { Card } from 'react-native-elements'
import Config from '../utils/Config';


export default class AirlineDetail extends React.Component {

  constructor(props) {
    super(props);

    const { params } = props.navigation.state;
    this.state = {
      loading: false,
      airline: {},
      airlineId: params.airlineId,
      url: `${Config.API_FLIGHT}airlines/rest/v1/json/fs/active?appId=${Config.APP_ID}&appKey=${Config.APP_KEY}`
    }
  }


  componentDidMount() {
    this.getAirlineById();
  }

  getAirlineById = () => {
    this.setState({ loading: true })
    fetch(`${Config.API_FLIGHT}airlines/rest/v1/json/fs/${this.state.airlineId}?appId=${Config.APP_ID}&appKey=${Config.APP_KEY}`)
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
