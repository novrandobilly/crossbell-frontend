import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import classes from './FAQ.module.css';

const Accordion = withStyles({
	root: {
		textAlign: 'left',
		borderTop: '1px solid rgba(0, 0, 0, .125)',
		boxShadow: 'none',
		'&:not(:last-child)': {
			borderBottom: 0
		},
		'&:before': {
			display: 'none'
		},
		'&$expanded': {
			margin: 'auto'
		}
	},
	expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
	root: {
		backgroundColor: 'white',
		marginBottom: -1,
		minHeight: 56,
		'&$expanded': {
			minHeight: 56
		}
	},
	content: {
		'&$expanded': {
			margin: '12px 0'
		}
	},
	expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
	root: {
		backgroundColor: 'rgb(248,248,248)',
		padding: '12px 0 12px 32px'
	}
}))(MuiAccordionDetails);

const FAQ = props => {
	const [expanded, setExpanded] = useState('');

	const handleChange = panel => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	let content = (
		<div className={classes.Container}>
			<Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
				<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
					<Typography>Apa keuntungan saya sebagai pencari kerja disini?</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Anda akan dipertemukan dengan berbagai perusahaan favorit anda dan sudah terverifikasi untuk memastikan keamanan dan
						kenyamanan proses lamaran kerja anda. Lengkap dengan fitur{' '}
						<strong>
							<em>Automatic Apply</em>
						</strong>{' '}
						dan{' '}
						<strong>
							<em>Automatic Notification</em>
						</strong>{' '}
						untuk melamar secara otomatis atau mendapatkan notifikasi otomatis pada lowongan pekerjaan favorit anda.
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
				<AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
					<Typography>Sebagai perusahaan, bagaimana saya bisa posting iklan pekerjaan?</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Silahkan daftarkan diri anda terlebih dahulu pada form "Daftar Sebagai Perusahaan", kemudian admin akan melakukan
						verifikasi dalam 1x24 jam. Setelah akun terverifikasi, anda dapat memesan slot iklan untuk dipakai pada iklan
						lowongan pekerjaan yang ingin anda post.
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
				<AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
					<Typography>Apa keuntungan saya sebagai perusahaan disini?</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Sebagai perusahaan, anda akan dipertemukan dengan para kandidat tenaga kerja yang berkualitas untuk melamar pada
						iklan lowongan kerja anda. Terlebih lagi, kami dapat membantu anda untuk mendapatkan kandidat sesuai kriteria anda
						bahkan untuk posisi Top Level Management.
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
				<AccordionSummary aria-controls='panel4d-content' id='panel4d-header'>
					<Typography>Saya lupa password akun saya, apa yang harus saya lakukan?</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Pada form Login/Sign Up, di bagian paling bawah terdapat tombol untuk membantu anda melakukan reset ulang password
						anda. Silahkan klik dan ikuti proses selanjutnya.
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
				<AccordionSummary aria-controls='panel5d-content' id='panel5d-header'>
					<Typography>Saya memiliki pertanyaan terkait tagihan/pembayaran.</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Bagi pelamar kerja, anda tidak dipungut biaya apapun, silahkan hubungi Customer Service kami untuk melakukan
						pengaduan.
					</Typography>
					<Typography>
						Bagi perusahaan, silahkan hubungi Customer Service kami untuk menjabarkan informasi lebih mendetail tentang keluhan
						anda.
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
				<AccordionSummary aria-controls='panel6d-content' id='panel6d-header'>
					<Typography>Saya memiliki pertanyaan yang tidak tertera disini.</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Silahkan hubungi Customer Service kami atau kirimkan pertanyaan anda pada form <strong>Contact Us</strong> untuk
						bertanya via email.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</div>
	);

	return content;
};

export default FAQ;
