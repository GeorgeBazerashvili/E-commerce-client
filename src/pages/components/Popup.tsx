import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { Source } from "../../App";

//@ts-ignore
function Popup({ fn }) {
  const source = useContext(Source);
  const [device, setDevice] = useState("");
  const [price, setPrice] = useState(0);

  async function buy() {
    //@ts-ignore
    source.setVanillaCoin((prev) => prev - price);
  }

  useEffect(() => {
    (async function findCard() {
      await axios
        .post("/findcard", {
          //@ts-ignore
          ID: source.id,
        })
        .then((res) => {
          setDevice(res.data.card.name);
          setPrice(Math.round(res.data.card.price));
        })
        .catch((err) => {
          console.log(err.message);
        });

      await axios
        .get("/info", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        //@ts-ignore
        .then((res) => source.setUserId(res.data.response._id))
        .catch((err) => console.log(err));
    })();
  }, []);

  return (
    <div className="w-96 h-44 border-2 border-white rounded-md text-white bg-black text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-4">
      <i
        onClick={() => fn(false)}
        className="absolute right-1 top-0 cursor-pointer font-mono font-bold text-2xl"
      >
        X
      </i>
      <p>
        are you sure you wanna buy {device} for {price} VanillaCoin. Your{" "}
        {/* @ts-ignore */}
        balance is {source.vanillaCoin} and will be {source.vanillaCoin - price}{" "}
        after the purchase.
      </p>
      <button
        className="text-white border-2 border-white font-bold font-mono text-2xl py-0.5 px-2 w-20 absolute right-2 bottom-1 rounded-md"
        onClick={buy}
      >
        buy
      </button>
    </div>
  );
}

export default Popup;

//
//
//   TRY ASKING CHATGPT MAYBE IT WILL FIND OUT WE I CAN'T GET DATA FROM VANILLACOIN
//
//
