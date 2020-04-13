import React from 'react';
import { FaFile, FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import last from 'lodash/last';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Worlds from '../../world/worlds.component';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

const getPaddingLeft = (level, type) => {
	let paddingLeft = level * 20;
	if (type === 'file') paddingLeft += 20;
	return paddingLeft;
};

const StyledTreeNode = styled.div`
	a {
		color: white;
		font-size: 17px;
	}
	color: white;
	background-color: black
	font-size: 9px;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 5px 8px;
	padding-left: ${props => getPaddingLeft(props.level, props.type) + 30}px;

	&:hover {
		background: #770d0d;
	}
`;

const NodeIcon = styled.div`
	font-size: 17px;
	margin-right: ${props => (props.marginRight ? props.marginRight : 5)}px;
`;

const getNodeLabel = node => last(node.path.split('/'));
const getCategory = node => node.category;

const TreeNode = props => {
	const { node, getChildNodes, level, onToggle, onNodeSelect } = props;
	return (
		<React.Fragment>
			<StyledTreeNode level={level} type={node.type}>
				<NodeIcon onClick={() => onToggle(node)}>
					{node.type === 'folder' && (node.isOpen ? <FaChevronDown /> : <FaChevronRight />)}
				</NodeIcon>
				<NodeIcon marginRight={10}>
					{node.type === 'file' && <FaFile />}
					{node.type === 'folder' && node.isOpen === true && <FaFolderOpen />}
					{node.type === 'folder' && !node.isOpen && <FaFolder />}
				</NodeIcon>

				<span
					role="button"
					onClick={() => {
						onNodeSelect(node);

						console.log('node', node);
					}}
				>
					{/* <StyledLink> */}
					<Link to={`/${getCategory(node)}`}>{getNodeLabel(node)}</Link>
					{/* </StyledLink> */}
				</span>
			</StyledTreeNode>

			{node.isOpen &&
				getChildNodes(node).map(childNode => <TreeNode {...props} node={childNode} level={level + 1} />)}
		</React.Fragment>
	);
};

TreeNode.propTypes = {
	node: PropTypes.object.isRequired,
	getChildNodes: PropTypes.func.isRequired,
	level: PropTypes.number.isRequired,
	onToggle: PropTypes.func.isRequired,
	onNodeSelect: PropTypes.func.isRequired,
};

TreeNode.defaultProps = {
	level: 0,
};

export default TreeNode;
