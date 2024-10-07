import React, { useEffect, useState, useContext } from "react";
import Image from "../assets/Carousalimages/logo.png";
import { FB, IG, TW, User, open, close } from "../assets/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [subMenu, setSubMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navBtnGrp = [
    {
      title: "Home",
      nav: "/",
    },
    {
      title: "About",
      nav: "/about",
    },
  ];
  const socialBtn = [
    {
      icon: FB,
    },
    {
      icon: IG,
    },
    {
      icon: TW,
    },
  ];
  const [menu, setMenu] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    window.addEventListener("resize", handleResize, false);
    return () => {
      window.removeEventListener("resize", handleResize, false);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setSubMenu(false);
    window.location.reload();
  };

  return (
    <div className="z-50 bg-white shadow-md flex items-center justify-between border-b-2 border-gray-200 py-2 px-4 sticky top-0">
      <div className="md:w-1/3 w-1/2 flex items-center justify-start">
        <Link to="/">
          <img src={Image} className="h-10" alt="Logo" />
        </Link>
        <h1 className="font-bold text-lg">InsightInk</h1>
      </div>
      <div className="md:w-1/3 w-1/2 flex items-center justify-end">
        <div className="sm:flex hidden border-none rounded-full w-fit items-center justify-between gap-4 font-semibold px-4 py-2 md:mx-auto">
          {navBtnGrp.map((btn, index) => (
            <button key={index}>
              <Link to={btn.nav}>{btn.title}</Link>
            </button>
          ))}
          {!isLoggedIn && (
            <button>
              <Link to={"/login"}>Login</Link>
            </button>
          )}
        </div>
        {dimensions.width <= 768 && (
          <button className="sm:hidden block" onClick={() => setMenu(!menu)}>
            {menu ? (
              <img src={close} alt="closeIcon" />
            ) : (
              <img src={open} alt="openIcon" />
            )}
          </button>
        )}
      </div>
      <div className="md:w-1/3 md:flex hidden items-center justify-end">
        <div className="flex items-center justify-between gap-3 px-4 py-2 w-fit">
          {socialBtn.map((icon, index) => (
            <img
              src={icon.icon}
              className="hover:scale-125 transition-all cursor-pointer"
              key={index}
              alt={`Social icon ${index}`}
            />
          ))}
          {isLoggedIn && (
            <div className="relative">
              <img
                src={User}
                className="cursor-pointer"
                onClick={() => setSubMenu(!subMenu)}
                alt="User"
              />
              {subMenu && (
                <div className="absolute top-10 -left-8 w-24 bg-white shadow-lg border border-gray-200 z-50 rounded-lg">
                  <ul>
                    <li className="hover:bg-gray-100 p-2">
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                    <Link to={"/newPost"}>
                      <li className="hover:bg-gray-100 p-2">
                        <button>New Blog</button>
                      </li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {menu && dimensions.width <= 639 && (
        <div className="z-50 bg-white absolute w-full -bottom-40 py-4 px-2 font-semibold text-lg right-0 flex items-start justify-center flex-col gap-3">
          {navBtnGrp.map((btn, index) => (
            <button key={index}>
              <Link to={btn.nav}>{btn.title}</Link>
            </button>
          ))}
          <div className="flex items-center justify-between gap-3 w-fit">
            {socialBtn.map((icon, index) => (
              <img
                src={icon.icon}
                className="hover:scale-125 transition-all cursor-pointer"
                key={index}
                alt={`Social icon ${index}`}
              />
            ))}
            {isLoggedIn && (
              <div className="relative">
                <img
                  src={User}
                  className="cursor-pointer"
                  onClick={() => setSubMenu(!subMenu)}
                  alt="User"
                />
                {subMenu && (
                  <div className="absolute -bottom-8 left-14 w-28 z-50 bg-white shadow-lg border border-gray-200 rounded-lg">
                    <ul>
                      <li className="hover:bg-gray-100 p-2">
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                      <Link to={"/newPost"}>
                        <li className="hover:bg-gray-100 p-2">
                          <button>New Blog</button>
                        </li>
                      </Link>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
