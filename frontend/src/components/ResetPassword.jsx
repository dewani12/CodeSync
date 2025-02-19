import { useState } from "react";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="inter flex flex-col items-center h-screen bg-[#0D1117] text-white py-12">
      <div className="py-4 text-2xl">Change password</div>
      <div>
        <form className="bg-[#151B23] w-[280px] py-4 px-3 border border-gray-700 rounded-sm">
          <div className="flex flex-col mb-4">
            <label className="text-[12px]">Password</label>
            <input
              type="password"
              value={password}
              className="mt-2 py-1 px-2 text-[12px] bg-[#0D1117] border border-gray-700 rounded-sm"
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-[12px]">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              className="mt-2 py-1 px-2 text-[12px] bg-[#0D1117] border border-gray-700 rounded-sm"
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="cursor-pointer w-full text-sm bg-[#29903B] py-1 text-white rounded-sm font-semibold">Change password</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
