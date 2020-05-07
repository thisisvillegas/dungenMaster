import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup(props) {
	const [value, setValue] = React.useState('');

	const handleChange = event => {
		console.log('handleChange');
		setValue(event.target.value);
		props.splashMovement(value);
	};

	return (
		<FormControl component="fieldset">
			{console.log('props', props)}
			<FormLabel component="legend">Splash Yeah</FormLabel>
			<RadioGroup aria-label="action" name="action1" value={value} onChange={handleChange}>
				<FormControlLabel value="Create" control={<Radio />} label="Create" />
				<FormControlLabel value="Edit" control={<Radio />} label="Edit" />
			</RadioGroup>
		</FormControl>
	);
}
