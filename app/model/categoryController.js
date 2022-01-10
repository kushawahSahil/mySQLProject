
const { result } = require("@hapi/joi/lib/base");
const db = require("../dbConnection/db");
const logger = require("../loggers/logger");
const {
    categoryValidation
} = require('../validation/categoryValidation');

exports.multiDeleteCategory = async (req, res) => {
    try {
        let { error } = categoryValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const id = req.body.id;
            db.query("DELETE FROM category_register WHERE id IN ('" + id.join("','") + "') ", (err, response) => {
                if (response) {
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


exports.addCategory = async (req, res) => {
    try {
        const { error } = categoryValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const categoryName = req.body.categoryName;
            const USE = `INSERT INTO category_register(categoryName) VALUES ('${categoryName}')`;
            db.query(USE, (err, result) => {
                if (err) {
                    logger.error('error', err);
                } else {
                    res.send('your data enter....')
                }
            })
        }
    }
    catch (err) {
        logger.error("err", err);
    }
}

exports.viewCategory = async (req, res) => {
    try {
        id = req.params.id;
        const USE = `SELECT * FROM category_register WHERE id='${id}'`;
        db.query(USE, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    }
    catch (err) {
        logger.error('err', err);
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { error } = categoryValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const id = req.params.id;
            const categoryName = req.body.categoryName;
            db.query(`SELECT * FROM category_register WHERE id=?`, [id], async (error, result) => {
                if (result) {
                    db.query(`UPDATE category_register SET categoryName='${categoryName}' WHERE id='${id}'`, async (error, response) => {
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

exports.deleteCategory = async (req, res) => {
    try {
        id = req.params.id;
        const USE = `DELETE FROM category_register WHERE id='${id}'`;

        db.query(USE, (err, result) => {
            if (err) throw err;
            res.send('data deleted....');
        })
    }
    catch (err) {
        logger.error('err', err);
    }
}