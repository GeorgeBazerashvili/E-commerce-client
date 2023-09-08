import { useState, useEffect } from "react";
import VanillaLogo from "../../assets/pngs/caa88946192de66f31ae43aea2fc.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Header() {
  const [vanillaCoin, setVanillaCoin] = useState(1000);
  const [amount, setAmount] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setVanillaCoin(1000);
    setAmount(null);
  }, []);

  const changeActiveness = () => {
    if (window.innerWidth <= 1024) {
      setIsActive((prev) => !prev);
    } else {
      setIsActive(false);
    }
  };

  const checkCookies = () => {
    console.log(Cookies.get("token"));
    if (Cookies.get("token")) {
      navigate("/profile");
    } else {
      navigate("/register");
    }
  };

  return (
    <header className="flex items-center gap-6 px-5 font-serif w-full fixed justify-between bg-white z-10 max-xl:px-1">
      <div className="w-40 left-side max-lg:w-32">
        <img
          src={VanillaLogo}
          className="w-full select-none"
          alt="logo of the VanillaTech corporation"
        />
      </div>

      <div className="middle-side flex-1 max-w-4xl flex w-4/12 min-w-fit items-center gap-2 max-lg:justify-end">
        <input
          type="text"
          className={`header-input border-2 p-2 text-xl w-full flex1 top-0 relative rounded-md border-gray-200 ${
            isActive == true ? "active" : ""
          }`}
        />
        <i
          className="fa-solid cursor-pointer fa-magnifying-glass"
          onClick={changeActiveness}
        ></i>
      </div>

      <div className="right-side gap-10 flex max-xl:gap-2">
        <div
          className="gap-2 cursor-pointer items-center flex"
          onClick={checkCookies}
        >
          <i className="fa-solid fa-user"></i>
          <p className="max-xl:hidden">Profile</p>
        </div>

        <div className=" cursor-pointer items-center gap- flex">
          <i className="fa-solid fa-cart-shopping"></i>

          <div className="flex flex-col max-xl:hidden">
            <p className="relative p-1 border-black top-2 left-2">{amount}</p>
            <p className="relative bottom-1 left-1">{vanillaCoin}vc</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
