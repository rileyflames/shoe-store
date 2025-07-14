import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    // define the schema
    name : {
        type : String,
        required : true,
        trim : true
    },
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        minLength : 4
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    },
    isVerified :{
        type : Boolean,
        default : false
    },
    phonenumber : {
        type : String,
        required : true,
        trim : true,
        match : [/^\+?\d{10,15}$/, 'Invalid phone number']
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        match : [/@domain\.com$/, 'Email must be under @domain.com']
    }
},
{
    timestamps : true
})





// Export the user model

const User = mongoose.model('User', userSchema)







// export the schema

export default User
