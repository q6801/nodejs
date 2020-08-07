const http = require('http');
const fs = require('fs');

const user = {}

http.createServer((req, res) => {
	if (req.method === 'GET') {
		if (req.url === '/') {
			return fs.readFile('./restFront2.html', (err, data)=> {
				if(err) {
					throw err;
				}
				res.end(data);
			})
		} else if (req.url === '/about2') {
			return fs.readFile('./about2.html', (err, data) => {
				if(err) {
					throw err;
				}
				res.end(data);
			})
		} else if (req.url === '/users') {
			return res.end(JSON.stringify(user));
		}
		console.log(`req.url : ${req.url}`); // req.url은 "/restFront2.js"의 형태의 파일로 온다.
		// 반드시 나머지를 받는 곳이 있어야 나머지 파일들을 불러올 수 있다.
		return fs.readFile(`.${req.url}`, (err, data)=>{
			if (err) {
				res.writeHead(404, 'Not Found');
				return res.end('Not Found');
			}
			return res.end(data);
		})
	} else if (req.method === 'POST') {
		if(req.url === '/users') {
			let body = '';
			req.on('data', (data)=> {
				body += data;
			})
			return req.on('end', () => {
				console.log('POST 본문(body):', body);
				const {name} = JSON.parse(body);
				const id = +new Date();
				user[id] = name;
				res.writeHead(201);
				res.end('등록성공');
			})
		}
	} else if (req.method === 'PUT') {
		if(req.url.startsWith('/users/')) {
			const key = req.url.split('/')[2];
			let body = '';
			req.on('data', (data)=> {
				body += data;
			})
			return req.on('end', ()=>{
				console.log('PUT 본문(body):', body);
				user[key] = body;
				res.end('수정 성공');
			})
		}
	} else if (req.method === 'DELETE') {
		if (req.url.startsWith('/users/')) {
			const key = req.url.split('/')[2];
			delete user[key];
			return res.end("삭제성공");
		}
	}
	res.writeHead(404, 'NotFound');
	return res.end('Not Found');
}).listen(8085, () => {
	console.log('8085');
})

