import mongoose from "mongoose";

const noteModel = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String, // Resmin URL'sini saklamak için String tipinde alan
  },
}, {
  timestamps: true
});

const NoteModel = mongoose.model("Note", noteModel);

export default NoteModel;
