import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataEntryCard from './create-encounter.component';
import ActorAddCard from './encounter.add.actor.component';
import UserTransferList from './encounter.transferlist.user.component';
import MonsterTransferList from './encounter.transferlist.monster.component';

import Splash from '../splash.component';

const splashMovement = props => {
	console.log('props in splash movement', props);
};

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	backButton: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}));

function getSteps() {
	return ['Create or Edit', 'Create Base Fields', 'Add Player Characters', 'Add Motherfucking Monsters'];
}

function getStepContent(stepIndex) {
	switch (stepIndex) {
		case 0:
			console.log('Returning Data Entry Card');
			return <Splash splashMovement={splashMovement} />;
		case 1:
			console.log('Returning Data Entry Card');
			return <DataEntryCard />;
		case 2:
			console.log('Returning TransferList Users');
			return <UserTransferList />;
		case 3:
			console.log('Returning TransferList Monsters');
			return <MonsterTransferList type={'users'} />;
		default:
			return <Splash />;
	}
}

export default function HorizontalLabelPositionBelowStepper() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};
	// useEffect(
	// 	nextProps => {
	// 		console.log('count changed', props.count);
	// 	},
	// 	[props.count]
	// );

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map(label => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div>
				{activeStep === steps.length ? (
					<div>
						<Typography className={classes.instructions}>All steps completed</Typography>
						<Button onClick={handleReset}>Reset</Button>
					</div>
				) : (
					<div>
						<Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
						<div>
							<Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
								Back
							</Button>
							<Button variant="contained" color="primary" onClick={handleNext}>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
