import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Navlinks } from "./Header";

const ResponsiveMenu = ({ showMenu, user }) => {
  console.log("showMenu", showMenu);
  console.log("user", user);

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="card">
        <div className="flex items-center justify-start gap-3">
          {user && user.photo ? (
            <img src={user.photo} alt="User Photo" className="w-12 h-12 rounded-full" />
          ) : (
            <FaUserCircle size={50} />
          )}
          <div>
            <h1>{user ? user.name : "Hello User"}</h1>
            <h1 className="text-sm text-slate-500">{user ? user.email : "Premium user"}</h1>
          </div>
        </div>
        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
            {Navlinks.map((data, index) => (
              <li key={index}>
                <a href={data.link} className="mb-5 inline-block">
                  {data.name}
                </a>
              </li>
            ))}
            {user && (
              <li className="mt-4">
                <h2 className="font-semibold text-lg">Kullanıcı Bilgileri</h2>
                <ul className="pl-4">
                  <li>
                    <strong>Adı:</strong> {user.name}
                  </li>
                  <li>
                    <strong>E-posta:</strong> {user.email}
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="footer">
        <h1>
          Made with ❤ by <a href="https://github.com/akberofh">Akberofh</a>{" "}
        </h1>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
