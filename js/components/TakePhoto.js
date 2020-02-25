import React from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { navigate } from "../redux/render/render.action";

import {
  Container,
  Header,
  Text,
  Left,
  Body,
  Right,
  Button,
  Content,
  Footer, 
  FooterTab
} from "native-base";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const TakePhoto = props => {

  const takePhoto = () => {
    let options = {
      storageOptions: {
        cameraRoll: true,
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.launchCamera(options, response => {
        props.navigate("REACT_NATIVE_HOME");
    });
  };
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
      <Content style={{...styles.container, backgroundColor: '#49beb7'}}>
            <View style={{ alignItems: "center", marginTop: height * 0.15 }}>
                <Image
                  source={require("../res/camera.png")}
                  style={{ height: width * 0.6, width: width * 0.6 }}
                />
            </View>
            <View style={{alignContent: "center", justifyContent: "center", width: width * 0.6, marginLeft: width * 0.2, marginTop: height * 0.05}}>
                <Text style={{color: 'white', alignItems: 'center'}}>
                    Use your device camera to take a photo and store it in the device camera roll for later use.
                </Text>
            </View>
            <View style={{alignContent: "center", justifyContent: "center", marginLeft: width * 0.2}}>
                <Button style={{marginTop: height * 0.025, backgroundColor: '#fe5f55', width: width * 0.6,
                alignItems: 'center'}}
                onPress={() => takePhoto()}>
                    <Text style={{alignContent: "center"}}>
                        Take A Photo
                    </Text>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render))
  };
};

export default connect(null, mapDispatchToProps)(TakePhoto);
