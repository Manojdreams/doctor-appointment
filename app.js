const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
var cors = require('cors');


const app = express();

let port = 3000;
const url = `mongodb+srv://manoj:Scorpio@21@cluster0.5zxtx.mongodb.net/slots?retryWrites=true&w=majority`;

const params={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url, params)
    .then( () => {
        console.log('Connected')
    })
    .catch( (err) => {
        console.error(err);
    })

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});

const slotRoute = require('./server/slots/routes/slot.routes');
app.use('/slots', slotRoute);

const appointmentRoute = require('./server/doctor_appointments/routes/doctor_appointment.routes');
app.use('/appointment', appointmentRoute);