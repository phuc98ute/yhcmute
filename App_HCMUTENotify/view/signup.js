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
    ToastAndroid, Dimensions
} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';
import Config from 'react-native-config';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { CheckBox } from 'react-native-elements';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const logoHeight = deviceHeight - 55 - 600;
const logobar = deviceWidth * 0.1;
const bottomFlex = logoHeight < 0 ? 0 : logoHeight;
const fontSize = logoHeight < 0 ? 11 : 13;

export default class Signup extends Component{
    checked;
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
            dialogVisible2:false,
            username:"",
            password:"",
            code: "",
            email:"",
            phone:"",
            firstname: "",
            lastname: "",
            aClassid:"",
            lstKhoa:[],
            listTempLop:[],
            checked:false,

        }
        this.sizeRef = React.createRef();
        this.sizeRef2 = React.createRef();
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
        if(this.state.fullName!=''&&this.state.username!=''&&this.state.email!=''&&this.state.studentCode!=''&&this.state.idxKhoa!=''&&this.state.idxLop!=undefined&&this.checked==false)
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
                            peopleContact: {
                                personalPhone:this.state.phone,
                                email:this.state.email
                            },
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
            console.log(this.checked)
            if(this.checked==true || this.checked==undefined){
                ToastAndroid.show("Bạn phải chấp nhận với điều khoản sử dụng của ứng dụng!",ToastAndroid.LONG);
            }
            else{
                ToastAndroid.show("Nhập đầy đủ các trường trên để đăng kí!",ToastAndroid.LONG);
            }


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

    _handlePolicy =()=>{
        this.setState({dialogVisible2:true});
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
                             onChangeText={phone => this.setState({phone})}
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
                <TouchableOpacity style={styles.buttonForget}
                                  onPress={this._handlePolicy}
                >
                    <Text style={{textDecorationLine: 'underline',fontWeight: 'bold',fontSize:15}}>XEM ĐIỀU KHOẢN SỬ DỤNG ỨNG DỤNG</Text>
                </TouchableOpacity>
                <CheckBox
                    ref={this.sizeRef2}
                    center
                    title='Tôi đồng ý với các điều khoản sử dụng'
                    checked={this.state.checked}
                    onPress={() => {this.setState({checked: !this.state.checked});this.checked=this.state.checked;console.log(this.checked)}}
                />
                <TouchableOpacity style={styles.buttonContainer}
                onPress={()=>this._signup()}>
                <Text style={styles.buttonText}>Đăng ký</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate("Login", {})}>
                <Text style={styles.buttonText}>Quay lại</Text>
                </TouchableOpacity>

                <ConfirmDialog
                  title="Đã đăng ký"
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
                <ConfirmDialog
                    style={{borderRadius:20}}
                    title={"Điều khoản sử dụng"}

                    visible={this.state.dialogVisible2}
                    onTouchOutside={() => this.setState({ dialogVisible2: false })}
                    positiveButton={{
                        title: "Đã xem",
                        onPress: () => {
                            this.setState({ dialogVisible2: false })
                        }
                    }}

                >
                    <ScrollView style={{height:'80%'}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold',textAlign: "center",marginTop:5}}>ĐIỀU KHOẢN SỬ DỤNG  {"\n"}</Text>
                        <Text> Vui lòng đọc ký Thỏa Thuận Sử Dụng ("Thỏa Thuận") trước khi bạn tiến hành tải, cài đặt, sử dụng tất cả hoặc bất kỳ phần nào của ứng dụng "YHCMUTE" (bao gồm các nội dung chia sử, các file và ác tài liệu liên quan)
                            ) hoặc sử dụng các dịch vụ do Đoàn trường Đại học Sư phạm Kỹ thuật cung cấp để kết nối đến Ứng dụng. Bạn chấp thuận và đồng ý ràng buộc bởi các quy định và điều kiện trong Thỏa Thuận này khi thực hiện các thao tác trên đây.
                            Trường hợp bạ không đồng ý với bất kỳ điều khoản sử dụng nào của chúng tôi (phiên bản này và các phiên bản cập nhật), bạn vui lòng không tải, cài đặt, sử dụng Ứng dụng hoặc tháo gỡ ứng dụng ra khỏi thiết bị của bạn.
                            {"\n\n"}
                            <Text style={{fontWeight: 'bold'}}>1. Cập nhật</Text>
                            {"\n\n"}
                            Thỏa thuận này có thể được cập nhật thường xuyên bởi đơn vị phát hành, phiên bản cập nhật sẽ được chúng tôi công bố tại website tuoitre.hcmute.edu.vn. Phiên bản cập nhật sẽ thay thế cho các quy đinh và điều kiện
                            trong thỏa thuận ban đầu. Bạn có thể truy cập ứng dụng hoặc vào website trên đây để xem nội dung chi tiết của phiên bản cập nhật.
                            {"\n\n"}
                            <Text style={{fontWeight:'bold'}}>2. Giới thiệu về ứng dụng</Text>
                            {"\n\n"}
                            YHCMUTE là ứng dụng quản lý hoạt động dành cho sinh viên và đoàn trường đại học Sư phạm Kỹ thuật thành phố Hồ Chí Minh. Ứng dụng tạo môi trường tương tác cao giữa sinh viên và nhà trường giúp cho việc trao đổi thông tin và quản lý
                            sự phát triển của nhà trường.
                            {"\n\n"}
                            <Text style={{fontWeight:'bold'}}>3. Quyền sở hữu ứng dụng</Text>
                            {"\n\n"}
                            Ứng dụng này được phát triển và sở hữu bởi Đoàn trường Đại học Sư phạm Kỹ thuật Hồ Chí Minh, tất cả các quyền sở hữu trí tuệ liên quan đến ứng dụng (bao gồm nhưng không giới hạn mã nguồn, hình ảnh, dữ liệu, thông tin,
                            nội dung chứa đựng trong ứng dụng; các sửa đổi, bổ sung, cập nhật của ứng dụng) và các tài liệu hướng dẫn liên quan (nếu có) sẽ thuộc quyền sở hữu duy nhất của Đoàn trường Đại học Sư phạm Kỹ thuật Hồ Chí Minh,
                            không cá nhân tổ chức nào được quyền sao chép tái tạo, phân phối hoặc hình thức khác xâm phạm tới quyền của chủ sở hữu nếu không có sự đồng ý và cho phép bằng văn bản của Đoàn trường Đại học Sư phạm Kỹ thuật Hồ Chí Minh.
                            {"\n\n"}
                            <Text style={{fontWeight:'bold'}}>4. Tài khoản</Text>
                            {"\n\n"}
                            Để sử dụng ứng dụng bạn phải có một tài khoản thuộc trường. Khi đăng kí tài khoản sử dụng ứng dụng là bạn đã đồng ý với điều khoản sử dụng do đơn vị phát hành đưa ra. Mọi quyền lợi và nghĩa vụ của bạn sẽ căn cứ trên thông
                            tin tài khoản bạn đã đăng ký, do đó nếu có bất kỳ thông tin sai lệch nào, hoặc sai phạm sẽ phải chịu theo sự quyết định của đơn vị phát hành.
                            {"\n\n"}
                            <Text style={{fontWeight:'bold'}}>5. Sử dụng ứng dụng</Text>
                            {"\n\n"}
                            Bạn có quyền sử dụng ứng dụng và các dịch vụ khác mà chúng tôi cung cấp, tuy nhiên việc sử dụng phải tuân thủ theo quy định của đơn vị phát hành, không bao gồm các hành vi sau đây nếu không có sự đồng ý bằng văn bản của đơn
                            vị phát hành: {"\n"}
                            + Sao chép, chỉnh sửa tái tạo, tạo ra sản phẩm mới hoặc phiên bản phát sinh trên cơ sở ứng dụng này;{"\n"}
                            + Bán, chuyển giao, cấp quyền lại, tiết lộ hoặc hình thức chuyển giao khác hoặc đưa một phần hoặc toàn bộ ứng dụng cho bất kỳ bên thứ 3{"\n"}
                            + Sử dụng ứng dụng để cung cấp dịch vụ cho bất ký bên thứ 3{"\n"}
                            + Di chuyển, xóa bỏ, thay đổi bất kỳ thông báo chính đáng, hoặc dấu hiệu nào của ứng dụng (bao gồm nhưng không giới hạn các tuyên bố về bản quyền){"\n"}
                            + Thiết kế lại, biên dịch, tháo gỡ, chỉnh sửa, đảo lộn thiết kế của ứng dụng hoặc nội dung ứng dụng{"\n"}
                            + Thay đổi hoặc hủy bỏ trạng thái ban đầu của ứng dụng{"\n"}
                            + Sử dụng ứng dụng để thực hiện bất kỳ hành động gây hại cho hệ thống an ninh nào (bao gồm cả ứng dụng này){"\n"}
                            + Đăng nhập và sử dụng ứng dụng bằng một phần mềm tương thích của bên thứ ba hoặc hệ thống không được phát triển cấp quyền hoặc bất chấp thuận với đơn vị phát hành{"\n"}
                            + Sử dụng, bán, cho mượn, sao chép, chỉnh sửa, kết nối tới, phiên dịch, phát hành, công bố các thông tin liên qua đến ứng dụng{"\n"}
                            + Sử dụng ứng dụng để đăng tải, chuyển, truyền, chia sẻ hoặc lưu trưc bất kỳ nội udng vi phạm pháp luật, quyền sở hữu trí tuệ{"\n"}
                            + Các hình thức vi phạm khác{"\n\n"}
                            <Text style={{fontWeight:'bold'}}>6. Xử lý vi phạm</Text>
                            {"\n\n"}
                            Trường hợp bạn vi phạm bất kỳ quy định nào trong Thỏa thuận này, đơn vị phát hành có quyền ngay lập tức khóa tài khoản của bạn và xóa bỏ toàn bộ các thông tin, nội dung vi phạm, đống thời
                            tùy thuộc vào tính chất, mức độ vi phạm bạn sẽ chịu trách nhiệm trươc scow quan có thẩm quyền, đơn vị phát hành và các bên thứ ba có liên quan về mọi thiệt hại gây ra bởi hành vi vi phạm của bạn.
                            {"\n\n"}
                            <Text style={{fontWeight:'bold'}}>7. Thông tin liên hệ</Text>
                            {"\n\n"}
                            - Địa chỉ email: y_hcmute@hcmute.edu.vn; hoặc {"\n"}
                            - Đoàn trường Đại học Sư phạm Kỹ thuật Hồ Chí Minh: Số 1 Võ Văn Ngân, phường Linh Chiểu, quận Thủ Đức, Thành phố Hồ Chí Minh.{"\n\n"}
                            Trân trọng cảm ơn bạn đã sử dụng sản phẩm và dịch vụ của chúng tôi.
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
    },
    buttonForget:{ height: deviceHeight * 0.05, alignItems: "center", marginTop: '2%', },
})