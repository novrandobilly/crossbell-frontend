import React from 'react';
import { Link } from 'react-router-dom';

import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import classes from './FooterRoute.module.css';

const FooterRoute = () => {
  return (
    <div className={classes.FooterRoute}>
      <div className={classes.RouteSection}>
        <p className={classes.CategoriesTitle}>Kategori #1</p>
        <Link to='#'>
          <p>Tentang Kami</p>
        </Link>
        <Link to='#'>
          <p>Panduan Komunitas</p>
        </Link>
        <Link to='#'>
          <p>Syarat & Ketentuan</p>
        </Link>
        <Link to='#'>
          <p>Kebijakan Privasi</p>
        </Link>
      </div>

      <div className={classes.RouteSection}>
        <p className={classes.CategoriesTitle}>Kategori #2</p>
        <Link to='#'>
          <p>FAQ</p>
        </Link>
        <Link to='#'>
          <p>Blog</p>
        </Link>
        <Link to='#'>
          <p>Feedback</p>
        </Link>
        <Link to='#'>
          <p>Hubungi Kami</p>
        </Link>
      </div>

      <div className={classes.SocialSection}>
        <p className={classes.CategoriesTitle}>Social Media</p>
        <div className={classes.SocialMediaDiv}>
          <a
            href='https://web.whatsapp.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className={classes.IconDiv}>
              <WhatsAppIcon
                style={{
                  fontSize: '16pt',
                  color: 'white',
                }}
              />
            </div>
          </a>
          <a
            href='https://www.instagram.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className={classes.IconDiv}>
              <InstagramIcon
                style={{
                  fontSize: '16pt',
                  color: 'white',
                }}
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterRoute;
