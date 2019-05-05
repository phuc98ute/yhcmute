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
} from "react-native";
import { AsyncStorage } from "react-native";
import Config from "react-native-config";
import jwtDecode from "jwt-decode";
import { ConfirmDialog, ProgressDialog } from "react-native-simple-dialogs";
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Card, CardItem, Segment } from "native-base";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const logoHeight = deviceHeight-215-200;

export default class Login extends Component {
  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed'
    
  };
  componentDidMount(){
    AsyncStorage.getItem('access_token', (err, result) => {
      if(result!=null){
          console.log(result)
          let decode = jwtDecode(result)
          let current_time=new Date().getTime()/1000;
          if(current_time < decode.exp){this.props.navigation.navigate("Activity",{})}
        }})
  
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
      showLoading: false
    };
  }
  _signIn=()=>
  {
    
  }
  handleClick = () => {
    if(this.state.username!=""&&this.state.pwd!="")
    {
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
          "Conten-Type": "application/json"
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
          AsyncStorage.setItem("username",this.state.username);
          AsyncStorage.setItem("pass",this.state.pwd);
          console.log(AsyncStorage.getItem("access_token"));
          console.log("Sucess");
          this.props.navigation.navigate("Activity",{});
          
        }
      })
      .catch(err => {
        console.log("ERR", err),
          ToastAndroid.show(
            "Lỗi đăng nhập!",
            ToastAndroid.LONG
          );
      });
    }
    else
    {
      ToastAndroid.show(
        "Chưa nhập thông tin!",
        ToastAndroid.LONG
      );
    }
  };
  render() {
    var { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={{flex:1}} >
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={{ backgroundColor: "#FFFFFF", flex: 1,flexDirection:'column',height:50,justifyContent: "flex-end", }}>
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  flex: 3,
                  marginTop:'2%',
                  alignItems:'center',
                }}
              >
                <Image
                  source={require("../source/banner.png")}
                  style={{width: deviceWidth-10,height:(deviceWidth-10)*0.23}}
                />
              </View>
               <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require("../source/logodoan.png")}
                />
                <Text style={styles.title}>
                  Y_HCMUTE
                </Text>
                <Text style={{
                  color: "#21618C",
                  fontSize: 20,
                  textAlign: "center",
                  marginTop: 5,
                  opacity: 0.9

                }}>
                  Ứng dụng quản lý hoạt động Đoàn - Hội
                </Text>
              </View>

              <View style={styles.inforContainer}>
                <View style={{flex:2,alignItems:'center'}}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter username/email"
                    placeholderTextColor="rgba(84, 110, 122,0.8)"
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCorrect={false}
                    onChangeText={username => this.setState({ username })}
                    onSubmitEditing={() => this.refs.txtPassword.focus()}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    placeholderTextColor="rgba(84, 110, 122,0.8)"
                    onChangeText={pwd => this.setState({ pwd })}
                    returnKeyType="go"
                    secureTextEntry
                    autoCorrect={false}
                    ref={"txtPassword"}
                  />
                </View>
                <View style={{flex:2,alignItems:'center'}}>
                  <View style={{flexDirection: 'row', height: 50, padding:5 }}>
                    <TouchableOpacity
                      style={{
                        flex: 1, backgroundColor: "#3366CC", borderRadius: 10
                        , margin: 5, height: 50,alignItems:"center",padding:10
                      }}
                      onPress={this.handleClick}
                    >
                      <Text style={styles.buttonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <GoogleSigninButton
                      style={{ flex: 1, margin: 5, height: 50 }}
                      size={GoogleSigninButton.Size.Wide}
                      color={GoogleSigninButton.Color.Dark}
                      onPress={this._signIn}
                      disabled={this.state.isSigninInProgress} />
                  </View>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.props.navigation.navigate("Signup", {})}
                  >
                    <Text style={styles.buttonText}>Đăng kí</Text>
                  </TouchableOpacity>
                </View>
                <ProgressDialog
                  style={{borderRadius:10}}
                  visible={this.state.showLoading}
                  title="Đang kết nối đến server"
                  activityIndicatorColor="blue"
                  activityIndicatorSize="large"
                  animationType="slide"
                  message="Vui lòng chờ trong giây lát ..."
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      // <KeyboardAvoidingView
        
      //   style={{ flex: 1 }}
      // >
        
      //     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      //       <View style={styles.inner}>
      //         <Image
      //           source={require("../source/banner.png")}
      //           style={{ marginTop: 5, height:100,width:deviceWidth }}
      //         />
      //         <View style={styles.logoContainer}>
      //           <Image
      //             style={styles.logo}
      //             source={require("../source/logodoan.png")}
      //           />
      //           <Text style={styles.title}>
      //             QUẢN LÝ HOẠT ĐỘNG ĐOÀN HỘI HCMUTE
      //           </Text>
      //         </View>

      //         <View style={styles.inforContainer}>
      //           <TextInput
      //             style={styles.input}
      //             placeholder="Enter username/email"
      //             placeholderTextColor="rgba(84, 110, 122,0.8)"
      //             keyboardType="email-address"
      //             returnKeyType="next"
      //             autoCorrect={false}
      //             onChangeText={username => this.setState({ username })}
      //             onSubmitEditing={() => this.refs.txtPassword.focus()}
      //           />
      //           <TextInput
      //             style={styles.input}
      //             placeholder="Enter password"
      //             placeholderTextColor="rgba(84, 110, 122,0.8)"
      //             onChangeText={pwd => this.setState({ pwd })}
      //             returnKeyType="go"
      //             secureTextEntry
      //             autoCorrect={false}
      //             ref={"txtPassword"}
      //           />
      //           <View style={{ flexDirection: 'row', height: 50 }}>
      //             <TouchableOpacity
      //               style={{
      //                 flex: 1, backgroundColor: "#3366CC", borderRadius: 10
      //                 , height: 50, alignItems: "center", padding: 10
      //               }}
      //               onPress={this.handleClick}
      //             >
      //               <Text style={styles.buttonText}>Đăng nhập</Text>
      //             </TouchableOpacity>
      //             <GoogleSigninButton
      //               style={{ flex: 1, height: 50 }}
      //               size={GoogleSigninButton.Size.Wide}
      //               color={GoogleSigninButton.Color.Dark}
      //               onPress={this._signIn}
      //               disabled={this.state.isSigninInProgress} />
      //           </View>

      //           <TouchableOpacity
      //             style={styles.buttonContainer}
      //             onPress={() => this.props.navigation.navigate("Signup", {})}
      //           >
      //             <Text style={styles.buttonText}>Đăng kí</Text>
      //           </TouchableOpacity>
      //         </View>
      //       </View>
      //     </TouchableWithoutFeedback>
        
      //   <ProgressDialog
      //     style={{ borderRadius: 10 }}
      //     visible={this.state.showLoading}
      //     title="Đang kết nối đến server"
      //     activityIndicatorColor="blue"
      //     activityIndicatorSize="large"
      //     animationType="slide"
      //     message="Vui lòng chờ trong giây lát ..."
      //   />
      // </KeyboardAvoidingView>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
     alignItems: "center",
     justifyContent: "center",
    height:logoHeight,
    marginBottom:20,
  },
  logo: {},
  banner: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom:15,
  },
  title: {
    color: "#21618C",
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 30,
    opacity: 1
  },
  inforContainer: {
    height:215,
  },
  input: {
    width:'93%',
    height:50,
    backgroundColor: "rgba(144, 164, 174  ,0.7)",
    color: "#546E7A",
    marginBottom: 10,
    borderRadius:20,
    
  },
  buttonContainer: {
    borderRadius: 10,
    backgroundColor: "#3366CC",
    alignItems:"center",
    height:50,
    padding :10,
    marginTop:15,
    width:'93%',
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
    backgroundColor:"#FFFFFF",
},
header: {
    fontSize: 36,
    marginBottom: 48,

},
btnContainer: {
    backgroundColor: "white",
},
});
