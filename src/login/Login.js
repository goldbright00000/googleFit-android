import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { Constants, Google } from 'expo';
import type { NavigationScreenProp } from "react-navigation/src/TypeDefinition";
import helper from '../Utils/helper';
import googlefit from '../Utils/googlefit';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
			accessToken: ''
		}
		
		this.callback = this.callback.bind(this);
    }
    
    props: {
        navigation: NavigationScreenProp<*, *>
    }

    callback () {
	
	  var accessToken = this.state.accessToken;	

      var current = new Date();
      var year = current.getFullYear();
      var month = current.getMonth();
      var date = current.getDate();
      var endTimeMillis = new Date(year, month, (date+1)).getTime();
      var startTimeMillis = endTimeMillis - 604800000;

      // Get step data

      let stepData = {
        'accessToken': accessToken,
        'dataTypeName': 'com.google.step_count.delta',
        'startTimeMillis': startTimeMillis,
        "endTimeMillis": endTimeMillis
      };

      googlefit.getFitnessData(stepData).then((res) => {

        if(res){
          helper.setCache('@step',res);
        }else{

        }
      });

      // Get weight data

      let weightData = {
        'accessToken': accessToken,
        'dataTypeName': 'com.google.weight',
        'startTimeMillis': startTimeMillis,
        "endTimeMillis": endTimeMillis
      };

      googlefit.getFitnessData(weightData).then((res) => {

        if(res){
          helper.setCache('@weight',res);
        }else{

        }
      });

      // Get distance data

      let distanceData = {
        'accessToken': accessToken,
        'dataTypeName': 'com.google.distance.delta',
        'startTimeMillis': startTimeMillis,
        "endTimeMillis": endTimeMillis
      };

      googlefit.getFitnessData(distanceData).then((res) => {

        if(res){
          helper.setCache('@distance',res);
        }else{

        }
      });

      // Get calories data

      let caloriesData = {
        'accessToken': accessToken,
        'dataTypeName': 'com.google.calories.expended',
        'startTimeMillis': startTimeMillis,
        "endTimeMillis": endTimeMillis
      };

      googlefit.getFitnessData(caloriesData).then((res) => {

        if(res){
          helper.setCache('@calories',res);
        }else{

        }
      });

    }

    _handleGoogleLogin = async () => {
    try {
      let scope = 'profile https://www.googleapis.com/auth/fitness.activity.write https://www.googleapis.com/auth/fitness.body.write https://www.googleapis.com/auth/fitness.location.write https://www.googleapis.com/auth/fitness.nutrition.write';
      const { type, user, accessToken } = await Google.logInAsync({
        androidClientId: '583659066312-pi4avkbf5guqj11596rgkrgbvuj4afe2.apps.googleusercontent.com',
        androidStandaloneAppClientId: '1000586617019-tibplbuelc72bpvsqi2ppt1slhno9nc5.apps.googleusercontent.com',
        iosClientId: '583659066312-ph4u33j8m58ak6720ko0a44eu9gu6lgh.apps.googleusercontent.com',
        scopes: [scope, 'email']
	  });
	  
	  this.setState({accessToken: accessToken});

      this.interval = setInterval(this.callback, 5000);

      switch (type) {
        case 'success': {
          // Alert.alert(
          //   'Logged in!',
          //   `Hi ${user.name}!`,
          // );
          this.props.navigation.navigate("Home");
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Login with Google"
          onPress={this._handleGoogleLogin}
          color="#183739"
        />
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#162631',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
