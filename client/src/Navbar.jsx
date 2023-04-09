import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Navbar() {

    const links = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'Login',
            path: '/login'
        },
        {
            name: 'Contacts',
            path: '/contacts'
        }
    ]

    const resLinks = links.map(link => {
        return (
            <li key={uuidv4()} className="inline space-x-4 p-6 text-2xl hover:text-orange-800 hover:underline">
                <Link to={link.path}>{link.name}</Link>
            </li>
        )
    })

    return (
        <nav key={uuidv4()} className="bg-purple-400 p-6 flex align-center justify-between items-center">
            <div><h1 className="text-4xl font-bold">Contact Manager</h1></div>
            <ul>{resLinks}</ul>
        </nav>
    )
}