import NoteModel from "../Models/noteModel.js";

const notePost =
  ("/",
  async (req, res) => {
    const { title, description } = req.body;

    try {
      const note = await NoteModel.create({ title, description });
      res.json({ note });
    } catch (error) {
      console.log(error.message);
    }
  });

const getNote =
  ("/",
  async (req, res) => {
    try {
      const allNotes = await NoteModel.find();

      res.json({ allNotes });
    } catch (error) {
      console.log(error.message);
    }
  });

const getByIdNote =
  ("/:id",
  async (req, res) => {
    const { id } = req.params;
    try {
      const getById = await NoteModel.findById({ _id: id });
      res.json({ getById });
    } catch (error) {
      console.log(error.message);
    }
  });

  const deleteById = ('/:id' , async (req,res) => {
    const { id } = req.params;

    try {
        const deletedData = await NoteModel.findOneAndDelete({_id:id})
        res.json({deletedData})
    } catch (error) {
        console.log(error.message);
    }
  })

export { notePost, getNote, getByIdNote, deleteById };