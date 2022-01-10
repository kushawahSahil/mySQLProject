const db = require("../dbConnection/db");
const logger = require("../loggers/logger");
const { testimonialValidation } = require('../validation/testimonialValidation');

exports.multiDeleteTestimonial = async (req, res) => {
    try {
        let { error } = testimonialValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const id = req.body.id;
            db.query("DELETE FROM testimonial_register WHERE id IN ('" + id.join("','") + "') ", (err, response1) => {
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


exports.addTestimonial = async (req, res) => {
    try {
        const { error } = testimonialValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {

            const TestimonialName = req.body.TestimonialName;
            const designation = req.body.designation;
            const testimonialDescription = req.body.testimonialDescription;
            const testimonialImage = req.body.testimonialImage;
            //sql Query
            const MAN = `INSERT INTO testimonial_register(TestimonialName,designation,testimonialDescription,testimonialImage) VALUES('${TestimonialName}','${designation}','${testimonialDescription}','${testimonialImage}')`;

            //run query
            db.query(MAN, (err, result) => {
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

exports.viewTestimonial = async (req, res) => {
    try {
        id = req.params.id;
        const USE = `SELECT * FROM testimonial_register WHERE id='${id}'`;
        db.query(USE, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    }
    catch (err) {
        logger.error('err', err);
    }
}

exports.updateTestimonial = async (req, res) => {
    try {
        const { error } = testimonialValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const id = req.params.id;
            const TestimonialName = req.body.TestimonialName;
            const designation = req.body.designation;
            const testimonialDescription = req.body.testimonialDescription;
            const testimonialImage = req.body.testimonialImage;
            db.query(`SELECT * FROM testimonial_register WHERE id=?`, [id], async (error, result) => {
                if (result) {
                    db.query(`UPDATE testimonial_register SET TestimonialName='${TestimonialName}',designation='${designation}',testimonialDescription='${testimonialDescription}',testimonialImage='${testimonialImage}' WHERE id='${id}'`, async (error, response) => {
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

exports.deleteTestimonial = async (req, res) => {
    try {
        id = req.params.id;
        const USE = `DELETE FROM testimonial_register WHERE id='${id}'`;

        db.query(USE, (err, result) => {
            if (err) throw err;
            res.send('data deleted....');
        })
    }
    catch (err) {
        logger.error('err', err);
    }
}