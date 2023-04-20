import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import AuthenticationContext from "./AuthContext";
import { useContext } from "react";

export default function Navbar() {
  const { user } = useContext(AuthenticationContext);

  const pages = [
    {
      name: "home",
      path: "/home",
      displayOnAccount: true,
      displayOffAccount: false
    },
    {
      name: "contacts",
      path: "/contacts",
      displayOnAccount: true,
      displayOffAccount: false
    },
    {
      name: "contactForm",
      path: "/contact-form",
      displayOnAccount: true,
      displayOffAccount: false
    },

    {
      name: "logout",
      path: "/logout",
      displayOnAccount: true,
      displayOffAccount: false
    }
  ];

  const resLinks = pages
    .filter((page) => {
      const { displayOnAccount, displayOffAccount } = page;
      const isAuthenticated = Object.keys(user).length !== 0;
      return isAuthenticated ? displayOnAccount : displayOffAccount;
    })
    .map((page) => {
      const { name, path } = page;
      return (
        <li key={uuidv4()} className="inline px-4 py-2 text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded">
          <Link to={path}>{name}</Link>
        </li>
      );
    });

  return (
    <nav className="bg-purple-400 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">Contact Manager</h1>
      </div>
      <ul className="flex space-x-4 text-white">{resLinks}</ul>
    </nav>
  );
}