import  React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity, Dimensions, ScrollView, FlatList, ToastAndroid, BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ConfirmDialog, ProgressDialog } from "react-native-simple-dialogs";
import { Container, Header, Title, Left, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import Config from 'react-native-config';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import {Rating} from 'react-native-ratings'
import Moment from 'moment';
const Screen = Dimensions.get('window')
const SideMenuWidth = 300;
const RemainingWidth = Screen.width - SideMenuWidth;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const logobar=deviceWidth*0.1;

export default class Policy extends Component {
    constructor(){
        super();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state={

        }
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.navigate("Login",{});
        //this.props.back();
        return true;
    }

    render(){
        return(
            <View style={styles.home}>
                <ScrollView style={styles.home}>
                    <Text>
                        <Text styles={styles.h1}>Thỏa thuận Google Apps (miễn phí) này ("Thỏa thuận") này được lập bởi và giữa Google Inc., </Text>
                    </Text>
                </ScrollView>
            </View>
        )
    }

}

const styles=StyleSheet.create({
    home:{
        height:deviceHeight,
        width: deviceWidth
    },
    h1:{
        fontSize:15,

    }
})