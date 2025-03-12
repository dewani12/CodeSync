import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="inter bg-gray-800 flex flex-col items-center justify-center h-screen text-white">
            <div className="text-4xl font-bold text-gray-200">CodeSync</div>
            <div className="flex space-x-4 my-4 font-bold">
                <Link to="/signup"><div className="bg-gray-400 py-2 px-6 rounded-sm hover:bg-gray-500">Signup</div></Link>
                <Link to="/login"><div className="bg-gray-400 py-2 px-6 rounded-sm hover:bg-gray-500">Login</div></Link>
            </div>
        </div>
    )
}

export default Home
