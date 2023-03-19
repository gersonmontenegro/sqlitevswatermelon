import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schema';
import User from './models/User';
import Task from './models/Task';

const adapter = new SQLiteAdapter({
  dbName: 'watermelon-demo',
  schema,
});

const database = new Database({
  adapter,
  modelClasses: [User, Task],
  // actionsEnabled: true,
});

export default database;
