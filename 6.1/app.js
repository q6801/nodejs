const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();	
app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: process.env.COOKIE_SECRET,
	cookie: {
		httpOnly: true,
		secure: false,
	},
	name: 'session-cookie',
}))

app.use((req, res, next) => {
	console.log('모든 요청에 다 실행대ㅔ스');
	console.log(req.body);
	next();
})
app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 대기 중');
});