import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCard = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/notes');
        setNotes(response.data.allNotes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Notlar</h2>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            {note.thumbnail && <img src={note.thumbnail} alt="Thumbnail" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCard;
