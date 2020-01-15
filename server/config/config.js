// "test": "export NODE_ENV=test || SET NODE_ENV=test && mocha server/**/*.test.js", 
// SET NODE_ENV=test is for windows for setting NODE_ENV value and then mocha test will called.
var env=process.env.NODE_ENV|| 'development';

console.log('env *******',env);

if(env==='development'){
    process.env.PORT=3000;
    process.env.MONGODB_URI='mongodb://localhost:27017/TodoMongooseApp';
} else if(env==='test'){
    process.env.PORT=3000;
    process.env.MONGODB_URI='mongodb://localhost:27017/TodoMongooseAppTest';
}

