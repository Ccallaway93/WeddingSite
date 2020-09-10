//  libraries
const path       = require('path')    // This is a core NODE module that allows for string manipulation on the directory/file paths
const express    = require('express')
const mongoose   = require('mongoose')
const bodyParser = require('body-parser');
const hbs        = require('hbs')



const app = express()
const port = process.env.PORT

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../public/templates/views')
const partialsPath = path.join(__dirname, '../public/templates/partials')


app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
// This means that the assets do not change!
app.use(express.static(publicDirectoryPath))


//  models
const Rsvp = require('./models/rsvp.js');


//  routes
const rsvpRoutes = require('./routes/rsvp.js');




// Connecting Routes in Express
app.use(rsvpRoutes);




app.get('', (req,res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
