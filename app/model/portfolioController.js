const { result } = require("@hapi/joi/lib/base");
const db = require("../dbConnection/db");
const logger = require("../loggers/logger");
const { portfolioValidation } = require('../validation/portfolioValidation');

exports.multiDeletePortfolio = async (req, res) => {
    try {
        let { error } = portfolioValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const id = req.body.id;
            db.query("DELETE FROM portfolio_register WHERE id IN ('" + id.join("','") + "') ", (err, response) => {
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


exports.addPortfolio = async (req, res) => {
    try {
        const { error } = portfolioValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const images = req.files.map(projectImage => projectImage.filename);
            const categoryName = req.body.categoryName;
            const projectName = req.body.projectName;
            const projectImage = images;
            const projectTitle = req.body.projectTitle;
            const projectDate = req.body.projectDate;
            const projectDescription = req.body.projectDescription;

            db.query(`SELECT id FROM category_register WHERE categoryName='${categoryName}'`, async (err, result) => {
                const category_id = result[0].id;
                const SQL = `INSERT INTO portfolio_register(categoryName,projectName,projectImage,projectTitle,projectDate,projectDescription) VALUES ('${categoryName}','${projectName}','${projectImage}','${projectTitle}','${projectDate}','${projectDescription}')`;
                db.query(SQL, (err, result) => {
                    if (err) {
                        logger.error('Error', err);
                    } else {
                        res.send('data enter.....');
                    }
                })

            })

        }
    }
    catch (err) {
        console.log(err);
    }
}

exports.viewPortfolio = async (req, res) => {
    try {
        id = req.params.id;
        const USE = `SELECT category_register.categoryName,portfolio_register.projectName FROM category_register INNER JOIN portfolio_register ON category_register.categoryName = portfolio_register.categoryName`;
        db.query(USE, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    }
    catch (err) {
        logger.error('err', err);
    }
}

exports.updatePortfolio = async (req, res) => {
    try {
        const { error } = portfolioValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const id = req.params.id;
            const images = req.files.map(projectImage => projectImage.filename);
            const categoryName = req.body.categoryName;
            const projectName = req.body.projectName;
            const projectImage = images;
            const projectTitle = req.body.projectTitle;
            const projectDate = req.body.projectDate;
            const projectDescription = req.body.projectDescription;

            db.query(`SELECT id FROM category_register WHERE categoryName='${categoryName}'`, async (error, result) => {
                const category_id = result[0].id;
                if (result) {
                    db.query(`UPDATE portfolio_register SET categoryName='${categoryName}',projectName='${projectName}',projectImage='${projectImage}',projectTitle='${projectTitle}',projectDate='${projectDate}',projectDescription='${projectDescription}' WHERE id='${id}'`, async (error, response) => {
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

exports.deletePortfolio = async (req, res) => {
    try {
        id = req.params.id;
        const USE = `DELETE FROM portfolio_register WHERE id='${id}'`;

        db.query(USE, (err, result) => {
            if (err) throw err;
            res.send('data deleted....');
        })
    }
    catch (err) {
        logger.error('err', err);
    }
}