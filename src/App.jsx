import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassowrd"
import MyFlipbooks from "./pages/MyFlipbooks"

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
