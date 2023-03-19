import 'react-native-gesture-handler';
import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';

import {MainNavigator} from './navigators/main-navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <MainNavigator />
          <Toast />
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
  },
});

export default App;
