import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Signup, Login, ForgotPassword, ResetPassword } from "./components/index.js";
import Dashboard from "./pages/Dashboard";
import Create from "./components/Create.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset_password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new" element={<Create/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
