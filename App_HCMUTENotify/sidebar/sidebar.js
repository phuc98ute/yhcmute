import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
const routes = [{component:"Profile",title:"Tài khoản"}, {component:"Activity",title:"Hoạt động đang diễn ra"}, {component:"SignActivity",title:"Hoạt động đã đăng kí"},{component:"Login",title:"Đăng xuất"}];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri:
                "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png"
            }}
            style={{
              height: 120,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute"
            }}
          />
          <Image
            square
            style={{
              height: 90,
              width: 75,
              position: "absolute",
              alignSelf: "center",
              top: 20
            }}
            source={
                require("../source/Hcmute.png")
            }
          />
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data.component)}
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