import { Routes, Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import SignUp from "./Pages/SignUp"
import { Toaster } from "react-hot-toast"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import CompleteProfile from "./Pages/CompleteProfile"
import ProtectedRoute from "./Components/ProtectedRoute"
import Profile from "./Pages/Profile"
import EditProfile from "./Pages/EditProfile"
import CreatePost from "./Pages/CreatePost"
import BottomBar from "./Components/BottomBar"


const App = () => {
  


  return (
    <div>

      <Toaster />

      
      <Routes>
        <Route path="/" element = {<LandingPage/>}/>
        <Route path="/signUp" element = {<SignUp />} />
        <Route path="/login" element = {<Login />} />

        
        <Route path="/home" element = {<ProtectedRoute><Home /></ProtectedRoute> } />
        <Route path="/complete-profile" element = {<ProtectedRoute><CompleteProfile/></ProtectedRoute>}/>
        <Route path="/profile" element = {<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/edit" element = {<ProtectedRoute><EditProfile/></ProtectedRoute>} />
        <Route path="/create-post" element = {<ProtectedRoute><CreatePost/></ProtectedRoute>} />
      </Routes>
      <BottomBar/>
    </div>
  )
}

export default App