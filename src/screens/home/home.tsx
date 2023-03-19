import React, {memo} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeRoutes, HomeStackProps} from '../../utils/types';

const HomeComponent = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackProps>>();

  const onPressSqlite = () => {
    navigation.navigate(HomeRoutes.SQLITE);
  };

  const onPressWatermelon = () => {
    navigation.navigate(HomeRoutes.WATERMELON);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select DB to test</Text>
      <View>
        <Pressable style={styles.button} onPress={onPressSqlite}>
          <Text>SqLite</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onPressWatermelon}>
          <Text>WatermelonDB</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  button: {
    width: scale(120),
    height: verticalScale(30),
    backgroundColor: 'lightgray',
    marginVertical: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export const Home = memo(HomeComponent);
