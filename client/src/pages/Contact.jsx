import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';

import AuthenticationContext from "../AuthContext.js";

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    if (user.username) {
      axios.get(`http://localhost:3000/contacts/fetch/${user._id}`)
        .then((response) => {
            setContacts(() => [...response.data]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  const cards = contacts.length > 0 && contacts.map((contact) => {
    return (
      <div key={uuidv4()} className="rounded-md shadow-md overflow-hidden bg-white w-full md:w-1/3 mx-4 my-4">
        <img alt={`image of ${contact.firstName} ${contact.lastName}`} className="w-full h-48 object-cover" src={contact.imageUrl} onError={(e) => console.log(e)} />
        <div className="p-6">
          <h1 className="font-bold text-xl mb-2">{contact.firstName} {contact.lastName}</h1> 
          <p className="text-gray-700 text-base mb-2">{contact.phone}</p>
          <p className="text-gray-700 text-base mb-2">{contact.relationship}</p>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Remove Contact
          </button>
        </div>
      </div>
    );
  });
  

  return (
    <>
      <h1 className="justify-center">Contacts of {user && user.firstName} {user && user.lastName}</h1>
      <div className="flex justify-center w-4/5 my-8 gap-4 items-center mx-auto flex-wrap">
        {cards}
      </div>
    </>
  );
}
