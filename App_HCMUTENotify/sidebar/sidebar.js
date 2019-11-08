import React from "react";
import { Image } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  View,
} from "native-base";
import firebase from 'react-native-firebase';
const routes = [{component:"Profile",title:"Tài khoản"}, {component:"Activity",title:"Hoạt động đang diễn ra"}, {component:"SignActivity",title:"Hoạt động đã đăng kí"},{component:"Login",title:"Đăng xuất"}];

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic:[]
    };
  }
  componentDidMount(){

  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{flex:1,flexDirection:"row",marginTop:20}}>
            <View style={{ flex: 1,alignItems:"center",marginLeft:"15%" }}>
              <Image

                style={{
                  height: 90,
                  width: 77,
                }}
                source={
                  require("../source/logodoan.png")
                }
              />
            </View>
            <View style={{ flex: 1, alignItems: "center",marginRight:"15%" }}>
              <Image

                style={{
                  flex: 1,
                  height: 90,
                  width: 77,
                }}
                source={
                  require("../source/logohoi.png")
                }
              />
            </View>
          </View>
          <Text style={{
            marginVertical:10,
              color: "#0000DD",
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: "center",
            }}>Y_HCMUTE</Text>
          
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 10 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  
                  onPress={() =>{
                      console.log("chuyen amn hinh")
                      if(data.component!="Login") {this.props.navigation.navigate(data.component)}
                      else {
                          console.log('Data login')
                          console.log('Asynsyorage',AsyncStorage)
                          AsyncStorage.getItem('topic', (err, result) => {
                              console.log('result',result)
                                  if (result != null) {
                                      this.setState({'topic':JSON.parse(result)});
                                      console.log('result'+result);
                                      console.log('state'+this.state.topic)
                                      // this.state.topic.map((item) => {
                                      //
                                      // });
                                      for (let item of this.state.topic) {
                                          firebase.messaging().unsubscribeFromTopic(item);
                                      }

                                  }
                              }
                          );
                          AsyncStorage.clear();
                          this.props.navigation.navigate(data.component);
                      }

                  }
                  }
                >
                  <Text>{data.title}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}