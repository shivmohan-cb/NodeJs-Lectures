const {MongoClient} = require("mongodb");

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function connectMongodb(dbName) {
    try {
    await client.connect();
    console.log('Connected successfully to server');
    }
    catch(err){
      console.log(err);
    }   
}

module.exports = {connectMongodb,client};