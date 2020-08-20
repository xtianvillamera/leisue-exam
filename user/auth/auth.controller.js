const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addUserValidation, loginValidation } = require('../validation');


exports.registerUser = async (req, res) => {
    // Validation
    const { error } = addUserValidation(req.body);
    if (error) return res.send(error);
    
    const findUser = await User.findOne({ username: req.body.username})
    if(findUser) return res.send('Username already exists!');
    
    // Encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        fullName: req.body.fullName,
        username: req.body.username,
        password: hashPassword
    })
    try {
        const newUser = await user.save()
        res.json({user: user._id });
    } catch(err) { res.send(err) }
}

exports.login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.send(error);

    const findUser = await User.findOne( { username: req.body.username })
    if (!findUser) return res.send('User not found!')
    
    const correctPass = await bcrypt.compare(req.body.password, findUser.password);
    if(!correctPass) return res.send('Wrong password!')

    // Tokens
    const token = jwt.sign({_id: findUser._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
}
