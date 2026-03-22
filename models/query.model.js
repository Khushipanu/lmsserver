import mongoose from "mongoose"
const querySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["pending","solved"],
        default:"pending"
    },
    reply:{
        type:String,
        default:""
    }
},{timestamps:true})
const Query=mongoose.model("Query",querySchema);
export default Query;