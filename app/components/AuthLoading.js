import React, {Component} from 'react';
import {ActivityIndicator, View, StyleSheet, Dimensions, AsyncStorage} from 'react-native';

const {height} = Dimensions.get('window');

export default class AuthLoading extends Component {

	constructor(){
		super()
		this.loadApp();
	}

	loadApp = async () =>{
		const token = await AsyncStorage.getItem('token');
		this.props.navigation.navigate(token ? 'App' : 'Auth');
	}
	render () {
		return (
			<View style={[styles.preloader]}>
				<ActivityIndicator style={{height: 80}} size="large" />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	preloader: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: height,
		backgroundColor: '#242935'
	}
});