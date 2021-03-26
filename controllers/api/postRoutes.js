const router = require('express').Router();
const { Post} = require('../../models');
//const withAuth = require('../../utils/auth');


// create new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.body.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});






//update post

//delete post


module.exports = router;