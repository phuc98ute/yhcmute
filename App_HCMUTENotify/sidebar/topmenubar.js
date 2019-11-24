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
import {Body, Button, Header, Left, Title} from "native-base";
import Icon from "react-native-vector-icons/Entypo";

export default class Topmenubar extends Component {
    render(){
        return(
            <Header hasSegment style={{ backgroundColor:"#FFFFFF" }}
                    androidStatusBarColor="#CCCCCC">
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name="menu" size={30} color="black" />
                    </Button>
                </Left>
                <Body>
                    <Title style={{justifyContent: 'center', color: 'black',fontSize:13}}>Hoạt động đang diễn ra</Title>
                </Body>
            </Header>
        )
    }
}
