document.querySelectorAll('#user-list').forEach((el) => {
	el.addEventListener('click', (e) => {
		console.log('user-table clicked');
		getComment();
	})
})
async function getUser() {
	try {
		const res = await axios.get('/users');
		const users = res.data;
		console.log('/users 접근 성공');
		const body = document.querySelector('#user-list tbody');
		
		users.map(function(user) {
			const row = document.createElement('div');
			row.addEventListener('click', (e) => { // 필요한가?
				getComment();
			})
			let td = document.createElement('td');
			td.innerHTML = user.id;
			row.appendChild(td);
			td = document.createElement('td');
			td.innerHTML = user.age;
			row.appendChild(td);
			td = document.createElement('td');
			td.innerHTML = user.name;
			row.appendChild(td);
			td = document.createElement('td');
			td.innerHTML = user.married;
		})

	} catch(err) {
		console.error(err);
	}
}
async function getComment() {
	try {
		const res = await axios.get(`/users/${id}/comments`);
		const comment = res.data; 

	} catch(err) {
		console.error(err);
	}
}