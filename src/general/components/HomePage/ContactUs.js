import React, { useRef } from 'react';
import classes from './ContactUs.module.css';
import Instagram from '../../../assets/icons/instagram.svg';
import Whatsapp from '../../../assets/icons/whatsapp.svg';

const ContactUs = () => {
  const nameInput = useRef();
  const emailInput = useRef();
  const messageInput = useRef();

  return (
    <div className={classes.ContactUsContainer}>
      <div className={classes.ContactUsInfo}>
        <h3>Contact Us</h3>
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
      <form className={classes.ContactUsForm}>
        <input type='text' name='name' placeholder='Tulis nama-mu' ref={nameInput} />
        <input type='email' name='email' placeholder='Tulis email-mu' ref={emailInput} />
        <textarea name='messsage' placeholder='Tulis pesan-mu' rows='5' ref={messageInput} />
        <button type='submit'>Kirim Pesan</button>
      </form>
    </div>
  );
};

export default ContactUs;
