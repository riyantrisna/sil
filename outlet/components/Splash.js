import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Functions from './lib/Functions';

export default class Splash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: {
                syek: '',
                lang: ''
            }
        }
    }

    async componentWillMount(){

        await AsyncStorage.getItem('users').then((data) => {
            if(!Functions.isEmpty(data)){
                var datas = JSON.parse(data);
                this.setState({
                    users: {
                        syek: datas.syek,
                        lang: datas.lang
                    }
                });
            }
        });

        setTimeout(async () => {

            let outletId = await AsyncStorage.getItem('outletId');

            if(!Functions.isEmpty(this.state.users.syek)){
                
                if(!Functions.isEmpty(outletId)){
                    Actions.reset('drawer');
                }else{
                    Actions.reset('outlet');
                }
                
            }else{
                Actions.reset('login');
            }

        }, 1);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#000000" />
                <View style={styles.logoContainer}>
                    <Image
                    style={styles.logo}
                    source={require('../assets/img/logo_white.png')}
                    />
                    <Text style={styles.title}>{Functions.langText('slogan', this.state.lang)}</Text>
                </View>
            </View>
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
});
