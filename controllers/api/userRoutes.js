const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

//create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).end();
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//login
router.post('/login', async (req, res) => {

    try {
        const existingUser = await User.findOne({ where: { email: req.body.email } });

        if (!existingUser) {
            res.statusMessage = 'Incorrect email or password, please try again';
            res.status(400).end();
        }
        else {
            // found a user, now check the password...

            if (bcrypt.compareSync(req.body.password, existingUser.password)) {
                // valid password
                req.session.save(() => {
                    req.session.user_id = existingUser.id;
                    req.session.logged_in = true;

                    res.json(200).end();
                });
            }
            else {
                // invalid password
                res.statusMessage = 'Incorrect email or password, please try again';
                res.status(400).end();
            }
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
});

//logout
router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(200).end();

        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;