import React, {Component} from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';

export default class AppButton extends Component {
	render () {
		const {action, iconName, iconColor, title, bgColor, setWidth} = this.props;
		const {width} = setWidth ? Dimensions.get('window') : {};
		console.log(iconName);
		return (
			<Button
				onPress={action}
				buttonStyle={{
					backgroundColor: bgColor,
					height: 45,
					borderColor: "transparent",
					borderWidth: 0,
					borderRadius: 5,
					marginBottom: 5,
					width: width
				}}
				title={title}
				rightIcon={{ name: iconName, 
					size: 15,
					color:iconColor
				}}
				text={title}
			>
			</Button>
		);
	}
}