const mongoose = require("mongoose")

const {Schema} = mongoose

const UserSchema = new Schema({
    email:{
        type: String,
        required:true
    },
    senha:{
        type:String,
        required: true
    },
    // urlAvatar:{
    //     type:String,
    //     required:true
    // },
    nome:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true
    },
    tel:{
        type:Number,
        required:false
    }
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)

module.exports = User