const router = require('express').Router();
const { Post, User } = require('../models');
//const withAuth = require('../utils/auth');

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

    //     const projects = projectData.map((project) => project.get({ plain: true }));

    // // Pass serialized data and session flag into template
    // res.render('homepage', { 
    //   projects, 
    //   logged_in: req.session.logged_in 
    // });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
   
module.exports = router;