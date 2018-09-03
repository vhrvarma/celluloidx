
let mongoose = require('mongoose');

let objectId = mongoose.Schema.Types.ObjectId;


let userDetails = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
},{
    timestamps:true
})

let logModel = mongoose.model('users',userDetails);

module.exports = logModel;