const axios = require('axios');

let rooter = {
	'/root': {
		path: '/root',
		type: 'folder',
		isRoot: true,
		children: [],
	},
};

async function getData() {
	axios
		.get('http://localhost:5050/worlds/')
		.then(res => {
			console.log('res.length', res.data.length);
			for (let index = 0; index < res.data.length; index++) {
				// console.log('resNode', res.data[index].node);
				Object.assign(rooter, res.data[index].node);
				let key = Object.keys(res.data[index].node);
				rooter['/root'].children.push(key);
				console.log('rooter', rooter);
			}

			return rooter;
		})
		.catch(err => console.log(err));
}
module.exports.getData = getData;
