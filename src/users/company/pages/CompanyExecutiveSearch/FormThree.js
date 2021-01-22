import React from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '../../../../shared/UI_Element/Input';

import { VALIDATOR_ALWAYSTRUE } from '../../../../shared/utils/validator';

import Grid from '@material-ui/core/Grid';

export default function FormThree (props){
	return (
		<React.Fragment>
			<Typography variant='h6' gutterBottom>
				Spesifikasi Khusus (Optional)
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Input
						inputType='textarea'
						isValid={props.formState.inputs.specification.isValid}
						required
						id='specification'
						name='specification'
						label='Spesifikasi/Kriteria Khusus (Optional)'
						fullWidth
						multiline
						rows={6}
						rowsMax={6}
						style={{ textAlign: 'start' }}
						value={props.formState.inputs.specification.value}
						onChange={event => props.onManualHandler(event, { validator: [ VALIDATOR_ALWAYSTRUE() ] })}
						variant='outlined'
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
