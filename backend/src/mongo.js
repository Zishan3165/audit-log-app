import mongoose from 'mongoose';

const HOST = process.env.MONGODB_HOST || 'localhost';
console.log('process.env.MONGODB_HOST - ', HOST);

const options = {};

const log = (msg) => console.log(msg);

export const connectWithDb = () => {
  mongoose.connect(
    process.env.MONGODB_URL || process.env.AUDIT_SYSTEM_DATABASE_URI,
    options,
    (err, db) => {
      if (err) {
        throw err;
      } else log('database connection established');
    }
  );
};
export const connection = mongoose.connection;
connection.on('error', () => console.log('connection error'));
connection.once('open', () => console.log('connection successful'));
