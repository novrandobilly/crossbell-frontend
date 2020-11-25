import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../../shared/utils/useForm';

import * as actionCreators from '../../../../store/actions/index';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Input from '../../../../shared/UI_Element/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../../../../shared/utils/validator';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';

import classes from './EditIntro.module.css';

const EditIntro = props => {
	const { companyid } = useParams();

	const [ data, setData ] = useState({});
	const [ isLoading, setIsLoading ] = useState(true);

	const { getOneCompany } = props;
	useEffect(
		() => {
			getOneCompany({ userId: companyid }).then(res => {
				setData(res.company);
				console.log(res);
				setIsLoading(false);
			});
		},
		[ getOneCompany, setIsLoading, companyid ]
	);

	let push = props.push;

	const [ formState, onInputHandler ] = useForm(
		{
			companyName: {
				value: data.companyName,
				isValid: data.companyName ? true : false
			},
			size: {
				value: data.size,
				isValid: data.size ? true : false
			},
			industry: {
				value: data.industry,
				isValid: data.industry ? true : false
			},
			address: {
				value: data.address,
				isValid: data.address ? true : false
			},
			website: {
				value: data.website,
				isValid: data.website ? true : false
			},
			emailRecipient: {
				value: data.emailRecipient,
				isValid: data.emailRecipient ? true : false
			}
		},
		true
	);

	const onSubmitHandler = async event => {
		event.preventDefault();
		const updatedIntro = {
			companyId: companyid,
			companyName: formState.inputs.companyName.value,
			size: formState.inputs.size.value,
			industry: formState.inputs.industry.value,
			address: formState.inputs.address.value,
			website: formState.inputs.website.value,
			emailRecipient: formState.inputs.emailRecipient.value
		};
		try {
			const res = await props.updateCompanyIntro(updatedIntro);
			if (res) {
				console.log(res);
			} else {
				console.log('no res detected');
			}
			!push && props.history.push(`/co/${companyid}`);
		} catch (err) {
			console.log(err);
		}
	};

	let formContent = (
		<React.Fragment>
			<div className={classes.ContainerFlex}>
				<p className={classes.FormTitle}>Edit Company Intro</p>

				<div className={classes.FormRow}>
					<div className={classes.EditLabel}>
						<div className={classes.ProfilePicture}>
							<AccountCircleIcon
								style={{
									fontSize: '15rem',
									marginBottom: '1rem'
								}}
							/>
							<label className={classes.InputButton}>
								<input type='file' />
								<span className={classes.InputButtonText}> Upload Logo </span>
							</label>
						</div>
						<Input
							inputType='input'
							id='companyName'
							inputClass='AddJobInput'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							onInputHandler={onInputHandler}
							label='Name*'
							initValue={data.companyName}
							initIsValid={data.companyName}
						/>

						<Input
							inputType='input'
							id='size'
							inputClass='AddJobInput'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							onInputHandler={onInputHandler}
							label='Size*'
							initValue={data.size}
							initIsValid={data.size}
							placeholder='Company Size'
						/>

						<Input
							inputType='input'
							id='industry'
							inputClass='AddJobInput'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							onInputHandler={onInputHandler}
							label='Industry*'
							initValue={data.industry}
							initIsValid={data.industry}
							placeholder='Your Company Industry'
						/>

						<Input
							inputType='input'
							id='address'
							inputClass='AddJobInput'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							onInputHandler={onInputHandler}
							label='Address*'
							initValue={data.address}
							initIsValid={data.address}
							placeholder='Company address'
						/>

						<Input
							inputType='input'
							id='website'
							inputClass='AddJobInput'
							validatorMethod={[ VALIDATOR_REQUIRE() ]}
							onInputHandler={onInputHandler}
							label='Websites*'
							initValue={data.website}
							initIsValid={data.website}
							placeholder='Company Website'
						/>

						<Input
							inputType='input'
							id='emailRecipient'
							inputClass='AddJobInput'
							validatorMethod={[ VALIDATOR_EMAIL() ]}
							onInputHandler={onInputHandler}
							label='Email Recipient*'
							initValue={data.emailRecipient}
							initIsValid={data.emailRecipient}
							placeholder='Email Recipient'
						/>
					</div>
				</div>

				<button disabled={!formState.formIsValid} className={classes.SaveButton}>
					<span>Save</span>
				</button>
			</div>
		</React.Fragment>
	);

	if (isLoading) {
		formContent = <SpinnerCircle />;
	}

	return (
		<div style={!push ? { marginTop: '6rem' } : { marginTop: '0' }}>
			<form onSubmit={onSubmitHandler} className={classes.Container}>
				{formContent}
			</form>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		getOneCompany: data => dispatch(actionCreators.getOneCompany(data)),
		updateCompanyIntro: CompanyData => dispatch(actionCreators.updateCompanyIntro(CompanyData))
	};
};
export default connect(null, mapDispatchToProps)(withRouter(EditIntro));
