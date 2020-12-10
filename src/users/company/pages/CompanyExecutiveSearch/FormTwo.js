import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { VALIDATOR_REQUIRE } from '../../../../shared/utils/validator';

export default function FormTwo (props){
	return (
		<React.Fragment>
			<Typography variant='h6' gutterBottom>
				Pengalaman & Keahlian
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						required
						id='experience'
						name='experience'
						label='Pengalaman yang Dibutuhkan'
						fullWidth
						multiline
						rows={4}
						rowsMax={4}
						style={{ textAlign: 'start' }}
						value={props.formState.inputs.experience.value}
						onChange={event => props.onManualHandler(event, { validator: [ VALIDATOR_REQUIRE() ] })}
						variant='outlined'
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						required
						id='expertise'
						name='expertise'
						label='Keahlian yang Dibutuhkan'
						fullWidth
						multiline
						rows={4}
						rowsMax={4}
						style={{ textAlign: 'start' }}
						value={props.formState.inputs.expertise.value}
						onChange={event => props.onManualHandler(event, { validator: [ VALIDATOR_REQUIRE() ] })}
						variant='outlined'
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
