import React, { useState } from "react";
import {  View, Image, Dimensions } from "react-native";
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
  Button,
  Footer,
  FooterTab
} from "native-base";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const SkyboxGuide = props => {
    const phases = ['Take Skybox Front Photo', 'Take Skybox Left Photo', 'Take Skybox Back Photo', 'Take Skybox Right Photo', 'Take Skybox Top Photo', 'Take Skybox Bottom Photo'];
  [tourname, settourname] = useState("");
  return (
    <Container style={{ width: "100%", height: "100%" }}>
    <Header style={{backgroundColor: '#2a7886'}}>
      <Left>
        <Button
          style={{backgroundColor: '#fe5f55'}}
          onPress={() => {
            props.navigate("REACT_NATIVE_HOME");
          }}>
          <Text style={{color: 'white'}}>Back</Text>
        </Button>
      </Left>
      <Body />
      <Right />
    </Header>
      <Content style={{backgroundColor: '#49beb7', flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"}}>
        <View style={{ marginTop: 0.062 * height }}>
          {
            props.forscene ? 
            (
              <Button
              style={{backgroundColor: '#fe5f55', 
              width: width * 0.6
              }}
                vertical
                onPress={() => {
                  props.navigate("SKYBOX_" + props.num);
                }}>
                <Text style={{color: 'white'}}>{phases[props.num]}</Text>
              </Button>
            ) 
            : 
            (
              <Button
              style={{backgroundColor: '#fe5f55', 
              width: width * 0.6
              }}
                vertical
                onPress={() => {
                  props.navigate("SKYBOX_" + props.num + "_SCENE");
                }}>
                <Text style={{color: 'white'}}>{phases[props.num]}</Text>
              </Button>
            )
          }
        </View>
        <View style={{ alignItems: "center", marginTop: width * 0.075 }}>
          <Image
            source={require("../res/skybox.jpg")}
            style={{ height: width * 0.15, width: width * 0.15 }}
          />
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

const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render))
  };
};
export default connect(null, mapDispatchToProps)(SkyboxGuide);
