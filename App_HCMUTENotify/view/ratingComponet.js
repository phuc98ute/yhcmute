import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,Dimensions,ScrollView,AsyncStorage,FlatList
} from 'react-native';
import { Container, Header, Title, Left, Right, Button, Body, Content,Text, Card, CardItem, Item } from "native-base";

import Icon from 'react-native-vector-icons/Entypo';

const WATER_IMAGE = require('../source/Hcmute.png')

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const logobar=deviceWidth*0.1;


export default class ratingComponent extends Component {

    constructor(props) {
        super(props)
        this.state={
            actName: this.props.navigation.state.params.actName,
            actContent:this.props.navigation.state.params.actContent,
            activityId:this.props.navigation.state.params.activityId,
            dialogVisible:false,
            message:"",
            isTrue:false,
            rating:0,
            item: props.item,

        };
    }

    componentDidMount() {

    }

    


    ratingCompleted(rating)  {
        console.log("Rating is: " + rating);
        //this.setState({rating:rating})
        
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

                       
                    </View>
                </View>

            </Container>
        );
    }
}
