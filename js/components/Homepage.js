import React, { Component } from "react";

import { Image, StyleSheet, Dimensions } from "react-native";

import { connect } from "react-redux";

import { selectNavigator } from "../redux/render/render.selectors";

import {
  selectUserName,
  selectUserProfilePic
} from "../redux/user/user.selectors";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

import { navigate } from "../redux/render/render.action";

import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Left,
  Body,
  Right,
  Title,
  View,
  CardItem,
} from "native-base";

const HomePage = props => {
  return (
    <Container style={{ width: "100%", height: "100%" }}>
      <Header style={{backgroundColor: '#2a7886'}}>
        <Left />
        <Body>
          <Title style={{color: 'white'}}>TourViewAR</Title>
        </Body>
        <Right />
      </Header>
      <Content style={{backgroundColor: '#49beb7'}}>
        <View style={{ borderTopColor: 'orange', borderTopWidth: 1, alignItems: "center", marginTop: width * 0.15, borderRadius: width * 0.3, backgroundColor: 'white', height: width * 0.6, width: width * 0.6, marginLeft: width * 0.2 }}>
          <View style={{marginTop: height * 0.1}}>
            <Text style={{fontFamily: 'Gill Sans', fontSize: 35, color: '#fe5f55'}}>TOURVIEWAR</Text>
          </View>  
          <View tyle={{marginTop: height * 0.1}}>
            <Text style={{color: '#a64942', fontSize: 15}}>Create Your Own Virtual Space</Text>
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: 0.035 * height, marginBottom: 0.015 * height }}>
          <Image
            style={{ width: 0.15 * width, height: 0.15 * width, justifyContent: "center" }}
            source={require("../res/camera.png")}
          ></Image>
        </View>
        <CardItem style={{backgroundColor: '#49beb7'}}>
          <Body style={{ alignItems: "center" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{color: 'white'}}>{`Welcome ${props.selectUserName}`}</Text>
            </View>
          </Body>
        </CardItem>
        <View style={{ marginTop: height * 0.02 }}>
          <Button
            block
            light
            style={{...styles.button, backgroundColor: '#fe5f55'}}
            onPress={() => {
              props.navigate("SEARCH_PAGE");
            }}
            full
          >
            <Text style={{color: 'white'}}>Search Tour</Text>
          </Button>
          <Button
            block
            light
            style={styles.button}
            onPress={() => {
              props.navigate("CREATE_TOUR");
            }}
            full
          >
            <Text>Create A New Tour</Text>
          </Button>
          <Button
            block
            style={styles.button}
            onPress={() => {
              props.navigate("LOGIN_PAGE");
            }}
            full
          >
            <Text>Log Out</Text>
          </Button>
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

let styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    justifyContent: "space-around"
  },
  button: { marginTop: 20, marginHorizontal: 50 }
});

const mapDispatchToProps = dispatch => {
  return { navigate: render => dispatch(navigate(render)) };
};

const mapStateToProps = state => {
  return {
    selectNavigator: selectNavigator(state),
    selectUserProfilePic: selectUserProfilePic(state),
    selectUserName: selectUserName(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
