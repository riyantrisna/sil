import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Functions from './lib/Functions';

export default class Splash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lang: AsyncStorage.getItem('lang')
        }

        setTimeout(async () => {

            let keys = await AsyncStorage.getItem('syek');

            if(!Functions.isEmpty(keys)){
                Actions.reset('outlet');
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
