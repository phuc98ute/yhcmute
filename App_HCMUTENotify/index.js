/** @format */

import {AppRegistry,PermissionsAndroid} from 'react-native';
import {createStackNavigator,createDrawerNavigator,} from 'react-navigation';
import {name as appName} from './app.json';
import Login from './view/login'
import Signup from './view/signup';
import Activity from './view/Activity';
import SignActivity from './view/SignActivity';
import Profile from './view/Profile'
import React from 'react';
import SideBar from './sidebar/sidebar';
import signingactivity from './view/signingactivity';
import changeProfile from './view/ChangeProfile';
import ratingComponet from './view/ratingComponet';
import Forgetpass from "./view/Forgetpass";
import bgMessaging from './bgMessaging';
import Policy from './view/Policy';

const HomeScreenRouter = createDrawerNavigator(
    {
        Login: {screen: Login},
        Activity: {screen: Activity},
        SignActivity: {screen: SignActivity},
        Profile: {screen: Profile},
        Signup: {screen: Signup},
        signingactivity: {screen: signingactivity},
        ChangeProfile: {screen: changeProfile},
        RatingComponet: {screen: ratingComponet},
        ForgetPass : {screen: Forgetpass},
        SideBar : {screen: SideBar},
        Policy : {screen : Policy},
    }
    ,
    {
        contentComponent: props => <SideBar {...props} />
        //contentComponent: ({navigation}) =>  {return(<SideBar/>)}
    }
);

export default HomeScreenRouter;
AppRegistry.registerComponent(appName, () => HomeScreenRouter);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line

