import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    TextInput,
    SafeAreaView,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    AsyncStorage,
    ScrollView,
    FlatList,
    ToastAndroid
} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';
import Config from 'react-native-config';
import { ConfirmDialog } from 'react-native-simple-dialogs';


export default class Forgetpass extends Component{
    static navigationOptions={
        title:'Quên mật khẩu',
        headerMode:'screen'
    };
    constructor(props) {
        super(props);
        this.state = {
            data:{
                username: "",
                password: "",
            },
            mssv:"",
            dialogVisible:false,


        }
    }
    componentDidMount(){
    }
    _resetPass = ()=>{

        var Response = fetch(`${Config.API_URL}/api/v1/user/forgot-password?studentCode=${this.state.mssv}`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((Response) =>{
                    console.log('Respone',Response);
                    if(Response.status==200) {
                        this.setState({"dialogVisible":true});
                    }
                    else {
                        ToastAndroid.show("Lỗi khi khôi phục mật khẩu. Liên hệ đơn vị chủ quản để xử lý!");
                    }
            }
            )
            .catch(err => {
                console.log("ERR", err),
                    ToastAndroid.show("Lỗi!"+ err, ToastAndroid.LONG);
            });
    }
    render (){
        return (
            <ScrollView style={styles.inforContainer}>
                <Text style={styles.title}>
                    Nhập thông tin khôi phục mật khẩu
                </Text>
                <TextInput style={styles.input}
                           placeholder="Nhập mã số sinh viên"
                           placeholderTextColor='rgba(84, 110, 122,0.8)'
                           onChangeText={mssv => this.setState({mssv})}
                           underlineColorAndroid={'transparent'}
                />
                <TouchableOpacity style={styles.buttonContainer}
                                  onPress={this._resetPass}>
                    <Text style={styles.buttonText}>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}
                                  onPress={() => this.props.navigation.navigate("Login", {})}>
                    <Text style={styles.buttonText}>Hủy bỏ</Text>
                </TouchableOpacity>

                <ConfirmDialog
                    title="Thông báo"
                     message="Đã reset mật khẩu thành công. Vui lòng kiểm tra mail sinh viên để nhận mật khẩu mới!"
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => this.setState({ dialogVisible: false })}
                    positiveButton={{
                        title: "OK",
                        onPress: () => {
                            this.setState({ dialogVisible: false })
                            this.props.navigation.navigate("Login", {})
                        }
                    }}

                >
                    <ScrollView style={{ height: '20%' }}>
                        <Text>
                            Vui lòng kiểm tra Email đã đăng kí để nhận mật khẩu đăng nhập!
                        </Text>
                    </ScrollView>
                </ConfirmDialog>
            </ScrollView>
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