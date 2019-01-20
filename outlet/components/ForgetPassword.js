import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar, AsyncStorage } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, Button, Toast } from 'native-base';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import Functions from './lib/Functions';
import Config from './config/Config';
import axios from 'axios';

export default class ForgetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            showSpiner: false,
            showToast: false,
            lang: AsyncStorage.getItem('lang')
        }
    }

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
                        <Title>{Functions.langText('lupapassword', this.state.lang)}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <KeyboardAvoidingView style={styles.container}>
                        <Spinner visible={this.state.showSpiner} textStyle={{color: '#005c00'}} color='#005c00' />
                        <StatusBar barStyle="light-content" backgroundColor="#000000" />
                        <View style={styles.formContainer}>
                            <Text style={styles.title}>{Functions.langText('info_lupa_password', this.state.lang)}</Text>
                            <TextInput
                                placeholder={Functions.langText('email', this.state.lang)}
                                returnKeyType="go"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                ref={(input) => this.emailInput = input}
                                onChangeText={(email) => this.setState({email})}
                                onSubmitEditing={this._sendEmail}
                            />

                            <TouchableOpacity onPress={this._sendEmail} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>{Functions.langText('kirim', this.state.lang)}</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        )
    }

    _sendEmail = () => {

        let toastType = 'danger';

        if(!Functions.isEmpty(this.state.email)){
            this.setState({showSpiner: true});

            axios.post(Config.app.base_api + 'user/forgotpassword', {
                email: this.state.email
            })
            .then(async (response) => {
                
                this.setState({showSpiner: false});

                if(response.data.status === '201'){
                    toastType = 'success';

                    Toast.show({
                        text: Functions.langText('password_terkirim', this.state.lang),
                        textStyle: { textAlign: 'center', fontSize: 14 },
                        duration: 3000,
                        type: toastType,
                        position: 'top'
                    })
                }else if(response.data.status === '500'){
                    Toast.show({
                        text: Functions.langText('validasi_email_gagal_dikirim', this.state.lang),
                        textStyle: { textAlign: 'center', fontSize: 14 },
                        duration: 3000,
                        type: toastType,
                        position: 'top'
                    })
                }else{
                    Toast.show({
                        text: Functions.langText('validasi_email_salah', this.state.lang),
                        textStyle: { textAlign: 'center', fontSize: 14 },
                        duration: 3000,
                        type: toastType,
                        position: 'top'
                    })
                }

            })
            .catch((error) => {
                this.setState({showSpiner: false});
                Toast.show({
                    text: Functions.langText('network_error', this.state.lang),
                    textStyle: { textAlign: 'center', fontSize: 14 },
                    duration: 3000,
                    type: toastType,
                    position: 'top'
                })
            });
        }else{
            Toast.show({
                text: Functions.langText('validasi_email', this.state.lang),
                textStyle: { textAlign: 'center', fontSize: 14 },
                duration: 3000,
                type: toastType,
                position: 'top'
            })
        }
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
        textAlign: 'left',
        color: '#404040'
    },
    input: {
        height: 30,
        marginBottom: 15,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        opacity: 0.9
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
        backgroundColor: '#005c00',
    }
});
