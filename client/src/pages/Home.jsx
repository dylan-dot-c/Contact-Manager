import { useContext } from "react"
import AuthenticationContext from "../AuthContext";

export default function Home() {

    const {user , setUser} = useContext(AuthenticationContext);
    return (
        <div>
            <h1>
                HOMEPAGE
                {JSON.stringify(user)}
            </h1>
        </div>
    )
}