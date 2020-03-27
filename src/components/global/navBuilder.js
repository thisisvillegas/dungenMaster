const axios = require('axios');

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

let ob1 = {
	name: 'andres',
};

let ob2 = {
	hobby: 'music',
};

ob1.append(ob2);

console.log('ob1', ob1);

// async function getData() {
// 	return data;
// 	// axios
// 	// 	.get('http://localhost:5050/exercises/')
// 	// 	.then(res => {
// 	// 		// console.log('res.data', res.data);
// 	// 		data.children[0].children[0].children = res.data;
// 	// 		console.log(data.children[0].children[0].children);
// 	// 		return data;
// 	// 	})
// 	// 	.catch(err => console.log(err));
// }

// let data1 = getData();

// data.children[0].children[0].children = worldResData.map(currentWorld => {
// 	return currentWorld.description;
// });

// console.log(data.children[0].children[0]);
// main();
module.exports.getData = getData;
