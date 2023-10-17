import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { Source } from "../../App";

function Cards() {
  const source = useContext(Source);
  const navigate = useNavigate();

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

  useEffect(() => {
    //@ts-ignore
    console.log(source.amount);
    //@ts-ignore
  }, [source.amount]);

  useEffect(() => {
    (async function filterCards() {
      await axios
        .get("/cards")
        .then((res) => {
          setCards(res.data.data);
        })
        .catch((err) => console.log(err));

      setCards((prev) => {
        return prev.filter((card) => {
          return (
            //@ts-ignore
            card.name
              .toLowerCase()
              //@ts-ignore
              .includes(source.searchWord.toLowerCase())
          );
        });
      });
    })();
    //@ts-ignore
  }, [source.searchWord]);

  useEffect(() => {
    //@ts-ignore
  }, [cards]);

  return (
    <ul className="mt-24 list-none grid grid-cols-auto gap-2 pt-4 place-content-center">
      {isLoading
        ? Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              className="w-64 border-2 border-black rounded-md p-2"
            >
              <Skeleton height={20} className="bg-orange-50 mt-3" />
              <Skeleton height={20} className="bg-orange-50 mt-3" />
              <Skeleton height={150} className="bg-orange-50 mt-3" />
              <Skeleton height={20} className="bg-orange-50 mt-3" />
            </div>
          ))
        : cards.map((card, index) => (
            <div
              //@ts-ignore
              onClick={() => {
                //@ts-ignore
                source.setId(card._id);
                navigate("/buy");
              }}
              key={index}
              className=" w-72 h-72 mb-4 border-2 border-black rounded-md p-2 bg-gray-100 cursor-pointer"
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
