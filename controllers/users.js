const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login
};

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
    // this response gets process by the client 
    // utils/userService signup function, inside of the .thens
  } catch (err) {
    console.log(err)
    // Probably a duplicate email
    console.log(err)
    res.status(400).json(err);
  }
}

async function login(req, res) {
 
  try {
    // finding the user by there email
    const user = await User.findOne({email: req.body.email});
  console.log(req.body, "REQ.BODY")
   console.log(user, "Does it exist?")
    if (!user) return res.status(401).json({err: 'bad credentials'});
    // check the users password
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        // if the password is good, create our jwt
        // and send it back to the client
        const token = createJWT(user);
        res.json({token});
      } else {
        console.log(err)
      
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    console.log(err,"CHECK HERE");
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
