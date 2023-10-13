import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Source } from "../../App";

function AdminCardEdit() {
  const source = useContext(Source);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    await axios
      .put(
        "/update",
        {
          name,
          description,
          image,
          price,
          //@ts-ignore
          id: source.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

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
            }
          })
          .catch(() => {
            navigate("/");
            localStorage.removeItem("token");
          });
      })();
    }

    (async function getCard() {
      await axios
        .post("/findcard", {
          //@ts-ignore
          ID: source.id,
        })
        .then((res) => {
          //@ts-ignore
          const card = res.data.card;
          //@ts-ignore
          setDescription(card.description);
          //@ts-ignore
          setName(card.name);
          //@ts-ignore
          setPrice(card.price);
          //@ts-ignore
          setImage(card.image);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  return (
    <div className="w-full min-h-screen bg-js flex justify-center items-center">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
        <button className="p-2 w-60 border-2 border-white text-xl font-bold font-mono rounded-md text-white">
          Update Card
        </button>
      </form>
    </div>
  );
}

export default AdminCardEdit;
