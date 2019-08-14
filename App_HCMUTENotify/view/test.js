import React,{Component} from 'react'

import {View,Text,KeyboardAvoidingView,TextInput, StyleSheet,
    Image,  ToastAndroid,
    Dimensions,} from 'react-native';
import {Header, Title,Body} from 'native-base'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const logoHeight = deviceHeight - 55 - 600;
const logobar = deviceWidth * 0.1;
const bottomFlex = logoHeight < 0 ? 0 : logoHeight;
const fontSize = logoHeight < 0 ? 11 : 13;

export default class test extends React.Component {
    constructor (props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <View style={{flex:1, backgroundColor: '#GGGGGG', justifyContent: 'flex-end' }}>
                    <View style={{ height:100, backgroundColor: "#FFFFFF" }}>
                        <Header style={{ backgroundColor: '#CCCCCC' }}
                            androidStatusBarColor="#CCCCCC">
                            <Body style={{ alignItems: 'center', height:50}}>
                                <View style={{ flex: 1, flexDirection: 'row'}}>
                                    <Image style={{ height: logobar, width: logobar + 2, flex: 1, margin: 10 }} source={require("../source/logodoan.png")}></Image>
                                    <Title style={{ flex: 8, marginTop: 20, justifyContent: 'space-around', color: '#0000DD', fontWeight: 'bold', fontSize: fontSize }}>ỨNG DỤNG QUẢN LÝ HOẠT ĐỘNG ĐOÀN - HỘI</Title>
                                    <Image style={{ height: logobar, width: logobar + 2, flex: 1, margin: 10 }} source={require("../source/logohoi.png")}></Image>
                                </View>
                            </Body>
                        </Header>
                    </View>

                    <View
                        style={{
                            backgroundColor: "#FFFFFF",
                            height:100,
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={require("../source/banner.png")}
                            style={{ width: deviceWidth, height: (deviceWidth) * 0.23 }}
                        />
                    </View>
                    <View style={{
                        alignItems: 'center',
                        backgroundColor: 'yellow',
                        height:100,
                    }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                style={{
                                    width: deviceHeight * 0.15,
                                    height: deviceHeight * 0.15,
                                }}
                                source={require("../source/logodoan.png")}
                            />
                            <Image
                                style={{
                                    width: deviceHeight * 0.15,
                                    height: deviceHeight * 0.15,
                                }}
                                source={require("../source/logohoi.png")}
                            />
                        </View>
                    </View>
                    <View style={{ height:100,marginBottom: 5, justifyContent: 'flex-end', backgroundColor: '#DDDDDD' }}>
                        <Text style={{
                            color: "#0000DD",
                            fontSize: 30,
                            fontWeight: 'bold',
                            textAlign: "center",
                            // marginTop: 30,
                            opacity: 1
                        }}>
                            Y_HCMUTE
                </Text>
                        <Text style={{
                            color: "#0000DD",
                            fontSize: fontSize + 4,
                            textAlign: "center",
                            // marginBottom: 20,
                            fontWeight: 'bold',
                            // opacity: 0.9

                        }}>
                            ỨNG DỤNG QUẢN LÝ HOẠT ĐỘNG ĐOÀN - HỘI
                </Text>
                    </View>
                </View>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <View style={{ flex: 1, backgroundColor: '#CCCCCC', justifyContent: 'space-around' }}>
                        <Text style={{}}>Button day</Text>
                        <Text style={{}}>Button day</Text>
                        <TextInput style={{
                            width: '90%',
                            height: 50,
                            backgroundColor: "rgba(144, 164, 174  ,0.7)",
                            color: "#546E7A",
                            marginBottom: 10,
                            borderRadius: 30,
                            textAlign: 'center',
                        }}
                            placeholder="Nhập tên đăng nhập hoặc Email"
                            placeholderTextColor="rgba(84, 110, 122,0.8)"
                            keyboardType="email-address"
                            returnKeyType="next"></TextInput>
                    </View>
                </KeyboardAvoidingView>

            </View>
        )
    }
}