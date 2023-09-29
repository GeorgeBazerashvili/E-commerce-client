import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { useEffect, useState } from "react";
import axios from "axios";

function Interface() {
  const navigate = useNavigate();

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      (async function () {
        await axios
          .get("info", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => setGreeting(res.data.message))
          .catch(() => {
            navigate("/");
            localStorage.removeItem("token");
          });
      })();
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <Link
        to="/"
        className="absolute top-4 left-4 border-2 border-black rounded-md text-xl px-4 py-3"
      >
        Main Page
      </Link>
      <div className="w-1/2 max-w-lg border-2 border-black p-1">
        <h1>{greeting}</h1>
        <h2>Here is your profile</h2>
        <p>Enjoyyy!!</p>
      </div>
      <Logout />
    </div>
  );
}

export default Interface;
