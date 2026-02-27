import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    cartData:{
        type:Object,
        default:{}//kyuki cartData k andar kuch nahi h to minimize false h
    }
},{timestamps:true , minimize:false})

const User = mongoose.model("User",userSchema)

export default User