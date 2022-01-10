const jwt = require('jsonwebtoken');
const logger = require('../loggers/logger');


//for Generating a token
const generateToken = (req, res, next) => {
    let token = jwt.sign({ email: req.body.email }, process.env.PRIVATE_KEY);
    res.cookie("jwt", token);
    next();
};

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token == undefined) {
            res.send('token is not defined')
        }

        const verifyUser = jwt.verify(token, process.env.PRIVATE_KEY);
        console.log(verifyUser);
        req.user = verifyUser;
        next();
    } catch (err) {
        logger.error(err);

    }
}

module.exports = { generateToken, authenticate };