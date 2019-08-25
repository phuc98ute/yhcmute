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
import changeProfile from './view/ChangeProfile';
import ratingComponet from './view/ratingComponet';

const HomeScreenRouter = createDrawerNavigator(
    {
      Login: { screen: Login},
      Activity: { screen: Activity},
      SignActivity: { screen: SignActivity },
      Profile:{screen: Profile},
      Signup:{screen:Signup},
      signingactivity:{screen:signingactivity},
      ChangeProfile:{screen:changeProfile},
      RatingComponet:{screen : ratingComponet}
    },
    {
      contentComponent: props => <SideBar {...props} />
    }
  );
  AppRegistry.registerComponent(appName, () => HomeScreenRouter);
