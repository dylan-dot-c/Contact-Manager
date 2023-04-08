const express = require('express')
const mysql = require('mysql')

// to solve that weird ass error
const cors = require('cors')

// database connection
const db = mysql.createConnection( {
    user: 'root',
    host: 'localhost',
    database: 'contacts',
    password: 'Amber2023',
})

// create the express app
const app = express()
app.use(cors())

db.connect( (err) => {
    console.log("Connected")
})

// middleware to send and receive json
app.use(express.json())

// create route
app.post('/create', (req, res) => {
    // get info from post request
    const {firstname, lastname, phone, image_url, relationship} = req.body;
    console.log(req.body)

    db.query(`insert into contacts (firstname, lastname, phone, image_url, relationship) VALUES ('${firstname}','${lastname}','${phone}','${image_url}','${relationship}')`, (err, result) => {
        if(err) {
            console.error(error)
        }else {
            console.log('New Contact Created')
        }
    })

    res.send('Sending Info')
})

// route for getting all contacts
app.get('/contacts', (req, res) => {
    db.query('select * from contacts', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result)
        }
    })

})



app.get('/', (req, res) => {

    res.send("HEllo World")
})

app.listen(3000, () => {

    console.log("SERVER STARTED")
})