import React from 'react';
import { useForm } from '../../../shared/utils/useForm';

import Input from '../../../shared/UI_Element/Input';
import Button from '../../../shared/UI_Element/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL, VALIDATOR_NUMSTR } from '../../../shared/utils/validator';

import classes from './ContactUsForm.module.css';

const ContactUsForm = () => {
	const [ formState, onInputHandler ] = useForm(
		{
			nama: {
				value: '',
				isValid: false
			},
			email: {
				value: '',
				isValid: false
			},
			phone: {
				value: '',
				isValid: false
			},
			message: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const onSubmitHandler = event => {
		event.preventDefault();
		// console.log(formState);
	};

	return (
		<div className={classes.ContactUsContainer}>
			<form onSubmit={onSubmitHandler} className={classes.ContactUsForm}>
				<Input
					inputType='input'
					placeholder='Nama'
					id='nama'
					onInputHandler={onInputHandler}
					validatorMethod={[ VALIDATOR_REQUIRE() ]}
				/>
				<Input
					inputType='input'
					placeholder='Email'
					id='email'
					onInputHandler={onInputHandler}
					validatorMethod={[ VALIDATOR_EMAIL() ]}
				/>
				<Input
					inputType='input'
					placeholder='No Telephone'
					id='phone'
					onInputHandler={onInputHandler}
					validatorMethod={[ VALIDATOR_NUMSTR() ]}
				/>
				<Input
					inputType='textarea'
					placeholder='Pesan...'
					rows='10'
					id='message'
					onInputHandler={onInputHandler}
					validatorMethod={[ VALIDATOR_MINLENGTH(10) ]}
				/>
				<Button disabled={!formState.formIsValid} btnType={'Dark'}>
					Submit
				</Button>
			</form>
		</div>
	);
};

export default ContactUsForm;
