import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar, AsyncStorage } from 'react-native';
import { Toast } from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import { BASE_API } from './BaseApi';
import axios from 'axios';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showSpiner: false,
      showToast: false,
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Spinner visible={this.state.showSpiner} textStyle={{color: '#FFF'}} />
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/img/logo_white.png')}
          />
          <Text style={styles.title}>Solusi Bisnis Laundry Anda</Text>
        </View>
        <View style={styles.formContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <TextInput
            placeholder="email"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            selectionColor={'#ffffff'}
            ref={(input) => this.emailInput = input}
            onChangeText={(email) => this.setState({email})}
          />
          <TextInput
            placeholder="password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="go"
            secureTextEntry
            style={styles.input}
            selectionColor={'#ffffff'}
            ref={(input) => this.passwordInput = input}
            onChangeText={(password) => this.setState({password})}
          />
          <TouchableOpacity onPress={this._login} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { Actions.forgetpassword() }}>
            <Text style={styles.textForgotPassword}>Lupa Password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }

  _login = () => {
    this.setState({showSpiner: true});

    axios.post(BASE_API + 'login', {
      email: this.state.email,
      password: this.state.password,
    })
    .then(async (response) => {
      
      this.setState({showSpiner: false});

      if(response.data.status === 'success'){
        await AsyncStorage.setItem('syek', response.data.token)
        let keys = await AsyncStorage.getItem('syek')
        if(keys!==''){
          Actions.reset('operator')
        }
      }
      
      Toast.show({
        text: response.data.message,
        textStyle: { textAlign: 'center' },
        duration: 3000
      })

    })
    .catch((error) => {
      console.log(error);
    });
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#005c00',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    color: '#ffffff',
    marginTop: 10,
    textAlign: 'center',
    opacity: 0.9
  },
  formContainer: {
    padding: 15
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom: 15,
    color: '#ffffff',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#003800',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700'
  },
  textForgotPassword: {
    color: '#ffffff',
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center',
    opacity: 0.9
  },
});
