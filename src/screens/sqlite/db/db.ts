import {openDatabase} from 'react-native-sqlite-storage';
import {faker} from '@faker-js/faker';

const dbInstance = openDatabase({name: 'gelanova', location: 'default'});

const DB = {
  init: () => {
    DB.createTableQueries();
  },
  createTableQueries: (): Array<string> => {
    let sqlQuery = '';
    const tableList = [];
    sqlQuery =
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT);';
    tableList.push(sqlQuery);
    sqlQuery =
      'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, user_id INTEGER, title TEXT, FOREIGN KEY(user_id) REFERENCES users(id));';
    tableList.push(sqlQuery);

    return tableList;
  },
  createRemoveTablesQueries: (): Array<string> => {
    const tableList = [];
    tableList.push('DROP TABLE IF EXISTS users;');
    tableList.push('DROP TABLE IF EXISTS tasks;');
    return tableList;
  },
  executeStatement: (sqlQuery: string, db: any) => {
    return new Promise((resolve, reject) => {
      if (sqlQuery) {
        db.transaction((txn: any) => {
          try {
            txn.executeSql(
              sqlQuery,
              [],
              (tx: any, res: any) => {
                resolve(res);
              },
              (err: string) => {
                reject(err);
              },
            );
          } catch (err: any) {
            reject(`Catch error executing SQL ${err}`);
          }
        });
      } else {
        reject(false);
      }
    });
  },
  initTables: () => {
    const tableList = DB.createTableQueries();
    return new Promise((resolve, reject) => {
      tableList.forEach(async (item: any) => {
        try {
          const result = await DB.executeStatement(item, dbInstance);
          if (result) {
            resolve(true);
          } else {
            reject();
          }
        } catch (err) {
          reject(err);
        }
      });
    });
  },
  removeTables: () => {
    const tableList = DB.createRemoveTablesQueries();
    return new Promise((resolve, reject) => {
      tableList.forEach(async (item: any) => {
        try {
          const result = await DB.executeStatement(item, dbInstance);
          if (result) {
            resolve(true);
          } else {
            reject();
          }
        } catch (err) {
          reject(err);
        }
      });
    });
  },
  createDataToInsert: (total: number) => {
    const insertQueries = [];
    for (let i = 0; i < total; i++) {
      const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
      const task = faker.commerce.productName();
      insertQueries.push(
        `INSERT INTO users (id, name) VALUES (${i + 1}, '${name}');`,
      );
      insertQueries.push(
        `INSERT INTO tasks (user_id, title) VALUES (${i + 1}, '${task}');`,
      );
    }
    return insertQueries;
  },
  insertData: async () => {
    const tableList = DB.createDataToInsert(100);
    console.log('insert table', tableList.length);
    console.table(tableList);
    return new Promise((resolve, reject) => {
      tableList.forEach(async (item: any) => {
        try {
          console.log('INSERT:', item);
          const result = await DB.executeStatement(item, dbInstance);
          console.log('result after INSERT:', result);
          if (result) {
            resolve(result);
          } else {
            reject();
          }
        } catch (err) {
          reject(err);
        }
      });
    });
  },
  extractDataToShow: async () => {
    const queryOrder =
      'select id, name, (select title from tasks where tasks.user_id = users.id) as task from users';
    console.log('queryOrder:', queryOrder);
    try {
      const result = await DB.executeStatement(queryOrder, dbInstance);
      return {
        error: false,
        data: result,
      };
    } catch (err) {
      return {
        error: true,
        data: err,
      };
    }
  },
  initInsertData: async () => {
    const insertDataResult = await DB.insertData();
    return insertDataResult;
  },
  initRemoveTables: async () => {
    const removeTablesResult = await DB.removeTables();
    return removeTablesResult;
  },
  initCreateTables: async () => {
    const resultCreateTables = await DB.initTables();
    return resultCreateTables;
  },
};

export {DB};
