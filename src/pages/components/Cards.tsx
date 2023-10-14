import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Cards() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCards() {
      try {
        const response = await axios.get("/cards", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const cardData = response.data.data;
        setCards(cardData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    getCards();
  }, []);

  return (
    <ul className="mt-28 list-none grid grid-cols-auto gap-2 justify-between py-4">
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="w-64 border-2 border-black rounded-md p-2"
            >
              <Skeleton height={20} style={{ marginBottom: "10px" }} />
              <Skeleton height={20} style={{ marginBottom: "10px" }} />
              <Skeleton height={150} style={{ marginBottom: "10px" }} />
              <Skeleton height={20} style={{ marginBottom: "10px" }} />
            </div>
          ))
        : cards.map((card, index) => (
            <div
              key={index}
              className=" w-72 h-72 mb-4 border-2 border-black rounded-md p-2 bg-gray-100"
            >
              {/* @ts-ignore*/}
              <li className="font-bold">{card.name}</li>
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
          ))}
    </ul>
  );
}

export default Cards;
