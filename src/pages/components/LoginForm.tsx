import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios
      .post(
        "api/authentication/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then(() => navigate("/"))
      .catch((error) =>
        swal({
          title: error.response.data.message,
          icon: "error",
          // @ts-ignore
          button: "Close",
        })
      );
  };
  return (
    <>
      <Link
        to="/"
        className="absolute top-4 left-4 border-2 border-black rounded-md text-xl px-4 py-3"
      >
        Main Page
      </Link>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col absolute top-1/2 left-1/2 -translate-y-2/3
       -translate-x-1/2 py-6 px-4 rounded-md w-11/12 max-w-sm border-2 border-black font-mono"
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="p-2 border-2 border-black rounded-sm"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="p-2 border-2 border-black rounded-sm"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button
          onSubmit={handleSubmit}
          className="border-black border-2 mt-2 rounded-sm p-2 text-xl"
        >
          Login
        </button>

        <p className="mt-1">
          If you don't have an account{" "}
          <Link to="/register" className="font-bold">
            Register
          </Link>
        </p>
      </form>
    </>
  );
}

export default LoginForm;
