import React from 'react';
import t from 'tcomb-form-native';

export const RegisterModel = t.struct({
	name: t.String,
	email: t.refinement(t.String, (s) => {
		return /@/.test(s);
	}),
	password: t.refinement(t.String, (s) => {
		return s.length >= 6;
	}),
	password_confirmation: t.refinement(t.String, (s) => {
		return s.length >= 6;
	})
});

export const options = {
	fields: {
		name: {
			label: 'Nombre (*)',
			placeholder: 'Nombre'
		},
		email: {
			label: 'Correo Electrónico (*)',
			placeholder: 'Email'
		},
		password: {
			password: true,
			secureTextEntry: true,
			label: 'Contraseña (*)',
			placeholder: 'Contraseña'
		},
		password_confirmation: {
			password: true,
			secureTextEntry: true,
			label: 'Confirmar Contraseña (*)',
			placeholder: 'Confirmacion Contraseña'
		}
	}
};