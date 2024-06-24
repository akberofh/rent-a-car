import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./index.css";

import { EffectCoverflow, Pagination } from "swiper/modules";

const Slidercomp = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
      // API'den veriyi çekmek için örnek bir fetch çağrısı
      fetch("https://6676bd0c145714a1bd72a309.mockapi.io/users") // API URL'nizi buraya ekleyin
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
    return (
        <>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={false}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <img src={product.avatar} alt={product.name} />
                <div>{product.name}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      );
}

export default Slidercomp