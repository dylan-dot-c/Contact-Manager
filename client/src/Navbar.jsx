import { Link } from "react-router-dom";

export default function Navbar() {

    const links = [ 
        { 
            name: 'Home',
            path: '/',
        },
        {
            name: 'Contact',
            path: '/Contact'
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

    const resLinks = links.map( link => {
        return (
            <li className="inline space-x-4 p-6 text-2xl hover:text-orange-800 hover:underline">
                <Link to={link.path}>{link.name}</Link>
            </li>
        )
    })

    return (
        <nav className="bg-purple-400 p-6 flex align-center justify-between items-center">
            <div><h1 className="text-4xl font-bold">Contact Manager</h1></div>

            <ul>
                {resLinks}
            </ul>
        </nav>
    )
}