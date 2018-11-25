import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Rating, Card } from 'react-native-elements';
import Preloader from '../../components/Preloader';
import { NavigationActions } from 'react-navigation';
import Config from '../../utils/Config';


export default class FlightRating extends React.Component {

    constructor(props) {
        super(props);

        const { params } = props.navigation.state;
        this.state = {
            loading: false,
            flight: params.flight,
            ratings: [],
            ratingStars: 0
        }
    }

    static navigationOptions = {
        title: 'Flight Rating'
    }

    componentDidMount() {
        this.getFlightRating();
    }

    getFlightRating = () => {
        const {flight} = this.state;
        this.setState({ loading: true });
        fetch(`${Config.API_FLIGHT}ratings/rest/v1/json/flight/${flight.primaryMarketingAirlineCode}/${flight.flightNumber}?appId=${Config.APP_ID}&appKey=${Config.APP_KEY}`)
        .then(res => {
            if (res.ok) {
            return res.json();
            }
            error(res);
        }).then((resJson) => {
                if (resJson) {
                    this.setState({ratings: resJson.ratings});
                    this.calculateRating();
                    this.setState({ loading: false });
                }
        }).catch(error => {
                console.log(error);
                this.setState({ loading: false });
        });
        
    }
    
    calculateRating = () =>{
        const {ratings} = this.state;
        let stars = 0;
        for(i = 0; i < ratings.length; i++){
            stars += ratings[i].allStars;
        }
        
        if(ratings.length != 0){
            this.setState({ratingStars: stars / ratings.length});
        }
    }
    render() {
        const {loading, flight, ratingStars} = this.state;
        if (loading) {
            return (
                <Preloader />
            );
        }
        if(ratingStars != 0){
            return (
                <View style={styles.container}>
                    <Card title={flight.flight} image={{uri: flight.airlineLogoUrlPng}} style={styles.card} 
                    imageStyle={{height:100, width:300}}>
                        <Text>Airline: {flight.airlineName}</Text>
                    </Card>
                    <Rating
                        showRating
                        type="star"
                        fractions={1}
                        startingValue={ratingStars}
                        readonly
                        imageSize={40}
                        style={{ paddingVertical: 10 }}
                        />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Card title={flight.flight} image={{uri: flight.airlineLogoUrlPng}} style={styles.card} 
                imageStyle={{height:100, width:300}}>
                    <Text>Airline: {flight.airlineName}</Text>
                </Card>
                <Text>It has no ratings</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card:{
        flex: 1,
        justifyContent: 'center'
    }
});
