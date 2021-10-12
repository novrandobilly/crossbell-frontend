import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import Carousel from './components/Carousel';
// import AuthForm from './components/AuthForm';
// import ContactUsContent from './HomeContent/ContactUsContent';
import classes from './Home.module.css';
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

const Home = props => {
  // const [sign, setSign] = useState(true);
  // const [role, setRole] = useState(false);
  // const [touch, setTouch] = useState(false);
  // const [nav, setNav] = useState(false);

  // const toggleSign = () => {
  //   setSign(!sign);
  //   setNav(true);
  // };

  // const toggleRole = () => {
  //   setRole(!role);
  // };

  // const toggleTouch = () => {
  //   setTouch(true);
  // };
  // const toggleTouchCompany = () => {
  //   setTouch(true);
  //   setRole(!role);
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <section className={classes.WelcomeToCrossbellBackground}>
        <div className={classes.WelcomeToCrossbell}>
          <div className={classes.WelcomeText}>
            <h1>Sudah saatnya berkarir dalam bidang impianmu!</h1>
            <div className={classes.WelcomeSearchBar}>
              <input type='text' placeholder='Cari pekerjaan favoritmu' />
              <button type='button'>Cari</button>
            </div>
            <p>
              <em>
                Crossbell menyediakan beragam peluang kerja bagi insan-insan terbaik bangsa, baik untuk mereka yang baru mulai berkarir
                ataupun mereka yang ingin mencari peluang baru.
              </em>
            </p>

            <div className={classes.WelcomeButton}>
              <Link to='/jobs-dashboard'>
                <button className={classes.ExploreButton}>Telusuri Pekerjaan</button>
              </Link>
              <Link to='/registration'>
                <button className={classes.RegistrationButton}>Daftar Sekarang</button>
              </Link>
            </div>
          </div>
          <div className={classes.WelcomeIllustrationContainer}>
            <img alt='Welcome Illustration' src={WelcomeIllustration} />
          </div>
        </div>
      </section>

      <section className={classes.FeatureBackground}>
        <div className={classes.FeatureContainer}>
          <div className={classes.FeatureText}>
            <h1>
              <em>One-Stop-Solution</em> untuk meningkatkan kualitas karir.
            </h1>
            <p>Pilih strategi yang paling cocok dengan-mu agar mencari kerja menjadi lebih menyenangkan.</p>
            <Link to='/registration'>
              <button>Daftar Sekarang</button>
            </Link>
          </div>
          <div className={classes.FeatureList}>
            <div className={classes.FirstPairFeatures}>
              <div className={classes.FeatureCard}>
                <div className={classes.FeatureIconBackground}>
                  <img className={classes.FeatureIcon} alt='Feature Icon' src={MailAutoReminder} />
                </div>
                <h2>Auto Reminder</h2>
                <p>
                  Auto Reminder Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pharetra libero eleifend, faucibus erat in,
                  molestie justo.{' '}
                </p>
                <Link to='/jobs-dashboard'>
                  <span>MORE</span>
                </Link>
              </div>
              <div className={classes.FeatureCard}>
                <div className={classes.FeatureIconBackground}>
                  <img className={classes.FeatureIcon} alt='Feature Icon' src={MailAutoSend} />
                </div>
                <h2>Auto Apply</h2>
                <p>
                  Auto Apply Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pharetra libero eleifend, faucibus erat in,
                  molestie justo.{' '}
                </p>
                <Link to='/jobs-dashboard'>
                  <span>MORE</span>
                </Link>
              </div>
            </div>
            <div className={classes.SecondPairFeatures}>
              <div className={classes.FeatureCard}>
                <div className={classes.FeatureIconBackground}>
                  <img className={classes.FeatureIcon} alt='Feature Icon' src={Briefcase} />
                </div>
                <h2>Executive Search Programme</h2>
                <p>
                  Executive Search Programme Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pharetra libero eleifend,
                  faucibus erat in, molestie justo.{' '}
                </p>{' '}
                <Link to='/jobs-dashboard'>
                  <span>MORE</span>
                </Link>
              </div>
              <div className={classes.FeatureCard}>
                <div className={classes.FeatureIconBackground}>
                  <img className={classes.FeatureIcon} alt='Feature Icon' src={ProfileIcon} />
                </div>
                <h2>One Resume for All</h2>
                <p>
                  One Resume for All Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pharetra libero eleifend, faucibus erat
                  in, molestie justo.{' '}
                </p>
                <Link to='/jobs-dashboard'>
                  <span>MORE</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={classes.AllInOneProfileBackground}>
        <div className={classes.AllInOneProfileContainer}>
          <div className={classes.AllInOneProfileImage}>
            <img alt='All in One Profile' src={AllInOneProfile} />
          </div>
          <div className={classes.AllInOneProfileText}>
            <p>
              <em>
                Tunjukkan pengalaman, deskripsi diri, riwayat pendidikan lengkap dengan keahlian yang kamu miliki untuk tampil sebagai
                kandidat yang menarik bagi perusahaan-perusahaan favoritmu. All in One Profile!
              </em>
            </p>
            <Link to='/registration'>
              <button type='button'>Buat Profile Sekarang</button>
            </Link>
          </div>
        </div>
      </section>
      <section className={classes.HeadhunterBackground}>
        <div className={classes.HeadhunterContainer}>
          <div className={classes.HeadhunterImage}>
            <img alt='RequestHH' src={RequestHH} />
            <img alt='Screening' src={Screening} />
            <img alt='Headhunter' src={Headhunter} />
          </div>
          <h2>Apakah perusahaan anda sedang mencari kandidat berkualitas untuk posisi managerial ke atas?</h2>
          <div className={classes.HeadhunterFeatures}>
            <div className={classes.HeadhunterScreeningItem}>
              <img alt='Check mark' src={CheckMark} />
              <h3>Pre-Employment Screening</h3>
              <p>Kami melakukan screening cermat untuk memastikan kandidat memiliki kualitas terbaik bagi kebutuhan bisnis anda</p>
            </div>
            <div className={classes.HeadhunterScreeningItem}>
              <img alt='Check mark' src={CheckMark} />
              <h3>Background Checking</h3>
              <p>Kandidat yang profesional untuk mengemban tanggung jawab yang akan anda berikan</p>
            </div>
            <div className={classes.HeadhunterScreeningItem}>
              <img alt='Check mark' src={CheckMark} />
              <h3>Assessment Test</h3>
              <p>
                Kami bekerja sama dengan <strong>PT Inti Dinamis</strong> untuk memberikan <em>Assessment Test</em> demi mendapatkan
                kandidat yang paling sesuai dengan kebutuhan bisnis anda
              </p>
            </div>
          </div>
          <div className={classes.HeadhunterRequest}>
            <Link to='/co/order/es'>
              <span>Request For Candidates</span>
            </Link>
          </div>
        </div>
      </section>
      <section className={classes.PartnersBackground}></section>
      <section className={classes.FinalRegistrationBackground}>FinalRegistration</section>
    </Fragment>

    // <React.Fragment>
    //   <Carousel />
    //   <div className={classes.Content}>
    //     <div className={classes.ContentHolder}>
    //       <h1>CROSSBELL</h1>
    //       <div className={classes.About}>
    //         <p>Sudah saatnya berkarir dalam bidang impianmu!</p>
    //         <p>Temukan pekerjaan favoritmu dan mulailah mengejar mimpi sesuai kata hati!</p>
    //         <p>Jika bukan sekarang, kapan lagi?</p>
    //       </div>

    //       <div className={classes.LinkRef}>
    //         <Link to={`/jobs-dashboard`}>
    //           <div className={classes.Explore}>CARI PEKERJAAN DISINI</div>
    //         </Link>
    //       </div>

    //       <div className={classes.HeadhunterButton}>
    //         <Link to={`/co/order/es`}>
    //           <div className={classes.Order}>JASA HEADHUNTER GENGS</div>
    //         </Link>
    //       </div>
    //     </div>

    //     <div className={classes.AuthForm}>
    //       {!props.auth.isLoggedIn && !props.admin.isLoggedIn && (
    //         <AuthForm
    //           role={role}
    //           sign={sign}
    //           touch={touch}
    //           nav={nav}
    //           toggleSign={toggleSign}
    //           toggleRole={toggleRole}
    //           toggleTouch={toggleTouch}
    //           toggleTouchCompany={toggleTouchCompany}
    //         />
    //       )}
    //     </div>
    //   </div>
    //   <div className={classes.SmallAbout}>
    //     <h1>CROSSBELL</h1>
    //     <div className={classes.About}>
    //       <p>Sudah saatnya berkarir dalam bidang impianmu!</p>
    //       <p>Temukan pekerjaan favoritmu dan mulailah mengejar mimpi sesuai kata hati!</p>
    //       <p>Jika bukan sekarang, kapan lagi?</p>
    //     </div>
    //   </div>

    //   <ContactUsContent />
    // </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    admin: state.admin,
  };
};

export default connect(mapStateToProps)(Home);
