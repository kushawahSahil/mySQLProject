const db = require("../dbConnection/db");
const logger = require("../loggers/logger");
const {
    contactValidation
} = require('../validation/contactValidation');

exports.multiDeleteContact = async (req, res) => {
    try {
        let { error } = contactValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const id = req.body.id;
            db.query("DELETE FROM contact_register WHERE id IN ('" + id.join("','") + "') ", (err, response1) => {
                if (response1) {
                    res.send("Selected Category Deleted...");
                } else {
                    res.send('Selected Category Not Deleted!.....');
                }
            });

        }

    } catch (err) {
        logger.error("err", err);
        res.send(err);
    }

};

exports.addContact = async (req, res) => {
    try {
        const { error } = contactValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const contactName = req.body.contactName;
            const email = req.body.email;
            const contactNumber = req.body.contactNumber;
            const messages = req.body.messages;
            const date = req.body.date;

            const USE = `INSERT INTO contact_register(contactName,email,contactNumber, messages,date) VALUES ('${contactName}','${email}','${contactNumber}','${messages}','${date}')`;
            db.query(USE, (err, result) => {
                if (err) {
                    logger.error('error', err);
                } else {
                    res.send('data enter.....   ')
                }
            })
        }
    }
    catch (err) {
        logger.error("err", err);
    }
}

exports.viewContact = async (req, res) => {
    try {
        id = req.params.id;
        const USE = `SELECT * FROM contact_register WHERE id='${id}'`;
        db.query(USE, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    }
    catch (err) {
        logger.error('err', err);
    }
}

exports.updateContact = async (req, res) => {
    try {
        const { error } = contactValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const id = req.params.id;
            const contactName = req.body.contactName;
            const email = req.body.email;
            const contactNumber = req.body.contactNumber;
            const messages = req.body.messages;
            const date = req.body.date;
            db.query(`SELECT * FROM contact_register WHERE id=?`, [id], async (error, result) => {
                if (result) {
                    db.query(`UPDATE contact_register SET contactName='${contactName}',email='${email}',contactNumber='${contactNumber}',messages='${messages}',date='${date}' WHERE id='${id}'`, async (error, response) => {
                        if (error) {
                            res.send('your data is not update...');
                        } else {
                            res.send('your data updated....');
                        }
                    })
                } else {
                    res.send('please enter valid data....');
                }
            })
        }
    }
    catch (err) {
        logger.error('err', err);
    }

}
exports.deleteContact = async (req, res) => {
    try {
        id = req.params.id;
        const USE = `DELETE FROM contact_register WHERE id='${id}'`;

        db.query(USE, (err, result) => {
            if (err) throw err;
            res.send('data deleted....');
        })
    }
    catch (err) {
        logger.error('err', err);
    }
}