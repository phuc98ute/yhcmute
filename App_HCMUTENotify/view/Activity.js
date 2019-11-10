import React, {Component} from 'react'
import {StyleSheet,View,Image,TouchableWithoutFeedback,StatusBar,
    TextInput,SafeAreaView,Keyboard,TouchableOpacity,
    KeyboardAvoidingView, FlatList,ActivityIndicator,
    ToastAndroid,Dimensions,Animated ,BackHandler,ScrollView}
    from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerActions } from 'react-navigation';
import jwtDecode from 'jwt-decode';
import { ConfirmDialog, ProgressDialog } from "react-native-simple-dialogs";
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Entypo';
import { Container, Header, Title, Left, Button, Body, Text, Segment } from "native-base";
import { TabView, SceneMap } from 'react-native-tab-view';
import Moment from 'moment';

const Screen = Dimensions.get('window')
const SideMenuWidth = 300
const RemainingWidth = Screen.width - SideMenuWidth;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const logobar=deviceWidth*0.1;

export default class Activity extends Component{
    static navigationOptions={
        header:null
    };
    constructor() {
        super();
        this.state={
            token:"",
            dataSource:[],
            dataSource1:[],
            isLoading:false,
            visible:false,
            dialogVisible: false,
            activytyName:'',
            activityContent:'',
            activityId:'',
            activityImage:'',
            activePage:1,
            keyword:"",
            showLoading:false,
            input:{
                page: 0,
                size: 20,
                levelCode: "vn.yhcmute.act.level.faculty",
                facultyId: "5dbd46af1d12841b60ce2837",
            },
            index: 0,
            routes: [
                {key: 'first', icon: 'backup-restore', title: 'CẤP TRƯỜNG'},
                {key: 'second', icon: 'heart',title: 'CẤP KHOA'},

            ],
            pageLoad:0,
        }
    }
    componentDidMount() {

        AsyncStorage.getItem('access_token', (err, result) => {
            this.setState({token:result})

        })
            .then(()=>{
                this.setState({showLoading:true})
                this._loadActivitySchool();
                this._loadActivityFaculity();
            })

    }
    renderItem = ({ item }) => {
        const { navigate } = this.props.navigation;
        const startDate=Moment(item.activityDescription.startDate).format('MMMM Do, YYYY H:mma');


        //const startDate=item.startDate;
        return (
            <TouchableOpacity style={{ flex: 1, flexDirection:'column',marginBottom:3  }}
                 onPress={()=>{this.setState({dialogVisible:true,activytyName:item.name,activityContent:item.activityDescription.content,activityId:item.id,activityImage:item.activityDescription.coverImage});
                 navigate('signingactivity', { actName:item.name,actContent:item.activityDescription.content,activityImage:item.activityDescription.coverImage,activityId:item.id,activyLevel:item.activityLevel.name });}}
            >
                <View style={{ flex: 1, flexDirection: 'row' }} >
                    <View style={styles.container}>
                        <Image style={styles.photo} source={ item.activityDescription.coverImage===null ?  require('../source/noimageBackground.png') : {uri:item.activityDescription.coverImage}} />
                        <View style={styles.container_text}>
                            <Text style={styles.title}>
                                {item.name}
                            </Text>
                            <Text style={styles.description}>
                            - Thời gian :
                            {
                                (item.activityDescription.startDate==null?" không có thời gian cụ thể":Moment(item.activityDescription.startRegisCollaborator).format('l'))
                                //(item.startDate===null?" không có thời gian cụ thể":item.startDate)
                            }
                            </Text>
                            <Text style={styles.description}>
                            {
                                (item.activityDescription.content==null?" toàn trường":(item.activityDescription.content).substring(0,250)+" . . .")
                            }
                            </Text>
                            <Text style={styles.description}>
                                Đơn vị quản lý: Khoa
                                {
                                    " "+(item.faculty.vnName)
                                }
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    _loadActivitySchool =()=> {
        var result = this.state.token;
        if (result != null) {

            fetch(`${Config.API_URL}/api/v1/activity/getActivitiesForStudent`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + result,
                    },
                    body:
                        JSON.stringify({
                            "page": this.state.pageLoad,
                            "size": 5,
                            "levelCode": "vn.yhcmute.act.level.school",
                            "facultyId": "5dbd46af1d12841b60ce2837"
                        }),
                })
                .then((Response) => Response.json())
                .then((ResponseJson) => {

                    this.setState({
                        dataSource: ResponseJson.result,
                        showLoading: false
                    })

                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
    _loadActivityFaculity =()=> {
        var result = this.state.token;
        if (result != null) {

            //fetch datsSouce
            fetch(`${Config.API_URL}/api/v1/activity/getActivitiesForStudent`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+result,
                    },
                    body:
                        JSON.stringify({
                            "page": this.state.pageLoad,
                            "size": 5,
                            "levelCode": "vn.yhcmute.act.level.faculty",
                            "facultyId": "5dbd46af1d12841b60ce2837"
                        }),
                })
                .then((Response) => Response.json())
                .then((ResponseJson) => {
                    this.setState({
                        dataSource1: ResponseJson.result,
                        showLoading: false
                    })

                })
                .catch((error) => {
                    console.log(error)
                })


        } else {
            console.log('loi cmr')
        }
    }

    handleClick = ()=>{
        this.setState({dialogVisible:false})
    }
    _handleLoadMore=()=>{
        if (!this.onEndReachedCalledDuringMomentum) {
            console.warn("loadmore")
            this.onEndReachedCalledDuringMomentum = true;
        }
    }
    _renderScene = ({ route }) => {
        //this.setState({"pageLoad":0})
        switch (route.key) {
            case 'first': {
                if (this.state.dataSource && this.state.dataSource.length) {
                    return (
                        <View>
                            <View style={{height: '100%'}}>
                                <FlatList

                                    data={this.state.dataSource}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    //onEndReachedThreshold={0}
                                    //onEndReached={console.warn("loadMore")}

                                />
                            </View>

                        </View>
                    )
                }
                else {
                    return (
                        <View style={{height:'100%'}}>
                            <Text> Không có hoạt động nào tồn tại ! </Text>
                        </View>
                    )
                }


            }

            case 'second':
                if (this.state.dataSource1 && this.state.dataSource1.length) {
                    return (
                        <View>
                            <View style={{height: '100%'}}>
                                <FlatList
                                    data={this.state.dataSource1}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    onEndReached={console.warn("loadMore")}
                                    //onEndReachedThreshold={0}
                                />
                            </View>

                        </View>
                    )
                }
                else {
                    return (
                        <View style={{height:'100%'}}>
                            <Text> Không có hoạt động nào tồn tại ! </Text>
                        </View>
                    )
                }

            default:
                return null;
        }
    };

    _scrollEnd = (evt) => {
        console.warn("end")
        this.refs.flatList1.scrollToEnd();
    }

    render() {
        return  (
            this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
                <ActivityIndicator size="large" color="330066" animating />
            </View>
            :
                <Container style={{flex:1}} >
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
                    <Header hasSegment style={{ backgroundColor:"#FFFFFF" }}
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
                            <Title style={{justifyContent: 'center', color: 'black'}}>Hoạt động đang diễn ra</Title>
                        </Body>
                        
                    </Header>
                        <FlatList

                            style={{ flex:1}}
                            ref="flatList1"
                            data={this.state.dataSource1}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            //onEndReached={this._handleLoadMore()}
                            //onEndReachedThreshold={console.warn("onEndReachedThreshold")}

                        />


                    {/*<TabView*/}
                    {/*    navigationState={this.state}*/}
                    {/*    renderScene={this._renderScene}*/}
                    {/*    onIndexChange={index => this.setState({ index })}*/}
                    {/*    initialLayout={{ width: Dimensions.get('window').width }}*/}
                    {/*/>*/}
                    <View style={{height:1, backgroundColor:'black'}}></View>
                    {/*{this._renderComponent()}*/}
                    <ProgressDialog
                  style={{borderRadius:10}}
                  visible={this.state.showLoading}
                  title="Đang kết nối đến server"
                  activityIndicatorColor="blue"
                  activityIndicatorSize="large"
                  animationType="slide"
                  message="Vui lòng chờ trong giây lát ..."
                />
                    
                </Container>
        )
    
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    title: {
        fontSize: 16,
        color: '#0000DD',
        fontWeight:"bold",
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
        borderRadius:30,
    },
    scene: {
        flex: 1,
    },
});