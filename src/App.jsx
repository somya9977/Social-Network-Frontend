import { Routes, Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import SignUp from "./Pages/SignUp"
import { Toaster } from "react-hot-toast"
import Login from "./Pages/Login"

const App = () => {
  return (
    <div>

      <Toaster />
      <Routes>
        <Route path="/" element = {<LandingPage/>}/>
        <Route path="/signUp" element = {<SignUp />} />
        <Route path="/login" element = {<Login />} />
      </Routes>
    </div>
  )
}

export default App