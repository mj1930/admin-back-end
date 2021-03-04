const usersSchema = require('../models/users/users');

const emailValidator = require('../validators/email.validators');

const nodemailer = require('nodemailer');

module.exports = {

    sendEmailVerification: async(req, res, next) => {
        try {
            let { email } = await emailValidator.sendEmailVerification().validateAsync(req.body);
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'myprojectindiafirst@gmail.com',
                    pass: 'zxcv1234@'
                }
            });
            let message = {
                from: process.env.senderMail,
                to: email,
                subject: 'Verification email',
                html: `<h1>Please copy the link below to verify your mail.</h1>
                        <p>${process.env.SELLER_URL}email-verification</p>`
            };
            transporter.sendMail(message, (err, info) => {
                if (err) return next(err);
                return res.json({
                    code: 200,
                    data: info,
                    message: "Email verified succesfully !!",
                    error: null
                });
            });
        } catch(err) {
            next(err);
        }
    },

    verifyEmail: async (req, res, next) => {
        try {
            let { email } = await emailValidator.sendEmailVerification().validateAsync(req.body);
            let userData = await usersSchema.findOneAndUpdate({
                email
                },
                {
                    $set: {
                        isEmailVerified: true
                    }
            }, {new: true});
            if (userData && userData.isEmailVerified) {
                return res.json({
                    code: 200,
                    data: {},
                    message: "Email verified succesfully !!",
                    error: null
                });
            } else {
                return res.json({
                    code: 200,
                    data: {},
                    message: "Email not verified !!",
                    error: null
                });
            }
        } catch (err) {
            next(err);
        }
    }
}