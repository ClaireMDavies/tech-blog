//check if user is logged in, if not redirect user to login page 

const withAuth = (req, res, next) => {
    
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  