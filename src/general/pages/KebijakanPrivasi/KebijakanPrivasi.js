import React from 'react';

import classes from './KebijakanPrivasi.module.css';

const KebijakanPrivasi = () => {
	return (
		<div className={classes.KebijakanPrivasi}>
			<header>
				<h2>Kebijakan Privasi</h2>
			</header>
			<ul className={classes.MainPoints}>
				<li>
					<span>Pengumpulan Informasi</span>
					<p>
						{' '}
						Kami mengumpulkan informasi dari Anda ketika Anda mendaftar pada situs kami, masuk ke akun Anda, melakukan pengisian
						profil, dan/atau ketika Anda keluar. Data yang dikumpulkan mencakup nama Anda, alamat email, nomor telepon. Selain
						itu, kami menerima dan merekam informasi secara otomatis dari komputer dan peramban Anda, termasuk alamat IP Anda,
						perlengakapan perangkat keras dan lunak Anda, dan halaman yang Anda minta.
					</p>
				</li>
				<li>
					<span>Penggunaan Informasi</span>
					<p>Segala informasi yang kami kumpulkan dari Anda dapat digunakan untuk:</p>
					<ul>
						<li>Personalisasi pengalaman dan tanggapan Anda sesuai kebutuhan pribadi Anda</li>
						<li>Menyediakan konten iklan yang disesuaikan</li>
						<li>Meningkatkan situs web kami</li>
						<li>Meningkatkan layanan pelanggan dan mendukung kebutuhan Anda</li>
						<li>Menghubungi Anda lewat email</li>
					</ul>
				</li>
				<li>
					<span>Privasi Akun</span>
					<p>
						Kami adalah pemilik tunggal dari informasi yang dikumpulkan pada situs ini. Informasi pribadi Anda yang dapat
						diidentifikasi tidak akan dijual, dipertukarkan, ditransfer, atau diberikan kepada perusahaan lain dengan alasan apa
						pun juga, tanpa mendapatkan izin Anda.
					</p>
				</li>
				<li>
					<span>Pengungkapan Pihak Ketiga</span>
					<p>
						Kami tidak menjual, memperdagangkan, atau pun memindahkan keluar dari pihak kami informasi pribadi Anda yang dapat
						diidentifikasi. Kami tidak mengikutkan pihak ketiga tepercaya yang membantu kami dalam mengoperasikan situs web kami
						atau menyelenggarakan bisnis kami, selama semua pihak setuju untuk menjaga kerahasiaan informasi ini. Kami meyakini
						akan pentingnya berbagi informasi dalam rangka menyelidiki, mencegah, atau mengambil tindakan menyangkut aktivitas
						ilegal, dugaan penipuan, keadaan yang melibatkan ancaman terhadap keamanan fisik seseorang, pelanggaran atas
						syarat-syarat penggunaan kami, atau hal lain yang diwajibkan oleh hukum. Namun, informasi bukan privat dapat
						diberikan kepada pihak lain untuk pemasaran, pariwara, atau penggunaan lain.
					</p>
				</li>
				<li>
					<span>Proteksi Informasi</span>
					<p>
						Kami menerapkan berbagai langkah keamanan guna menjaga keamanan informasi pribadi Anda. Kami menggunakan enripsi
						teknologi mutakhir untuk memproteksi informasi sensitif yang dikirimkan secara online.
					</p>
				</li>
				<li>
					<span>Berhenti Berlangganan</span>
					<p>
						Kami menggunakan alamat email yang Anda berikan untuk mengirimi Anda informasi dan pembaruan menyangkut kebutuhan
						Anda, berita berkala iklan lowongan (atas persetujuan anda), dll. Bila kapan saja Anda ingin berhenti menerima email
						kami di masa mendatang, kami memasukkan informasi mendetail untuk berhenti berlangganan di bawah tiap-tiap email.
					</p>
				</li>
				<li>
					<span>Persetujuan</span>
					<p>Dengan menggunakan situs kami, Anda setuju dengan kebijakan privasi kami.</p>
				</li>
			</ul>
		</div>
	);
};

export default KebijakanPrivasi;
