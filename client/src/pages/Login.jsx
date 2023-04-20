import axios from "axios";

import { useRef, useContext } from "react";

import AuthenticationContext from "../AuthContext";
import { setTokenInAuthHeader } from "../utils/setAuthToken";

export default function Login() {
  const userNameValue = useRef("");
  const passwordValue = useRef("");

  const { setUser } = useContext(AuthenticationContext);

  async function verifyUser(event) {
    event.preventDefault();

    const username = userNameValue.current.value;
    const password = passwordValue.current.value;

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      setTokenInAuthHeader(token);

      setUser(user);
      location.href = "/";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="max-w-sm mx-auto mt-8" onSubmit={verifyUser}>
      <h1 className="text-3xl font-bold mb-4">Login Form</h1>

      <label className="block mb-2">
        <span className="text-gray-700">Username: </span>
        <input
          ref={userNameValue}
          type="text"
          name="username"
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Password:</span>
        <input
          ref={passwordValue}
          type="password"
          name="password"
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm">
          <a href="/register" className="text-blue-500 hover:text-blue-700">
            Register
          </a>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
      >
        Sign In
      </button>
    </form>
  );
}
