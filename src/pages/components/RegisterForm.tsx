import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios
      .post("/api/authentication/register", {
        username: name,
        email: email,
        password: password,
      })

      .then(() => navigate("/"))
      .catch((errorMessage) => {
        let errors = [];
        const errorMessages = errorMessage.response.data.error.errors;
        console.log(errorMessages);
        for (const error in errorMessages) {
          errors.push(error);
        }

        if (errorMessages[errors[0]].message) {
          swal({
            title: errorMessages[errors[0]].message,
            icon: "error",
            // @ts-ignore
            button: "Close",
          });
        }
      });
  };

  return (
    <div>
      <Link
        to="/"
        className="absolute top-4 left-4 border-2 border-black rounded-md text-xl px-4 py-3"
      >
        Main Page
      </Link>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col absolute top-1/2 left-1/2 -translate-y-2/3
       -translate-x-1/2 py-6 px-4 rounded-md max-w-sm w-11/12 border-2 border-black font-mono"
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
          Register
        </button>

        <p className="mt-1">
          If you already have an account{" "}
          <Link to="/login" className="font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
