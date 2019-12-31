var mongoose=require('mongoose');

// model with some properties with their type:- Robo mongo will make this Todo collection as todos.
var Todo=mongoose.model('Todo',{
    text:{
     type:String,
     required:true,
     minlength:1,
     trim:true 
    } ,
    completed:{
     type:Boolean,
     default:false
    },
    completedAt:{
     type:Number,
     default:null
    }
 });

 module.exports={Todo};
