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
    BackHandler,
  KeyboardAvoidingView,
  ToastAndroid,
  Dimensions,
  Platform,
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Config from "react-native-config";
import jwtDecode from "jwt-decode";
import { Container, Header, Title, Left, Right, Button, Body, Content, Card, CardItem, Segment } from "native-base";
import Icon from 'react-native-vector-icons/Entypo';
import Statusbar from "../sidebar/statusbar";
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const logoHeight = deviceHeight-255-200;
const logobar=40;

export default class ChangeProfile extends Component {
  static navigationOptions = {
    header: null,
    
  };

  constructor(props) {
    super(props);
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      oldPwd: "",
      newPwd: "",
      newPwd2:"",
      showLoading: false,
        account:"",

    };
  }
    componentDidMount(){

        // this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        //     this.props.navigation.navigate("ChangeProfile",{})
        //     //this.goBack(); // works best when the goBack is async
        //     return true;
        // });
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.navigate("Profile",{});
        return true;
    }

    _handle = () => {
        if (this.state.oldPwd != "" && this.state.newPwd != "" && this.state.newPwd2 != "" && this.state.newPwd == this.state.newPwd2) {
            AsyncStorage.getItem('Account', (err, result) => {
                var res = JSON.parse(result);
                this.setState({'account': res.id});
            });
            this.setState({showLoading: true});
            var {navigate} = this.props.navigation;
            AsyncStorage.getItem('access_token', (err, result) => {
                console.log("id account: ")
                console.log(this.state.account);
                if (result != null) {
                    var res = fetch(
                        `${Config.API_URL}/api/v1/user/changeStudentPassword/${this.state.account}`,
                        {
                            method: "PUT",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                'Authorization': 'Bearer ' + result,
                            },
                            body:
                                JSON.stringify({
                                    "oldPwd": this.state.oldPwd,
                                    "newPwd": this.state.newPwd
                                }),
                        }
                    )
                        .then((Response) => Response.json()
                        )
                        .then((ResponseJson) => {
                            console.log('resJson', ResponseJson)
                            this.setState({showLoading: false});
                            if (ResponseJson.status === "METHOD_NOT_ALLOWED") {
                                ToastAndroid.show("Lỗi không đổi được mật khẩu!", ToastAndroid.LONG)
                            } else {
                                AsyncStorage.clear(), this.props.navigation.navigate("Login", {});
                            }
                        })
                        .catch(err => {
                            console.log("ERR", err),
                                ToastAndroid.show("Lỗi đổi mật khẩu!", ToastAndroid.LONG);
                        });
                }
            })
        } else {
            ToastAndroid.show(
                "Điền đầy đủ các trường trên!",
                ToastAndroid.LONG
            );
        }
    };
  render() {
    var { navigate } = this.props.navigation;
    return (
     <View style={styles.container}>
         <Statusbar></Statusbar>
        <Header style={{ backgroundColor: "#FFFFFF",marginBottom:10 }}
          androidStatusBarColor="#CCCCCC">
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              {/* <Icon name="menu" color="black" /> */}
              <Icon name="menu" size={30} color="black" />
            </Button>
          </Left>
          <Body style={{}}>
            <Title style={{ justifyContent: 'center', color: 'black' }}>Đổi mật khẩu</Title>
          </Body>
          {/* <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("ChangeProfile",{})}
            >
              <IconSimpleLineIcons name="settings" />
            </Button>
          </Right> */}

        </Header>
        <View style={styles.inforContainer}>
        <TextInput
                    style={styles.input}
                    placeholder="Nhập mật khẩu hiện tại"
                    placeholderTextColor="rgba(84, 110, 122,0.8)"
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCorrect={false}
                    onChangeText={oldPwd => this.setState({ oldPwd })}
                    onSubmitEditing={() => this.refs.txtPassword.focus()}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Nhập mật khẩu mới"
                    placeholderTextColor="rgba(84, 110, 122,0.8)"
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCorrect={false}
                    onChangeText={newPwd => this.setState({ newPwd })}
                    onSubmitEditing={() => this.refs.txtPassword.focus()}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Xác nhận lại mật khẩu!"
                    placeholderTextColor="rgba(84, 110, 122,0.8)"
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCorrect={false}
                    onChangeText={newPwd2 => this.setState({ newPwd2 })}
                    onSubmitEditing={() => this.refs.txtPassword.focus()}
                  />
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this._handle}
                  >
                    <Text style={styles.buttonText}>Lưu</Text>
                  </TouchableOpacity>
        </View>
        
     </View>
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
    backgroundColor:'#FFFFFF',
    height:logoHeight,
    marginBottom:5,
  },
  logo: {

    width:logoHeight/2,
    height:logoHeight/2,
  },
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
    height:255,
    alignItems:'center'
  },
  input: {
    width:'93%',
    height:50,
    backgroundColor: "rgba(144, 164, 174  ,0.7)",
    color: "#546E7A",
    marginBottom: 10,
    borderRadius:20,
    textAlign:'center',
    
  },
  buttonContainer: {
    borderRadius: 30,
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
