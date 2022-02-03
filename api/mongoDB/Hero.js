import mongoose from "mongoose";

const Hero =new mongoose.Schema({
    id: {type:String,required:true},
    name: {type:String,required:true},
    description: {type:String,required:true},
    element: {type:String,required:true},
})

export default mongoose.model('Heroes',Hero)