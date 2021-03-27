const router = require('express').Router();
const { Post, User } = require('../models');
//const withAuth = require('../utils/auth');

//route for showing all posts on homepage
router.get('/', async (req,res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                  model: User,
                  attributes: ["first_name", "last_name"],
                  
                },
                 
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      //logged_in: req.session.logged_in 
    });
    } catch (err) {
    res.status(500).json(err);
  }
});

//route for showing logging in page


//route for showing selected post

   
module.exports = router;