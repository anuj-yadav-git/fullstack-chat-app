//- Model: Uses the schema to interact with the database 
// (e.g., create, read, update, delete).

//In Mongoose, a schema is like a blueprint for your MongoDB documents—it 
//defines the structure, data types, and rules for the data you want to store.

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    fullname: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
},
//Adds createdAt and updatedAt fields automatically
{timestamps: true}
)

//mongoose want "U" in "User"
//User is object that represents the collection in the database
const User = mongoose.model("User", userSchema)

export default User