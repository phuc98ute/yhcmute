/** @format */

import {AppRegistry} from 'react-native';
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
import bgMessaging from './bgMessaging';


const AppNavigator = createStackNavigator({
        Login: {screen: Login},
        Activity: {screen: Activity},
        SignActivity: {screen: SignActivity},
        Profile: {screen: Profile},
        Signup: {screen: Signup},
        signingactivity: {screen: signingactivity},
        ChangeProfile: {screen: changeProfile},
        RatingComponet: {screen: ratingComponet}
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

const HomeScreenRouter = createDrawerNavigator(
    {
        Login: {screen: Login},
        Activity: {screen: Activity},
        SignActivity: {screen: SignActivity},
        Profile: {screen: Profile},
        Signup: {screen: Signup},
        signingactivity: {screen: signingactivity},
        ChangeProfile: {screen: changeProfile},
        RatingComponet: {screen: ratingComponet}
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
);
export default HomeScreenRouter;
AppRegistry.registerComponent(appName, () => HomeScreenRouter);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line
