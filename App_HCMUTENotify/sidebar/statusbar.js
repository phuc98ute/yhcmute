import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ToastAndroid,
    Dimensions,
    Platform,
    DeviceEventEmitter,
    Alert,
} from "react-native";
import styles from '../css/styles';
import {Body, Header, Title} from "native-base";

export default class Statusbar extends Component {
    render(){
        return(
            <Header style={{ backgroundColor: '#CCCCCC' }}
                    androidStatusBarColor="#CCCCCC">
                <Body style={styles.bodyStatus}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Image style={styles.logoStatusbar} source={require("../source/logodoan.png")}></Image>
                        <Title style={styles.titleStatusbar}>ỨNG DỤNG QUẢN LÝ HOẠT ĐỘNG ĐOÀN - HỘI</Title>
                        <Image style={styles.logoStatusbar} source={require("../source/logohoi.png")}></Image>
                    </View>
                </Body>
            </Header>
        )
    }
}
