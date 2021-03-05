import React from 'react';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import ContactPhoneRoundedIcon from '@material-ui/icons/ContactPhoneRounded';

import classes from './FeatureContent.module.css';
const styles = {
	largeIcon: {
		fontSize: 'inherit'
	}
};
const Dummy = [
	{
		picture: <SearchRoundedIcon fontSize={styles.largeIcon.fontSize} />,
		title: 'Explore',
		content: 'Kumpulan peluang kerja menarik sudah menunggu-mu.'
	},
	{
		picture: <AssignmentTurnedInRoundedIcon fontSize={styles.largeIcon.fontSize} />,
		title: 'Auto Apply',
		content: 'Aktifkan fitur auto-apply untuk lamar otomatis pekerjaan di bidang yang kamu minati'
	},
	{
		picture: <ContactPhoneRoundedIcon fontSize={styles.largeIcon.fontSize} />,
		title: 'Executive Search Program',
		content: 'Daftarkan dirimu dan jadilah kandidat terpilih untuk mengikuti program headhunter kami'
	}
];

const FeatureContent = props => {
	return (
		<div className={classes.Wraper}>
			<p className={classes.HeaderTitle}>Features</p>
			<div className={classes.Content}>
				{Dummy.map((dat, i) => {
					return (
						<div className={classes.CardContainer} key={i}>
							<div className={classes.CardTop}>{dat.picture}</div>
							<div className={classes.CardBottom}>
								<p className={classes.Title}>{dat.title}</p>
								<p> {dat.content}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default FeatureContent;
