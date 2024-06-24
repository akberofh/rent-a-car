import React, { Component, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from '../../Components/Header/Header'
import Hero from "../../Components/Hero/Hero";
import Sectiontwo from "../../Components/Sectiontwo/Sectiontwo";
import Sectionthree from '../../Components/Sectionthree/Sectionthree'
import Sectionfre from "../../Components/Sectionfre/Sectionfre";
import Secitonclientsay from "../../Components/Sectionclientsay/Sectionclientsay";
import Sectionlogo from "../../Components/Sectionlogo/Sectionlogo";
import Sectioninstall from "../../Components/Sectioninstall/Sectioninstall";
import Sectionquesition from "../../Components/Sectionquesition/Sectionquesition";
import Footer from "../../Components/Footer/Footer";
import ProductCard from "../../Components/CarProductCard/ProductCard";
import BasketProduct from "../BasketCar/BasketProduct";
import { useSelector } from "react-redux";
import CarProduct from "../../Components/CarProductCard/CarProduct";



const Home = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const {userInfo} = useSelector((state) => state.auth)



  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      <Header theme={theme} setTheme={setTheme} />
      <Hero theme={theme} />
      <CarProduct/>
      {/* <BasketProduct/> */}
       <Sectiontwo/>
       <Sectionthree/>
       <Sectionfre/>
       <Secitonclientsay/>
       <Sectionlogo/>
       <Sectioninstall/>
       <Sectionquesition/>
       <Footer/>
    </div>
  );
};

export default Home;
