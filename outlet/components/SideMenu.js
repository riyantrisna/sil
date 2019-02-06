import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, AsyncStorage , TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Functions from './lib/Functions';
import { Content, List, ListItem } from 'native-base';
import Icons from 'react-native-vector-icons/MaterialIcons';

export default class SideMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lang: AsyncStorage.getItem('lang')
        }
    }

    render() {
        return (
            <Content>
                <StatusBar barStyle="light-content" backgroundColor="#000000" />
                <View style={styles.container}>
                    <View style={styles.menu}>
                        
                    </View>
                    <View style={{flex: 2}}>
                        <TouchableOpacity onPress={() => { Actions.home() }} style={styles.listItem}>
                            <Icons name='home' size={25} color="#404040" />
                            <Text style={styles.listText}>{Functions.langText('transaksi', this.state.lang)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { Actions.login() }} style={styles.listItem}>
                            <Icons name='settings' size={25} color="#404040" />
                            <Text style={styles.listText}>{Functions.langText('setting', this.state.lang)}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menu: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#005c00',
        height: 200
    },
    listItem: {
        flexDirection: "row", 
        alignItems: "center", 
        borderBottomColor: '#dddddd', 
        borderBottomWidth: 1,
        paddingLeft: 20
    },
    listText: {
        flex: 1, 
        flexWrap: 'wrap', 
        fontWeight: 'bold',
        color: '#404040',
        padding: 20
    }
});
