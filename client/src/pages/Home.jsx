import { useContext } from "react"
import AuthenticationContext from "../AuthContext";

export default function Home() {

    const { user} = useContext(AuthenticationContext);

    return (
        <>
            <div className="text-center mt-10">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, {user.firstName} {user.lastName}!
                </h1>
            </div>
        </>
    )
}
