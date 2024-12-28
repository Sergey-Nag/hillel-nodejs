
import pkg from 'mongoose';
import { MONGO_URL } from '../config.js';

const { connect, connection, disconnect } = pkg;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    await connect(MONGO_URL, clientOptions);
    await connection.db.admin().command({ ping: 1 });
  } catch (error) {
    await disconnect();
  }

  return connection;
}

export default run;
