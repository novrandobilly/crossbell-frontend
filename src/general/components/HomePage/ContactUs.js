import React, { useRef } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';

import classes from './ContactUs.module.scss';
import LoadingBar from '../../../shared/UI_Element/Spinner/LoadingBar';
import Instagram from '../../../assets/icons/instagram.svg';
import Whatsapp from '../../../assets/icons/whatsapp.svg';

const ContactUs = ({ createFeedback, feedbackIsLoading }) => {
  const nameInput = useRef();
  const emailInput = useRef();
  const phoneInput = useRef();
  const messageInput = useRef();

  const onSubmitHandler = async event => {
    event.preventDefault();
    const payload = {
      name: nameInput.current.value,
      email: emailInput.current.value,
      phone: phoneInput.current.value,
      message: messageInput.current.value,
    };

    let messageIsValid = true;
    for (const key in payload) messageIsValid = messageIsValid && !!payload[key];
    if (!messageIsValid) return;

    await createFeedback(payload);
    nameInput.current.value = '';
    emailInput.current.value = '';
    messageInput.current.value = '';
    phoneInput.current.value = '';
  };

  return (
    <div className={classes.ContactUsContainer}>
      <div className={classes.ContactUsInfo}>
        <h3>Kontak Kami</h3>
        <p className={classes.OfficePhone}>(+62)21 848 6752</p>
        <p className={classes.CompanyEmail}>crossbellcorps@gmail.com</p>
        <p className={classes.CompanyAddress}>Taman Laguna Blok K, Jati Sampurna Bekasi 17435</p>
        <div className={classes.SocialMediaIcons}>
          <a href='https://wa.link/yv4vyt' target='_blank' rel='noopener noreferrer'>
            <img alt='Instagram' src={Whatsapp} />
          </a>
          <a href='https://www.instagram.com/crossbellcorps/?hl=en' target='_blank' rel='noopener noreferrer'>
            <img alt='Instagram' src={Instagram} />
          </a>
        </div>
      </div>
      <form className={classes.ContactUsForm} onSubmit={onSubmitHandler}>
        <input type='text' name='name' placeholder='Tulis nama-mu' ref={nameInput} />
        <input type='email' name='email' placeholder='Tulis email-mu' ref={emailInput} />
        <input type='text' name='phone' placeholder='Tulis nomor hp-mu' ref={phoneInput} />
        <textarea name='messsage' placeholder='Tulis pesan-mu' rows='5' ref={messageInput} />
        {feedbackIsLoading ? <LoadingBar /> : <button type='submit'>Kirim Pesan</button>}
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    feedbackIsLoading: state.feedback.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createFeedback: payload => dispatch(actionCreators.createFeedback(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
