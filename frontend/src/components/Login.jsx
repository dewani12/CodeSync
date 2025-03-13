import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader.jsx";
import axios from "axios";
import { BACKEND_URI } from "../utils/constants.js";

function Signin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customInput: "",
    password: "",
  });
  const isEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(input);
  };
  const userInput = isEmail(formData.customInput)
    ? { email: formData.customInput }
    : { username: formData.customInput };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URI}/users/login`,
        {
          ...userInput,
          password: formData.password,
        },
        { withCredentials: true }
      );
      console.log("User logged in successfully", response.data);
      navigate("/");
    } catch (error) {
      alert(error.message);
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    window.open(`${BACKEND_URI}/oAuth`, "_self");
    navigate("/");
  };
  return (
    <div className="inter flex flex-col items-center h-screen bg-[#0D1117] text-white py-12">
      <div className="py-4 text-2xl">Sign in to CodeSync</div>
      {loading && <Loader />}
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-[#151B23] w-[250px] py-4 px-3 border border-gray-700 rounded-sm"
        >
          <div className="flex flex-col mb-4">
            <label className="text-[12px]">Username or email address</label>
            <input
              type="text"
              value={formData.customInput}
              className="mt-2 py-1 px-2 text-[12px] bg-[#0D1117] border border-gray-700 rounded-sm"
              onChange={(e) =>
                setFormData({ ...formData, customInput: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-[12px] flex justify-between">
              Password{" "}
              <Link to="/forgot">
                <span className="text-[10px] text-[#4493F8] cursor-pointer">
                  Forgot password?
                </span>
              </Link>
            </label>
            <input
              type="password"
              value={formData.password}
              className="mt-2 py-1 px-2 text-[12px] bg-[#0D1117] border border-gray-700 rounded-sm"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <button className="cursor-pointer w-full text-sm bg-[#29903B] py-1 text-white rounded-sm font-semibold">
            Sign in
          </button>
        </form>
      </div>
      <div className="bg-[#151B23] w-[250px] py-3 px-3 border border-gray-700 rounded-sm mt-4 text-center">
        <button
          onClick={handleGoogleLogin}
          className="text-sm text-[#4493F8] cursor-pointer"
        >
          Sign in with Google
        </button>
        <div className="text-[12px] mt-1">
          New to CodeSync?{" "}
          <Link to="/signup">
            <span className="text-[#4493F8]">Create an accont</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
