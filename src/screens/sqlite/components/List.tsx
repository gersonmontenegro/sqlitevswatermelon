import React, {memo, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {has} from 'lodash';

const Item = ({text1, text2}: {text1: string; text2: string}) => (
  <View style={styles.item}>
    <Text style={styles.text}>{text1}</Text>
    <Text style={styles.text}>{text2}</Text>
  </View>
);

type ItemType = {
  name: string;
  task: string;
  id: number;
};

export type ListProps = {
  insertId: undefined;
  rows: {
    item: (index: number) => void;
    length: number;
    raw?: () => void;
  };
  rowsAffected: number;
};

const ListComponent = ({data}: {data: ListProps | null}) => {
  const [itemsData, setItemsData] = useState<ItemType[] | null>(null);
  const renderItem = ({item}: {item: ItemType}) => {
    return <Item text1={`${item.id}: ${item.name}`} text2={item.task} />;
  };

  useEffect(() => {
    if (data && has(data, 'rows')) {
      const {rows} = data;
      const {item, length} = rows;
      const listDataFormated = [];
      for (let i = 0; i < length; i++) {
        const user = item(i) as unknown as ItemType;
        listDataFormated.push({
          name: user.name,
          task: user.task,
          id: user.id,
        });
      }
      setItemsData(listDataFormated);
    }
  }, [data]);

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
