const sgMail = require('@sendgrid/mail');
const text = '<p>Please Review the following Request. </p>'
const link = '<a href="https://hotel-callaway.herokuapp.com/admin/requests">Hotel Callaway</a>';


sgMail.setApiKey(process.env.SENDGRID_API_KEY); // setting environment variables it is convetion to use ALL CAPS and seperate by underscores


const sendConfirmationEmailYes = (name, email) => {

    sgMail.send({
        to: email,
        from: 'BrittanyAndConnerWedding@gmail.com',
        subject: `Abraham-Callway Wedding RSVP confirmation Yes`,
        text: `Hi, ${name}! Thank you so much for your RSVP. We look forward to seeing you at our wedding on November 13th, 2020 at 4:00PM.`
    })
    console.log('Approval Email Sent Successfully!')

}

const sendConfirmationEmailNo = (name, email) => {

    sgMail.send({
        to: email,
        from: 'BrittanyAndConnerWedding@gmail.com',
        subject: `Abraham-Callway Wedding RSVP confirmation No`,
        text: `Hi, ${name}! Thank you so much for your RSVP. Sorry you can't make it, you will be missed`
    })
    console.log('rejection Email Sent Successfully!')

}

const sendConfirmationEmailOnline = (name, email) => {

    sgMail.send({
        to: email,
        from: 'BrittanyAndConnerWedding@gmail.com',
        subject: `Abraham-Callway Wedding RSVP confirmation Online Only`,
        text: `Hi, ${name}! Thank you so much for your RSVP. We look forward to seeing you online! `
    })
    console.log('Online Email Sent Successfully!')

}

module.exports = {
    sendConfirmationEmailYes,
    sendConfirmationEmailNo,
    sendConfirmationEmailOnline
}



