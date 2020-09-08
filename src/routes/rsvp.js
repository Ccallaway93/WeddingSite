const express = require('express');
const router = express.Router();
const Rsvp = require('../models/rsvp');
const {sendConfirmationEmailYes, sendConfirmationEmailNo, sendConfirmationEmailOnline} = require('../emails/rsvp.js');



router.post('', (req, res) => {
    // Get data from the form and add it to booking DB

    //  front end info stored in backend object
    const newRsvp = new Rsvp({
       fullName: req.body.name,
       email: req.body.email,
       song:req.body.song,
       response:req.body.response,
       guest_1:req.body.guest_1,
       guest_2:req.body.guest_2,
       guest_3:req.body.guest_3,
       guest_4:req.body.guest_4
    });
    console.log(newRsvp);

    // add object to the database
    Rsvp.create(newRsvp, (error, newlyCreated) => {
        if(error){
            console.log(error)
        }
        else{

            if(newRsvp.response === 'Yes')
             {
                // Send email confrimation yes
                sendConfirmationEmailYes(newRsvp.fullName, newRsvp.email);

             }
             else if(newRsvp.response === 'No'){

                // Send email confirmation no
                sendConfirmationEmailNo(newRsvp.fullName, newRsvp.email);

             }
             else{

                // Send email confirmation online
                sendConfirmationEmailOnline(newRsvp.fullName, newRsvp.email);

             }



            // redirect back to index page
            console.log('record added');
            res.redirect('/');
        }
    });
    


});

module.exports = router;