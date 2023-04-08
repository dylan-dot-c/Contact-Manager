
import { useState } from "react"



import Axios from 'axios'

export default function Login() {

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        image_url: "",
        relationship: "",
    })

    function handleChange(e) {
        const {name, value} = e.target

        setFormData( () => {
            
            return (
                {
                    ...formData,
                    [name]: value,
                }
            )
        })

        console.log(name, formData[name])
    }

    function handleClick() {
        Axios.post('http://localhost:3000/create', formData)
        .then(() => {
            console.log('Success')
        })
        console.log(formData)
    }

    return (
        <section className="w-1/2 mx-auto">
            <div>
                <label htmlFor="f_name">Firstname</label>
                <input 
                    type="text"
                    id="f_name"
                    name="firstname"
                    onChange={ handleChange }
                    value={formData.firstName}
                  />


<label htmlFor="f_name">Lastname</label>
                <input 
                    type="text"
                    id="l_name"
                    name="lastname"
                    onChange={ handleChange }
                    value={formData.lastName}
                  />

<label htmlFor="f_name">Phone</label>
                <input 
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={ handleChange }
                    value={formData.phone}
                  />

<label htmlFor="f_name">Photo Url</label>
                <input 
                    type="text"
                    id="image_url"
                    name="image_url"
                    onChange={ handleChange }
                    value={formData.image_url}
                  />

<label htmlFor="f_name">Relationship</label>
                <input 
                    type="text"
                    id="relationship"
                    name="relationship"
                    onChange={ handleChange }
                    value={formData.relationship}
                  />

                  




            </div>

            <button
                className="bg-purple-600 py-2 px-4 rounded border-2 border-black text-white font-bold"
                onClick={handleClick}
            >
                Submit
            </button>
        </section>
    )
}