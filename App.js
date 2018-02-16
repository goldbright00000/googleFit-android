import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { Constants, Google } from 'expo';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {H1, H2, H3, H4, H5, H6, Container, Spinner} from "native-base";

import { Login } from './src/login';
import { Home } from './src/home';
// import type { NavigationScreenProp } from "react-navigation/src/TypeDefinition";
// import autobind from "autobind-decorator";

export default class App extends Component {

  render() {
    return (
      <AppNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

const AppNavigator = StackNavigator({
  Login : { screen: Login,
    navigationOptions: {
      headerTitle: 'Login',
    },
  },
  Home : { screen: Home,
      navigationOptions: {
        headerTitle: 'Home',
      },
  },
}, {
  headerMode: "none"
});

export {AppNavigator};