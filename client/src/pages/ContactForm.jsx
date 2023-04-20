import { useRef } from "react";
import axios from "axios";

import { useContext } from "react";
import AuthenticationContext from "../AuthContext.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactForm() {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const phoneRef = useRef();
  const imageRef = useRef();
  const relationshipRef = useRef();

  const { user, setUser } = useContext(AuthenticationContext);

  async function handleClick() {
    try {
      const data = {
        firstName: firstnameRef.current.value.toLowerCase(),
        lastName: lastnameRef.current.value.toLowerCase(),
        phone: phoneRef.current.value,
        relationship: relationshipRef.current.value.toLowerCase(),
        imageUrl: imageRef.current.files[0].name,
      };



  
      console.log(`${data.image}`)
      await axios.post(`http://localhost:3000/contacts/add/${user._id}`, data);
      
      toast.success("Contact successfully added!");
    } catch (error) {
      toast.error("Error adding contact!");
    }
  }
  
  

  return (
    <section className="w-1/2 mx-auto">
      <ToastContainer />
      <div>
        <label htmlFor="f_name">Firstname</label>
        <input type="text" id="f_name" name="firstname" ref={firstnameRef} />

        <label htmlFor="f_name">Lastname</label>
        <input type="text" id="l_name" name="lastname" ref={lastnameRef} />

        <label htmlFor="f_name">Phone</label>
        <input type="text" id="phone" name="phone" ref={phoneRef} />

        <label htmlFor="image_url">Photo Url</label>
        <input type="file" accept="image/*" id="image_url" name="image" ref={imageRef} />

        <label htmlFor="f_name">Relationship</label>
        <input type="text" id="relationship" name="relationship" ref={relationshipRef} />
      </div>

      <button
        className="bg-purple-600 py-2 px-4 rounded border-2 border-black text-white font-bold"
        onClick={handleClick}
      >
        Submit
      </button>
    </section>
  );
}
