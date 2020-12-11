import React, { useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';

import { VALIDATOR_REQUIRE } from '../../../../shared/utils/validator';

const positionLists = [ 'Manager', 'General Manager/Senior Manager', 'Chief/Executive' ];

const marks = [
	{
		value: 0,
		label: 'IDR 0'
	},
	{
		value: 50,
		label: 'IDR 50.000.000'
	},

	{
		value: 100,
		label: 'IDR 100.000.000'
	}
];
const FormOne = props => {
	const [ value, setValue ] = React.useState([ 20, 30 ]);

	const { onSalaryRangeHandler } = props;
	const handleChange = (event, newValue) => {
		setValue(newValue);
		onSalaryRangeHandler(newValue);
	};

	useEffect(
		() => {
			onSalaryRangeHandler(value);
		},
		[ onSalaryRangeHandler, value ]
	);

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
						rows={3}
						rowsMax={3}
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
						rows={3}
						rowsMax={3}
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
						rows={3}
						rowsMax={3}
						style={{ textAlign: 'start' }}
						value={props.formState.inputs.authority.value}
						onChange={event => props.onManualHandler(event, { validator: [ VALIDATOR_REQUIRE() ] })}
						variant='outlined'
					/>
				</Grid>
				<Grid container justify='center' mb={10}>
					<Grid item xs={8}>
						<Typography variant='h6' gutterBottom>
							Range Gaji yang Ditawarkan
						</Typography>
						<Slider
							min={0}
							max={100}
							step={1}
							marks={marks}
							value={value}
							onChange={handleChange}
							valueLabelDisplay='auto'
							aria-labelledby='range-slider'
						/>
					</Grid>
					<Grid container justify='space-evenly' style={{ marginTop: '1rem' }}>
						<Grid item xs={12} sm={4}>
							<Typography style={{ fontWeight: 'bold' }}>{`Minimum: IDR ${value[0]}.000.000`}</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography style={{ fontWeight: 'bold' }}>{`Maximum: IDR ${value[1]}.000.000`}</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default FormOne;
