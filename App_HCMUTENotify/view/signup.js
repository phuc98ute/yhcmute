import React, {Component} from 'react'
import {StyleSheet,Text,Alert,View,Image,TouchableWithoutFeedback,StatusBar,
TextInput,SafeAreaView,Keyboard,TouchableOpacity,KeyboardAvoidingView,AsyncStorage,ScrollView} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';
import Config from 'react-native-config';
import { ConfirmDialog } from 'react-native-simple-dialogs';
// const data = [{
//     value: 'Banana',
//   }, {
//     value: 'Mango',
//   }, {
//     value: 'Pear',
//   }];

export default class Signup extends Component{
    static navigationOptions={
        title:'Đăng kí thông tin tài khoản',
        headerMode:'screen'
    };
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            fullName: "",
            email: "",
            image: "",
            phone: "",
            studentCode: "",
            aClassName: "",
            faculytyName: "",
            shortName: "",
            enableDropdown:true,
            aClassid:'',
            contentLop:'Vui lòng chọn lớp!',
            listKhoa:[],
            listLop:[],
            dialogVisible:false,

        }
      }
      componentDidMount(){
        var Response = fetch(`${Config.API_URL}/api/v1/faculties/list`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(Response => Response.json()
        )
        .then(ResponseJson => {
            console.log(ResponseJson)
           this.setState({listKhoa:ResponseJson})
        })
        .catch(error => {
            console.log(error);
        });
      }
    _selectDropdownKhoa(idx){
        console.log(this.state.listKhoa[idx].id)
         //console.log(this.state.listLop.length)
        // this.setState({shortName:listKhoaContent[idx]})
        this.setState({enableDropdown:false})
        var Response = fetch(`${Config.API_URL}/api/v1/classes/list/faculty/${this.state.listKhoa[idx].id}`)
        .then(Response => Response.json()
        )
        .then(ResponseJson => {
            console.log(ResponseJson)
           this.setState({listLop:ResponseJson})
           console.log(this.state.listLop.length)
        })
        .catch(error => {
            console.log(error);
        }).then(()=>{
            if(this.state.listLop.length==0) {
                this.setState({contentLop:'Danh sách lớp trống',enableDropdown:true}) 
            }
            if(this.state.listLop.length!=0)
            {
               this.setState({contentLop:'Chọn lớp!'}) 
            }
        })
        
         
         
         

    }
    _selectDropdownLop(idx){
       this.setState({aClassid:this.state.listLop.id})
    }
    _signup = () => {
        // const { fullName,username,password,email,studentCode,shortName,indexKhoa } = this.state;
        if(this.state.fullName!=''&&this.state.username!=''&&this.state.email!=''&&this.state.studentCode!='')
        {
            console.log(this.state.fullName)

            var Response = fetch(`https://yhcmute.herokuapp.com/api/v1/users/register`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',

                    },
                    
                    body: JSON.stringify({
                        username: this.state.username,
                        people: {
                            fullname: this.state.fullName,
                            email: this.state.email,
                            phone: this.state.phone,
                            studentCode: this.state.studentCode,
                            aClass: {
                                id:this.state.aClassid,
                              }
                        }
                    })

                })
                .then(Response => Response.json()
                )
                .then(ResponseJson => {
                    console.log(ResponseJson)
                    this.setState({dialogVisible:true})
                })
                
                .catch(error => {
                    console.log(error);
                });
        }

    };

    renderButtonText(rowData) {
        //console.log('rowdata', rowData);
        return `${rowData.name}`;
      }
    
      dropdownRenderRow(rowData, rowID, highlighted) {
       return (
           <View style={{fontSize:13, justifyContent: 'center',padding:6}} >
             <Text style={styles.dropdownRowTextStyle}>
               {`${rowData.name}`}
             </Text>
           </View>
       );
     }

    
    render (){
        
        return (
            <ScrollView style={styles.inforContainer}>
                <Text style={styles.title}>
                Đăng kí tài khoản
                </Text>
                <TextInput style={styles.input}
                placeholder="Nhập họ tên"
                placeholderTextColor='rgba(84, 110, 122,0.8)'
                onChangeText={fullName => this.setState({fullName})}
                underlineColorAndroid={'transparent'}
                />
                <Text style={{color:'#3366CC', fontSize:15,textAlign:'center'}}>Chúng tôi sử dụng email sinh viên từ MSSV này!</Text>
                <TextInput style={styles.input}
                placeholder="Nhập mã số sinh viên"
                onChangeText={studentCode => this.setState({studentCode:studentCode,username:studentCode,email:`${studentCode}@student.hcmute.edu.vn`})}
                placeholderTextColor='rgba(84, 110, 122,0.8)'
                underlineColorAndroid={'transparent'}
                />
                {/* <TextInput style={styles.input}
                placeholder="Nhập email"
                keyboardType="email-address"
                onChangeText={email=> this.setState({email})}
                placeholderTextColor='rgba(84, 110, 122,0.8)'
                underlineColorAndroid={'transparent'}
                /> */}
                  <TextInput style={styles.input}
                placeholder="Nhập số điện thoại"
                onChangeText={phone => this.setState({phone})}
                placeholderTextColor='rgba(84, 110, 122,0.8)'
                underlineColorAndroid={'transparent'}
                />
                {/* <TextInput style={styles.input}
                placeholder="Password"
                placeholderTextColor='rgba(84, 110, 122,0.8)'
                underlineColorAndroid={'transparent'}
                onChangeText={password => this.setState({password})}
                secureTextEntry={true}
                />
                <TextInput style={styles.input}
                placeholder="Cormfirm password"
                placeholderTextColor='rgba(84, 110, 122,0.8)'
                underlineColorAndroid={'transparent'}
                secureTextEntry={true}
                /> */}
                <ModalDropdown 
                dropdownTextStyle={{fontSize:15}} 
                textStyle={{fontSize:13, justifyContent: 'center',padding:6}} 
                defaultValue='Vui lòng chọn khoa của bạn!'
                style={styles.dropDownModal}
                onSelect={(idx)=>this._selectDropdownKhoa(idx)}
                renderButtonText={(rowData) => this.renderButtonText(rowData)}
                renderRow={this.dropdownRenderRow.bind(this)}
                options={this.state.listKhoa}/>

                <ModalDropdown 
                dropdownTextStyle={{fontSize:15}} 
                textStyle={{fontSize:13, justifyContent: 'center',padding:6}}
                options={this.state.listLop}
                defaultValue={this.state.contentLop}
                disabled={this.state.enableDropdown}
                onSelect={(idx)=>this._selectDropdownKhoa(idx)}
                renderButtonText={(rowData) => this.renderButtonText(rowData)}
                renderRow={this.dropdownRenderRow.bind(this)}
                style={styles.dropDownModal}/>
                
                <TouchableOpacity style={styles.buttonContainer}
                onPress={this._signup}>
                <Text style={styles.buttonText}>Đăng kí</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate("Login", {})}>
                <Text style={styles.buttonText}>Quay lại</Text>
                </TouchableOpacity>
                <ConfirmDialog
                  title="Đã đăng kí"
                  // message={this.state.activityContent}
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
                  <ScrollView style={{ height: '80%' }}>
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