import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Root } from "native-base";
import { Router, Scene } from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/MaterialIcons';

import Login from './Login';
import Splash from './Splash';
import ForgetPassword from './ForgetPassword';
import Outlet from './Outlet';
import SideMenu from './SideMenu';
import Home from './Home';
import Setting from './Setting';

export default class routing extends Component {
  
	render() {
		return (
			<Root>
                <Router>
                    <Scene key="root">
                        <Scene
                        key="splash"
                        component={Splash}
                        hideNavBar
                        initial={true}
                        />
                        <Scene
                        key="login"
                        component={Login}
                        hideNavBar
                        />
                        <Scene
                        key="forgetpassword"
                        component={ForgetPassword}
                        hideNavBar
                        />
                        <Scene
                        key="outlet"
                        component={Outlet}
                        hideNavBar
                        />
                        <Scene
                        key="drawer"
                        drawer
                        contentComponent={SideMenu}
                        drawerIcon={<Icons name="menu" size={25} color="#ffffff" />}
                        drawerWidth={300}
                        hideNavBar
                        >
                            <Scene
                            key="home"
                            component={Home}
                            hideNavBar
                            />
                            <Scene
                            key="setting"
                            component={Setting}
                            hideNavBar
                            />
                        </Scene>
                    </Scene>
                </Router>
            </Root>
		);
	}
}