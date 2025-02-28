import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/Auth/SignUp"
import SignIn from "./pages/Auth/SignIn"
import ForgotPassword from "./pages/Auth/ForgotPassword"
import ResetPassword from "./pages/Auth/ResetPassowrd"
import MyFlipbooks from "./pages/MyFlipbooks/MyFlipbooks"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/sign-in" element={<SignIn/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/my-flipbooks" element={<MyFlipbooks/>} />
    </Routes>
  )
}
