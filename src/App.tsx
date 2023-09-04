import {Routes, Route} from "react-router-dom"
import MainPage from "./pages/MainPage"
import Profile from "./pages/Profile"
import Register from "./pages/Register"

function App() {
  return (
    <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/register" element={<Register />}></Route>
    </Routes>
  )
}

export default App