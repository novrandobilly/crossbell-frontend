import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from '../../../../shared/utils/useForm';

import OrderComponent from './OrderComponent';
import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions/index';
import { VALIDATOR_MIN } from '../../../../shared/utils/validator';
import Button from '@material-ui/core/Button';

import Spinner from '../../../../shared/UI_Element/Spinner/SpinnerCircle';
import Modal from '../../../../shared/UI_Element/Modal';
import OrderModal from '../../../../shared/UI_Element/OrderModal';
import Input from '../../../../shared/UI_Element/Input';

import classes from './CompanyOrderForm.module.css';

const ORIGINAL_PRICE = 500000;

const CompanyOrderForm = props => {
	const companyData = JSON.parse(localStorage.getItem('userData'));
	const [ price, setPrice ] = useState(ORIGINAL_PRICE);

	const [ validationError, setValidationError ] = useState(false);

	const [ orderModal, setOrderModal ] = useState(false);
	// const [ slot, setSlot ] = useState('0');

	const [ formState, onInputHandler ] = useForm(
		{
			slot: {
				value: 0,
				isValid: false
			}
		},
		false
	);

	const onSubmitHandler = async event => {
		event.preventDefault();
		if (!formState.formIsValid) {
			return props.createOrderFail();
		}

		if (!props.auth.isActive) {
			setValidationError(true);
		}

		let title = 'bronze';

		if (formState.inputs.slot.value > 1) {
			title = 'silver';
		}
		if (formState.inputs.slot.value > 4) {
			title = 'gold';
		}
		if (formState.inputs.slot.value > 9) {
			title = 'platinum';
		}
		const orderData = {
			invoiceId: companyData.userId.slice(0, 3),
			companyId: companyData.userId,
			packageName: title,
			slot: formState.inputs.slot.value,
			token: props.auth.token
		};

		if (orderData.slot < 1) {
			throw new Error('jumlah pembelian tidak boleh dibawah 1');
		}
		setOrderModal(false);
		try {
			const res = await props.createOrder(orderData);
			console.log(res);
			props.history.push(`/co/${res.orderreg.id}/invoice`);
		} catch (err) {
			console.log(err);
		}
	};
	console.log(formState.inputs.slot.value, price);

	useEffect(
		() => {
			const setPriceSelected = (slot) => {
				if (slot <= 1) return (ORIGINAL_PRICE);
				if (slot <= 4) return (ORIGINAL_PRICE - ORIGINAL_PRICE * 0.05);
				if (slot <= 9) return (ORIGINAL_PRICE - ORIGINAL_PRICE * 0.1);
				return ORIGINAL_PRICE - ORIGINAL_PRICE * 0.15
			}
			
			setPrice(setPriceSelected(formState?.inputs?.slot?.value))
		},
		[ formState.inputs.slot.value ]
	);

	const onCloseOrderModal = () => {
		setOrderModal(false);
	};

	const onOpenOrderModal = () => {
		setOrderModal(true);
	};

	const OnclickBronze = () => {
		onInputHandler('slot', 1, true);
	};

	const OnclickSilver = () => {
		onInputHandler('slot', 4, true);
	};

	const OnclickGold = () => {
		onInputHandler('slot', 9, true);
	};

	const OnclickPlatinum = () => {
		onInputHandler('slot', 10, true);
	};

	let formContent = (
		<React.Fragment>
			<div className={classes.PackageList}>
				<div onClick={OnclickBronze} className={classes.PackageCard}>
					<OrderComponent title='Bronze' price={ORIGINAL_PRICE} slot='1 slot' createOrder={props.createOrder} />
				</div>

				<div onClick={OnclickSilver} className={classes.PackageCard}>
					<OrderComponent
						title='Silver'
						price={ORIGINAL_PRICE - ORIGINAL_PRICE * 0.05}
						slot='2 - 4 slot'
						perks={[ 'Diskon per slot sebesar 5%' ]}
						createOrder={props.createOrder}
					/>
				</div>

				<div onClick={OnclickGold} className={classes.PackageCard}>
					<OrderComponent
						title='Gold'
						price={ORIGINAL_PRICE - ORIGINAL_PRICE * 0.1}
						slot='5 - 9 slot'
						perks={[ 'Diskon per slot sebesar 10%' ]}
						createOrder={props.createOrder}
					/>
				</div>

				<div onClick={OnclickPlatinum} className={classes.PackageCard}>
					<OrderComponent
						title='Platinum'
						price={ORIGINAL_PRICE - ORIGINAL_PRICE * 0.15}
						slot='>9 slot'
						perks={[ 'Diskon per slot sebesar 15%' ]}
						createOrder={props.createOrder}
					/>
				</div>
			</div>
			<form className={classes.FormContainer} onSubmit={onSubmitHandler}>
				<div className={classes.InputAmount} style={{ marginTop: '20px' }}>
					<p className={classes.SlotEqual}>1 Slot = 2 minggu waktu tayang iklan</p>
				</div>

				<div className={classes.InputAmount}>
					<p className={classes.Label}>Jumlah slot yang ingin dibeli</p>
					<div className={classes.InputSlot}>
						<Input
							inputType='input'
							id='slot'
							InputClass='PackageSlot'
							validatorMethod={[ VALIDATOR_MIN(1) ]}
							onInputHandler={onInputHandler}
							type='number'
							initValue={formState?.inputs?.slot?.value }
							min='0'
							step='1'
							helperText={'Minimal 1'}
							value={formState?.inputs?.slot?.value }
						/>
					</div>
				</div>

				<div className={classes.InputAmount} style={{ marginBottom: '-16px' }}>
					<p className={classes.Label}>Jenis paket:</p>
					<p className={classes.InputSlot}>
						{formState.inputs.slot.value <= 1 ? (
							'Bronze'
						) : formState.inputs.slot.value <= 4 ? (
							'Silver'
						) : formState.inputs.slot.value <= 9 ? (
							'Gold'
						) : (
							'Platinum'
						)}
					</p>
				</div>

				<div className={classes.InputAmount} style={{ borderBottom: '1px solid black' }}>
					<p className={classes.Label}>Harga per slot:</p>
					<p className={classes.InputSlot}>IDR {price.toLocaleString()}</p>
				</div>
				<div className={classes.InputAmount}>
					<p className={classes.Label}>Total:</p>
					<p className={classes.InputSlot}>
						<strong>IDR {(price * formState.inputs.slot.value).toLocaleString()}</strong>
					</p>
				</div>

				<div style={{ width: '100%', textAlign: 'center' }}>
					<Button
						type='button'
						variant='contained'
						color='primary'
						disableElevation
						disabled={!formState.formIsValid}
						style={{ width: '50%', marginTop: '1rem' }}
						onClick={onOpenOrderModal}>
						Submit
					</Button>
				</div>
			</form>
		</React.Fragment>
	);

	const onCancelHandler = () => {
		props.resetOrder();
		setValidationError(false);
	};

	if (props.isLoading) formContent = <Spinner />;

	return (
		<div className={classes.Container}>
			{' '}
			<Modal show={validationError && !props.auth.isActive} onCancel={onCancelHandler}>
				Perusahaan anda masih dalam proses verifikasi admin
			</Modal>
			<Modal show={props.error && props.auth.isActive} onCancel={onCancelHandler}>
				Tidak dapat melakukan Pembelian untuk saat ini
			</Modal>
			<OrderModal show={orderModal} onCancel={onCloseOrderModal} Accept={onSubmitHandler}>
				Buat pesanan sekarang?
			</OrderModal>
			{formContent}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		isLoading: state.finance.isLoading,
		error: state.finance.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		createOrder: orderData => dispatch(actionCreators.createOrder(orderData)),
		createOrderFail: () => dispatch({ type: actionTypes.CREATEORDERCANDIDATEFAIL }),
		resetOrder: () => dispatch({ type: actionTypes.ORDERRESET })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CompanyOrderForm));
