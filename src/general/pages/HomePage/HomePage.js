import React, { useEffect, useState, Fragment, useRef } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Logo from '../../../shared/UI_Element/Logo';
import ContactUs from '../../components/HomePage/ContactUs';
import Modal from '../../../shared/UI_Element/Modal';
import Login from '../../components/RegistrationModal/Login';
import Register from '../../components/RegistrationModal/Register';

import styles from './HomePage.module.scss';
import WelcomeIllustration from '../../../assets/Work.png';
import ProfileIcon from '../../../assets/icons/profile-icon.svg';
import MailAutoReminder from '../../../assets/icons/mail-reminder.svg';
import MailAutoSend from '../../../assets/icons/mail-auto-send.svg';
import Briefcase from '../../../assets/icons/briefcase.svg';
import AllInOneProfile from '../../../assets/AllInOneProfile.svg';
import CheckMark from '../../../assets/icons/check-mark.svg';
import RequestHH from '../../../assets/images/Request.png';
import Screening from '../../../assets/images/Screening.png';
import Headhunter from '../../../assets/images/Headhunter.png';
// import IntiDinamisLogo from '../../../assets/Inti-Dinamis-Logo.png';

const HomePage = props => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const searchInputRef = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSearchHandler = e => {
    e.preventDefault();
    const searchValue = searchInputRef.current.value;
    props.history.push(`/jobs-dashboard?search=${searchValue}`);
  };

  const onSwitchToRegister = () => setIsLogin(false);
  const onSwitchToLogin = () => setIsLogin(true);

  const showRegistration = () => {
    setShowAuthForm(true);
    setIsLogin(false);
  };
  const onCancelAuth = () => setShowAuthForm(false);
  return (
    <Fragment>
      <Modal
        show={showAuthForm}
        onCancel={onCancelAuth}
        headerText={isLogin ? 'Login ' : 'Registration Form'}
        style={{ top: !isLogin && '10vh', '--containerWidth': '400px' }}>
        {isLogin ? (
          <Login
            onSwitchToRegister={onSwitchToRegister}
            onForgotPassword={onCancelAuth}
            onSucceedLogin={onCancelAuth}
          />
        ) : (
          <Register onSwitchToLogin={onSwitchToLogin} onSucceedRegister={onCancelAuth} onCancelAuth={onCancelAuth} />
        )}
      </Modal>
      <section className={styles.WelcomeToCrossbellBackground}>
        <div className={styles.WelcomeToCrossbell}>
          <div className={styles.WelcomeText}>
            <h1>Sudah saatnya berkarir di bidang impianmu!</h1>
            <form className={styles.WelcomeSearchBar} onSubmit={onSearchHandler}>
              <input type='text' placeholder='Cari pekerjaan favoritmu' name='search job' ref={searchInputRef} />
              <button type='submit' onClick={onSearchHandler}>
                Cari
              </button>
            </form>
            <p>
              <em>
                Crossbell menyediakan beragam peluang kerja bagi insan-insan terbaik bangsa, baik untuk mereka yang baru
                mulai berkarir ataupun mereka yang ingin mencari peluang baru.
              </em>
            </p>

            <div className={styles.WelcomeButton}>
              <Link to='/jobs-dashboard'>
                <button className={styles.ExploreButton}>Telusuri Pekerjaan</button>
              </Link>
              <span to='/registration'>
                <button className={styles.RegistrationButton} onClick={showRegistration}>
                  Daftar Sekarang
                </button>
              </span>
            </div>
          </div>
          <div className={styles.WelcomeIllustrationContainer}>
            <img alt='Welcome Illustration' src={WelcomeIllustration} />
          </div>
        </div>
      </section>

      <section className={styles.FeatureBackground}>
        <div className={styles.FeatureContainer}>
          <div className={styles.FeatureText}>
            <h1>
              <em>One-Stop-Solution</em> untuk meningkatkan kualitas karir.
            </h1>
            <p>Pilih strategi yang paling cocok dengan-mu agar mencari kerja menjadi lebih menyenangkan.</p>
            <div onClick={showRegistration}>
              <button>Daftar Sekarang</button>
            </div>
          </div>
          <div className={styles.FeatureList}>
            <div className={styles.FirstPairFeatures}>
              <div className={styles.FeatureCard}>
                <div className={styles.FeatureIconBackground}>
                  <img className={styles.FeatureIcon} alt='Feature Icon' src={MailAutoReminder} />
                </div>
                <h2>Auto Remind</h2>
                <p>Dapatkan informasi terupdate untuk pekerjaan-pekerjaan favoritmu yang langsung terkirim ke email.</p>
                <Link to='/jobs-dashboard'>
                  <span>MORE</span>
                </Link>
              </div>
              <div className={styles.FeatureCard}>
                <div className={styles.FeatureIconBackground}>
                  <img className={styles.FeatureIcon} alt='Feature Icon' src={MailAutoSend} />
                </div>
                <h2>Auto Apply</h2>
                <p>
                  Tidak ingin terlewat untuk submit resume-mu ke pekerjaan favorit? Aktifkan fitur <em>Auto Apply</em>{' '}
                  untuk mengirimkan secara langsung ke pekerjaan favoritmu.
                </p>
                <Link to='/jobs-dashboard'>
                  <span>MORE</span>
                </Link>
              </div>
            </div>
            <div className={styles.SecondPairFeatures}>
              <div className={styles.FeatureCard}>
                <div className={styles.FeatureIconBackground}>
                  <img className={styles.FeatureIcon} alt='Feature Icon' src={Briefcase} />
                </div>
                <h2>Executive Search Programme</h2>
                <p>
                  Raih kesempatan menjadi top talent untuk berpeluang menjadi kandidat headhunter bagi client kami.
                </p>{' '}
                <Link to='/jobs-dashboard'>
                  <span>MORE</span>
                </Link>
              </div>
              <div className={styles.FeatureCard}>
                <div className={styles.FeatureIconBackground}>
                  <img className={styles.FeatureIcon} alt='Feature Icon' src={ProfileIcon} />
                </div>
                <h2>One Resume for All</h2>
                <p>
                  Cukup satu kali mengisi riwayat pekerjaan & pendidikan untuk bisa melamar ke berbagai macam pekerjaan.
                </p>
                <Link to='/jobs-dashboard'>
                  <span>MORE</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.AllInOneProfileBackground}>
        <div className={styles.AllInOneProfileContainer}>
          <div className={styles.AllInOneProfileImage}>
            <img alt='All in One Profile' src={AllInOneProfile} />
          </div>
          <div className={styles.AllInOneProfileText}>
            <p>
              <em>
                Tunjukkan pengalaman, deskripsi diri, riwayat pendidikan lengkap dengan keahlian yang kamu miliki untuk
                tampil sebagai kandidat yang menarik bagi perusahaan-perusahaan favoritmu. All in One Profile!
              </em>
            </p>
            <div onClick={showRegistration}>
              <button type='button'>Buat Profile Sekarang</button>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.HeadhunterBackground}>
        <div className={styles.HeadhunterContainer}>
          <div className={styles.HeadhunterImage}>
            <img alt='RequestHH' src={RequestHH} />
            <img alt='Screening' src={Screening} />
            <img alt='Headhunter' src={Headhunter} />
          </div>
          <h2>Apakah perusahaan anda sedang mencari kandidat berkualitas untuk posisi managerial ke atas?</h2>
          <div className={styles.HeadhunterFeatures}>
            <div className={styles.HeadhunterScreeningItem}>
              <img alt='Check mark' src={CheckMark} />
              <h3>Pre-Employment Screening</h3>
              <p>
                Kami melakukan screening cermat untuk memastikan kandidat memiliki kualitas terbaik bagi kebutuhan
                bisnis anda
              </p>
            </div>
            <div className={styles.HeadhunterScreeningItem}>
              <img alt='Check mark' src={CheckMark} />
              <h3>Background Checking</h3>
              <p>Kandidat yang profesional untuk mengemban tanggung jawab yang akan anda berikan</p>
            </div>
            <div className={styles.HeadhunterScreeningItem}>
              <img alt='Check mark' src={CheckMark} />
              <h3>Assessment Test</h3>
              <p>
                Kami bekerja sama dengan tim assessor untuk memberikan <em>Assessment Test</em> demi mendapatkan
                kandidat yang paling sesuai dengan kebutuhan bisnis anda
              </p>
            </div>
          </div>
          <div className={styles.HeadhunterRequest}>
            <Link to='/co/order/es'>
              <span>Request For Candidates</span>
            </Link>
          </div>
        </div>
      </section>
      {/* <section className={styles.PartnersBackground}>
        <div className={styles.PartnersContainer}>
          <h2>Our Partners:</h2>
          <div className={styles.PartnersGallery}>
            <Logo src={IntiDinamisLogo} alt='Inti Dinamis' width='200px' />
          </div>
        </div>
      </section> */}
      <section className={styles.ContactUsBackground}>
        <div className={styles.BackStripe}></div>
        <ContactUs />
      </section>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    admin: state.admin,
  };
};

export default connect(mapStateToProps)(withRouter(HomePage));
