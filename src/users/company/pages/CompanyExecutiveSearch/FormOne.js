import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { VALIDATOR_REQUIRE } from '../../../../shared/utils/validator';

const positionLists = [ 'Manager', 'General Manager/Senior Manager', 'Chief/Executive' ];
const FormOne = props => {
	return (
		<React.Fragment>
			<Typography variant='h6' gutterBottom>
				Deskripsi Kandidat & Pekerjaan
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id='positionLevel'
						name='positionLevel'
						label='Level Kandidat yang Dibutuhkan'
						fullWidth
						select
						style={{ textAlign: 'start' }}
						value={props.formState.inputs.positionLevel.value}
						onChange={event => props.onManualHandler(event, { validator: [ VALIDATOR_REQUIRE() ] })}>
						{positionLists.map(pos => (
							<MenuItem key={pos} value={pos}>
								{pos}
							</MenuItem>
						))}
					</TextField>
				</Grid>

				<Grid item xs={12}>
					<TextField
						required
						id='mainTask'
						name='mainTask'
						label='Tugas Pokok'
						fullWidth
						multiline
						rows={4}
						rowsMax={4}
						style={{ textAlign: 'start' }}
						value={props.formState.inputs.mainTask.value}
						onChange={event => props.onManualHandler(event, { validator: [ VALIDATOR_REQUIRE() ] })}
						variant='outlined'
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						required
						id='responsibility'
						name='responsibility'
						label='Tanggung Jawab'
						fullWidth
						multiline
						rows={4}
						rowsMax={4}
						style={{ textAlign: 'start' }}
						value={props.formState.inputs.responsibility.value}
						onChange={event => props.onManualHandler(event, { validator: [ VALIDATOR_REQUIRE() ] })}
						variant='outlined'
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						required
						id='authority'
						name='authority'
						label='Wewenang'
						fullWidth
						multiline
						rows={4}
						rowsMax={4}
						style={{ textAlign: 'start' }}
						value={props.formState.inputs.authority.value}
						onChange={event => props.onManualHandler(event, { validator: [ VALIDATOR_REQUIRE() ] })}
						variant='outlined'
					/>
				</Grid>

				<Grid item xs={12}>
					<FormControlLabel
						control={<Checkbox color='secondary' name='saveAddress' value='yes' />}
						label='Use this address for payment details'
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default FormOne;
