import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'aos/dist/aos.css'; // AOS için CSS dosyasını dahil ediyoruz
import AOS from 'aos'; // AOS kütüphanesini dahil ediyoruz
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ProductCard = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // AOS animasyonlarını başlatır
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

  const addToBasket = (id) => {
    console.log(`Sepete eklendi: ${id}`);
    // Sepete ekleme işlevi burada yapılabilir
  };

  const addToWishlist = async (id) => {
    try {
      console.log(`Favorilere eklendi: ${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Favorilere ekleme hatası:', error);
    }
  };

  return (
    <div className="pb-24">
      <div className="container">
        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3"
        >
          Lorem ipsum dolor
        </h1>
        <p data-aos="fade-up" data-aos-delay="400" className="text-sm pb-10">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor iure nemo ab?
        </p>
        {/* Car listing */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {notes.map((note, index) => (
              <div
                key={note._id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group flex flex-col items-center overflow-hidden"
                onMouseEnter={() => handleMouseEnter(note._id)}
                onMouseLeave={() => handleMouseLeave(note._id)}
              >
                <div className="w-full h-[150px] relative overflow-hidden">
                  {note.thumbnail && (
                    <img
                      src={note.thumbnail}
                      alt="thumbnail"
                      className="w-full h-full object-cover"
                      style={{
                        backgroundColor: 'transparent'
                      }}
                    />
                  )}
                  {/* Sepete Ekle Butonu */}
                  <button
                    onClick={() => addToBasket(note._id)}
                    className="bg-primary text-white py-2 px-4 rounded-md absolute bottom-0 left-0 right-0 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300"
                  >
                    Sepete Ekle
                  </button>
                </div>
                <div className="space-y-2 w-full">
                  <h1 className="text-primary font-semibold">{note.title}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>${note.price}/Day</p>
                    <a href="#">{note.description}</a>
                  </div>
                </div>
                <p className="text-xl font-semibold absolute top-0 left-3">
                  {note.distance}
                </p>
                {/* Favorilere Ekle Butonu */}
                <button
                  onClick={() => addToWishlist(note._id)}
                  className={`group opacity-0 hover:opacity-100 bg-white text-gray-700 rounded-full p-2 hover:bg-gray-200 transition duration-300 absolute top-2 right-2 ${note.isHovered ? 'opacity-100' : ''}`}
                >
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
