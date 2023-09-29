import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "https://ecommerce-rest-7nuu.onrender.com/";

  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/admin" element={<AdminPanel />}></Route>
    </Routes>
  );
}

export default App;
