import React, { useEffect, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useForm } from '../../../../shared/utils/useForm';
import { validate } from '../../../../shared/utils/validator';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actionTypes from '../../../../store/actions/actions';
import * as actionCreators from '../../../../store/actions';
import Modal from '../../../../shared/UI_Element/Modal';
import OrderModal from '../../../../shared/UI_Element/OrderModal';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormOne from './FormOne';
import FormTwo from './FormTwo';
import FormThree from './FormThree';
import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      {/* <Link color="inherit" href="https://material-ui.com/"> */}
      CrossBell co
      {/* </Link>{" "} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = [
  'Kandidat & Pekerjaan',
  'Pengalaman & Keahlian',
  'Spesifikasi Khusus',
];

const Checkout = (props) => {
  const [orderModal, setOrderModal] = useState(false);

  const [formState, onInputHandler] = useForm(
    {
      positionLevel: {
        value: '',
        isValid: false,
      },
      mainTask: {
        value: '',
        isValid: false,
      },
      responsibility: {
        value: '',
        isValid: false,
      },
      authority: {
        value: '',
        isValid: false,
      },
      minSalary: {
        value: '',
        isValid: false,
      },
      maxSalary: {
        value: '',
        isValid: false,
      },
      experience: {
        value: '',
        isValid: false,
      },
      expertise: {
        value: '',
        isValid: false,
      },
      specification: {
        value: '',
        isValid: true,
      },
    },
    false
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    onInputHandler('positionLevel', 'Manager', true);
  }, [onInputHandler]);

  const onManualHandler = (event, payload) => {
    const value = event.target.value;
    const id = event.target.name;
    const isValid = validate(value, payload.validator);

    onInputHandler(id, value, isValid);
  };

  const onSalaryRangeHandler = useCallback(
    (payload) => {
      onInputHandler('minSalary', payload[0] * 1000000, true);
      onInputHandler('maxSalary', payload[1] * 1000000, true);
    },
    [onInputHandler]
  );

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async () => {
    if (activeStep === 2) {
      setOrderModal(false);

      if (!formState.formIsValid) {
        return props.createOrderFail();
      }

      const payload = {
        positionLevel: formState.inputs.positionLevel.value,
        mainTask: formState.inputs.mainTask.value,
        responsibility: formState.inputs.responsibility.value,
        authority: formState.inputs.authority.value,
        salaryRange: {
          max: formState.inputs.maxSalary.value,
          min: formState.inputs.minSalary.value,
        },
        experience: formState.inputs.experience.value,
        expertise: formState.inputs.expertise.value,
        specification: formState.inputs.specification.value,
        token: props.auth.token,
        companyId: props.auth.userId,
      };

      if (!props.auth.isActive) {
        throw new Error('Perusahaan anda masih dalam proses verifikasi admin');
      }

      try {
        const res = await props.createRequest(payload);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onCloseOrderModal = () => {
    setOrderModal(false);
  };

  const onOpenOrderModal = () => {
    setOrderModal(true);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormOne
            onManualHandler={onManualHandler}
            formState={formState}
            onSalaryRangeHandler={onSalaryRangeHandler}
          />
        );
      case 1:
        return (
          <FormTwo onManualHandler={onManualHandler} formState={formState} />
        );
      case 2:
        return (
          <FormThree onManualHandler={onManualHandler} formState={formState} />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  let content = (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout} style={{ width: '650px' }}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Executive Search Form
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant='h5' gutterBottom>
                  Terima kasih atas pengajuan Executive Search.
                </Typography>
                <Typography variant='subtitle1'>
                  Tim admin Crossbell akan segera memproses dan menghubungi
                  penanggung jawab (PIC) akun untuk menindak-lanjuti proses
                  program Executive Search ini.
                </Typography>
                <Link
                  to={`/co/${props.auth.userId}/listOrder`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                  >
                    Selesai
                  </Button>
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {!props.isLoading ? (
                  getStepContent(activeStep)
                ) : (
                  <SpinnerCircle />
                )}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={onOpenOrderModal}
                      className={classes.button}
                    >
                      Place order
                    </Button>
                  ) : (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );

  const onCancelHandler = () => {
    props.resetOrder();
  };

  return (
    <React.Fragment>
      <Modal show={props.error} onCancel={onCancelHandler}>
        Tidak dapat melakukan pemesanan saat ini, mohon periksa kembali detail
        pesanan{' '}
      </Modal>

      <OrderModal
        show={orderModal}
        onCancel={onCloseOrderModal}
        Accept={activeStep === 2 ? handleNext : null}
      >
        Buat pesanan sekarang?
      </OrderModal>
      {content}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoading: state.finance.isLoading,
    error: state.finance.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRequest: (payload) => dispatch(actionCreators.createOrderES(payload)),
    createOrderFail: () =>
      dispatch({ type: actionTypes.CREATEORDERCANDIDATEFAIL }),
    resetOrder: () => dispatch({ type: actionTypes.ORDERRESET }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
