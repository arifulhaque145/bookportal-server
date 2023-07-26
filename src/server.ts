import mongoose from 'mongoose';
import app from './app';
import config from './config';

main().catch(err => console.log(err));

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database Connected Successfully');

    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('Problem to create database');
  }
}
