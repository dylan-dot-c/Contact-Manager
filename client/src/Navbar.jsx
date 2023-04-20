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
      displayOffAccount: true
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
      name: "login",
      path: "/login",
      displayOnAccount: false,
      displayOffAccount: true
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
        <li key={uuidv4()} className="inline space-x-4 p-6 text-2xl hover:text-orange-800 hover:underline">
          <Link to={path}>{name}</Link>
        </li>
      );
    });

  return (
    <nav key={uuidv4()} className="bg-purple-400 p-6 flex align-center justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold">Contact Manager</h1>
      </div>
      <ul>{resLinks}</ul>
    </nav>
  );
}
