import mongoose from 'mongoose';
import * as console from "console";

const uri = process.env.MONGO_URI;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const database = process.env.MONGO_DATABASE;
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;

const mongoUri = uri || `mongodb://${user}:${password}@${host}:${port}/${database}`;

console.log(mongoUri);

if (!mongoUri) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  );
}

mongoose.connect(mongoUri)

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
})

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ', err);
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose is disconnected');
})

const db  = mongoose;

export default db;
