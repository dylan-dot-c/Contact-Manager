
import axios from "axios"
import { useState, useEffect } from "react"

export default function Contact() {

    const [contacts, setContacts] = useState([])

    useEffect( ()=> {
                axios.get('http://localhost:3000/contacts')
        .then( (response)=> {
            console.log(response.data)
            setContacts(response.data)
        })
        .then( (err) => {
            console.log(err)
        })
    }, [contacts])

    const cards = contacts.map( (contact, idx) => {
        return (
            <div key={idx} 
                className=" border-gray-300 drop-shadow-md w-1/5 p-2 border-2 space-y-3" 
            >
                <h1
                    className="font-bold text-2xl text-center"
                >{contact.firstname} {contact.lastname}</h1> <hr />
                <img src={contact.image_url} width="200px" height="200px" alt="" 
                    className="rounded-full"
                />
                <p>{contact.phone}</p>
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