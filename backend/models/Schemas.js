const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    emailId: {type:String, required:true},
    phoneNumber: {type:String, required:true},
    password: {type:String, required:true}
});

const candidateSchema = new Schema({
    name: {type:String, required:true},
    dateOfBirth: {type:String, required:true},
    age: {type:String, required:true},
    emailId: {type:String, required:true},
    address: {type:String, required:true},
    state: {type:String, required:true},
    pincode: {type:String,required:true},
    shortList: {type:String, required:false}
});

const Users = mongoose.model('user', userSchema, 'user');
const Candidates = mongoose.model('candidate', candidateSchema, 'candidate');
const mySchemas = {'Users':Users, 'Candidates':Candidates};

module.exports = mySchemas;