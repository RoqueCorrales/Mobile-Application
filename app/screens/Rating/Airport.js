import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Preloader from '../../components/Preloader';
import { NavigationActions } from 'react-navigation';
import Config from '../../utils/Config';


export default class Airport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            airports: [],
            url: `${Config.API_FLIGHT}airports/rest/v1/json/active?appId=${Config.APP_ID}&appKey=${Config.APP_KEY}`
        }
    }

    static navigationOptions = {
        title: 'Airports Ratings'
    }

    componentDidMount() {
        if (this.state.airports && this.state.airports.length === 0) this.getAirports();
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
        const navigateToFinderAction = NavigationActions.navigate({
            routeName: 'AirportFinderScreen',
        });
        return (
            <View style>
            <Text>¡Seleciona un aeropuerto para ver los vuelos!</Text>
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
                            routeName: 'FlightsScreen',
                            params: {
                                code: item.fs
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
