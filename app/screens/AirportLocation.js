import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapView from 'react-native-maps';

export default class AirportLocation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            airport: [],
        }
    }

    componentDidMount() {

    }

    render() {
        const latitude = this.props.navigation.getParam('latitude', 'nada');
        const longitude = this.props.navigation.getParam('longitude', 'nada');
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 31.987639,
                        longitude: -89.245056,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}>

                        <MapView.Marker
                            coordinate={{
                                latitude: 31.987639,
                                longitude: -89.245056
                            }}>

                                <View style={styles.radius}>
                                    <View style={styles.marker} />
                                </View>
                        </MapView.Marker>
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
        justifyContent: 'center',
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
        top: 0,
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
