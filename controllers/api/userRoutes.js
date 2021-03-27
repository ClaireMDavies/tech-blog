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
      
  
      res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
     
  module.exports = router;

  //login
  router.post('/login', async (req, res) => {

    try {
        const existingUser = await User.findOne({ where: { email_address: req.body.emailAddress } });

        if (!existingUser) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
        }
        else {
            // found a user, now check the password...

            if (bcrypt.compareSync(req.body.password, existingUser.password)) {
                // valid password
                req.session.save(() => {
                    req.session.user_id = existingUser.id;
                    req.session.logged_in = true;

                    res.json(200).end();
                    //{ user: existingUser, message: 'You are now logged in!' });
                });
            }
            else {
                // invalid password
                res.status(400).json({ message: 'Incorrect email or password, please try again' });
            }
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
});


  //logout