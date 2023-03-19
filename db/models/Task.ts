import {Model, Relation} from '@nozbe/watermelondb';
import {field, relation} from '@nozbe/watermelondb/decorators';
import User from './User';

export default class Task extends Model {
  static table = 'tasks';

  @field('title') title!: string;
  @relation('users', 'user_id') user!: Relation<User>;
}
