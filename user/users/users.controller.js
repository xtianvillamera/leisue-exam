const User = require('../models/user.model');
const { addUserValidation, loginValidation } = require('../validation');

exports.addUser = async (req, res) => {
    // Validation
    const { error } = addUserValidation(req.body);
    if (error) return res.send(error);
    
    const findUser = await User.findOne({ username: req.body.username})
    if(findUser) {
        console.log(findUser.username)
        return res.send('Username already exists!');
    }
    const user = new User({
        fullName: req.body.fullName,
        username: req.body.username,
        password: req.body.password
    })
    try {
        const newUser = await user.save()
        res.json(newUser);
    } catch(err) { res.send(err) }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users);
    }catch(err) { res.send(err) }    
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id)
        res.json(user);
    } catch(err) { res.send(err) }
}

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.user_id);
        res.json(deletedUser);
    } catch(err) { res.send(err) }
}

exports.updateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.user_id, { $set: req.body})
        res.send('Updated user!');
    } catch(err) { res.send(err) }
}


exports.suspendUser = async (req, res) => {
    try {
        const suspendUser = await User.findByIdAndUpdate(req.params.user_id, { $set: {suspendStatus: req.body.suspendStatus}})
        res.send('Suspend status updated!');
    } catch(err) { res.send(err) }
}