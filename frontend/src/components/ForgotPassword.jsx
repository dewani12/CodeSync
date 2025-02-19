import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email: ", email);
  };
  return (
    <div className="inter flex flex-col items-center h-screen bg-[#0D1117] text-white py-12">
      <div className="py-4 text-2xl">Reset your password</div>
      <div>
        <form onSubmit={handleSubmit} className="bg-[#151B23] w-[280px] py-4 px-3 border border-gray-700 rounded-sm">
          <div className="flex flex-col mb-4">
            <label className="text-[12px]">Enter your user account's verified email address and we will send you a password reset link.</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email address"
              className="mt-2 py-1 px-2 text-[12px] bg-[#0D1117] border border-gray-700 rounded-sm"
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <button className="cursor-pointer w-full text-sm bg-[#29903B] py-1 text-white rounded-sm font-semibold">Send password reset link</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
