import React from 'react'
import { useState , useRef} from 'react'
import axios from "axios";

export default function Register() {
    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmationPassword: "",
    });

    const userNameReference = useRef("");
    const passwordReference = useRef("");
    const firstNameReference = useRef("");
    const lastNameReference = useRef("");
    const passwordConfirmationReference = useRef("");

    async function usernameTaken(){
        axios.get('http://localhost:3000/auth/username-duplicate')      
    }

 
    async function handleFormSubmission(event){
        event.preventDefault();
        
        const username = userNameReference.current.value;
        const password = passwordReference.current.value;
        const firstName = firstNameReference.current.value;
        const lastName = lastNameReference.current.value;
        const confirmationPassword = passwordConfirmationReference.current.value;

        const notValidFirstName = !Boolean(firstName) || Boolean((/\d/.test(firstName)));

        if (notValidFirstName){
            console.log("the firstname is not valid");
            return;
        } 

        const notValidLastName = !Boolean(lastName) || Boolean((/\d/.test(lastName)));
        if (notValidLastName){
            console.log("the lastname is not valid");
            return;
        } 

        const notValidUser = !Boolean(username);
        if(notValidUser){
            console.log("The username does not exist");
            return
        }

        const isInconsistentPassword = password != confirmationPassword;
        if(isInconsistentPassword){
            console.log("The password is inconsistent");
            return;
        }

        try{  
            await axios.post("http://localhost:3000/auth/register" , {firstName,lastName,username,password});
        }
        catch(error){

            console.log("error creating new user");
        }
    
    }

    return (
        <form className="max-w-sm mx-auto mt-8" onSubmit={handleFormSubmission}     >
            <h1 className="text-3xl font-bold mb-4">Register</h1>

            <label className="block mb-2">
                <span className="text-gray-700">First Name:</span>
                <input type="text" ref={firstNameReference} name="firstname" className="form-input mt-1 block w-full" />
            </label>


            <label className="block mb-2">
                <span className="text-gray-700">Last Name:</span>
                <input type="text" ref={lastNameReference} name="lastname" className="form-input mt-1 block w-full" />
            </label>
            <label className="block mb-2">
                <span className="text-gray-700">Username:</span>
                <input type="text" ref={userNameReference} name="username" className="form-input mt-1 block w-full" />
            </label>


            <label className="block mb-2">
                <span className="text-gray-700">Password:</span>
                <input type="password" ref={passwordReference} name="password" className="form-input mt-1 block w-full" />
            </label>

            <label className="block mb-2">
                <span className="text-gray-700">Confirm Password:</span>
                <input type="password" ref={passwordConfirmationReference} name="confirm-password" className="form-input mt-1 block w-full" />
            </label>

            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4" >
                Register
            </button>


        </form>

    )
}