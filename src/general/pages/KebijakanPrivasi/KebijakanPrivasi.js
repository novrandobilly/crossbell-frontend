import React from 'react';

import classes from './KebijakanPrivasi.module.css';

const KebijakanPrivasi = () => {
  return (
    <div className={classes.KebijakanPrivasi}>
      <div className={classes.Container}>
        <header>
          <h2>Kebijakan Privasi</h2>
          <p className={classes.ActiveSince}>
            Berlaku sejak: <span>13 Juni 2021</span>
          </p>
          <p className={classes.PrivacyDescription}>
            Privasi Anda penting bagi kami. Silakan baca Privasi ini Perhatikan
            dengan seksama karena merupakan bagian dari Ketentuan Penggunaan
            yang mengatur penggunaan Layanan Crossbell dan Situs web Crossbell.
          </p>

          <p className={classes.PrivacyDescription}>
            pemberitahuan ini mencakup:
          </p>

          <ul className={classes.SubPoints}>
            <li>pengumpulan informasi</li>
            <li>penggunaan informasi</li>
            <li>privasi akun</li>
            <li>pengungkapan pihak ketiga</li>
            <li>keamanan informasi</li>
            <li>pemberhentian langganan</li>
            <li>persetujuan</li>
          </ul>

          <p className={classes.PrivacyDescription}>
            Setiap perubahan akan diberitahukan kepada Anda melalui alamat email
            yang diberikan oleh Anda pada saat pendaftaran atau melalui
            pengumuman yang sesuai di Situs Crossbell. Jika kami membuat
            perubahan materi, kami akan melakukannya memberi tahu Anda melalui
            email (dikirim ke alamat email yang ditentukan dalam akun) atau
            melalui pemberitahuan di Situs ini sebelum perubahan menjadi
            efektif. Perubahan akan berlaku untuk penggunaan Layanan Crossbell
            dan Situs Web Crossbell setelahnya Crossbell telah memberi Anda
            pemberitahuan. Jika Anda tidak ingin menerima Persyaratan baru Anda
            tidak boleh terus menggunakan Crossbell Layanan dan/atau Situs Web
            Crossbell. Jika Anda terus menggunakan Layanan Crossbell dan/atau
            Situs Web Crossbell setelahnya tanggal mulai berlakunya perubahan,
            penggunaan Anda atas Layanan Crossbell dan/atau Situs Web Crossbell
            menunjukkan persetujuan Anda untuk terikat oleh Persyaratan baru.
            Dalam Privasi ini
          </p>
        </header>
        <ul className={classes.MainPoints}>
          <li>
            <span>Pengumpulan Informasi</span>
            <p>
              {' '}
              Kami mengumpulkan informasi dari Anda ketika Anda mendaftar pada
              situs kami, masuk ke akun Anda, melakukan pengisian profil,
              dan/atau ketika Anda keluar. Data yang dikumpulkan mencakup nama
              Anda, alamat email, nomor telepon. Selain itu, kami menerima dan
              merekam informasi secara otomatis dari komputer dan peramban Anda,
              termasuk alamat IP Anda, perlengakapan perangkat keras dan lunak
              Anda, dan halaman yang Anda minta.
            </p>
          </li>
          <li>
            <span>Penggunaan Informasi</span>
            <p>
              Segala informasi yang kami kumpulkan dari Anda dapat digunakan
              untuk:
            </p>
            <ul>
              <li>
                Personalisasi pengalaman dan tanggapan Anda sesuai kebutuhan
                pribadi Anda
              </li>
              <li>Menyediakan konten iklan yang disesuaikan</li>
              <li>Meningkatkan situs web kami</li>
              <li>
                Meningkatkan layanan pelanggan dan mendukung kebutuhan Anda
              </li>
              <li>Menghubungi Anda lewat email</li>
            </ul>
          </li>
          <li>
            <span>Privasi Akun</span>
            <p>
              Kami adalah pemilik tunggal dari informasi yang dikumpulkan pada
              situs ini. Informasi pribadi Anda yang dapat diidentifikasi tidak
              akan dijual, dipertukarkan, ditransfer, atau diberikan kepada
              perusahaan lain dengan alasan apa pun juga, tanpa mendapatkan izin
              Anda.
            </p>
          </li>
          <li>
            <span>Pengungkapan Pihak Ketiga</span>
            <p>
              Kami tidak menjual, memperdagangkan, atau pun memindahkan keluar
              dari pihak kami informasi pribadi Anda yang dapat diidentifikasi.
              Kami tidak mengikutkan pihak ketiga tepercaya yang membantu kami
              dalam mengoperasikan situs web kami atau menyelenggarakan bisnis
              kami, selama semua pihak setuju untuk menjaga kerahasiaan
              informasi ini. Kami meyakini akan pentingnya berbagi informasi
              dalam rangka menyelidiki, mencegah, atau mengambil tindakan
              menyangkut aktivitas ilegal, dugaan penipuan, keadaan yang
              melibatkan ancaman terhadap keamanan fisik seseorang, pelanggaran
              atas syarat-syarat penggunaan kami, atau hal lain yang diwajibkan
              oleh hukum. Namun, informasi bukan privat dapat diberikan kepada
              pihak lain untuk pemasaran, pariwara, atau penggunaan lain.
            </p>
          </li>
          <li>
            <span>Proteksi Informasi</span>
            <p>
              Kami menerapkan berbagai langkah keamanan guna menjaga keamanan
              informasi pribadi Anda. Kami menggunakan enripsi teknologi
              mutakhir untuk memproteksi informasi sensitif yang dikirimkan
              secara online.
            </p>
          </li>
          <li>
            <span>Berhenti Berlangganan</span>
            <p>
              Kami menggunakan alamat email yang Anda berikan untuk mengirimi
              Anda informasi dan pembaruan menyangkut kebutuhan Anda, berita
              berkala iklan lowongan (atas persetujuan anda), dll. Bila kapan
              saja Anda ingin berhenti menerima email kami di masa mendatang,
              kami memasukkan informasi mendetail untuk berhenti berlangganan di
              bawah tiap-tiap email.
            </p>
          </li>
          <li>
            <span>Persetujuan</span>
            <p>
              Dengan menggunakan situs kami, Anda setuju dengan kebijakan
              privasi kami.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default KebijakanPrivasi;
