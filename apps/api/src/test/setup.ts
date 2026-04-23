import { beforeAll, afterEach, afterAll, inject } from 'vitest';

import { ChildrenModel } from '../models/Children';
import criancas from '../scripts/data/seed.json';
import mongo from '../plugins/mongo';
import mongoose from 'mongoose';


beforeAll(async () => {
  await mongoose.connect(inject('MONGO_URI') as string);
  await ChildrenModel.insertMany(criancas)

},10000)


afterEach(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});
