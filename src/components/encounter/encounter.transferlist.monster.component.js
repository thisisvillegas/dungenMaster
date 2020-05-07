import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import { MDBBtn } from 'mdbreact';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto',
	},
	cardHeader: {
		padding: theme.spacing(1, 2),
	},
	list: {
		width: 200,
		height: 230,
		backgroundColor: theme.palette.background.paper,
		overflow: 'auto',
	},
	button: {
		margin: theme.spacing(0.5, 0),
	},
}));

function not(a, b) {
	return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter(value => b.indexOf(value) !== -1);
}

function union(a, b) {
	return [...a, ...not(b, a)];
}

export default function TransferList() {
	const classes = useStyles();
	const [checked, setChecked] = React.useState([]);
	const [left, setLeft] = React.useState([]);
	const [right, setRight] = React.useState([]);
	const [type, setType] = React.useState([]);

	useEffect(() => {
		// console.log('props.type', props.type);
		let list = [];
		axios.get(`${process.env.REACT_APP_LOCAL_DB}/monsters/`).then(res => {
			res.data.forEach(item => {
				list.push(item.name);
			});
			setLeft(list);
		});
		axios.get(`${process.env.REACT_APP_LOCAL_DB}/encounters/`).then(res => {
			res.data.forEach(item => {
				let createdDate = item.createdAt;
				let parsedCreateDate = moment(createdDate);
				let currentDate = moment();
				let difference = moment.duration(parsedCreateDate.diff(currentDate));

				let nugget = { ...item, difference: difference._milliseconds };
				// encounters.push
				window.activeEncounter = nugget;

				// console.log('nugget', nugget);
			});
		});
	}, []);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const numberOfChecked = items => intersection(checked, items).length;

	const handleToggleAll = items => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	const saveOptions = e => {
		// e.preventDefault();
		let data = window.activeEncounter;
		let actors = {
			playerCharacters: data.playerCharacters,
			monsters: right,
			type: 'encounters',
			name: data.name,
			world: data.world,
			campaign: data.campaign,
			location: data.location,
		};
		// console.log('e', e);
		console.log('right', right);
		console.log('actor', actors);
		console.log('window.activeEncounter', window.activeEncounter);

		axios
			.put(`${process.env.REACT_APP_LOCAL_DB}/encounters/update/` + window.activeEncounter._id, actors)
			.then(res => console.log(res.data));

		// window.location = '/encounters';
	};

	const customList = (title, items) => (
		<Card>
			<CardHeader
				className={classes.cardHeader}
				avatar={
					<Checkbox
						onClick={handleToggleAll(items)}
						checked={numberOfChecked(items) === items.length && items.length !== 0}
						indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
						disabled={items.length === 0}
						inputProps={{ 'aria-label': 'all items selected' }}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items.length} selected`}
			/>
			<Divider />
			<List className={classes.list} dense component="div" role="list">
				{items.map(value => {
					const labelId = `transfer-list-all-item-${value}-label`;

					return (
						<ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={value} />
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Card>
	);

	return (
		<div>
			<Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
				<Grid item>{customList('Choices', left)}</Grid>
				<Grid item>
					<Grid container direction="column" alignItems="center">
						<Button
							variant="outlined"
							size="small"
							className={classes.button}
							onClick={handleCheckedRight}
							disabled={leftChecked.length === 0}
							aria-label="move selected right"
						>
							&gt;
						</Button>
						<Button
							variant="outlined"
							size="small"
							className={classes.button}
							onClick={handleCheckedLeft}
							disabled={rightChecked.length === 0}
							aria-label="move selected left"
						>
							&lt;
						</Button>
					</Grid>
				</Grid>
				<Grid item>{customList('Chosen', right)}</Grid>
			</Grid>
			<MDBBtn
				onClick={() => {
					saveOptions(right);
				}}
			>
				Save Monsters
			</MDBBtn>
			{/* <div className="form-group">
				<input type="submit" value="Save Players" className="btn btn-primary" />
			</div> */}
		</div>
	);
}
