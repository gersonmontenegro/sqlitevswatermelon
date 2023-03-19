import {Model, Query} from '@nozbe/watermelondb';
import {field, children} from '@nozbe/watermelondb/decorators';
import Task from './Task';

export default class User extends Model {
  static table = 'users';

  @field('name') name!: string;
  @children('tasks') tasks: Query<Task>;
}
