import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Button } from 'native-base';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';

export default class Operator extends Component {
  render() {
    return (
      <Container>

        <Header style={styles.headerText}>
          <Body>
            <Title>Pilih Operator</Title>
          </Body>
        </Header>

        <KeyboardAvoidingView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Operator</Text>
          </View>
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 15
  },
  title: {
    marginVertical: 10,
    textAlign: 'center',
    opacity: 0.9
  },
  headerText: {
    backgroundColor: '#003800',
  }
});
