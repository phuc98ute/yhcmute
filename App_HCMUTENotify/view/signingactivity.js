import React, {Component} from 'react'
import {StyleSheet,Alert,View,Image,TouchableWithoutFeedback,StatusBar,
TextInput,SafeAreaView,Keyboard,TouchableOpacity,KeyboardAvoidingView,ScrollView,Dimensions,BackHandler,AsyncStorage} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";

export default class signingactivity extends Component{
    static navigationOptions={
        title:'Đăng kí thông tin tài khoản',
        headerMode:'screen'
    };
    constructor(props) {
        super(props)
        this.state={
            actName: this.props.navigation.state.params.actName,
            actContent:this.props.navigation.state.params.actContent,
            activityImage:this.props.navigation.state.params.activityImage,
            activityId:this.props.navigation.state.params.activityId,
        };
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
     } 
     componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    _signActivity=()=>
    {
        this.props.navigation.navigate("Activity")
    }
    render (){
        const screenHeight = Dimensions.get('window').height;
        return (
            
            <Container >
                    <Header>
                        <Left>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name="menu" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Đăng kí hoạt động</Title>
                        </Body>
                        
                    </Header>
                <View>
                    <View style={styles.cover}>
                        <Image style={styles.photocover} source={{uri:this.state.activityImage}}></Image>
                    </View>
                   
                    {/* <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} /> */}
                    <View style={{ height: '61%' }}>
                        <ScrollView>
                            <Text style={styles.name}>{this.state.actName}</Text>
                            <Text style={styles.info}>Khoa Công nghệ Thông tin/ Cấp trường</Text>
                            <Text style={styles.description}>{this.state.actContent}</Text>

                        </ScrollView>
                    </View>
                    <View style={{flex:1,flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={this._signActivity}
                        >
                            <Text style={styles.buttonText}>Đăng kí ngay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={()=>this.props.navigation.navigate("Activity")}
                        >
                            <Text style={styles.buttonText}>Trở lại</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>

            </Container>
        )
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
        width:'20%',
        margin:5
        
    },
    buttonText:{
        textAlign:'center',
        color:'#FFFFFF',
        fontWeight:'bold',
        fontSize:18
    },
    doropDownModal:{
        height:40,
        marginTop:20,
        backgroundColor:'rgba(144, 164, 174  ,0.7)' ,
        color:'#546E7A',
        fontSize:25
    },
    cover:{
        //backgroundColor: "#00BFFF",
        height:'20%',
        borderRadius:10,
        margin:10,
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
      },
      name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600",
        textAlign: 'center'
      },
      info:{
        fontSize:16,
        color: "#00BFFF",
        marginTop:10,
        textAlign:'center',
      },
      description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
      },
      photocover:{
          height:'100%',
      }
})
