const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.send('Access denied!')

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) { res.send(err) };
}