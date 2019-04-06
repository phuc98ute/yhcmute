import React, {Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableWithoutFeedback,StatusBar,
    TextInput,SafeAreaView,Keyboard,TouchableOpacity,
    KeyboardAvoidingView, FlatList,ActivityIndicator,
    ToastAndroid} 
    from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { AsyncStorage ,BackHandler} from 'react-native';
import {Link} from 'react-router-native';
import { Icon } from 'react-native-elements';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import jwtDecode from 'jwt-decode';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import Config from 'react-native-config'

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
            activityId:''
        }
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ flex: 1, flexDirection:'column',marginBottom:3  }}
                onPress={()=>this.setState({dialogVisible:true,activytyName:item.actName,activityContent:item.actContent,activityId:item.id})}
                //     this.setState({ visible: true })
                // .then((Response) => Response.json())
                // .then((ResponseJson) => {
                //     this.setState({
                //         dataSource: ResponseJson.data,
                //         isLoading:false
                //     })
                // })
                // .catch((error) => {
                //     console.log(error)
                //})}
            >
                <View style={{ flex: 1, flexDirection:'row'}} >
                        {/* <Image style={{width:80,height:80,margin:5}}
                            source={require('../source/noimage.png')}
                            />
                        <View style={{justifyContent:"center",marginLeft:5, backgroundColor:''}}>
                            <Text style={{ fontSize:18,marginBottom:1,fontFamily: 'Time new roman'}} > {item.actName} </Text>
                            <Text style={{ fontSize:16,color:'red', marginBottom:1 }}>{item.actCode}</Text>
                            <Text style={{ fontSize:16,color:'red', marginBottom:1 }}>{item.actContent}</Text>
                        </View> */}
                        <View style={styles.container}>
                        <Image source={require('../source/noimage.png')} style={styles.photo} />
                        <View style={styles.container_text}>
                            <Text style={styles.title}>
                                {item.actName}
                            </Text>
                            <Text style={styles.description}>
                                {item.actContent}
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
        
        fetch( `${Config.API_URL}/api/v1/activities/list`)
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
            
    }
    handleBackButtonClick() {
        //this.props.navigation.goBack(null);
        return true;
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
     } 
     componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleClick = ()=>{
        this.setState({dialogVisible:false})
    }

    render() {
        var { navigate } = this.props.navigation;
        return (
            this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
                <ActivityIndicator size="large" color="330066" animating />
            </View>
            :
            <View>
                <View style={{ height:'93%'}}>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={this.renderItem}
                        keyExtractor={(item,index)=>index.toString()}
                        //ItemSeparatorComponent={this.renderSeparator}
                    />
                <ConfirmDialog
                    title={this.state.activytyName}
                    message={this.state.activityContent}
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => this.setState({dialogVisible: false})}
                    positiveButton={{
                        title: "Đăng kí",
                        onPress: ()=>{
                            try {
                                AsyncStorage.getItem('access_token', (err, result) => {
                                console.log(result);
                                if (result !== null) {
                                    var response = fetch (`${Config.API_URL}/api/v1/activities/registration/${this.state.activityId}`, {
                                        method: 'POST',
                                        headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization':'Bearer '+result,
                                        },
                                        body: JSON.stringify({
                                        
                                        }),
                                    })
                                    .then((response)=> {return response.json()})
                                    .then(response => {
                                        let ari=(response.isSuccess)
                                        if(ari=='true') 
                                        {
                                            ToastAndroid.show('Đã đăng kí thành công!',ToastAndroid.LONG);
                                            this.setState({dialogVisible: false})
                                        }
                                        if(ari=='false')
                                        { 
                                            let message=response.errors.map((val,title)=>
                                            { 
                                                ToastAndroid.show(val.message,ToastAndroid.LONG);
                                                this.setState({dialogVisible: false})
                                            })
                                        }
                                    })
                                    .catch(err => {console.log('ERR', err),ToastAndroid.show('Lỗi đăng kí không thành công!',ToastAndroid.LONG)});
                                }
                              
                            })
                        } catch (error) {
                            // Error retrieving data
                          }
                                
                                }
                    }}
                    negativeButton={{
                        title: "Hủy",
                        onPress: () => this.setState({dialogVisible:false}) 
                    }}
                />
                </View>
                <View style={{ height: '9%', backgroundColor: '#3366CC', marginBottom: 1, flexDirection: "row", justifyContent: "space-evenly", paddingBottom: 5,borderRadius:30 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.push("Activity")}>
                        <Icon type='Entypo' name="router" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.push("SignActivity")}>
                        <Icon type='Entypo' name="phone" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.push("Second")}>
                        <Icon type='Entypo' name="radio" size={30} color="white" />
                    </TouchableOpacity>

                </View>
            </View>
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
    },
});