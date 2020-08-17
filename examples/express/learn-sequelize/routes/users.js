const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

var router = express.Router();
/* GET users listing. */


router.route('/')
	.get(async (req, res, next) => {
	try {
		const user = User.findAll();
		res.JSON(res);
	} catch(err) {
		console.error(err);
		next(err);
	}
})
	.post(async(req, res, next) => {
		try {
			const user = await User.create({
				name: req.body.name,
				age: req.body.age,
				married: req.body.married,
			});
			console.log(user);
			res.status(201).json(user);
		} catch(err) {
			console.log(err);
			next(err);
		}
	})
router.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      },
    });
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

module.exports = router;
