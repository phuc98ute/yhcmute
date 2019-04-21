import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
  ToastAndroid,BackHandler
} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { AsyncStorage } from "react-native";
import { Link } from "react-router-native";
// import { Icon } from "react-native-elements";
//import Icon from 'react-native-vector-icons/FontAwesome';
import jwtDecode from "jwt-decode";
import Config from "react-native-config";
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";

export default class Activity extends Component {
  static navigationOptions = {
      title:'Các hoạt động đã đăng kí',
      headerMode:'screen'
  };
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: true
    };
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "column", marginBottom: 3 }}
        onPress={() =>
          this.setState({
            dialogVisible: true,
            activytyName: item.actName,
            activityContent: item.actContent,
            activityId: item.id
          })
        }
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={styles.container}>
            <Image
              source={{url:item.image}}
              style={styles.photo}
            />
            <View style={styles.container_text}>
              <Text style={styles.title}>{item.actName}</Text>
              <Text style={styles.description}>{item.actContent}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => {
    return (
      <View>
        style={{ height: 1, width: "100%", backgroundColor: "black" }}
      </View>
    );
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
 } 
 componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
  componentDidMount() {
    AsyncStorage.getItem('access_token', (err, result) => {
        //console.log(result);
        if(result!=null){
            console.log(result)
        var Response=fetch(`${Config.API_URL}/api/v1/people/activities/registration`, 
        {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+result,
        },
        
    })
      .then(Response => Response.json()
      )
      .then(ResponseJson => {
        this.setState({
          dataSource: ResponseJson.data,
          isLoading: false,
          
        });
        console.log(ResponseJson.data)
      })
      .catch(error => {
        console.log(error);
      });
  }
}
)
  }


  render() {
    var { navigate } = this.props.navigation;
    return  (
      this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
                <ActivityIndicator size="large" color="330066" animating />
            </View>
            :
                <Container>
                    <Header>
                        <Left>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name="menu" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Hoạt động đã đăng kí</Title>
                        </Body>
                        
                    </Header>
                    {/* <Content padder style={{height:'100%'}}> */}
                        <View>
                            <View style={{ height: '93%' }}>
                                <FlatList
                                    data={this.state.dataSource}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                //ItemSeparatorComponent={this.renderSeparator}
                                />
                                <ConfirmDialog
                                    title={this.state.activytyName}
                                    message={this.state.activityContent}
                                    visible={this.state.dialogVisible}
                                    onTouchOutside={() => this.setState({ dialogVisible: false })}
                                    positiveButton={{
                                        title: "Đăng kí",
                                        onPress: () => {
                                            try {
                                                AsyncStorage.getItem('access_token', (err, result) => {
                                                    console.log(result);
                                                    if (result !== null) {
                                                        var response = fetch(`${Config.API_URL}/api/v1/activities/registration/${this.state.activityId}`, {
                                                            method: 'POST',
                                                            headers: {
                                                                Accept: 'application/json',
                                                                'Content-Type': 'application/json',
                                                                'Authorization': 'Bearer ' + result,
                                                            },
                                                            body: JSON.stringify({

                                                            }),
                                                        })
                                                            .then((response) => { return response.json() })
                                                            .then(response => {
                                                                let ari = (response.isSuccess)
                                                                if (ari == 'true') {
                                                                    ToastAndroid.show('Đã đăng kí thành công!', ToastAndroid.LONG);
                                                                    this.setState({ dialogVisible: false })
                                                                }
                                                                if (ari == 'false') {
                                                                    let message = response.errors.map((val, title) => {
                                                                        ToastAndroid.show(val.message, ToastAndroid.LONG);
                                                                        this.setState({ dialogVisible: false })
                                                                    })
                                                                }
                                                            })
                                                            .catch(err => { console.log('ERR', err), ToastAndroid.show('Lỗi đăng kí không thành công!', ToastAndroid.LONG) });
                                                    }

                                                })
                                            } catch (error) {
                                                // Error retrieving data
                                            }

                                        }
                                    }}
                                    negativeButton={{
                                        title: "Hủy",
                                        onPress: () => this.setState({ dialogVisible: false })
                                    }}
                                />
                            </View>
                            
                        </View>
                    {/* </Content> */}
                </Container>
    );
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
