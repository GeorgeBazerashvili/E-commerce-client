import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminPanel() {
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
          .then((res) => {
            if (res.data.response.role !== "ADMIN") {
              navigate("/");
            } else {
              setGreeting(res.data.message);
            }
          })
          .catch(() => {
            navigate("/");
            localStorage.removeItem("token");
          });
      })();
    }
  }, []);

  useEffect(() => {
    console.log(greeting);
  }, [greeting]);

  return (
    <div className="bg-js w-full h-screen bg-center bg-cover text-white">
      <h1 className="text-center font-bold">{greeting} to ADMIN PANEL</h1>
    </div>
  );
}

export default AdminPanel;
