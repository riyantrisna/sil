import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Button } from 'native-base';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';

export default class ForgetPassword extends Component {
  render() {
    return (
      <Container>

        <Header style={styles.headerText}>
          <Left>
            <Button transparent onPress={() => { Actions.pop() }}>
              <Icons name='arrow-back' color="#ffffff" size={25} />
            </Button>
          </Left>
          <Body>
            <Title>Reset Password</Title>
          </Body>
          <Right />
        </Header>

        <KeyboardAvoidingView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <View style={styles.formContainer}>

            <Text style={styles.title}>Masukan email untuk menerima perubahan password</Text>
            <TextInput
              placeholder="email"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="go"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              selectionColor={'#ffffff'}
              ref={(input) => this.emailInput = input}
            />

            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>KIRIM</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#005c00',
  },
  formContainer: {
    padding: 15
  },
  title: {
    color: '#ffffff',
    marginVertical: 10,
    textAlign: 'center',
    opacity: 0.9
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
  headerText: {
    backgroundColor: '#003800',
  }
});
