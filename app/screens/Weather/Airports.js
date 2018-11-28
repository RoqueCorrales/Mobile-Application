import React from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { List, ListItem, SearchBar, Card  } from 'react-native-elements';
import Preloader from '../../components/Preloader';
import { NavigationActions } from 'react-navigation';
import Config from '../../utils/Config';


export default class Airport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            airports: [],
            allAirports:  [],
            url: `${Config.API_FLIGHT}airports/rest/v1/json/active?appId=${Config.APP_ID}&appKey=${Config.APP_KEY}`
        }
    }

    static navigationOptions = {
        title: 'Airports Weather'
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
                allAirports: resJson.airports,
                url: res.next,
                loading: false
            })
            })
            .catch(error => {
            console.log(error)
            }));
    }

    searchAirport = (text)=>{
        const {allAirports} = this.state;
        let aiportsSearched = [];
        if(text.length > 2){
            for (var i=0; i < allAirports.length; i++) {
                if (allAirports[i].name.includes(text)) {
                   aiportsSearched.push(allAirports[i]);
                }
            }
            this.setState({airports: aiportsSearched});
        }else if(text.length == 0){
            this.setState({
                airports: allAirports
            });
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <Preloader />
            );
        }
        const SearchBaar = (<SearchBar
            lightTheme
            onChangeText={text=> this.searchAirport(text)}
            onClearText={this.searchAirport}
            icon={{ type: 'font-awesome', name: 'search' }}
            placeholder='Search Airport...' />);
        if (this.state.airports.length > 0) {
        return (
            <View style>
                {SearchBaar}
                <Text>Search airport to see weather conditions!</Text>
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
                                routeName: 'Weather',
                                params: {
                                    airportCode: item.fs,
                                    weatherUrl: item.weatherUrl
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
        <View>
            {SearchBaar}
            <Card style={styles.container}>
                <Text>Not found airports!</Text>
            </Card>
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
