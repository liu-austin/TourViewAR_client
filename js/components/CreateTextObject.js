import React, { Component, useState, useCallback } from "react";
import axios from "axios";
import { ScrollView, View, StyleSheet, Image, Dimensions } from "react-native";
import { connect } from "react-redux";
import { navigate } from "../redux/render/render.action";
import { setObjectText, setObjectId, setObjects } from '../redux/object/object.action';
import { selectObjectText, selectObjects, selectForSb } from '../redux/object/object.selectors';
import { selectPanoId } from '../redux/pano/pano.selectors';

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

const CreateTextObject = props => {
  [loaded, setLoaded] = useState(false);
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
      <View style={{ marginTop: 0.1 * height, flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View style={{ alignItems: "center", marginBottom: 0.1 * height, marginLeft: width * 0.2}}>
              <Item floatingLabel>
                <Label style={{color: 'white'}}>ENTER AR TEXT</Label>
                <Input
                  style={{color: 'white', width: width * 0.6}}
                  onChangeText={text => {
                    props.setObjectText(text);
                  }}
                />
              </Item>
            </View>

          {
            loaded ? 
            (
              <View style={{ alignItems: "center", marginBottom: 0.25 * height}}>
              <Button
              style={{
                color: 'white',
                backgroundColor: '#fe5f55',
                width: width * 0.6,
                alignItems: 'center'
              }}
              block
              onPress={() => {
                props.navigate("EDIT_AR_PAGE")
              }}full>
              <Text>GO TO AR SCENE</Text>
            </Button>
            </View>
            ) 
            : 
            (
              <View style={{ alignItems: "center", marginBottom: 0.25 * height}}>
              <Button
              style={{
                color: 'white',
                backgroundColor: '#fe5f55',
                width: width * 0.6,
                alignItems: 'center'
              }}
              block
              onPress={() => {
                if (props.selectForSb) {
                  axios
                  .post(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/objectskybox`, {
                    object_type: "text",
                    object_value: props.selectObjectText,
                    id_skybox: props.selectSkyboxId
                  })
                  .then(results => {
                    props.setObjectId(results.data.id);
                      setLoaded(true);
                  })
                  .catch(err => alert("There was an error creating this object"));
                } else {
                  axios
                  .post(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/object`, {
                    object_type: "text",
                    object_value: props.selectObjectText,
                    id_pano: props.selectPanoId
                  })
                  .then(results => {
                    props.setObjectId(results.data.id);
                      setLoaded(true);
                  })
                  .catch(err => alert("There was an error creating this object"));
                }

              }}full>
              <Text>SUBMIT</Text>
            </Button>
            </View>
            )
          }

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

const mapStateToProps = state => {
    return {
      selectObjectText: selectObjectText(state),
      selectPanoId: selectPanoId(state),
      selectObjects: selectObjects(state),
      selectForSb: selectForSb(state)
    };
  };

const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render)),
    setObjectText: text => dispatch(setObjectText(text)),
    setObjectId: id => dispatch(setObjectId(id)),
    setObjects: objects => dispatch(setObjects(objects))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTextObject);
