import mongoose from "mongoose";


const noteModel = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    }
},{
    timestamps:true
})

const NoteModel = mongoose.model("Note", noteModel)

export default NoteModel