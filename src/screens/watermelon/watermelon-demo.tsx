import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {List} from './components/List';
import {useWaterMelonDemo} from './hooks/use-watermelon-demo';

const WatermelonDemoComponent = () => {
  const {
    timeToShow,
    onPressRemoveList,
    createUser,
    createUsers,
    deleteAllData,
    fetchData,
    users,
    tasks,
  } = useWaterMelonDemo();

  const onPressInsertData = async () => {
    await createUser();
  };

  return (
    <View style={styles.container}>
      <Text>Watermelon demo</Text>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={createUsers}>
          <Text style={styles.buttonText}>Create users</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={deleteAllData}>
          <Text style={styles.buttonText}>Remove data</Text>
        </Pressable>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={onPressInsertData}>
          <Text style={styles.buttonText}>Insert data</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={fetchData}>
          <Text
            style={styles.buttonText}>{`Show data (${timeToShow} ms)`}</Text>
        </Pressable>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={onPressRemoveList}>
          <Text style={styles.buttonText}>Remove list</Text>
        </Pressable>
      </View>
      <List data={[users, tasks]} />
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

export const WatermelonDemo = memo(WatermelonDemoComponent);
