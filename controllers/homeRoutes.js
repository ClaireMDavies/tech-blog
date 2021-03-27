const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

//route for showing all posts on homepage
router.get('/', async (req, res) => {
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
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//route for showing logging in page

router.get('/login', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/dashboard');
        }
        else {
            res.render('login',
                {
                    logged_in: req.session.logged_in
                });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});



//route for showing selected post

//route for showing dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                     model: Post, 
                     attributes: ["title", "post_content"], 
                }
            ],
           
            
        });


        const user = userData.get({ plain: true });

        // Pass serialized data and session flag into template
        res.render('dashboard', {
            user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;