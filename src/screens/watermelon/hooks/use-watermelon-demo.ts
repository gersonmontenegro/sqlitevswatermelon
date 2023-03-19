import {useState} from 'react';
import {Model} from '@nozbe/watermelondb';
import {faker} from '@faker-js/faker';

import User from '../../../../db/models/User';
import Task from '../../../../db/models/Task';
import database from '../../../../db';
import {timeLogger} from '../../../utils/time-logger';

export const useWaterMelonDemo = () => {
  const [users, setUsers] = useState<[]>([]);
  const [tasks, setTasks] = useState<[]>([]);
  const [timeToShow, setTimeToShow] = useState<number>(0);

  const createTask = async (userId: string) => {
    await database.write(async () => {
      const user = await database.collections.get('users').find(userId);
      const newTask = await database.collections
        .get('tasks')
        .create((task: Model) => {
          const taskName = faker.commerce.productName();
          const typedTask = task as Task;
          typedTask.title = taskName;
          typedTask.user.set(user as User);
        });
      console.log('Task created:', newTask);
    });
  };

  const createUser = async () => {
    await database.write(async () => {
      const newUser = await database.collections
        .get('users')
        .create((user: Model) => {
          (user as User).name = 'John Doe';
        });
      console.log('User created:', newUser);
    });
  };

  const createUsers = async () => {
    const total = 100;
    // await database.write(async () => {
    //   for (let i = 0; i < total; i++) {
    //     const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    //     const newUser = await database.collections
    //       .get('users')
    //       .create((user: Model) => {
    //         (user as User).name = name;
    //       });
    //     console.log('Created:', newUser._raw.id);
    //     await createTask(newUser._raw.id);
    //   }
    // }, 'write');

    console.log('Creating users....');
    await database.write(async () => {
      for (let i = 0; i < total; i++) {
        const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
        const newUser = await database.collections
          .get('users')
          .create((user: Model) => {
            (user as User).name = name;
          });
        console.log('Created:', newUser._raw.id);

        // Create a task for the user within the same action
        await database.collections.get('tasks').create((task: Model) => {
          const typedTask = task as Task;
          typedTask.title = `Sample Task for ${name}`;
          typedTask.user.set(newUser as User);
        });
      }
    }, 'write');
  };

  const fetchUsers = async () => {
    timeLogger.time('show');
    const fetchedUsers = await database.collections
      .get('users')
      .query()
      .fetch();
    // console.log('Fetched users:', fetchedUsers);
    setUsers(fetchedUsers as []);
    setTimeToShow(timeLogger.timeEnd('show'));
  };

  const fetchTasks = async () => {
    const fetchedTasks = await database.collections
      .get('tasks')
      .query()
      .fetch();
    console.log('Fetched tasks:', fetchedTasks);
    setTasks(fetchedTasks as []);
  };

  const onPressRemoveList = () => {
    console.log('removing list...');
    setUsers([]);
    setTimeToShow(0);
  };

  const deleteAllData = async () => {
    await database.write(async () => {
      const allUsers = await database.collections.get('users').query().fetch();
      const allTasks = await database.collections.get('tasks').query().fetch();

      await database.batch(
        ...allUsers.map(user => user.prepareDestroyPermanently()),
        ...allTasks.map(task => task.prepareDestroyPermanently()),
      );
    }, 'writer');

    console.log('All data removed from the users and tasks tables.');
  };

  const fetchData = async () => {
    await fetchUsers();
    await fetchTasks();
  };

  return {
    onPressRemoveList,
    timeToShow,
    createTask,
    createUser,
    fetchUsers,
    fetchTasks,
    fetchData,
    tasks,
    users,
    createUsers,
    deleteAllData,
  };
};
