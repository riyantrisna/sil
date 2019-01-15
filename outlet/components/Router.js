import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Root } from "native-base";
import { Router, Scene } from 'react-native-router-flux';

import Login from './Login';
import Splash from './Splash';
import ForgetPassword from './ForgetPassword';
import Outlet from './Outlet';

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
                    </Scene>
                </Router>
            </Root>
		);
	}
}