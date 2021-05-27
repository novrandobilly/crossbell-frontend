import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../../../shared/utils/useForm';
import { connect } from 'react-redux';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import Input from '../../../../shared/UI_Element/Input';
import Button from '@material-ui/core/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL, VALIDATOR_NUMSTR } from '../../../../shared/utils/validator';
import FAQ from '../../../components/ContactUs/FAQ';
import Modal from '../../../../shared/UI_Element/Modal';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';

import classes from './ContactUsContent.module.css';

const ContactUsContent = props => {
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
			feed: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const onSubmitHandler = async event => {
		event.preventDefault();
		const newFeed = {
			name: formState.inputs.nama.value,
			email: formState.inputs.email.value,
			phone: formState.inputs.phone.value,
			feed: formState.inputs.feed.value
		};
		try {
			const res = await props.createFeed(newFeed);
			console.log(res);
			if (res) {
				console.log(res);
			} else {
				throw new Error(res);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const onCancelHandler = () => {
		props.resetFeed();
	};

	return (
		<div className={classes.Content}>
			<div className={classes.HelpArticles}>
				<p className={classes.HeaderTitle}>Help Articles</p>
				<FAQ />
				<span className={classes.SeeAllArticles}>
					<Link to='/FrequentlyAskedQuestion'>See all help articles</Link>
				</span>
			</div>
			<div className={classes.NeedSupport}>
				<p className={classes.HeaderTitle}>Contact Us</p>
				<Modal show={props.success} onCancel={onCancelHandler}>
					Termia kasih atas feedback yang diberikan, feedback anda akan kami proses dan dibalas melalui email.{' '}
				</Modal>
				{!props.isLoading ? (
					<form onSubmit={onSubmitHandler} className={classes.ContactUsForm}>
						<Input
							inputType='input'
							label='Nama Lengkap'
							id='nama'
							name='nama'
							onInputHandler={onInputHandler}
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							helperText='Mohon masukan nama lengkap anda'
						/>
						<Input
							inputType='input'
							label='Email'
							id='email'
							name='email'
							onInputHandler={onInputHandler}
							validatorMethod={[ VALIDATOR_EMAIL() ]}
							helperText='Pastikan input harus berbentuk email'
						/>
						<Input
							inputType='input'
							label='No Telephone'
							id='phone'
							name='phone'
							onInputHandler={onInputHandler}
							validatorMethod={[ VALIDATOR_NUMSTR() ]}
							helperText='Pastikan nomor telepon sudah benar'
						/>
						<Input
							inputType='textarea'
							label='Pesan...'
							rows={4}
							id='feed'
							name='feed'
							onInputHandler={onInputHandler}
							validatorMethod={[ VALIDATOR_MINLENGTH(10) ]}
							helperText='Pastikan pesan lebih dari 10 alfabet'
						/>

						<div className={classes.Footer}>
							<Button disabled={!formState.formIsValid} variant='contained' color='primary' type='submit' size='small'>
								Submit
							</Button>
						</div>
					</form>
				) : (
					<SpinnerCircle />
				)}
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.feed.isLoading,
		error: state.feed.error,
		success: state.feed.success
	};
};

const mapDispatchToProps = dispatch => {
	return {
		createFeed: newFeed => dispatch(actionCreators.createFeed(newFeed)),
		resetFeed: () => dispatch({ type: actionTypes.FEEDBACKRESET })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsContent);
