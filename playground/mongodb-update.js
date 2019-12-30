//const MongoClient=require('mongodb').MongoClient; 
 
const {MongoClient,ObjectID}=require('mongodb') // creating a variable called Mongo client like we do here setting it equal to the Mongoclient property of require MongoDB. it's equvalent to :- const MongoClient=require('mongodb').MongoClient;
   

// TodoApp(database) :- you dont need to create the database in mongodb unlike the other database.
// i.e :-mongodb://localhost:27017/pravesh :- with this database with name pravesh will be created.

// mMongo will not create the database until we start adding data into it
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');  

    // // update the complete object as true in Todos collection of Mongodb.
    // db.collection('Todos').findOneAndUpdate({
    //     _id:new ObjectID('5e09f7da58daab8b9e8c5622')
    // },{
    //     $set:{
    //         completed:true
    //     }
    // },{
    //     returnOriginal:false // when false return the updated document rather than the original
    // }).then((result)=>{
    //     console.log(result);
    // });

    // update the name with the 1 increment in the age object in Users collection of  mongodb.
    db.collection('Users').findOneAndUpdate({
        _id:new ObjectID('5e01b2c4d5fad32d1c8e08d8')
    },{
        $set:{
            name:'praveshnew'
        },
        $inc:{
            age:1
        }
    },{
        returnOriginal:false // when false return the updated document rather than the original
    }).then((result)=>{
        console.log(result);
    });
    
    // // now disconnect to the server
    // //db.close();
});