//** Password for JWT */
const jwtSecret = 'jesper';
const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport');

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username,
        expiresIn: '7d',
        algorithm: 'HS256'
    });
};

//** Routing to the login page where it will post user information */
module.exports = (router) => {
    console.log('hejsan')
    router.post('/login', (req,res) => { passport.authenticate( 'local',
     {session: false},
  (error, user, info) => {
      res.header('Access-Control-Allow-Origin', '*');
    if (error || !user) {
        return res.status(400).json({
            message: 'Something is not right',
            user:user
        });
  }
  req.login(user,{ session: false}, (error) => {
      if (error) {
        res.send(error);
      }
     let token = generateJWTToken(user.toJSON());
     console.log('1',token)
     return res.json({ user,token });
    });
})(req, res);
});
}