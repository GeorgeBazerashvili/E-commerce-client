import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "https://eccomerce-rest.vercel.app";
  axios.defaults.withCredentials = true;
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
