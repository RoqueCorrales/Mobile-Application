import React from 'react';
import { StyleSheet, Dimensions, View, Text, Slider } from 'react-native';
import MapView from 'react-native-maps';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class AirportFinder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userCoords: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      radiusMiles: 0,
      loading: false,
      airports: [],
    }
    this.getNearAirports = this.getNearAirports.bind(this);
  }

  watchId: ?number = null

  getNearAirports = (miles) => {
    this.setState({ loading: true })
    const { latitude, longitude } = this.state.userCoords;
    fetch(`https://api.flightstats.com/flex/airports/rest/v1/json/withinRadius/${longitude}/${latitude}/${miles}?appId=44cee9e5&appKey=8a2ebed0d4d47e7005a060f5f20fa118`)
      .then(res => res.json()
        .then(resJson => {
          this.setState({
            airports: resJson.airports,
            loading: false
          })
        })
        .catch(error => {
          console.log(error)
        }));
  }

  renderMarkers = () => {
    return (
      this.state.airports.map(airport => {
        return (
          <MapView.Marker
            coordinate={{
              latitude: airport.latitude,
              longitude: airport.longitude
            }}
            title={airport.name}
            description={airport.countryName}
          />
        )
      })
    )
  }

  handleRadiusToNull = () => {
    return (
      <MapView.Marker
        style={styles.radius}
        coordinate={this.state.userCoords}>
      </MapView.Marker>
    )
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.setState({ userCoords: initialRegion })

    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Slider
          style={{ width: 200, transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], paddingTop: 10}}
          step={50}
          minimumValue={0}
          maximumValue={500}
          onValueChange={val => this.setState({ radiusMiles: val })}
          onSlidingComplete={val => this.getNearAirports(val)}
        />
        <MapView
          style={styles.map}
          region={this.state.userCoords}>

          <MapView.Marker
            style={styles.radius}
            coordinate={this.state.userCoords}>

              <View style={styles.radius}>
                <View style={styles.marker} />
              </View>
          </MapView.Marker>

          {this.state.airports ? this.renderMarkers() : this.handleRadiusToNull()}
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 112, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    left: 0,
    right: 0,
    top: 30,
    bottom: 0,
    position: 'absolute'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  }
});
