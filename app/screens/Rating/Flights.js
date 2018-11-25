import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Preloader from '../../components/Preloader';
import { NavigationActions } from 'react-navigation';
import Config from '../../utils/Config';


export default class Flights extends React.Component {

    constructor(props) {
        super(props);

        const { params } = props.navigation.state;
        this.state = {
            loading: false,
            flights: [],
            url: `${Config.API_FLIGHT}fids/rest/v1/json/${params.code}/departures?appId=${Config.APP_ID}&appKey=${Config.APP_KEY}&requestedFields=flightId%2CairlineName%2CairlineCode%2CflightNumber%2CairlineLogoUrlPng%2Cflight%2Ccity%2CprimaryMarketingAirlineCode&lateMinutes=15&useRunwayTimes=false&excludeCargoOnlyFlights=false`
        }
    }

    static navigationOptions = {
        title: 'Flights of Airport'
    }

    componentDidMount() {
        this.getFlights();
    }

    getFlights = () => {
        this.setState({ loading: true })
        fetch(this.state.url)
          .then(res => res.json()
            .then(resJson => {
                this.setState({
                    flights: resJson.fidsData,
                    loading: false
                });
              console.log(resJson.fidsData);

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
