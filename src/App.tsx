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
import BuyItem from "./pages/BuyItem";

export const Source = createContext("");

function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  const [id, setId] = useState("");
  const [amount, setAmount] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  return (
    <Source.Provider
      //@ts-ignore
      value={{ id, setId, searchWord, setSearchWord, amount, setAmount }}
    >
      <Routes>
        <Route path="*" element={<ErrorPage />}></Route>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<AdminPanel />}></Route>
        <Route path="/admincards" element={<AdminCards />}></Route>
        <Route path="/adminedit" element={<AdminCardEdit />}></Route>
        <Route path="/buy" element={<BuyItem />}></Route>
      </Routes>
    </Source.Provider>
  );
}

export default App;
