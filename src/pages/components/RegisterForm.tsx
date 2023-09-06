import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleClick = async () => {
    const response = await axios.post("/register");
    try {
      console.log(response.data);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <form
      onChange={handleSubmit}
      className="flex flex-col absolute top-1/2 left-1/2 -translate-y-2/3
       -translate-x-1/2 py-6 px-4 rounded-md w-96 border-2 border-black font-mono"
    >
      <label htmlFor="name">Username</label>
      <input
        type="text"
        className="p-2 border-2 border-black rounded-sm"
        id="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        className="p-2 border-2 border-black rounded-sm"
        id="email"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        className="p-2 border-2 border-black rounded-sm"
        id="password"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <button
        onClick={handleClick}
        className="border-black border-2 mt-2 rounded-sm p-2 text-xl"
      >
        Register
      </button>

      <p className="mt-1">
        If you already have an account{" "}
        <Link to="/login" className="font-bold">
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
