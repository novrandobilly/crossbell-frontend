import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AboutUsAvatar from '../../components/AboutUs/AboutUsAvatar';

import BillyAvt from '../../../assets/avatar/Billy_Square_Avatar.jpg';
import JohnAvt from '../../../assets/avatar/John_Square_Avatar.jpg';
import GabyAvt from '../../../assets/avatar/Gaby_Square_Avatar.jpg';
import styles from './AboutUs.module.scss';

const OUR_TEAM = [
  {
    name: 'John Arif Purba',
    title: 'Chief Operating Officer',
    description: (
      <p>
        Seorang psikolog yang berpengalaman puluhan tahun dalam bidang pengembangan sumber daya manusia. Dalam
        profesinya sebagai seorang konsultan telah banyak membantu perusahaan besar dalam menyusun strategi pengembangan
        SDM serta memfasilitasi proses pembentukan sistem pengelolaan SDM yang terintegrasi dengan Visi Misi dan Values
        Perusahaan.
      </p>
    ),
    imageSrc: JohnAvt,
  },
  {
    name: 'Billy Novrando',
    title: 'Chief Executive Officer',
    description: (
      <p>
        Berawal dari keinginannya untuk mengerti dunia web development, Billy mulai membangun Crossbell dengan semangat
        awal untuk membantu memudahkan mereka yang kehilangan pekerjaannya sejak pandemi Corona 2020 mendapatkan kembali
        kesempatan untuk berkarya.
      </p>
    ),
    imageSrc: BillyAvt,
  },

  {
    name: 'Gaby Anniwati',
    title: 'Chief Financial Officer',
    description: (
      <p>
        Berpengalaman selama lebih dari dua puluh tahun dalam bidang pengelolaan SDM. Sebagai seorang HR Professional ia
        banyak membantu klien dalam program penyediaan SDM dan pengembangan SDM. Recruitment dan assessment merupakan
        salah satu kompetensi yang dia terus kembangkan sehingga kualitas jasa yang diberikan pada klien terus meningkat
        dari waktu ke waktu.
      </p>
    ),
    imageSrc: GabyAvt,
  },
];

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.AboutUsContainer}>
      <section className={styles.AboutCrossbell}>
        <h1>Tentang Crossbell</h1>
        <hr />
        <p>
          Crossbell dicanangkan sejak tahun 2020 dan resmi beroperasi pada Januari 2022. Dengan semangat untuk membantu
          mempertemukan kandidat berkualitas dan perusahaan pencari tenaga kerja, Crossbell hadir menjadi wadah awal
          bagi para kandidat untuk dapat berkarir di perusahaan favorit mereka.
        </p>
        <p>
          Terlebih dari itu, Crossbell juga membantu para perusahaan mendapatkan kandidat-kandidat berkualitas untuk
          mengisi kebutuhan Sumber Daya Manusia dari <em>Entry Level</em> hingga level <em>Board of Director</em>{' '}
        </p>
        <p>
          Crossbell terdiri dari profesional yang telah menggeluti dunia pengembangan sumber daya manusia. Oleh karena
          itu, Crossbell menyediakan wadah awal perekrutan yang nyaman dan aman baik bagi kandidat maupun bagi
          perusahaan pencari tenaga kerja.{' '}
        </p>
      </section>
      <section className={styles.AboutCrossbellTeam}>
        <h1>Crossbell Team</h1>
        <div className={styles.CrossbellTeamMember}>
          {OUR_TEAM.map((teamMember, index) => (
            <AboutUsAvatar
              key={index}
              name={teamMember.name}
              title={teamMember.title}
              description={teamMember.description}
              imageSrc={teamMember.imageSrc}
            />
          ))}
        </div>
      </section>
      <section className={styles.AboutCrossbellContact}>
        <div className={styles.ContactUsText}>
          <h2>KONTAK KAMI</h2>
          <p>
            Kami senang sekali jika kamu mau berdiskusi dengan kami tentang apapun. Jika ada pertanyaan atau hal yang
            ingin anda diskusikan dengan kami baik sebagai kandidat maupun perusahaan, silahkan kirim pesan anda ke{' '}
            <span>crossbellcorps@gmail.com</span> atau melalui kotak <Link to='/'>Kontak Kami</Link> di halaman utama.
          </p>
        </div>
        <div className={styles.ContactUsText}>
          <h2>ADVERTISING & PARTNERSHIP</h2>
          <p>
            Kami sangat terbuka untuk bekerja sama dengan brand dan/atau perusahaan apapun dalam berbagai macam bentuk
            dan metode. Silahkan email ke <span>crossbellcorps@gmail.com</span> untuk mendapatkan media kit kami.
          </p>
        </div>
        <div className={styles.ContactUsText}>
          <h2>LET'S HANG OUT</h2>
          <p>
            Kalian bisa follow kami di{' '}
            <a href='https://www.instagram.com/crossbellcorps/?hl=en' target='_blank' rel='noopener noreferrer'>
              Instagram
            </a>{' '}
            dan{' '}
            <a
              href='https://www.linkedin.com/in/crossbell-indonesia-aaba09218/'
              target='_blank'
              rel='noopener noreferrer'>
              LinkedIn
            </a>{' '}
            untuk mendapatkan informasi terkini tentang Crossbell.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
