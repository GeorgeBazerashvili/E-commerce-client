import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminForm() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

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

  async function handleSubmit(e: any) {
    e.preventDefault();

    await axios
      .post(
        "/admin/createcard",
        { name, description, image, price },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        navigate("/");
        localStorage.removeItem("token");
        console.error(err.message);
      });
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-2 text-center text-white">
        {greeting} TO ADMINPANEL
      </h1>
      <form className="flex flex-col gap-2 mb-5" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-60 p-2 font-mono text-xl font-bold"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="w-60 p-2 font-mono text-xl font-bold"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          className="w-60 p-2 font-mono text-xl font-bold"
          placeholder="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="text"
          className="w-60 p-2 font-mono text-xl font-bold"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          onSubmit={handleSubmit}
          className="p-2 w-60 border-2 border-white text-xl font-bold font-mono rounded-md text-white"
        >
          AddCard
        </button>
      </form>
    </div>
  );
}

export default AdminForm;
