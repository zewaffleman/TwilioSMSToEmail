const sgMail = require('@sendgrid/mail');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = (req, res) => {
    
    //Specify the API key for Sendgrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    //Set from address as <number>@EMAIL_DOMAIN
    const fromAddress = req.body.From.replace("+", "") + `@${process.env.EMAIL_DOMAIN}`;

    //Create Email
    const email = {
        to: process.env.TO_EMAIL_ADDRESS,
        from: fromAddress,
        subject: `New SMS message from: ${req.body.From}`,
        text: req.body.body
    };

    //Send the email
    sgMail.send(email)
        .then(response => {
            res.status(200).send(response); //Make sure we return correctly
        })
}