import mongoose from "mongoose";
import bcrypt from 'bcryptjs'



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
        minLength : 8,
        select : false
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
    },
    role : {
        type: String,
        enum : ['user', 'editor', 'admin'],
        default: 'user'
    },
},
{
    timestamps : true
})



// Hash password before saving
userSchema.pre('save', async function (next){
    if(!this.isModified('password'))return next(); // only hash if changed
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

// Password comparison method
userSchema.methods.correctPassword = async function (candidatePwd, userPwd){
    return await bcrypt.compare(candidatePwd, userPwd)
}



// Export the user model

const User = mongoose.model('User', userSchema)


// export the schema

export default User
