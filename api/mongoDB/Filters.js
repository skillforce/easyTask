import mongoose from "mongoose";

const Filters =new mongoose.Schema({
    filters:{type:Array,required:true}
})

export default mongoose.model('Filters',Filters)