import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <div>Home page</div>
            <div className="underline"><Link to="/signup">Signup</Link></div>
            <div className="underline"><Link to="/login">Signin</Link></div>
        </div>
    )
}

export default Home
