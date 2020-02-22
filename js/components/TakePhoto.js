import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
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
  Button
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
      <View style={styles.container}>
            <Button style={{color: '#fe5f55', width: width * 0.6,
            alignItems: 'center'}}
            onPress={() => takePhoto()}>
                <Text>
                    Take A Photo
                </Text>
            </Button>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render))
  };
};

export default connect(null, mapDispatchToProps)(TakePhoto);
