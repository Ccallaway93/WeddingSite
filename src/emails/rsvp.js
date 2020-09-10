const sgMail = require('@sendgrid/mail');
const text = '<p>Please Review the following Request. </p>'
const link = '<a href="https://hotel-callaway.herokuapp.com/admin/requests">Hotel Callaway</a>';


sgMail.setApiKey(process.env.SENDGRID_API_KEY); // setting environment variables it is convetion to use ALL CAPS and seperate by underscores


const sendConfirmationEmailYes = (name, email, transportation) => {

    if(transportation === 'Yes'){
        sgMail.send({
            to: email,
            from: 'BrittanyAndConnerWedding@gmail.com',
            subject: `Abraham-Callaway Wedding RSVP Confirmation: Yes Plus Transportation Wanted`,
            text: 
        `Hi, ${name}! Thank you so much for your RSVP. We look forward to seeing you at our wedding on November 13th, 2020 at 4:00PM.
We will be sending out transportation information emails soon with more details. Let us know if we can be of any more help! 
                
With love,
The Future Mr. and Mrs. Conner Callaway`
        })

    } else {
        sgMail.send({
            to: email,
            from: 'BrittanyAndConnerWedding@gmail.com',
            subject: `Abraham-Callaway Wedding RSVP Confirmation: Yes`,
            text: 
        `Hi, ${name}! Thank you so much for your RSVP. We look forward to seeing you at our wedding on November 13th, 2020 at 4:00PM.
Let us know if we can be of any more help! 
                
With love,
The Future Mr. and Mrs. Conner Callaway`
        })

    }

    console.log('Approval Email Sent Successfully!')
}


const sendConfirmationEmailNo = (name, email) => {

    sgMail.send({
        to: email,
        from: 'BrittanyAndConnerWedding@gmail.com',
        subject: `Abraham-Callaway Wedding RSVP Confirmation: No`,
        text: `Hi, ${name}! Thank you so much for your RSVP. We are sorry to hear you will not be able to make it to our wedding. You will be missed dearly!
Let us know if we can be of any more help! 
                
With love,
The Future Mr. and Mrs. Conner Callaway`
    })
    console.log('rejection Email Sent Successfully!')

}

const sendConfirmationEmailOnline = (name, email) => {

    sgMail.send({
        to: email,
        from: 'BrittanyAndConnerWedding@gmail.com',
        subject: `Abraham-Callaway Wedding RSVP Confirmation: Online Only`,
        text: `Hi, ${name}! Thank you so much for your RSVP. We are sorry to hear you will not be able to make it to our wedding. BUT we are very much looking forward to seeing you online!
We will be sending out more information on how to watch us get married online soon. Let us know if we can be of any more help! 
                
With love,
The Future Mr. and Mrs. Conner Callaway`
    })
    console.log('Online Email Sent Successfully!')

}

module.exports = {
    sendConfirmationEmailYes,
    sendConfirmationEmailNo,
    sendConfirmationEmailOnline
}



