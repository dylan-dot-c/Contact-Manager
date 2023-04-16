import React from 'react'
import { useState , useRef} from 'react'
import axios from "axios";

export default function Register() {
    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmationPassword: "",

    });

    const userNameReference = useRef("")
    const passwordReference = useRef("")
    const passwordConfirmationReference = useRef("")

    async function usernameTaken(){
        axios.get('http://localhost:3000/auth/username-duplicate')      
    }

    function isValidUsername(){
    
    }

    async function isPasswordStrong(){
    
    }

    function passwordStrengthValidator(){
    
    }

    function isPasswordMatchingConfirmationPassword(){
    
    }
    function handleFormSubmission(event){
        event.preventDefault();

        const username = userNameReference.current.value;
        const password = passwordReference.current.value;
        const confirmationPassword = passwordConfirmationReference.current.value;


        // ensure that no other user has registered with the same username



        // ensure that the password is strong enough else return

        // ensure that password is the same as the confirmation password else return
        if(password != confirmationPassword){
            // 
        }

        if(password)



        // otherwise, make a post request with the data
        


        console.log('submit button was clicked')
    }

    return (
        <form className="max-w-sm mx-auto mt-8" onSubmit={handleFormSubmission}     >
            <h1 className="text-3xl font-bold mb-4">Register</h1>

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