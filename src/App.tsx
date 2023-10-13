import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import axios from "axios";
import ErrorPage from "./pages/ErrorPage";
import AdminCards from "./pages/AdminCards";
import AdminCardEdit from "./pages/components/AdminCardEdit";
import { createContext, useState } from "react";

export const Source = createContext("");

function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  const [id, setId] = useState("");
  return (
    //@ts-ignore
    <Source.Provider value={{ id, setId }}>
      <Routes>
        <Route path="*" element={<ErrorPage />}></Route>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<AdminPanel />}></Route>
        <Route path="/admincards" element={<AdminCards />}></Route>
        <Route path="/adminedit" element={<AdminCardEdit />}></Route>
      </Routes>
    </Source.Provider>
  );
}

export default App;
