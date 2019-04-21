/** @format */

import {AppRegistry} from 'react-native';
import {NativeRouter,Switch} from 'react-router-native';
import {name as appName} from './app.json';
import Login from './view/login'
import Signup from './view/signup';
import Main from './view/main';
import Activity from './view/Activity';
import SignActivity from './view/SignActivity';
import Profile from './view/Profile'
import {LoginScreen,SignupScreen} from './screenName';
import  { createDrawerNavigator,StackNavigator }  from 'react-navigation';
import React, { Component } from 'react';
import SideBar from './sidebar/sidebar';
import signingactivity from './view/signingactivity';

// export const Routers=()=>(
//     <NativeRouter initialEntries={["/listing/find"]}>
//     <Switch>
//         <View>
//             <Route exact={true} path="/login" Component={Login}/>
//             <Route exact={true} path="/signup" Component={Signup}/>
//             <Route
//             exact={true}
//             path="listing/create"
//             Component={CreateListingConnector}
//             />
//         </View>
//     </Switch>
//     </NativeRouter>
// )

// const Navigation = createStackNavigator({
//     First:{screen:Login},
//     Second:{screen:Signup},
//     Main:{screen:Main},
//     Activity:{screen:Activity},
//     SignActivity:{screen:SignActivity},
    
// },{headerMode: 'screen'});

// AppRegistry.registerComponent(appName, () => Navigation);
// const Profile1Stack = StackNavigator(
//   {
//     profile: {
//       screen: Profile1,
//       path: '/',
//     },
    
//   },
//   {
//     mode: 'card',
//   }
// )
const HomeScreenRouter = createDrawerNavigator(
    {
      Login: { screen: Login},
      Activity: { screen: Activity},
      SignActivity: { screen: SignActivity },
      Profile:{screen: Profile},
      Signup:{screen:Signup},
      signingactivity:{screen:signingactivity},
    },
    {
      contentComponent: props => <SideBar {...props} />
    }
  );
  //export default HomeScreenRouter;
  AppRegistry.registerComponent(appName, () => HomeScreenRouter);
