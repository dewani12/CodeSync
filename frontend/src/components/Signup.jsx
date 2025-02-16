import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import google from "../assets/google.svg";
import earth from "../assets/earth.jpg";
import { useNavigate } from "react-router-dom";
import { BACKEND_URI } from "../utils/constants.js"

function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
    });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URI}/users/register`,formData);
            console.log("User sign up successfully", response.data);
            navigate("/");
        } catch (error) {
            console.log("Error: ", error);
        }
    };
    return (
        <div className="inter flex h-screen">
            <div className="w-1/2">
                <img src={earth} alt="img" className="object-cover w-full h-full" />
            </div>
            <div className="w-1/2 py-3 px-25 max-w-screen-lg mx-auto">
                <div className="text-[10px] flex justify-end">Already have an account?<Link to="/login"><span className="underline ml-2">Sign in &rarr;</span></Link></div>
                <div className="py-6 font-semibold">Sign up to CodeSync</div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col">
                        <label className="text-[12px]">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-[300px] py-1 px-2 text-[12px] mt-1 border border-gray-300 rounded-sm"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label className="text-[12px]">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-[300px] py-1 px-2 text-[12px] mt-1 border border-gray-300 rounded-sm"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label className="text-[12px]">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-[300px] py-1 px-2 text-[12px] mt-1 border border-gray-300 rounded-sm"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="cursor-pointer w-[300px] text-sm bg-black py-2 text-white rounded-sm">Continue &gt;</button>
                </form>
                <div className="py-3 text-[10px] w-[300px] text-center">OR</div>
                <button className="cursor-pointer flex w-[300px] text-sm py-2 px-2 rounded-2xl border border-gray-300">
                    <img className="w-4" src={google} alt="icon" />
                    <span className="text-[12px] ml-2">Sign up with Google</span>
                </button>
            </div>
        </div>
    );
}

export default Signup
