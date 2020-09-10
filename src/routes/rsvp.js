const express = require('express');
const router = express.Router();
const Rsvp = require('../models/rsvp');
const {sendConfirmationEmailYes, sendConfirmationEmailNo, sendConfirmationEmailOnline} = require('../emails/rsvp.js');
const { count } = require('../models/rsvp');
const _ = require('lodash');

let Total = {
    records: [],
    yes: 0,
    no: 0,
    online:0,
    attending:0
};






router.get('/admin', (req, res) => {
    Rsvp.find({}).then((data) => {
        const yes = _.filter(data, function(o) { return o.response === 'Yes'; });
        const no = _.filter(data, function(o) { return o.response === 'No'; });
        const online = _.filter(data, function(o) { return o.response === 'Online'; });
        var attendingCount = 0

        _.forEach(yes, function(value) {
            attendingCount = attendingCount + value.count;
        });

        Total.records = data;
        Total.yes = yes.length;
        Total.no = no.length;
        Total.online = online.length;
        Total.attending = attendingCount;
        console.log(Total);

        res.render('admin', Total);
    })
})



router.post('', (req, res) => {

    var today = new Date();
    var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    var count = 1;


    //  front end info stored in backend object
    const newRsvp = new Rsvp({
       fullName: req.body.name,
       email: req.body.email,
       song:req.body.song,
       response:req.body.response,
       transportation:req.body.transportation,
       comment: req.body.comment,
       date: dateTime,
       guest_1:req.body.guest_1,
       guest_2:req.body.guest_2,
       guest_3:req.body.guest_3,
       guest_4:req.body.guest_4,
       count: 0
    });

    (newRsvp.guest_1 !== undefined && newRsvp.guest_1 !== '')  ? count++ : count;
    (newRsvp.guest_2 !== undefined && newRsvp.guest_2 !== '')  ? count++ : count;
    (newRsvp.guest_3 !== undefined && newRsvp.guest_3 !== '')  ? count++ : count;
    (newRsvp.guest_4 !== undefined && newRsvp.guest_4 !== '')  ? count++ : count;

    if(newRsvp.response === 'Yes'){
        newRsvp.count = count;
    }
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
                sendConfirmationEmailYes(newRsvp.fullName, newRsvp.email, newRsvp.transportation);

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