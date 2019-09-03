import React from "react";
import { AppRegistry, Image, StatusBar,AsyncStorage } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  View,
} from "native-base";
const routes = [{component:"Profile",title:"Tài khoản"}, {component:"Activity",title:"Hoạt động đang diễn ra"}, {component:"SignActivity",title:"Hoạt động đã đăng kí"},{component:"Login",title:"Đăng xuất"}];
export default class SideBar extends React.Component {
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
                  
                  onPress={() =>{data.component!="Login" ? this.props.navigation.navigate(data.component):AsyncStorage.clear();this.props.navigation.navigate(data.component)} }
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