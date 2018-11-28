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
            metar: resJson.metar,
            coverage: resJson.metar.conditions.skyConditions[0].coverage,
            windDirection: resJson.metar.conditions.wind.direction,
            temperaure: resJson.metar.temperatureCelsius,
            loading: false
          })
          console.log(this.state.conditions);
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
        {`Coverage: ${this.state.coverage}`}
      </Text>
      <Text>
        {`Wind Direction: ${this.state.windDirection}`}
      </Text>
      <Text>
        {`Temperature: ${this.state.temperaure}`}
      </Text>
      </Card>
    );
  }
}
