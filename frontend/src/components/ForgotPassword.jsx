import { useState } from "react";
import Loader from "./Loader.jsx";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      await response.json();
    } catch (error) {
       alert(error.message);
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
    // console.log(response);
  };
  return (
    <div className="inter flex flex-col items-center h-screen bg-[#0D1117] text-white py-12">
      <div className="py-4 text-2xl">Reset your password</div>
      {loading && <Loader />}
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-[#151B23] w-[280px] py-4 px-3 border border-gray-700 rounded-sm"
        >
          <div className="flex flex-col mb-4">
            <label className="text-[12px]">
              Enter your user account&apos;s verified email address and we will
              send you a password reset link.
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email address"
              className="mt-2 py-1 px-2 text-[12px] bg-[#0D1117] border border-gray-700 rounded-sm"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="cursor-pointer w-full text-sm bg-[#29903B] py-1 text-white rounded-sm font-semibold">
            Send password reset link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
