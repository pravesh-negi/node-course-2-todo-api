var mongoose=require('mongoose');

//connection with our database and set it up to use promise.
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoMongooseApp');

module.exports={mongoose};
