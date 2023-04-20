import { useContext } from "react"
import AuthenticationContext from "../AuthContext";

export default function Home() {

    const { user, setUser } = useContext(AuthenticationContext);
    return (
        <div className="text-center mt-10">
            <h1 className="text-3xl font-bold text-gray-800">
                Welcome, {user.firstName} {user.lastName}!
            </h1>
            <div className="my-4">
                <p className="text-gray-700">ID: {user._id}</p>
                <p className="text-gray-700">Username: {user.username}</p>
                <p className="text-gray-700">Password: {user.password}</p>
            </div>
            <h2 className="text-lg font-medium text-gray-800">Contacts:</h2>
            <ul className="list-disc list-inside my-4">
                {user.contacts.map((contactId) => (
                    <p key={contactId} className="text-gray-700">
                        {contactId}
                    </p>
                ))}
            </ul>
        </div>

    )
}