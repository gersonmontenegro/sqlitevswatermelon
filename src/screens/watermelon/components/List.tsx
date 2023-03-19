import React, {memo, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {isEmpty} from 'lodash';

const Item = ({text1, text2}: {text1: string; text2: string}) => (
  <View style={styles.item}>
    <Text style={styles.text}>{text1}</Text>
    <Text style={styles.text}>{text2}</Text>
  </View>
);

type ItemType = {
  name: string;
  task: string;
  id: string;
};

export type UsersListProps = {
  name: string;
  collection?: unknown;
  __changes?: unknown;
  _isEditing?: boolean;
  _preparedState?: null;
  _raw: {
    id: string;
    name: string;
    _changed: string;
    _status: string;
  };
};

export type TasksListProps = {
  title: string;
  collection?: unknown;
  __changes?: unknown;
  _isEditing?: boolean;
  _preparedState?: null;
  _raw: {
    id: string;
    title: string;
    user_id: string;
    _changed: string;
    _status: string;
  };
};

// const ListComponent = ({data}: {data: ListProps[]}) => {
const ListComponent = ({
  data,
}: {
  data: [UsersListProps[], TasksListProps[]];
}) => {
  const users = data[0] as UsersListProps[];
  const tasks = data[1] as TasksListProps[];
  const [itemsData, setItemsData] = useState<ItemType[] | null>(null);

  const renderItem = ({item}: {item: ItemType}) => {
    return <Item text1={`${item.id}: ${item.name}`} text2={item.task} />;
  };

  useEffect(() => {
    const getUserTask = (userId: string): string => {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]._raw.user_id === userId) {
          return tasks[i].title.replace('Sample Task for', '');
        }
      }
      return '';
    };

    if (!isEmpty(users) && !isEmpty(tasks)) {
      const length = users.length;
      const listDataFormated = [];
      for (let i = 0; i < length; i++) {
        const user = users[i];
        listDataFormated.push({
          name: user.name,
          task: getUserTask(user._raw.id),
          id: `${i + 1}`,
        });
      }
      setItemsData(listDataFormated);
    } else {
      setItemsData([]);
    }
  }, [users, tasks]);

  return (
    <SafeAreaView>
      <FlatList data={itemsData} renderItem={renderItem} style={styles.list} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'lightgray',
    marginVertical: 5,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
    height: 30,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
  },
  list: {
    height: verticalScale(450),
  },
});

export const List = memo(ListComponent);
