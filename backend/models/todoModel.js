const mongoose = require('mongoose')

const todoModel = mongoose.Schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    completed:{type:Boolean}
},{timestamps:true})

const Todo = mongoose.model('Todo',todoModel)
module.exports = Todo