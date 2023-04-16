import AuthenticationContext from "../AuthContext";

import { useRef , useContext } from "react";

import axios from 'axios'

export default function Login() {

    const userNameValue = useRef("");
    const passwordValue = useRef("");

    const {user , setUser} = useContext(AuthenticationContext);

   
      async function verifyUser(event){
        event.preventDefault()
        
        const username = userNameValue.current.value;
        const password = passwordValue.current.value;
        
        try {
          const response = await axios.post('http://localhost:3000/auth/login', {username, password});
          
          const {token , user : returnedUser} = response.data;

          localStorage.setItem('token', token);
          setUser(returnedUser);
          
          
          
        } catch (error) {
          console.error(error);
        }
      }
      
  

    return (
        <form className="max-w-sm mx-auto mt-8" onSubmit={verifyUser}>
            <h1 className="text-3xl font-bold mb-4">Login Form</h1>

            <label className="block mb-2">
                <span className="text-gray-700">Username: </span>
                <input ref={userNameValue} type="text" name="username" className="form-input mt-1 block w-full" />
            </label>

            <label className="block mb-2">
                <span className="text-gray-700">Password:</span>
                <input ref={passwordValue} type="password" name="password" className="form-input mt-1 block w-full" />
            </label>

            <div className="flex items-center justify-between mb-4">
                <div className="text-sm">
                    <a href="/register" className="text-blue-500 hover:text-blue-700">Register</a>
                </div>
            </div>

            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4">
                Sign In
            </button>



            <div className="text-red-500 mt-2">
                {/* Error messages go here */}
            </div>
        </form>

    )
}