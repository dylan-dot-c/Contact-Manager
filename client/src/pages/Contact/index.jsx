import axios from "axios"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';

export default function Contact() {

    const [contacts, setContacts] = useState([])

    useEffect( ()=> {
        
        axios.get('http://localhost:3000/contacts')
        .catch( (err) => {
            console.error(err);
        })
        .then( (response)=> {
            setContacts(response.data)
        })

        
    }, [])

    const cards = contacts.map((contact, idx) => {
        return (
            <div key={uuidv4()} 
                className=" border-gray-300 drop-shadow-md w-1/5 p-2 border-2 space-y-3" >
                <h1
                    className="font-bold text-2xl text-center"
                >{contact.firstName} {contact.lastName}</h1> <hr />
                <img src={contact.imageUrl} onError={(e) => console.log(e)} />

                <p>{contact.phone} {contact.imageUrl ? "" : "it doesn't exist"}</p>
                {contact.relationship}
            </div>
        )
    } )

    return (
        <div className="flex justify-center w-4/5 my-8 gap-4 items-center mx-auto flex-wrap">
            {cards}
        </div>
    )
}