import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel (props){
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps (index){
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`
	};
}

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: '#fafafa',
		marginBottom: 16,
		boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
		borderRadius: '4px',
		overflow: 'hidden'
	},
	Head: {
		backgroundColor: 'white',
		boxShadow: 'none',
		borderBottom: '1px solid rgba(0,0,0,0.1)'
	},
	Tab: {
		fontWeight: '600'
	},
	Text: {
		textAlign: 'left'
	}
}));

export default function FullWidthTabs (){
	const classes = useStyles();
	const theme = useTheme();
	const [ value, setValue ] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = index => {
		setValue(index);
	};

	return (
		<div className={classes.root}>
			<AppBar position='static' color='default' className={classes.Head}>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor='primary'
					textColor='primary'
					variant='fullWidth'
					aria-label='full width tabs example'>
					<Tab label='Reguler' {...a11yProps(0)} className={classes.Tab} />
					<Tab label='Bulk Candidate' {...a11yProps(1)} className={classes.Tab} />
					<Tab label='Executive' {...a11yProps(2)} className={classes.Tab} />
				</Tabs>
			</AppBar>
			<SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
				<TabPanel value={value} index={0} dir={theme.direction} className={classes.Text}>
					<h3>Langkah mudah pemasangan iklan lowongan pekerjaan</h3>
					<ol>
						<li>Pastikan akun perusahaan anda sudah terverifikasi. Proses verifikasi umumnya membutuhkan waktu 1x24 jam</li>
						<li>Tentukan iklan lowongan pekerjaan yang ingin anda pasang</li>
						<li>Beli slot iklan sesuai kebutuhan anda pada menu 'Buat Pesanan' - 'Pesan Slot Iklan'.</li>
						<li>Lakukan pembayaran sesuai pesanan anda yang tertera pada invoice.</li>
						<li>Jumlah slot di bawah foto perusahaan akan bertambah setelah pembayaran terkonfirmasi.</li>
						<li>Buat iklan lowongan pekerjaan anda dengan klik tombol 'Pasang Iklan'</li>
						<li>Isi konten iklan dan tentukan durasi penayangan.</li>
						<li>Daftar pesanan anda dapat dilihat kembali di menu 'List' - 'Pesanan'</li>
					</ol>
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction} className={classes.Text}>
					<h3>Langkah mudah pemesanan berkas kandidat tanpa memasang iklan (Bulk Candidates)</h3>
					<ol>
						<li>Pastikan akun perusahaan anda sudah terverifikasi. Proses verifikasi umumnya membutuhkan waktu 1x24 jam</li>
						<li>Klik 'Buat Pesanan' - 'Pesan Kandidat' untuk mengisi kriteria berkas kandidat yang dicari beserta jumlahnya</li>
						<li>Lakukan pembayaran sesuai keterangan yang tertera pada invoice</li>
						<li>
							Setelah pesanan terkonfirmasi, tim Crossbell akan mulai melakukan pencarian kandidat yang berkasnya akan
							dikirimkan langsung ke email yang telah anda daftarkan pada form
						</li>
						<li>Daftar pesanan anda dapat dilihat kembali di menu 'List' - 'Pesanan'</li>
					</ol>
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction} className={classes.Text}>
					<h3>Langkah mudah pencarian kandidat executive melalu program Executive Search</h3>
					<ol>
						<li>
							Program Crossbell Executive search hadir untuk membantu anda mendapatkan kandidat terbaik untuk posisi krusial
							seperti manager, direktur, dsb.
						</li>
						<li>
							Silahkan tulis kriteria kandidat yang yang anda butuhkan pada form Executive Search dengan klik 'Buat Pesanan' -
							'Pesan Pencarian Eksekutif'
						</li>
						<li>
							Setelah seluruh informasi kriteria kandidat terkirim, tim Crossbell akan segera menghubungi anda untuk
							mengarahkan proses selanjutnya
						</li>
						<li>Daftar pesanan anda dapat dilihat kembali di menu 'List' - 'Pesanan'</li>
					</ol>
				</TabPanel>
			</SwipeableViews>
		</div>
	);
}
