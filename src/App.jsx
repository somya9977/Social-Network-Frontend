import { Routes, Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import SignUp from "./Pages/SignUp"
import { Toaster } from "react-hot-toast"
import Login from "./Pages/Login"
import { Home } from "./Pages/Home"

const App = () => {
  return (
    <div>

      <Toaster />
      <Routes>
        <Route path="/" element = {<LandingPage/>}/>
        <Route path="/signUp" element = {<SignUp />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/home" element = {<Home />} />
      </Routes>
    </div>
  )
}

export default App