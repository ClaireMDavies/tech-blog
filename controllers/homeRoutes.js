const router = require('express').Router();
const { Post, User, Comment } = require('../models');
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
            res.render('login');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//route for showing dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
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

//route for viewing selected post
router.get('/viewpost/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['first_name', 'last_name'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['first_name', 'last_name'],
                        }
                    ]
                }
            ],
        });

        // convert from objects into object literals
        const post = postData.get({ plain: true });

        res.render('viewpost', {
            post,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});


//route for showing selected post to edit
router.get('/editpost/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        // convert from objects into object literals
        const post = postData.get({ plain: true });
        res.render('editpost', {
            post,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//route for showing create new post
router.get('/createpost', async (req, res) => {
    try {
        res.render('createpost', {
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;