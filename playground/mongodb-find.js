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

    //<<<<< getting all records from Todos collection in mongo db :-

    // find():-get the mongodb data with find keyword.
    // find({}):- Inside of this we can do the query.
    db.collection('Todos')
    .find({completed:false})
    //.find({_id:new ObjectID('5e01b1a0934237387c9c7011')})
    .toArray().then((docs)=>{
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('Unable to fetch todos',err);
    });
 
    //<<<<< getting count of records from Todos collection in mongo db :-
    db.collection('Todos') 
    .find()
    .count()
    .then((count)=>{
        console.log(`Todos count:${count}`); 
    },(err)=>{
        console.log('Unable to fetch todos',err);
    });
 
    //<<<<< getting filter records from Todos collection in mongo db :-
    db.collection('Users') 
    .find({name:'harshit'})
    .toArray()
    .then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    });

    // // now disconnect to the server
    // //db.close();
});