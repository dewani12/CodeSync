import { useEffect, useState } from "react";
import { BACKEND_URI } from "../utils/constants.js";
import axios from "axios";  

function Dashboard() {
    const [username, setUsername] = useState("");
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${BACKEND_URI}/users/profile`,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`, 
                    }
                });
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);
    return (
        <div className="bg-gray-800 h-screen">

        </div>
    )
}

export default Dashboard
