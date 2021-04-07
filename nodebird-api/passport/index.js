const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
	passport.serializeUser((user, done) => {
		console.log('serializeUser');
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		console.log('deserializeUser');	
		User.findOne({
			where: { id },
			include: [{
				model: User,
				attributes: ['id', 'nick'],
				as: 'Followers',
			}, {
				model: User,
				attributes: ['id', 'nick'],
				as: 'Followings',
			}],
		})
		.then(user=> done(null, user))
		.catch(err => done(err));
	});

	local();
	kakao();
};