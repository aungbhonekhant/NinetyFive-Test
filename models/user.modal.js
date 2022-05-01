const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createHttpErrors = require('http-errors');
const { roles } = require('../Utils/constants');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
        lowercase: true
    },
    password:{ 
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        maxlength: 12,
    },
    department: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Department', 
            required: [true, 'Please provide departmentId'],
        },
    role:{
        type: String,
        enum: [roles.admin,roles.client],
        default: roles.client
    }
});

UserSchema.pre('save', async function (next) {
    try {
        if(this.isNew){
            const salt = await bcrypt.genSalt(10)
            this.password = await bcrypt.hash(this.password, salt)
            if(this.email === process.env.ADMIN_EMAIL.toLocaleLowerCase()){
                this.role = roles.admin
            }
        }
        next()
    } catch (error) {
        next(error)
    }
    
})
  
UserSchema.methods.createJWT = function () {
return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
    expiresIn: process.env.JWT_LIFETIME,
    }
)
}
  
UserSchema.methods.isValidPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw createHttpErrors.InternalServerError(error.message);
    }
  };

  const User = mongoose.model('user', UserSchema);
  module.exports = User;