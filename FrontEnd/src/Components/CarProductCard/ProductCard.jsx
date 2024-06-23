import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'aos/dist/aos.css'; 
import AOS from 'aos'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const ProductCard = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/notes');
        setNotes(response.data.allNotes);
      } catch (error) {
        console.error('Notları getirirken hata oluştu:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleMouseEnter = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note._id === id) {
        return { ...note, isHovered: true };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const handleMouseLeave = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note._id === id) {
        return { ...note, isHovered: false };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const addToBasket = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Kullanıcı oturum açmamış');
      return;
    }

    try {
      await axios.post(`http://localhost:8000/api/basket`, 
        { noteId: id }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(`Sepete eklendi: ${id}`);
    } catch (error) {
      console.error('Sepete eklerken hata oluştu:', error);
    }
  };

  const addToWishlist = async (id) => {
    try {
      console.log(`Favorilere eklendi: ${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Favorilere ekleme hatası:', error);
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div style={{paddingTop:'30px'}} className="pb-24 bg-gray-100 dark:bg-gray-900 firtsection  transition duration-500">
      <div className="container mx-auto">
        <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-semibold font-serif mb-3 text-center text-gray-900 dark:text-gray-100">
          Car Buy
        </h1>
        <p data-aos="fade-up" data-aos-delay="400" className="text-sm pb-10 text-center text-gray-700 dark:text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor iure nemo ab?
        </p>
        <Carousel responsive={responsive} autoPlay={true} autoPlaySpeed={3000} infinite={true} className="rounded-lg shadow-lg">
          {notes.map((note, index) => (
            <div
              key={note._id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="space-y-3 p-3 relative group flex flex-col items-center overflow-hidden bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg"
              onMouseEnter={() => handleMouseEnter(note._id)}
              onMouseLeave={() => handleMouseLeave(note._id)}
            >
              <div className="w-full h-[250px] relative overflow-hidden rounded-lg">
                {note.thumbnail && (
                  <img
                    src={note.thumbnail}
                    alt="thumbnail"
                    className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105"
                    style={{ backgroundColor: 'transparent' }}
                  />
                )}
                <button
                  onClick={() => addToBasket(note._id)}
                  className="bg-primary text-white py-2 px-4 rounded-md absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-primary-dark"
                >
                  Sepete Ekle
                </button>
              </div>
              <div className="space-y-2 w-full text-center">
                <h1 className="text-primary dark:text-primary-light font-semibold text-lg">{note.title}</h1>
                <div className="flex justify-center items-center text-xl font-semibold space-x-2 text-gray-900 dark:text-gray-100">
                  <p>${note.price}</p>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{note.description}</span>
                </div>
              </div>
              <p className="text-xl font-semibold absolute top-0 left-3 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg shadow-lg text-gray-900 dark:text-gray-100">
                {note.distance}
              </p>
              <button
                onClick={() => addToWishlist(note._id)}
                className={`group opacity-0 hover:opacity-100 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 absolute top-2 right-2 ${note.isHovered ? 'opacity-100' : ''}`}
              >
                <FontAwesomeIcon icon={faHeart} size="lg" />
              </button>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCard;
