import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Source } from "../../App";

function AdminCardsComp() {
  const source = useContext(Source);

  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  function handleClick(id: any) {
    //@ts-ignore
    source.setId(id);
    navigate("/adminedit");
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

    (async function getCards() {
      await axios
        .get("/cards")
        .then((res) => setCards(res.data.data))
        .catch((err) => console.log(err));
    })();
  }, []);

  return (
    <div className="w-full min-h-screen pt-16 bg-js bg-cover bg-center">
      <ul className="list-none grid grid-cols-auto gap-2 justify-evenly pb-2 px-6 text-white">
        {cards.map((card, index) => {
          return (
            <div
              //@ts-ignore
              onClick={() => handleClick(card._id)}
              key={index}
              className=" w-72 h-72 mb-4 border-2 border-white rounded-md p-2"
            >
              <li className="font-bold">
                {/* @ts-ignore*/}
                {card.name}
              </li>
              <img
                className="w-44 h-44 mx-auto mt-0.5"
                //@ts-ignore
                src={card.image}
                //@ts-ignore
                alt={card.name}
              />
              {/* @ts-ignore*/}
              <li>{card.description}</li>
              <li className="text-right mt-0.5 font-bold">
                {/* @ts-ignore*/}
                {Math.round(card.price)}VC
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default AdminCardsComp;
