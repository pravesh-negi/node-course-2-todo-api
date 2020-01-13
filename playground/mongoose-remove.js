const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose'); // this will make the connection with mongo db.
const{Todo}=require('./../server/models/todo');
const{User}=require('./../server/models/User');
 
// to remove the documdnts from the collection  
Todo.remove({}).then((result)=>{
    console.log(result);
});

// //data will be removed but we did not get the object back.
// //Todo.findOneAndRemove
// Todo.findOneAndRemove({_id:'5e157fd258daab8b9e8c9031'}).then((todo)=>{
    
// }); 


// data removed by finding the id
Todo.findByIdAndRemove('5e157fd258daab8b9e8c9031').then((todo)=>{
    console.log(todo);
}); 

//output :-  CommandResult {
//   result: { n: 1, ok: 1 },