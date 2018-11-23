import React, {Component} from 'react';
import { View } from 'react-native';
import {Card} from "react-native-elements";
import t from 'tcomb-form-native';
import {RegisterModel, options} from "../forms/RegisterForm";
import AppButton from '../components/AppButton';
import Toast from 'react-native-simple-toast';
import Preloader from '../components/Preloader';
const Form = t.form.Form;

export default class Register extends Component {

	constructor() {
		super();
		this.state = {
      		loading: false,
	    }
	}

	static navigationOptions = {
		title: 'Register'
	};
	
	register() {
		this.setState({ loading: true });
		const validate = this.refs.form.getValue();
		if(validate) {
			fetch(Config.API_LOCAL+'users',{
				method: 'POST',
			  	headers: {
			    	'Accept': 'application/json',
			    	'Content-Type': 'application/json'
			  	},
			  	body: JSON.stringify({
			        name: validate.name,
			        email: validate.email,
			        password: validate.password,
			        password_confirmation: validate.password_confirmation
			    })
			})
		  	.then(res => res.json()
		      	.then(resJson => {
		      		console.log(resJson);
		      		if (resJson.error) {
		      			Toast.showWithGravity(resJson.error, Toast.LONG, Toast.BOTTOM);
		      		}else{
		      			this.props.navigation.goBack();
						Toast.showWithGravity("registro!", Toast.LONG, Toast.BOTTOM);
		      		}
		      		
		        })
		    )
	      	.catch(error => {
	        	console.log(error)
	     	});
		}else{
			this.setState({ loading: false });
		}
	}

	render () {
		if (this.state.loading) {
		    return (
		        <Preloader />
		    );
	    }

		return (
			<View>
				<Card title="Register">
					<Form
						ref="form"
						type={RegisterModel}
						options={options}
					/>

					<AppButton
						bgColor="#0c961e"
						title="Sign Up"
						action={this.register.bind(this)}
						iconName="chevron-right"
						iconSize={30}
						iconColor="#fff"
					/>
				</Card>
			</View>
		);
	}
}