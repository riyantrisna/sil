import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, AsyncStorage } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Functions from './lib/Functions';

export default class Setting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lang: AsyncStorage.getItem('lang')
        }
    }

    render() {
        return (
            <Container>
                <Header style={styles.headerText}>
                    <Left>
                        <Button transparent onPress={() => { Actions.drawerOpen() }}>
                            <Icons name='menu' color="#ffffff" size={25} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{Functions.langText('setting', this.state.lang)}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                        <StatusBar barStyle="light-content" backgroundColor="#000000" />
                        <Text>Setting</Text>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        backgroundColor: '#005c00',
    }
});
