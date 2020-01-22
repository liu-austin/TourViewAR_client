import React, { Component, useState } from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { navigate } from "../redux/render/render.action";
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";
const CreateOptions = props => {
  [tourname, settourname] = useState("");
  return (
    <Container style={{ width: "100%", height: "100%" }}>
      <Header>
        <Left>
          <Button
            hasText
            transparent
            onPress={() => {
              props.navigate("REACT_NATIVE_HOME");
            }}
          >
            <Text>Back</Text>
          </Button>
        </Left>
        <Body />
        <Right />
      </Header>
      <Content>
        <View style={{ marginTop: 50 }}>
          <Button
            vertical
            onPress={() => {
              props.navigate("CAMERA_PAGE");
            }}
          >
            <Text>Take a Photo</Text>
          </Button>
          <Button
            vertical
            onPress={() => {
              props.navigate("IMAGE_UPLOAD");
            }}
          >
            <Text>Upload Image</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  },
  profileImg: {
    marginTop: 30,
    width: 60,
    height: 60,
    borderRadius: 10
  }
});
const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render))
  };
};
export default connect(null, mapDispatchToProps)(CreateOptions);
