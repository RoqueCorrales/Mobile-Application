import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {Card} from "react-native-elements";

export default class Register extends Component {

	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		title: 'Register'
	};
	
	render () {
		return (
			<View>
				<Card title="Sign Up">
					<Text>hola</Text>
				</Card>
			</View>
		);
	}
}