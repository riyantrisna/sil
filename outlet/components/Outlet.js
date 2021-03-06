import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, AsyncStorage, TextInput, FlatList, BackHandler, RefreshControl, Alert } from 'react-native';
import { Container, Content, Header, Body, Title, Toast, Right, Button } from 'native-base';
import Icons from 'react-native-vector-icons/MaterialIcons';
import IconsEntypo from 'react-native-vector-icons/Entypo';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
import Functions from './lib/Functions';
import Config from './config/Config';
import axios from 'axios';

export default class Operator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSpiner: true,
            outlet: null,
            filterShow: false,
            refreshing: false,
            users: {},
        }

        this.arrayoutlet = null;
        
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._alertExit);
    }

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this._alertExit);
        this._loadOutlet();
    }

    _onRefresh(){
        this.setState({refreshing: true});
        this._loadOutlet().then(() => {
            this.setState({refreshing: false});
        });
    }

    render() {
        return (
            <Container style={styles.container}>
                {this._headerComponent()}
                <Content>
                    <Spinner visible={this.state.showSpiner} textStyle={{color: '#005c00'}} color='#005c00' />
                    <StatusBar barStyle="light-content" backgroundColor="#000000" />
                    <View>
                        <FlatList
                            data = {this.state.outlet}
                            keyExtractor={(item, index) => item.outlet_id}
                            renderItem = {({ item }) =>
                                <TouchableOpacity onPress={() => { this._selectOutlet(item.outlet_id) }} style={styles.listItem}>
                                    <IconsEntypo name='shop' size={25} style={{padding: 20, color: '#404040'}} />
                                    <Text style={styles.listText}>{item.outlet_name}</Text>
                                    <Icons name='navigate-next' size={25} style={{padding: 20, color: '#404040'}} />
                                </TouchableOpacity>
                            }
                            refreshControl = {
                                <RefreshControl
                                    refreshing = {this.state.refreshing}
                                    onRefresh = {this._onRefresh.bind(this)}
                                    colors={["#005c00"]}
                                />
                            }
                        />
                    </View>
                </Content>
            </Container> 
        )
    }

    _headerComponent = () => {

        if(this.state.filterShow){
            return(
                <Header style={styles.headerText}>
                    
                    <Button transparent onPress={this._hideFilter} style={{paddingLeft: 10, marginLeft: 0}}>
                        <Icons name='arrow-back' color="#ffffff" size={25} style={{paddingLeft: 0, marginLeft: 0}} />
                    </Button>

                    <TextInput 
                    placeholder={Functions.langText('cari', this.state.users.lang)}
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    autoFocus = {true}
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    selectionColor={'#ffffff'}
                    ref={(input) => this.filterInput = input}
                    onChangeText={(filter) => this._searchFilter(filter)}
                    />

                    <Button transparent onPress={this._clearFilter} style={{paddingRight: 10, marginRight: 0}}>
                        <Icons name='clear' color="#ffffff" size={25} style={{paddingRight: 0, marginRight: 0}}/>
                    </Button>
                    
                </Header>
            )
        }else{
            return(
                <Header style={styles.headerText}>
                    <Body style={{paddingLeft: 15}}>
                        <Title>{Functions.langText('pilihoutlet', this.state.users.lang)}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this._showFilter}>
                            <Icons name='search' color="#ffffff" size={25} />
                        </Button>
                    </Right>
                </Header>
            )
        }
        
    }

    _showFilter = () => {
        this.setState({filterShow: true});
    }
    
    _hideFilter = () => {
        this.setState({filterShow: false});
        this._searchFilter('');
    }

    _clearFilter = () => {
        this.filterInput.clear();
        this._searchFilter('');
    }

    _searchFilter = (text) => {
        const newData = this.arrayoutlet.filter(item => {
            const itemData = `${item.outlet_name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            outlet: newData,
        });
    }

    _selectOutlet = (outletId) => {
        AsyncStorage.setItem('outletId', outletId);
        Actions.reset('drawer');
    }

    _loadOutlet = async () =>{

        await AsyncStorage.getItem('users').then((data) => {
            if(!Functions.isEmpty(data)){
                var datas = JSON.parse(data);
                this.setState({
                    users: datas
                });
            }
        });

        if(Functions.isEmpty(this.state.users.syek)){
            
            Actions.reset('login');
        
        }else{

            await axios({
                method: 'GET',
                headers: 
                { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.state.users.syek
                },
                url: Config.app.base_api + 'outletbycompanyid'
            })
            .then((response) => {
                this.setState({showSpiner: false});
    
                if(response.data.status === '401'){
                    Actions.reset('login');
                    return null;
                }else{
                    this.setState({
                        outlet: response.data.data,
                        showSpiner: false
                    });
                    this.arrayoutlet = response.data.data;
                }
            })
            .catch((error) => {
                Toast.show({
                    text: Functions.langText('gagal_load_data', this.state.users.lang),
                    textStyle: { textAlign: 'center', fontSize: 14 },
                    duration: 3000,
                    type: 'danger',
                    position: 'top'
                })
    
                this.setState({showSpiner: false});
                return null;
            });
            
        }
    }

    _alertExit = () => {
        Alert.alert(
            '',
            Functions.langText('keluar_app', this.state.users.lang)+'?',
            [
                {
                    text: 'Logout', onPress: () => Actions.reset('login')
                },
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
    },
    headerText: {
        backgroundColor: '#005c00',
        padding: 0
    },
    input: {
        flex: 1,
        marginVertical: 0,
        marginHorizontal: 10,
        width: '80%',
        color: '#ffffff',
        opacity: 0.9
    },
    listItem: {
        flexDirection: "row", 
        alignItems: "center", 
        borderBottomColor: '#dddddd', 
        borderBottomWidth: 1
    },
    listText: {
        flex: 1, 
        flexWrap: 'wrap', 
        fontWeight: 'bold',
        color: '#404040'
    }
});
