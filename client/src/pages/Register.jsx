import React from 'react'
import { useRef } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Register() {
    const userNameReference = useRef("");
    const passwordReference = useRef("");
    const firstNameReference = useRef("");
    const lastNameReference = useRef("");
    const passwordConfirmationReference = useRef("");

    async function handleFormSubmission(event) {
        event.preventDefault();

        const username = userNameReference.current.value;
        const password = passwordReference.current.value;
        const firstName = firstNameReference.current.value;
        const lastName = lastNameReference.current.value;
        const confirmationPassword = passwordConfirmationReference.current.value;

        const notValidFirstName = !Boolean(firstName) || Boolean((/\d/.test(firstName)));

        if (notValidFirstName) {
            console.log("the firstname is not valid");
            return;
        }

        const notValidLastName = !Boolean(lastName) || Boolean((/\d/.test(lastName)));
        if (notValidLastName) {
            console.log("the lastname is not valid");
            return;
        }

        const notValidUser = !Boolean(username);
        if (notValidUser) {
            console.log("The username does not exist");
            return
        }

        const isInconsistentPassword = password != confirmationPassword;
        if (isInconsistentPassword) {
            console.log("The password is inconsistent");
            return;
        }

        try {
            await axios.post("http://localhost:3000/auth/register", { firstName, lastName, username, password });
        }
        catch (error) {

            console.log("error creating new user");
        }

    }

    return (
        <form className="max-w-sm mx-auto mt-8 bg-white p-8 rounded shadow-md" onSubmit={handleFormSubmission}>
            <h1 className="text-3xl font-bold mb-4">Register</h1>

            <div className="mb-3">
                <label className="text-gray-700" htmlFor="firstName">
                    First Name:
                </label>
                <input
                    type="text"
                    ref={firstNameReference}
                    name="firstname"
                    id="firstName"
                    className="form-input block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <div className="mb-3">
                <label className="text-gray-700" htmlFor="lastName">
                    Last Name:
                </label>
                <input
                    type="text"
                    ref={lastNameReference}
                    name="lastname"
                    id="lastName"
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <div className="mb-3">
                <label className="text-gray-700" htmlFor="username">
                    Username:
                </label>
                <input
                    type="text"
                    ref={userNameReference}
                    name="username"
                    id="username"
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <div className="mb-3">
                <label className="text-gray-700" htmlFor="password">
                    Password:
                </label>
                <input
                    type="password"
                    ref={passwordReference}
                    name="password"
                    id="password"
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <div className="mb-3">
                <label className="text-gray-700" htmlFor="confirmPassword">
                    Confirm Password:
                </label>
                <input
                    type="password"
                    ref={passwordConfirmationReference}
                    name="confirm-password"
                    id="confirmPassword"
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Register
                </button>
                <p className="text-gray-700 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="font-bold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </form>


    )
}