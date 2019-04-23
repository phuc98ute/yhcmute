import React, {Component} from 'react'
import {StyleSheet,Text,Alert,View,Image,TouchableWithoutFeedback,StatusBar,
TextInput,SafeAreaView,Keyboard,TouchableOpacity,KeyboardAvoidingView,AsyncStorage} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';

export default class Signup extends Component{
    static navigationOptions={
        title:'Đăng kí thông tin tài khoản',
        headerMode:'screen'
    };
    _signup = () => {
        AsyncStorage.getItem('access_token', (err, result) => {
            console.log(result);
            if (result != null) {
                console.log(result)
                var Response = fetch(`https://yhcmute.herokuapp.com/api/v1/users/register`,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + result,
                        },
                        // body:{
                        //     username:'phuc123',
                        //     password:'123',
                        //     people:{
                        //         fullName:'vo hong phuc',
                        //         email:'phucvoitspkt',
                        //         phone:'111',
                        //         studentCode:'16110423',
                        //     }
                        body:JSON.stringify( {
                            'username':'phuc12345',
                            'password':'123',
                            'people':{
                                        'fullName':'vo hong phuc',
                                        'email':'phucvoitspkt',
                                        'phone':'111',
                                        'studentCode':'16110423',
                                    }
                         })
                    })
                    .then(Response => Response.json()
                    )
                    .then(ResponseJson => {
                        console.log(ResponseJson)
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    }
    render (){
        return (
            <View style={styles.inforContainer}>
                <Text style={styles.title}>
                Đăng kí tài khoản
                </Text>
                <TextInput style={styles.input}
                placeholder="Nhập họ tên"
                placeholderTextColor='rgba(84, 110, 122,0.8)'
                underlineColorAndroid={'transparent'}
                />
                <TextInput style={styles.input}
                placeholder="Nhập mã số sinh viên"
                
                placeholderTextColor='rgba(84, 110, 122,0.8)'
                underlineColorAndroid={'transparent'}
                />
                <TextInput style={styles.input}
                placeholder="Nhập email"
                keyboardType="email-address"
                placeholderTextColor='rgba(84, 110, 122,0.8)'
                underlineColorAndroid={'transparent'}
                />
                <TextInput style={styles.input}
                placeholder="Password"
                //keyboardType="email-address"
                placeholderTextColor='rgba(84, 110, 122,0.8)'
                underlineColorAndroid={'transparent'}
                secureTextEntry={true}
                />
                <TextInput style={styles.input}
                placeholder="Cormfirm password"
                placeholderTextColor='rgba(84, 110, 122,0.8)'
                underlineColorAndroid={'transparent'}
                secureTextEntry={true}
                />
                <ModalDropdown style={styles.doropDownModal} options={['Khoa CNTT','Khoa CLC','Khoa CKM']}/>
                <TouchableOpacity style={styles.buttonContainer}
                onPress={this._signup}>
                <Text style={styles.buttonText}>Đăng kí</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate("Login", {})}>
                <Text style={styles.buttonText}>Quay lại</Text>
                </TouchableOpacity>
                
            </View>
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
    doropDownModal:{
        height:40,
        marginTop:20,
        backgroundColor:'rgba(144, 164, 174  ,0.7)' ,
        color:'#546E7A',
        fontSize:25
    }
})