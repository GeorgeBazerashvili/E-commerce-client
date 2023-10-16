import axios from "axios";
import { Source } from "../App";
import { useContext, useEffect, useState } from "react";

function BuyItem() {
  const source = useContext(Source);
  const [card, setCard] = useState("");

  useEffect(() => {
    (async function findCard() {
      await axios
        .post("/findcard", {
          //@ts-ignore
          ID: source.id,
        })
        .then((res) => setCard(res.data.card))
        .catch((err) => console.log(err));
    })();
  }, []);

  //@ts-ignore
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-300 flex-col">
      <div className=" w-1/2 h-1/2 mb-4 border-2 border-black rounded-lg p-2 bg-gray-200 list-none">
        {/* @ts-ignore*/}
        <li className="font-bold text-3xl">{card.name}</li>
        <img
          className=" w-7/12 h-96 mx-auto mt-4 "
          //@ts-ignore
          src={card.image}
          //@ts-ignore
          alt={card.name}
        />
        {/* @ts-ignore*/}
        <li className="mt-2 text-2xl">{card.description}</li>
        <li className="text-right mt-0.5 font-bold text-xl">
          {/* @ts-ignore*/}
          {Math.round(card.price)}VC
        </li>
      </div>
      <button className="border-2 border-black rounded-md text-xl font-bold font-mono px-4 py-2 w-64">
        Buy Item
      </button>
    </div>
  );
}

export default BuyItem;
