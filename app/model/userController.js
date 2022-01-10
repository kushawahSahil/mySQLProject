const db = require('../dbConnection/db');
const logger = require('../loggers/logger');
const { otpSend } = require('../service/mail');
const bcrypt = require('bcrypt');
const { registrationValidation, loginValidation, passwordValidation, newPasswordValidation, resetPasswordValidation, updateProfileValidation } = require('../validation/userValidation');
const saltRound = 10;

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
logger.info(otp);

exports.form_register = async (req, res) => {
    try {
        const { error } = registrationValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const encryptedPassword = await bcrypt.hash(req.body.user_password, saltRound);
            const First_name = req.body.First_name;
            const Last_name = req.body.Last_name;
            const gender = req.body.gender;
            const hobby = req.body.hobby;
            const mobile_number = req.body.mobile_number;
            const email = req.body.email;
            const user_password = encryptedPassword;
            const city = req.body.city;
            const image = req.file.filename;
            //sql Query
            const USE = `INSERT INTO form_register(First_name,Last_name,gender,hobby,mobile_number,email,user_password,city,image) VALUES('${First_name}','${Last_name}','${gender}','${hobby}','${mobile_number}','${email}','${user_password}','${city}','${image}')`;
            //run query
            db.query(USE, (err, result) => {
                if (err) {
                    logger.error('Error', err);
                } else {
                    res.send("Data enter....")
                }
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

exports.login = async (req, res) => {
    try {
        const { error } = loginValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const email = req.body.email;

            db.query(`SELECT * FROM form_register WHERE email=?`, [email], async (error, result) => {
                if (result.length > 0) {
                    const comp = await bcrypt.compare(req.body.user_password, result[0].user_password);
                    if (comp) {
                        res.send('login successfully....');
                    } else {
                        res.send('login failed...')
                    }
                } else {
                    res.send('email and password does not match... ')
                }
            });
        }
    }
    catch (err) {
        logger.error('err', err)
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        let { error } = passwordValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const email = req.body.email;
            db.query(`SELECT * FROM form_register WHERE email=?`, [email], async (error, result) => {

                if (result.length > 0) {
                    otpSend(req.body.email, otp);
                    res.send('otp send on email...');
                } else {
                    res.send('please enter valid email....')
                }
            })
        }
    }
    catch (err) {
        logger.error('err', err)
    }
};

exports.verifyOtp = async (req, res, next) => {
    try {
        logger.info(req.body.otp)
        if (otp == req.body.otp) {
            res.send('otp verify');
        } else {
            res.send('enter valid otp...');
        }
    }
    catch (err) {
        logger.error('err', err)
    }
};

exports.updatePassword = async (req, res) => {
    try {
        let { error } = newPasswordValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const email = req.body.email;
            db.query(`SELECT * FROM form_register WHERE email=?`, [email], async (error, response) => {
                if (response) {
                    const encryptedPassword = await bcrypt.hash(req.body.user_password, saltRound);
                    if (encryptedPassword) {
                        db.query(`UPDATE form_register SET user_password=? WHERE email=? `, [encryptedPassword, email]);
                        res.send("your password is updated.....")
                    }
                } else {
                    res.send('email and password are invalid....');
                }
            })
        }
    }
    catch (err) {
        logger.error('err', err)
    }
}


exports.logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.send('logout completed.....')
    }
    catch (err) {
        logger.error("err", err)
    }
};

exports.resetPassword = async (req, res) => {
    try {
        let { error } = resetPasswordValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const email = req.user.email;
            db.query(`SELECT * FROM form_register WHERE email=?`, [email], async (error, result) => {
                if (result.length > 0) {
                    const comp = await bcrypt.compare(req.body.password, result[0].user_password);
                    if (comp) {
                        const updatePassword = await bcrypt.hash(req.body.user_password, saltRound);
                        const updateUser = ({ email }, { user_password: updatePassword });
                        if (updateUser) {
                            db.query(`UPDATE form_register SET user_password=? WHERE email=? `, [updateUser, email]);
                            res.send("your password is updated.....")
                        } else {
                            res.send('Your Password has been reset');
                        }
                    } else {
                        res.send('Old password is incorrect');
                    }
                }
            })
        }
    }
    catch (err) {
        logger.error("err", err)
    }
}

exports.viewProfile = async (req, res) => {
    try {
        id = req.params.id;
        const USE = `SELECT * FROM form_register WHERE id='${id}'`;
        db.query(USE, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    }
    catch (err) {
        logger.error('err', err);
    }
}
exports.updateProfile = async (req, res) => {
    try {
        const { error } = updateProfileValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const id = req.params.id;
            const First_name = req.body.First_name;
            const Last_name = req.body.Last_name;
            const gender = req.body.gender;
            const hobby = req.body.hobby;
            const mobile_number = req.body.mobile_number;
            const email = req.body.email;
            const city = req.body.city;
            const image = req.file.filename;
            db.query(`SELECT * FROM form_register WHERE  id=?`, [id], async (error, result) => {

                if (result) {
                    db.query(`UPDATE form_register SET First_name='${First_name}',Last_name='${Last_name}',gender='${gender}',hobby='${hobby}',mobile_number='${mobile_number}',email='${email}',city='${city}',image='${image}' WHERE id='${id}'`), async (error, response) => {
                        if (error) {
                            res.send('your data is not updated.....');
                        } else {
                            res.send('data is update....')
                        }
                    }
                } else {
                    res.send('please enter valid data......');
                }

            })
        }

    }
    catch (err) {
        logger.error('err', err);
    }
}
