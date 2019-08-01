import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  Dimensions,
  Platform,
  NetInfo 
} from "react-native";
import { AsyncStorage } from "react-native";
import Config from "react-native-config";
import jwtDecode from "jwt-decode";
import { ConfirmDialog, ProgressDialog } from "react-native-simple-dialogs";
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Card, CardItem, Segment } from "native-base";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const logoHeight = deviceHeight - 55 - 600;
const logobar=deviceWidth*0.1;
const bottomFlex= logoHeight<0?0:logoHeight;
const fontSize= logoHeight<0?11:13;

export default class Login extends Component {
  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed'

  };
  componentDidMount() {
    // NetInfo.getConnectionInfo().then((connectionInfo) => {
    //   console.log(
    //     'Initial, type: ' +
    //       connectionInfo.type +
    //       ', effectiveType: ' +
    //       connectionInfo.effectiveType,
    //   );
    // });
    NetInfo.getConnectionInfo().then((connect)=>
    {
      if(connect!="none"){
        console.log(connect)
        ToastAndroid.show('Bạn đang sử dụng '+connect.type.toString()+' để truy cập!',ToastAndroid.SHORT)
        AsyncStorage.getItem('access_token', (err, result) => {
          if (result != null) {
            console.log(result)
            let decode = jwtDecode(result)
            let current_time = new Date().getTime() / 1000;
            if (current_time < decode.exp) { this.props.navigation.navigate("Activity", {}) }
          }
        }
        )
      }
      else{
        this.setState({showLoading2:true})
      }
      
     
    })
  
      console.log(deviceHeight)
      
    

    }
  componentWillMount() {
    //this.loadAPI();
    //const token = await AsyncStorage.getItem('token');
    //if(issets token){
    //get userinfo
    //}
  }
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pwd: "",
      showLoading: false,
      showLoading2: false
    };
  }
  _signIn = () => {

  }
  handleClick = () => {
    if (this.state.username != "" && this.state.pwd != "") {
      this.setState({ showLoading: true });
      var { navigate } = this.props.navigation;
      const { username, pwd } = this.state;
      console.log(username);
      console.log(pwd);
      console.log(Config.API_URL);
      var res = fetch(
        `${Config.API_URL}/login?username=${username}&password=${pwd}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        .then(res => {
          this.setState({ showLoading: false });
          console.log("RES", res.headers.get("authorization"));
          let accessToken = res.headers.get("authorization");
          let decode = jwtDecode(accessToken);
          console.log(decode);
          const tokenIndex = accessToken.lastIndexOf(" ") + 1;
          let token = accessToken.substr(tokenIndex);
          if (token) {
            console.log(token)
            AsyncStorage.setItem("access_token", token);
            AsyncStorage.setItem("username", this.state.username);
            AsyncStorage.setItem("pass", this.state.pwd);
            console.log(AsyncStorage.getItem("access_token"));
            console.log("Sucess");
            this.props.navigation.navigate("Activity", {});

          }
        })
        .catch(err => {
          console.log("ERR", err)
            // ToastAndroid.show(
            //   "Lỗi đăng nhập!",
            //   ToastAndroid.LONG
            // );
        });
    }
    else {
      ToastAndroid.show(
        "Chưa nhập thông tin!",
        ToastAndroid.LONG
      );
    }
  };
  _forgotPwd = () => {
    // ToastAndroid.show("Forgot pwd")
  }
  render() {
    var { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={{ flex: 1}} >
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <View style={{ backgroundColor: "#FFFFFF", flex: 1, flexDirection: 'column', justifyContent: "flex-end" }}>
            <View style={{ height:deviceHeight*0.1, backgroundColor: "#CCCCCC" }}>
              <Header style={{ backgroundColor: '#CCCCCC' }}
                androidStatusBarColor="#CCCCCC">
                <Body style={{ alignItems: 'center',  flex: 1 }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image style={{ height: logobar, width: logobar+2, flex: 1,margin:10 }} source={require("../source/logodoan.png")}></Image>
                    <Title style={{ flex: 8,marginTop:20, justifyContent: 'center', color: '#0000DD', fontWeight: 'bold', fontSize: fontSize }}>ỨNG DỤNG QUẢN LÝ HOẠT ĐỘNG ĐOÀN - HỘI</Title>
                    <Image style={{ height: logobar, width: logobar+2, flex: 1,margin:10 }} source={require("../source/logohoi.png")}></Image>
                  </View>

                </Body>
              </Header>
            </View>

            <View
              style={{
                backgroundColor: "#FFFFFF",
                height:deviceHeight*0.13,
                marginTop: '2%',
                alignItems: 'center',
              }}
            >
              <Image
                source={require("../source/banner.png")}
                style={{ width: deviceWidth - 10, height: (deviceWidth - 10) * 0.23 }}
              />
            </View>
            <View style={styles.logoContainer}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Image
                  style={styles.logo}
                  source={require("../source/logodoan.png")}
                />
                <Image
                  style={styles.logo}
                  source={require("../source/logohoi.png")}
                />
              </View>
              <View style={{flex:1}}>
                <Text style={styles.title}>
                  Y_HCMUTE
                </Text>
                <Text style={{
                  color: "#0000DD",
                  fontSize: fontSize+4,
                  textAlign: "center",
                  marginBottom: 20,
                  fontWeight: 'bold',
                  opacity: 0.9

                }}>
                  ỨNG DỤNG QUẢN LÝ HOẠT ĐỘNG ĐOÀN - HỘI
                </Text>
              </View>
            </View>
            <View style={styles.inforContainer}>
              <View style={{ flex: 1, alignItems: 'center', marginBottom: 5 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập tên đăng nhập hoặc Email"
                  placeholderTextColor="rgba(84, 110, 122,0.8)"
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCorrect={false}
                  onChangeText={username => this.setState({ username })}
                  onSubmitEditing={() => this.refs.txtPassword.focus()}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor="rgba(84, 110, 122,0.8)"
                  onChangeText={pwd => this.setState({ pwd })}
                  returnKeyType="go"
                  secureTextEntry
                  autoCorrect={false}
                  ref={"txtPassword"}
                />
                <View style={{alignItems: 'center', marginBottom: 20, flexDirection: "row",width:"75%"}}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.handleClick}
                >
                  <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
                <View style={{width:15}}>

                </View>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => this.props.navigation.navigate("Signup", {})}
                >
                  <Text style={styles.buttonText}>Đăng kí</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{ flex: 1, alignItems: "center", marginTop: 5,}}
                onPress={this._forgotPwd}
              >
                <Text>Quên mật khẩu ?</Text>
              </TouchableOpacity>
              </View>
              
              <View style={{height:bottomFlex}}>

              </View>
              <ProgressDialog
                style={{ borderRadius: 20 }}
                visible={this.state.showLoading}
                title="Đang kết nối đến server"
                activityIndicatorColor="blue"
                activityIndicatorSize="large"
                animationType="slide"
                message="Vui lòng chờ trong giây lát ..."
              />
              <ProgressDialog
                style={{ borderRadius: 20 }}
                visible={this.state.showLoading2}
                title="Đang chờ kết nối mạng"
                activityIndicatorColor="blue"
                activityIndicatorSize="large"
                animationType="slide"
                message="Vui lòng mở kết nối mạng Internet ..."
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:deviceHeight
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#FFFFFF',
    height: deviceHeight*0.3,
    marginBottom: 10,
  },
  logo: {

    width: deviceHeight * 0.15,
    height: deviceHeight * 0.15,
    marginTop:25,
  },
  banner: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,

  },
  title: {
    color: "#0000DD",
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 30,
    opacity: 1
  },
  inforContainer: {
    height: deviceHeight*0.4,
    backgroundColor:"#FFFFFF"
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: "rgba(144, 164, 174  ,0.7)",
    color: "#546E7A",
    marginBottom: 10,
    borderRadius: 30,
    textAlign: 'center',

  },
  buttonContainer: {
    flex:1,
    borderRadius: 30,
    backgroundColor: "#3366CC",
    alignItems: "center",
    height: 30,
    padding:3,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },

  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,

  },
  btnContainer: {
    backgroundColor: "white",
  },
});
