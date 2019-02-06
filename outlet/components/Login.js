import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar, AsyncStorage, BackHandler, Alert } from 'react-native';
import { Toast } from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import Config from './config/Config';
import axios from 'axios';
import Functions from './lib/Functions';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showSpiner: false,
            showToast: false,
            users: {
                lang: ''
            }
        }

        AsyncStorage.removeItem('users');
        AsyncStorage.removeItem('outletId');
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._alertExit);
    }

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this._alertExit);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Spinner visible={this.state.showSpiner} textStyle={{color: '#FFF'}} color='#FFF' />
                <View style={styles.logoContainer}>
                    <Image
                    style={styles.logo}
                    source={require('../assets/img/logo_white.png')}
                    />
                    <Text style={styles.title}>{Functions.langText('slogan', this.state.users.lang)}</Text>
                </View>
                <View style={styles.formContainer}>
                    <StatusBar barStyle="light-content" backgroundColor="#000000" />
                    <TextInput
                    placeholder={Functions.langText('email', this.state.users.lang)}
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
                    placeholder={Functions.langText('password', this.state.users.lang)}
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    returnKeyType="go"
                    onSubmitEditing={this._login}
                    secureTextEntry
                    style={styles.input}
                    selectionColor={'#ffffff'}
                    ref={(input) => this.passwordInput = input}
                    onChangeText={(password) => this.setState({password})}
                    />
                    <TouchableOpacity onPress={this._login} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>{Functions.langText('login', this.state.users.lang)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Actions.forgetpassword() }}>
                        <Text style={styles.textForgotPassword}>{Functions.langText('lupapassword', this.state.users.lang)}?</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }

    _login = () => {

        let toastType = 'danger';

        if(!Functions.isEmpty(this.state.email) && !Functions.isEmpty(this.state.password)){
            this.setState({showSpiner: true});
            
            axios.post(Config.app.base_api + 'login', {
                email: this.state.email,
                password: this.state.password,
            })
            .then(async (response) => {
                
                this.setState({showSpiner: false});

                if(response.data.status === '200'){
                    toastType = 'success';

                    await AsyncStorage.setItem('users', JSON.stringify(response.data.data));

                    await AsyncStorage.getItem('users').then((data) => {
                        if(!Functions.isEmpty(data)){
                            var datas = JSON.parse(data);
                            this.setState({
                                users: {
                                    syek: datas.syek
                                }
                            });
                        }
                    });

                    if(!Functions.isEmpty(this.state.users.syek)){
                        Actions.reset('outlet');
                    }else{
                        Actions.reset('login'); 
                    }
                }else{
                    Toast.show({
                        text: Functions.langText('validasi_email_password_salah', this.state.users.lang),
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
                    text: Functions.langText('network_error', this.state.users.lang),
                    textStyle: { textAlign: 'center', fontSize: 14 },
                    duration: 3000,
                    type: toastType,
                    position: 'top'
                })
            });
        }else if(Functions.isEmpty(this.state.email) && !Functions.isEmpty(this.state.password)){
            Toast.show({
                text: Functions.langText('validasi_email', this.state.users.lang),
                textStyle: { textAlign: 'center', fontSize: 14 },
                duration: 3000,
                type: toastType,
                position: 'top'
            })
        }else if(!Functions.isEmpty(this.state.email) && Functions.isEmpty(this.state.password)){
            Toast.show({
                text: Functions.langText('validasi_password', this.state.users.lang),
                textStyle: { textAlign: 'center', fontSize: 14 },
                duration: 3000,
                type: toastType,
                position: 'top'
            })
        }else{
            Toast.show({
                text: Functions.langText('validasi_email_password', this.state.users.lang),
                textStyle: { textAlign: 'center', fontSize: 14 },
                duration: 3000,
                type: toastType,
                position: 'top'
            })
        }
    }

    _alertExit = () => {
        Alert.alert(
            '',
            Functions.langText('keluar_app', this.state.users.lang)+'?',
            [
                {
                    text: Functions.langText('batal', this.state.users.lang),
                },
                {
                    text: Functions.langText('ok', this.state.users.lang), onPress: () => BackHandler.exitApp()
                },
            ],
            {cancelable: true},
          );
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
