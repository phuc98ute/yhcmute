import React, {Component} from 'react'
import {StyleSheet,Alert,View,Image,TouchableWithoutFeedback,StatusBar,
TextInput,SafeAreaView,Keyboard,TouchableOpacity,KeyboardAvoidingView,ScrollView,Dimensions,BackHandler,AsyncStorage} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import { ConfirmDialog } from 'react-native-simple-dialogs';
import Config from 'react-native-config';

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
            dialogVisible:false,
            activyLevel:this.props.navigation.state.params.activyLevel,
            message:"",
            isTrue:false,

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
        this.setState({dialogVisible:true});
        const { activityId,actName } = this.state;
        AsyncStorage.getItem('access_token', (err, result) => {
            if(result!=null){
                console.log(result)
            var Response=fetch(`${Config.API_URL}/api/v1/activities/registration/${activityId}`, 
            {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+result,
            },
            
        })
          .then(Response => Response.json()
          )
          .then(ResponseJson => {
            console.log(ResponseJson.isSuccess);
            this.setState({isTrue:ResponseJson.isSuccess});
            { this.state.isTrue=='false' ? this.setState({message:ResponseJson.errors[0].message}) : this.setState({message:"Đã đăng kí thành công, Xin cảm ơn!"}) };
            
            })
          .catch(error => {
            console.log(error);
          });
        }
    });
}
        // fetch(`https://yhcmute.herokuapp.com/api/v1/activities/registration/${activityId}`, {
        //     method: "POST",
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         'authorization': "Bearer "+ AsyncStorage.getItem("access_token"),
        //     }})
        //     // }}).then((Response) => Response.json())
        //     // .then((ResponseJson) => {
        //     //    Console.log(ResponseJson)
        //     // })
        //     // .catch((error) => {
        //     //     console.log(error)
        //     // }  
    render (){
        const screenHeight = Dimensions.get('window').height;
        return (
            
            <Container style={{flex:1}} >
                    {/* <Header stlye={{flex:2}}>
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
                        
                    </Header> */}
                    <Header style={{ backgroundColor: '#CCCCCC' }}
                        androidStatusBarColor="#CCCCCC">
                        <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View>
                            <Image style={{}} source={require("../source/logodoan.png")}></Image>
                            <Title style={{ justifyContent: 'center', color: '0000FF', fontWeight: 'bold', fontSize: 18 }}>ỨNG DỤNG QUẢN LÝ HOẠT ĐỘNG ĐOÀN - HỘI</Title>
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
                            <Title style={{justifyContent: 'center', color: 'black'}}>Đăng kí hoạt động</Title>
                        </Body>
                        
                    </Header>
                <View style={{flex:10}}>
                    <View style={styles.cover}>
                        <Image style={styles.photocover} source={{uri:this.state.activityImage}}></Image>
                    </View>
                    <View style={{ flex:10 }}>
                        <ScrollView>
                            <Text style={styles.name}>{this.state.actName}</Text>
                            <Text style={styles.info}>{this.state.activyLevel}</Text>
                            <Text style={styles.description}>{this.state.actContent}</Text>

                        </ScrollView>
                    </View>
                    <View style={{flex:2,flexDirection: 'row',alignItems:'center'}}>
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
                    <ConfirmDialog
                                    title="Thông báo đăng kí"
                                    message={this.state.message}
                                    visible={this.state.dialogVisible}
                                    onTouchOutside={() => this.setState({ dialogVisible: true })}
                                    positiveButton={{
                                        title: "Xác nhận", onPress:()=>{this.state.isTrue=='true' ? this.props.navigation.navigate("Activity", {}):this.setState({dialogVisible:false})}
                                    }}
                                />
                    
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
        backgroundColor:'#3366CC',
        paddingVertical:5,
        height:50,
        flex:1,
        marginHorizontal:5,
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
        flex:4,
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
