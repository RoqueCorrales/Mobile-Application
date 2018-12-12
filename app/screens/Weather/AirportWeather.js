import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Preloader from '../../components/Preloader';
import { Card, Icon } from 'react-native-elements';
import Config from '../../utils/Config';


export default class AirportWeather extends React.Component {

  constructor(props) {
    super(props);

    const { params } = props.navigation.state;
    this.state = {
      loading: false,
      weather: {},
      weatherUrl: params.weatherUrl,
      airportCode: params.airportCode,
      metar: {},
      prevailing: {},
      coverage: {}
    }
  }


  componentDidMount() {
    this.getAirlineByUrl();
  }

  getAirlineByUrl = () => {
    this.setState({ loading: true })
    fetch(`${Config.API_FLIGHT}/weather/rest/v1/json/metar/${this.state.airportCode}?appId=${Config.APP_ID}&appKey=${Config.APP_KEY}`)
      .then(res => res.json()
        .then(resJson => {
          this.setState({
            coverage: resJson.metar.conditions.skyConditions[0].coverage,
            miles: resJson.metar.conditions.visibility.miles,
            temperaure: resJson.metar.temperatureCelsius,
            pressure: resJson.metar.conditions.pressureInchesHg,
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

    //const {conditions} = this.state;
    return (
      <Card
        title='Weather Conditions'
        >
      <Text>
        {this.state.coverage ? `Coverage: ${this.state.coverage}` : 'Coverage: N/A'}
      </Text> 
      <Text>
        {this.state.miles ? `Visibility: ${this.state.miles} miles` : 'Wind Direction: N/A'}
      </Text>
      <Text>
        {this.state.pressure ? `Pressure Inches Hg: ${this.state.pressure}` : 'Pressure Inches Hg: N/A'}
      </Text>
      <Text>
        {this.state.temperaure ? `Temperature: ${this.state.temperaure} celsius` : 'Temperature: N/A'}
      </Text>
      </Card>
    );
  }
}
