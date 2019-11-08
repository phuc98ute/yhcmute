import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    Alert,
    View,
    Image,
    TouchableWithoutFeedback,
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


export default class Signup extends Component{
    static navigationOptions={
        title:'Đăng kí thông tin tài khoản',
        headerMode:'screen'
    };
    constructor(props) {
        super(props);
        this.state = {
            data:{
                username: "",
                password: "",
            },
            idxKhoa:"",
            idxlop:"",
            contentLop:'Vui lòng chọn lớp!',
            listKhoa:[],
            listLop:[],
            dialogVisible:false,
            username:"",
            password:"",
            code: "",
            firstname: "",
            lastname: "",
            aClassid:"",
            lstKhoa:[],
            listTempLop:[],

        }
        this.sizeRef = React.createRef();
      }

      componentDidMount(){
        var Response = fetch(`${Config.API_URL}/api/v1/faculty/getAll`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((Response) => Response.json()
        )
        .then(ResponseJson => {

           this.setState({listKhoa:ResponseJson})
            this.state.listKhoa.map(item => (
                this.state.lstKhoa.push(item.vnName)
            ));
        })
        .catch(error => {
            console.log(error);
        });

      }
    _selectDropdownKhoa(idx){
        this.setState({"idxKhoa":idx})

        this.setState({enableDropdown:false})

        if(this.state.listKhoa[idx].classes!=null)
        {
            //this.setState({"listTempLop":[]});
            this.state.listKhoa[idx].classes.map(item => (
                this.state.listTempLop.push(item.name)
            ));
        }
        console.log(this.state.listTempLop);
    }
    _selectDropdownLop(idx){
        //console.log(idx)
        this.setState({enableDropdown:false})
        this.setState({"idxLop":idx});
       this.setState({aClassid:this.state.listLop.id})
        //console.log("Dang ki noi dung")
        //console.log(this.state.listKhoa[this.state.idxKhoa].id)
       // console.log(this.state.listKhoa[this.state.idxKhoa].classes[idx].id)
    }
    _signup = () => {
        // const { fullName,username,password,email,studentCode,shortName,indexKhoa } = this.state;
        if(this.state.fullName!=''&&this.state.username!=''&&this.state.email!=''&&this.state.studentCode!=''&&this.state.idxKhoa!=''&&this.state.idxLop!=undefined)
        {
            console.log("DU dieu kien")
            console.log(this.state.idxLop)
            //console.log(this.state.firstname+" "+this.state.lastname+" "+this.state.username+" "+ this.state.email+ " "+this.state.studentCode+" "+this.state.listKhoa[this.state.idxKhoa].classes[this.state.idxLop].id)
            var Response = fetch(`${Config.API_URL}/api/v1/user/register`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "username": this.state.username,
                        "password":this.state.password,
                        student: {
                            code: this.state.studentCode,
                            firstName: this.state.firstname,
                            lastName: this.state.lastname,
                            aClass: {
                                id:this.state.listKhoa[this.state.idxKhoa].classes[this.state.idxLop].id,
                              }
                        }
                    })

                })
                .then((Response) => Response.json()
                )
                .then(ResponseJson => {
                    console.log(ResponseJson)
                    if(ResponseJson.status =="409") {
                        ToastAndroid.show("Tài khoảng này đã được sử dụng!",ToastAndroid.LONG);
                    }
                    else {
                        if(ResponseJson.id!=undefined) {this.setState({dialogVisible:true})}
                    }
                    //this.setState({dialogVisible:true})
                })

                .catch(error => {
                    console.log(error);
                });

        }
        else{
            ToastAndroid.show("Nhập đầy đủ các trường trên để đăng kí!",ToastAndroid.LONG);
        }

    };

    renderButtonTextLop(rowData) {
        console.log("rowData")
        console.log(rowData);
        return `Lớp ${rowData}`;
      }

    renderButtonTextKhoa(rowData) {
        this.sizeRef.current.select(-1);
        return `Khoa ${rowData}`;
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
    renderItem = ({ item }) => {
        console.log(item.vnName);
        return(
            <Text> {item.vnName} </Text>
            )

    }
    _onDropdownWillShowLop(){
        console.log("_onDropdownWillShowLop")
        console.log(this.state.listTempLop)
        if(this.state.listTempLop && this.state.listTempLop.length == 0){

            ToastAndroid.show(
                "Danh sách lớp rỗng!",
                ToastAndroid.LONG
            );
        }
    }
    _onDropdownWillShowKhoa(){
        this.setState({"listTempLop":[]})
        console.log("_onDropdownWillShowKhoa")
        console.log(this.state.lstKhoa)
        if(this.state.lstKhoa && this.state.lstKhoa.length == 0){

            ToastAndroid.show(
                "Danh sách khoa rỗng!",
                ToastAndroid.LONG
            );
        }
    }


    
    render (){
        return (
            <ScrollView style={styles.inforContainer}>
                <Text style={styles.title}>
                Đăng kí tài khoản
                </Text>
                <TextInput style={styles.input}
                placeholder="Nhập họ đệm"
                placeholderTextColor='rgba(84, 110, 122,0.8)'
                onChangeText={firstname => this.setState({firstname})}
                underlineColorAndroid={'transparent'}
                />
                <TextInput style={styles.input}
                           placeholder="Nhập tên"
                           placeholderTextColor='rgba(84, 110, 122,0.8)'
                           onChangeText={lastname => this.setState({lastname})}
                           underlineColorAndroid={'transparent'}
                />
                <Text style={{color:'#3366CC', fontSize:15,textAlign:'center'}}>Chúng tôi sử dụng email sinh viên từ MSSV này!</Text>
                <TextInput style={styles.input}
                placeholder="Nhập mã số sinh viên"
                onChangeText={studentCode => this.setState({"studentCode":studentCode,"username":studentCode,"email":`${studentCode}@student.hcmute.edu.vn`})}
                placeholderTextColor='rgba(84, 110, 122,0.8)'
                underlineColorAndroid={'transparent'}
                />
                  <TextInput style={styles.input}
                placeholder="Nhập số điện thoại"
                onChangeText={phone => this.setState({phone})}
                placeholderTextColor='rgba(84, 110, 122,0.8)'
                underlineColorAndroid={'transparent'}
                />
                <ModalDropdown
                dropdownTextStyle={{fontSize:15}}
                textStyle={{fontSize:13, justifyContent: 'center',padding:6}}
                defaultValue='Vui lòng chọn khoa của bạn!'
                style={styles.dropDownModal}
                onSelect={(idx)=>this._selectDropdownKhoa(idx)}
                onDropdownWillShow={()=>this._onDropdownWillShowKhoa()}
                renderButtonText={(rowData) => this.renderButtonTextKhoa(rowData)}
                //renderRow={this.dropdownRenderRow.bind(this)}
                options={this.state.lstKhoa}/>

                <ModalDropdown
                    ref={this.sizeRef}
                dropdownTextStyle={{fontSize:15}}
                textStyle={{fontSize:13, justifyContent: 'center',padding:6}}
                options={this.state.listTempLop}
                defaultValue={this.state.contentLop}
                disabled={this.state.enableDropdown}
                onDropdownWillShow={()=>this._onDropdownWillShowLop()}
                onSelect={(idx)=>this._selectDropdownLop(idx)}
                renderButtonText={(rowData) => this.renderButtonTextLop(rowData)}
                //renderRow={this.dropdownRenderRow.bind(this)}
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