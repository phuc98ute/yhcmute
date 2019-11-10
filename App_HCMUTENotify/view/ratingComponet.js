import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity, Dimensions, ScrollView, FlatList, BackHandler, ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Title, Left, Right, Button, Body, Content,Text, Card, CardItem, Item } from "native-base";
import {Rating} from 'react-native-ratings'

import Icon from 'react-native-vector-icons/Entypo';
import Config from "react-native-config";

const WATER_IMAGE = require('../source/Hcmute.png')

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const logobar=deviceWidth*0.1;


export default class ratingComponent extends Component {
    rating=0;
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state={
            actName:this.props.navigation.state.params.actName,
            actContent:this.props.navigation.state.params.actContent,
            activityId:this.props.navigation.state.params.activityId,
            dialogVisible:false,
            message:"",
            isTrue:false,
            rating:0,
            item: props.item,
            token:"",

        };
        this.sizeRef = React.createRef();
    }


    componentDidMount() {

    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.navigate("Profile",{});
        return true;
    }

    

    _handleRating = () =>{

        console.log(this.state.rating)
        AsyncStorage.getItem('access_token', (err, result) => {
            this.setState({token:result})

        }).then((result)=>{
            console.log(this.rating)
            if (result != null) {
                var res = fetch(
                    `${Config.API_URL}/api/v1/activity/rating?id=${this.state.activityId}&mark=${this.state.rating}`,
                    {
                        method: "PUT",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            'Authorization': 'Bearer ' + result,
                        },
                    }
                )
                    .then((Response) => Response.json()
                    )
                    .then((ResponseJson) => {
                        console.log('resJson')
                        console.log(ResponseJson)
                        // this.setState({showLoading: false});
                        // if (ResponseJson.status === "METHOD_NOT_ALLOWED") {
                        //     ToastAndroid.show("Lỗi không đổi được mật khẩu!", ToastAndroid.LONG)
                        // } else {
                        //     AsyncStorage.clear(), this.props.navigation.navigate("Login", {});
                        // }
                    })
                    .catch(err => {
                        console.log("ERR", err),
                            ToastAndroid.show("Lỗi!", ToastAndroid.LONG);
                    });
            }
        })
    }
    ratingCompleted(rating)  {
        console.log("Rating is: " + this.props)
        this.rating=rating;
        console.log(this.rating)
      };

      
    render() {
        const { rating, item } = this.state;
        var { navigate } = this.props.navigation;
        return (
            <Container >
               <Header style={{ backgroundColor: '#CCCCCC' }}
                            androidStatusBarColor="#CCCCCC">
                            <Body style={{ alignItems: 'center', flex: 1 }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Image style={{ height: logobar, width: logobar, flex: 1, margin: 10 }} source={require("../source/logodoan.png")}></Image>
                                    <Title style={{ flex: 8, marginTop: 20, justifyContent: 'center', color: '#0000DD', fontWeight: 'bold', fontSize: 13 }}>ỨNG DỤNG QUẢN LÝ HOẠT ĐỘNG ĐOÀN - HỘI</Title>
                                    <Image style={{ height: logobar, width: logobar, flex: 1, margin: 10 }} source={require("../source/logohoi.png")}></Image>
                                </View>
    
                            </Body>
                        </Header>
                        <Header style={{ backgroundColor:"#FFFFFF" }}
                                androidStatusBarColor="#CCCCCC">
                            <Left>
                                <Button
                                    transparent
                                    onPress={() => this.props.navigation.openDrawer()}>
                                    {/* <Icon name="menu" color="black" /> */}
                                    <Icon name="menu" size={30} color="black" />
                                </Button>
                            </Left>
                            <Body>
                                <Title style={{justifyContent: 'center', color: 'black'}}>Đánh giá hoạt động </Title>
                            </Body>
                            
                        </Header>
              <View>
                <View style={{ height: '93%' }}>
                    <Text style={{color:'black', fontSize:25,textAlign:'center',fontWeight:'bold'}}>{this.state.actName} </Text>

                    <Text style={{color:'#47515F', fontSize:20,textAlign:'center',}}>Bạn hãy đánh giá hoạt động đã tham gia nhằm nâng cao chất lượng hoạt động của đơn vị! Xin cảm ơn </Text>

                    <Rating
                        ref={this.sizeRef}
                        type='star'
                        ratingCount={5}
                        startingValue={0}
                        imageSize={60}
                        showRating
                        onFinishRating={rating => this.setState({rating})}
                    />
                    <TouchableOpacity style={styles.buttonContainer}
                                      onPress={this._handleRating}>
                        <Text style={styles.buttonText}>Gửi</Text>
                    </TouchableOpacity>
                    </View>

                </View>

            </Container>
        );
    }
}

const styles= StyleSheet.create({
    title:{
        color:'#3366CC',
        fontSize:30,
        textAlign:'center',
        marginTop:30,
        opacity:0.9
    },
    inforContainer:{
        //position:'absolute',
        left:0,
        right:0,
        bottom:0,
        height:250,
        padding:20,
        //backgroundColor:'red'
    },
    input:{
        marginTop:20,
        height:40,
        backgroundColor:'rgba(144, 164, 174  ,0.7)' ,
        color:'#546E7A',
        //paddingHorizontal:10,
    },
    buttonContainer:{
        borderRadius:10,
        marginTop:10,
        backgroundColor:'#3366CC',
        paddingVertical:5,
    },
    buttonText:{
        textAlign:'center',
        color:'#FFFFFF',
        fontWeight:'bold',
        fontSize:18
    },
    dropDownModal:{
        height:40,
        marginTop:20,
        backgroundColor:'rgba(144, 164, 174  ,0.7)' ,
        color:'#546E7A',
        fontSize:50,
    }
})
