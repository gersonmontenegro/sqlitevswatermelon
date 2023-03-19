import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import Toast from 'react-native-toast-message';
import {timeLogger} from '../../utils/time-logger';
import {List, ListProps} from './components/List';

import {DB} from './db/db';

const ShowNotification = (type: string, text1: string, text2?: string) => {
  Toast.show({
    type,
    text1,
    text2,
    position: 'bottom',
  });
};

const SqliteDemoComponent = () => {
  const [dataToShow, setDataToShow] = useState<ListProps | null>(null);
  const [timeToShow, setTimeToShow] = useState<number>(0);

  const onPressCreateTables = useCallback(() => {
    console.log('Create tables');
    const createTables = async () => {
      const result = await DB.initCreateTables();
      if (result) {
        ShowNotification('success', 'Create tables OK');
      } else {
        ShowNotification('error', 'Create tables error', 'Error');
      }
    };

    createTables();
  }, []);

  const onPressRemoveData = useCallback(() => {
    const removeTables = async () => {
      console.log('Init removing tables');
      const result = await DB.initRemoveTables();
      if (result) {
        ShowNotification('info', 'Tables removed');
      } else {
        ShowNotification('error', 'Tables removed error', 'Error');
      }
    };

    removeTables();
  }, []);

  const onPressInsertData = useCallback(() => {
    const removeTables = async () => {
      console.log('Init inserting data');
      const result = await DB.initInsertData();
      if (result) {
        ShowNotification('info', 'Insert data', JSON.stringify(result));
      } else {
        ShowNotification('error', 'Insert data error', 'Error');
      }
    };

    removeTables();
  }, []);

  const onPressShowData = useCallback(() => {
    const extractData = async () => {
      console.log('init extracting');
      timeLogger.time('show');
      const result = (await DB.extractDataToShow()) as {
        error: boolean;
        data: any;
      };
      if (!result.error) {
        console.log(result.data);
        setDataToShow(result.data);
        setTimeToShow(timeLogger.timeEnd('show'));
        ShowNotification('success', 'Extract data OK');
      } else {
        ShowNotification('error', 'Extract data error', result.data as string);
      }
    };

    extractData();
  }, []);

  const onPressRemoveList = () => {
    setTimeToShow(0);
    setDataToShow({
      insertId: undefined,
      rows: {
        item: () => null,
        length: 0,
        raw: () => null,
      },
      rowsAffected: 0,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Sqlite Demo!!!</Text>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={onPressCreateTables}>
          <Text style={styles.buttonText}>Create tables</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onPressRemoveData}>
          <Text style={styles.buttonText}>Remove data</Text>
        </Pressable>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={onPressInsertData}>
          <Text style={styles.buttonText}>Insert data</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onPressShowData}>
          <Text
            style={styles.buttonText}>{`Show data (${timeToShow} ms)`}</Text>
        </Pressable>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={onPressRemoveList}>
          <Text style={styles.buttonText}>Remove list</Text>
        </Pressable>
      </View>
      <List data={dataToShow} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  buttonsContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'lightgray',
    width: 150,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
});

export const SqliteDemo = memo(SqliteDemoComponent);
