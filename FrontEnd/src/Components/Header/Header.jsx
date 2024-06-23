import React, { useState, useEffect } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Navlinks = [
  {
    id: 2,
    name: "ADDTODO",
    link: "/addtodo",
  },
  {
    id: 2,
    name: "DASHBOARD",
    link: "/dashboard",
  },
  {
    id: 2,
    name: "LOGIN",
    link: "/login",
  },
  {
    id: 2,
    name: "REGISTER",
    link: "/register",
  },
  {
    id: 1,
    name: "PROFILE",
    link: "/profile",
  },
  {
    id: 1,
    name: "ABOUT",
    link: "/about",
  },
  {
    id: 1,
    name: "CONTACT",
    link: "/contact",
  },
];

const Header = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const home = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
      .then(response => {
        setUser(response.data.allUsers);
      })
      .catch(error => {
        console.error('Kullanıcı bilgileri alınamadı:', error);
      });
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenu]);

  return (
    <div className="relative z-10 shadow-md w-full dark:bg-black dark:text-white duration-300">
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div>
            <span onClick={home} className="text-3xl font-bold font-serif">Car Rental</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <a
                    href={link}
                    className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    {name}
                  </a>
                </li>
              ))}
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl cursor-pointer"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl cursor-pointer"
                />
              )}
            </ul>
          </nav>
          <div className="flex items-center gap-4 md:hidden">
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl cursor-pointer"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl cursor-pointer"
              />
            )}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} user={user} />
    </div>
  );
};

export default Header;
