import React, {Component} from 'react'
import {StyleSheet,View,Image,TouchableWithoutFeedback,StatusBar,
    TextInput,SafeAreaView,Keyboard,TouchableOpacity,
    KeyboardAvoidingView, FlatList,ActivityIndicator,
    ToastAndroid,Dimensions,Animated,AsyncStorage ,BackHandler} 
    from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Link} from 'react-router-native';
//import { Icon } from 'react-native-elements';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import jwtDecode from 'jwt-decode';
import { ConfirmDialog, ProgressDialog } from "react-native-simple-dialogs";
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Entypo';
import { Container, Header, Title, Left, Right, Button, Body, Content,Text, Card, CardItem, Segment } from "native-base";

const Screen = Dimensions.get('window')
const SideMenuWidth = 300
const RemainingWidth = Screen.width - SideMenuWidth

export default class Activity extends Component{
    static navigationOptions={
        header:null
    };
    constructor() {
        super()
        this.state={
            dataSource:[],
            isLoading:true,
            visible:false,
            dialogVisible: false,
            activytyName:'',
            activityContent:'',
            activityId:'',
            activityImage:'',
            activePage:1,
            keyword:"",
            showLoading:false,
        }
    }

    selectComponent = (activePage) => () => this.setState({activePage,showLoading:true})

    _renderComponent = () => {
        

        if(this.state.activePage === 1)
        {
            fetch(`${Config.API_URL}/api/v1/activities/getByStudents/school?keyword=${this.state.keyword}&status=PIP&page=0&size=2147483647`)
                .then((Response) => Response.json())
                .then((ResponseJson) => {
                    this.setState({
                        dataSource: ResponseJson.data,
                        showLoading: false
                    })
                })
                .catch((error) => {
                    console.log(error)
                }) 
          return (
              <View>
                  <View style={{ height: '93%' }}>
                      <FlatList
                          data={this.state.dataSource}
                          renderItem={this.renderItem}
                          keyExtractor={(item, index) => index.toString()}
                      />
                  </View>

              </View>
          )
        }
        if(this.state.activePage === 2) {
            AsyncStorage.getItem('access_token', (err, result) => {
                if (result != null) {
                    var Response = fetch(`${Config.API_URL}/api/v1/activities/getByStudents/faculty?keyword=${this.state.keyword}&status=PIP&unit=yfit&page=0&size=2147483647`,
                        {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + result,
                            },

                        })
                        .then(Response => Response.json()
                        )
                        .then(ResponseJson => {
                            if(ResponseJson.isSuccess=="true")
                            {
                                this.setState({
                                    dataSource: ResponseJson.data,
                                    showLoading: false,
    
                                });
                            }
                            console.log(ResponseJson.data)
                            
                        })
                        .catch(error => {
                            console.log(error);
                            
                        });
                }
            }
            )
            return (
                <View>
                    <View style={{ height: '93%' }}>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                </View>
            )
      }
    }

    renderItem = ({ item }) => {
        const { navigate } = this.props.navigation;
                 
        return (
            <TouchableOpacity style={{ flex: 1, flexDirection:'column',marginBottom:3  }}
                onPress={()=>{this.setState({dialogVisible:true,activytyName:item.actName,activityContent:item.actContent,activityId:item.id,activityImage:item.image});
                navigate('signingactivity', { actName:item.actName,actContent:item.actContent,activityImage:item.image,activityId:item.id,activyLevel:item.activityLevel.unit });}}
                
            >
            
                <View style={{ flex: 1, flexDirection: 'row' }} >

                    <View style={styles.container}>

                        <Image source={{ uri: item.image }} style={styles.photo} />
                        <View style={styles.container_text}>
                            <Text style={styles.title}>
                                {item.actName}
                            </Text>
                            <Text style={styles.description}>
                            
                            {
                                (item.actContent==null?"Không có nội dung!":item.actContent.substring(1,200))
                            }
                                {/* {item.actContent.substring(1, 200)} */}
                                {/* {item.actContent} */}
                            </Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )

    }

    renderSeparator= () => {
        return(
            <View>
                style={{height:1,width:'100%',backgroundColor:'black'}}
            </View>
        )
    }

    componentDidMount() {
        
        fetch( `${Config.API_URL}/api/v1/activities/getByStudents/school?keyword=${this.state.keyword}&status=PIP&page=0&size=2147483647`)
            .then((Response) => Response.json())
            .then((ResponseJson) => {
                this.setState({
                    dataSource: ResponseJson.data,
                    isLoading:false
                })
            })
            .catch((error) => {
                console.log(error)
            })

        // this._renderComponent;
        
            
    }
    handleBackButtonClick() {
        //this.props.navigation.goBack(null);
        return true;
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
     } 
     componentWillUnmount() {
        //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleClick = ()=>{
        this.setState({dialogVisible:false})
    }

    render() {
        return (
            this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
                <ActivityIndicator size="large" color="330066" animating />
            </View>
            :
                <Container style={{flex:1}} >
                    <Header style={{ backgroundColor: '#CCCCCC' }}
                        androidStatusBarColor="#CCCCCC">
                        <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Title style={{ justifyContent: 'center', color: '#3366CC', fontWeight: 'bold', fontSize: 15 }}>ỨNG DỤNG QUẢN LÝ HOẠT ĐỘNG ĐOÀN - HỘI</Title>
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
                    
                    <Segment style={{backgroundColor:"#FFFFFF"}}>
                        <Button first active={this.state.activePage === 1} 
                        style={{
                            backgroundColor: this.state.activePage === 1 ? "#CCCCCC" : undefined,
									borderColor: "3366CC",
                        }}
                                onPress={this.selectComponent(1)}>
                            <Text style={{ color: this.state.activePage === 1 ? "#3366CC" : undefined }}>Cấp trường</Text>
                        </Button>
                        
                        <Button last active={this.state.activePage === 2}
                        style={{
                            backgroundColor: this.state.activePage === 2 ? "#CCCCCC" : undefined,
									borderColor: "3366CC",
                        }}
                                onPress={this.selectComponent(2)}>
                            <Text style={{ color: this.state.activePage === 2 ? "#3366CC" : undefined }}>Cấp khoa</Text>
                        </Button>
                    </Segment>
                    <View style={{height:1, backgroundColor:'black'}}></View>
                    {this._renderComponent()}
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
        color: '#000',
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
        borderRadius:20,
    },
});