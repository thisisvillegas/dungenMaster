import React from 'react';
import axios from 'axios';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { Link } from 'react-router-dom';
import Child from './child.component';
// import { getData } from './navBuilder';

// const data2 = getData().then(res => console.log(res));
// console.log('typeof data2', typeof data2);

const data = {
	id: '0',
	name: 'Menu',
	component: 'Splash',
	children: [
		{
			id: '10',
			name: 'Game Pieces',
			component: 'Splash',
			children: [
				{
					id: '1',
					name: 'Worlds',
					component: 'worlds',
					children: [],
				},
				{
					id: '2',
					name: 'Campaigns',
					component: 'campaigns',
					children: [],
				},
				{
					id: '3',
					name: 'Locations',
					component: 'Locations',
					children: [],
				},
				{
					id: '4',
					name: 'Encounters',
					component: 'Encounters',
					children: [],
				},
			],
		},
		{
			id: '110',
			name: 'Admin',
			component: 'Splash',
			children: [
				{
					id: '10',
					name: 'Users',
					component: 'users',
					children: [],
				},
				{
					id: '20',
					name: 'Monsters',
					component: 'monsters',
					children: [],
				},
				{
					id: '30',
					name: 'Items',
					component: 'items',
					children: [],
				},
				{
					id: '40',
					name: 'Map',
					component: 'maps',
					children: [],
				},
			],
		},
	],
};
// console.log('typeof data', typeof data);
// console.log(data);

function MinusSquare(props) {
	return (
		<SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
			{/* tslint:disable-next-line: max-line-length */}
			<path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
		</SvgIcon>
	);
}

function PlusSquare(props) {
	return (
		<SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
			{/* tslint:disable-next-line: max-line-length */}
			<path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
		</SvgIcon>
	);
}

function CloseSquare(props) {
	return (
		<SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
			{/* tslint:disable-next-line: max-line-length */}
			<path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
		</SvgIcon>
	);
}

function TransitionComponent(props) {
	const style = useSpring({
		from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
		to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
	});

	return (
		<animated.div style={style}>
			<Collapse {...props} />
		</animated.div>
	);
}

TransitionComponent.propTypes = {
	/**
	 * Show the component; triggers the enter or exit states
	 */
	in: PropTypes.bool,
};

const StyledTreeItem = withStyles(theme => ({
	iconContainer: {
		'& .close': {
			opacity: 0.3,
		},
	},
	group: {
		marginLeft: 7,
		paddingLeft: 18,
		borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
	},
}))(props => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const useStyles = makeStyles({
	root: {
		height: 264,
		flexGrow: 1,
		maxWidth: 400,
	},
});

export default function RecursiveTreeView() {
	const classes = useStyles();

	const renderTree = nodes => (
		<StyledTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} component={nodes.component}>
			{Array.isArray(nodes.children)
				? nodes.children.map(
						node =>
							// <Link to={`/${node.component}`} className="nav-link">
							renderTree(node)
						// </Link>
				  )
				: null}
		</StyledTreeItem>
	);

	return (
		<TreeView
			className={classes.root}
			defaultExpanded={['0', '10', '110']}
			defaultCollapseIcon={<MinusSquare />}
			defaultExpandIcon={<PlusSquare />}
			defaultEndIcon={<CloseSquare />}
		>
			{renderTree(data)}
		</TreeView>
	);
}
