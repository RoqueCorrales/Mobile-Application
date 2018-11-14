import React, {Component} from 'react';
import { View, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import t from 'tcomb-form-native';
import {Card} from "react-native-elements";

import FormValidation from '../utils/Validation';
import AppButton from '../components/AppButton';
import Config from '../utils/Config';


const Form = t.form.Form;

export default class Login extends Component {

	constructor(props) {
		super(props);

		this.user = t.struct({
			email: FormValidation.email,
			password: FormValidation.password,
		});

		this.options = {
			fields: {
				email: {
					help: 'Type your email',
					error: 'Invalid email',
					autoCapitalize: 'none',
				},
				password: {
					help: 'Type your password',
					error: 'Invalid password',
					password: true,
					secureTextEntry: true,
				}
			}
		};
	}


	static navigationOptions = {
		title: 'Flight Stats'
	};
	async saveToken(value) {
	    try {
	      await AsyncStorage.setItem('token', value);
	    } catch (error) {
	      console.log('AsyncStorage error: ' + error.message);
	    }
	}

	login () {
		const validate = this.refs.form.getValue();
		if(validate) {
			fetch(Config.API_LOCAL+'login',{
				method: 'POST',
			  	headers: {
			    	'Accept': 'application/json',
			    	'Content-Type': 'application/json'
			  	},
			  	body: JSON.stringify({
			        email: validate.email,
			        password: validate.password
			      })
			})
		  	.then(res => res.json()
		      	.then(resJson => {
		      		if (resJson.error) {
		      			Toast.showWithGravity('Invalid credentials', Toast.LONG, Toast.BOTTOM);
		      		}else{
		      			this.saveToken(resJson.token_type + ' ' + resJson.access_token);
						Toast.showWithGravity("Welcome!", Toast.LONG, Toast.BOTTOM);
						this.props.navigation.navigate('Airports');	  
		      		}
		        })
		    )
	      	.catch(error => {
	        	console.log(error)
	     	});
		}
	}

	register () {
		/*const navigateAction = NavigationActions.navigate({
			routeName: 'Register'
		});
		this.props.navigation.dispatch(navigateAction);*/
	}

	render () {
		return (
			<View style={{justifyContent: 'center', flex: 1}}>
				<Card title="Log In">
					<Form
						ref="form"
						type={this.user}
						options={this.options}
					/>
					<AppButton
						bgColor="#0c961e"
						title="Log In"
						action={this.login.bind(this)}
						iconName="sign-in"
						iconSize={30}
						iconColor="#fff"
					/>
				</Card>
			</View>
		);
	}
}