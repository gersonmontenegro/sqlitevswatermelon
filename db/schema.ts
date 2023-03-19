import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'users',
      columns: [{name: 'name', type: 'string'}],
    }),
    tableSchema({
      name: 'tasks',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'user_id', type: 'string', isIndexed: true},
      ],
    }),
  ],
});
