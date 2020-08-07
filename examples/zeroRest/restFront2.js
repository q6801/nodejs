function getUser() {
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		if(xhr.status===200) {
			
			var users = JSON.parse(xhr.responseText);
			console.log(users);
			var list = document.querySelector('#list');
			list.innerHTML = ''; // list는 매번 초기화 반드시 필요

			Object.keys(users).map((key)=>{
				const div = document.createElement('div');
				const span = document.createElement('span');
				const button0 = document.createElement('button');
				const button1 = document.createElement('button');
				span.innerText = users[key];
				button0.innerText = "수정"
				button1.innerText = "삭제";

				button0.addEventListener('click', (e)=>{
					var name = prompt();
					if(!name) {
						alert("이름 입력하셈");
					}
					var xhr = new XMLHttpRequest();
					xhr.onload = function() {
						if(xhr.status===200) {
							console.log(xhr.responseText);
							getUser();
						} else {
							console.error(responseText);
						}
					}
					xhr.open('PUT', '/users/' + key);
					xhr.send(name);
				}) 
				button1.addEventListener('click', (e)=>{
					var xhr = new XMLHttpRequest();
					xhr.onload = function() {
						if(xhr.status === 200) {
							console.log(xhr.responseText);
							getUser();
						} else {
							console.error(xhr.responseText);
						}
					}
					xhr.open('DELETE', '/users/' + key);
					xhr.send();
				})
				div.appendChild(span);
				div.appendChild(button0);
				div.appendChild(button1);
				list.appendChild(div);
			})
		} else {
			console.error(xhr.responseText);
		}
	}
	xhr.open('GET', '/users');
	xhr.send();
}

window.onload = getUser;
document.querySelector('#form').addEventListener('submit', (e)=> {
	e.preventDefault();
	console.log("e.target: ", e.target);
	var name = e.target.username.value;
	console.log(`name : ${name}`);
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		if(xhr.status===201) {
			console.log(xhr.responseText);
			getUser();
		} else {
			console.error(xhr.responseText);
		}
	}
	xhr.open('POST', '/users');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify({"name": name}));
	e.target.username.value = '';
})