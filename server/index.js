import express from 'express';
import mongodb from './database/mongodb.js';
import cors from 'cors';


const {MongoClient} = mongodb;

const app = express();

app.use(cors());
app.use(express.json());


const contactsCollection  = await mongodb.returnContactsCollection();


app.post('/create', (req, res) => {
    const {
        firstname,
        lastname,
        phone,
        imageurl,
        relationship  
    } = req.body;


    contactsCollection.insertOne(req.body, (err, result) => {
        /*
             - Validate the different properties of the contact before adding to the database
        */ 
        
        if (err) {
            res.status(500).send('Error adding contact');
        } else {
            res.status(201).json('New Contact created successfully');
        }
  });
  
})

app.get('/contacts', async (req, res) => {
    res.json({...await contactsCollection.find().toArray()});
    
})

app.get('/', (req, res) => {
    res.send("YOU ARE ON THE HOMEPAGE :)");
})

app.listen(3000, () => {
    console.log("server started on PORT 3000")
})