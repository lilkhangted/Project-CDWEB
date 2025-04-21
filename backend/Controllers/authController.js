const User = require('../Models/User');
const bcrypt = require('bcryptjs');

const authController = {
    registerUser: async (req, res) => {
        try{
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //create new user
            const newUser = await new User({
                username: req.body.username,
                password: hashed,
            });

            const user = await newUser.save();
            res.status(200).json(user);
        }catch(err){
            return res.status(500).json(err);
        }
    }
}
module.exports = authController;