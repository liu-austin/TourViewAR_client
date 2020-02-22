import React, { Component, useState, useCallback } from "react";
import axios from "axios";
import { ScrollView, View, StyleSheet, Image, Dimensions } from "react-native";
import { connect } from "react-redux";
import { navigate } from "../redux/render/render.action";
import { setTourName } from "../redux/tour/tour.action";
import { selectTourName } from "../redux/tour/tour.selectors";
import { selectUserId } from "../redux/user/user.selectors";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Body,
  Right,
  Button,
  Item,
  Label,
  Input,
  Footer, 
  FooterTab
} from "native-base";
const Create = props => {
  return (
    <Container style={{ width: "100%", height: "100%" }}>
      <Header style={{backgroundColor: '#2a7886'}}>
        <Left>
          <Button
            style={{backgroundColor: '#fe5f55'}}
            onPress={() => {
              props.navigate("REACT_NATIVE_HOME");
            }}
          >
            <Text style={{color: 'white'}}>Back</Text>
          </Button>
        </Left>
        <Body />
        <Right />
      </Header>
      <Content style={{backgroundColor: '#49beb7'}}>
        <View style={{ width: 0.6 * width, marginLeft: 0.2 * width, marginTop: height * 0.1 }}>
            <Text>
              Welcome to your new tour. Begin by entering the name of your tour which will be searchable by users once it is created.
            </Text>
            <Item floatingLabel>
            <Label style={{color: 'white'}}>ENTER TOUR NAME</Label>
            <Input
              onChangeText={text => {
                props.setTourName(text);
              }}
            />
          </Item>
          <Button
            style={{marginTop: height * 0.025, backgroundColor: '#fe5f55'}}
            block
            onPress={() => {
              props.navigate("CREATE_OPTIONS");
            }}
            full
          >
            <Text style={{color: 'white'}}>SUBMIT</Text>
          </Button>
          <View style={{ alignItems: "center", marginTop: 0.4 * height, marginBottom: 0.015 * height }}>
            <Image
              style={{ width: 0.1 * width, height: 0.1 * width, justifyContent: "center" }}
              source={require("../res/world.png")}
            ></Image>
          </View>
        </View>
      </Content>
      <Footer style={{ height: height * 0.05}}>
      <FooterTab style={{backgroundColor: '#2a7886' }}>
        <Button
          vertical
          onPress={() => {
            props.navigate("PROFILE");
          }}
        >
          <Text style={{color: 'white'}}>Profile</Text>
        </Button>
        <Button
          vertical
          onPress={() => {
            alert('In this app, you can view or create 360 degree virtual spaces. To view a tour, you can click the Search Tour button and type in the name of the tour you want to view. Also, you can view your own created tours by clicking the Profile tab in the footer. To create a tour, click the Create A New Tour button. You will be prompted whether you want to upload a panoramic image or you would like to take photos of your current surroundings as the base for your virtual space tour. Once your 360 scene has been uploaded to AWS S3, you can add text, images, or additional 360 scenes to your tour. Click the EDIT PAGE button to add props to your scene.');
          }}
        >
          <Text style={{color: 'white'}}>How to Use</Text>
        </Button>
        <Button
          vertical
          onPress={() => {
            props.navigate('TAKE_PHOTO');
          }}
        >
          <Text style={{color: 'white'}}>Take a Photo</Text>
        </Button>
        <Button
          vertical
          onPress={() => {
            alert('Welcome to TourViewAR! The AR app that allows you to create virtual tours by creating 360 degree images of uploaded panoramic images or a skybox scene made from 6 standard photos. After an initial scene has been created, users can add text, images, or additional scenes to populate their tours. Once a tour has been created, all users can search for it to experience a virtual tour of the location! This is an alpha build currently being developed by Austin Liu - austinliu279@gmail.com.');
          }}
        >
          <Text style={{color: 'white'}}>About App</Text>
        </Button>
      </FooterTab>
    </Footer>
    </Container>
  );
};
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: height * 0.1
  },
  profileImg: {
    marginTop: height * 0.2,
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.1
  }
});
const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render)),
    setTourName: name => dispatch(setTourName(name))
  };
};

const mapStateToProps = state => {
  return {
    selectTourName: selectTourName(state)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Create);
