import React, { Component } from "react";
import { setTourId, setTourPicUrl } from "../redux/tour/tour.action";
import { selectTourPicUrl, selectTourId } from "../redux/tour/tour.selectors";
import { navigate } from "../redux/render/render.action";
import { connect } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Button
} from "react-native";

import {
  ViroARSceneNavigator,
  Viro360Image,
  ViroAmbientLight,
  ViroARScene,
  ViroNode,
  ViroSpotLight,
  ViroUtils,
} from "react-viro";

var InfoElement = require("../custom_controls/InfoElement");
let polarToCartesian = ViroUtils.polarToCartesian;
var slutWindowCard = require("../res/infocard_slut.png");
var InitialARScene = require("../HelloWorldSceneAR.js");

const TourContainer = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     navigator: "PROFILE"
  //   };
  //   this.setRedux = this.setRedux.bind(this);
  // }

  const setRedux = () => {
    //redux action to set stateset
    props.setTourId(props.tour.id);
    props.setTourPicUrl(props.tour.pic_url);
    //redux navigate to AR
    // alert(props.selectTourId);
    setTimeout(() => {props.navigate("ARtc");},1000)
    // alert(this.props.tour.pic_url);
  }
    // if (this.state.navigator === "PROFILE") {
      return (
        <View style={localStyles.tourContainer}>
          <Image
            style={localStyles.icon}
            source={{
              uri:
                `${props.tour.pic_url}`
            }}
          />
          <Text>{`${props.tour.tour_name}`}</Text>
          <Button
            style={localStyles.button}
            onPress={() => {setRedux()}}
            title="VIEW EXPERIENCE"
          />
        </View>
      );
    // } else if (this.state.navigator === "AR") {
    //   // this should pass upwards to the Profile container so that it overtakes the entire page instead of rendering in context of the other experience pods
    //   return <ViroARSceneNavigator initialScene={{ scene: InitialARScene }}/>
    // }

}

var localStyles = StyleSheet.create({
  tourContainer: {
    flex: 1,
    width: 300,
    margin: 5,
    flexDirection: "column",
    alignItems: "flex-start",
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 3,
    backgroundColor: "#d3d3d3"
  },
  icon: {
    width: 50,
    height: 50
  },
  button: {
    marginTop: 5
  }
});

const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render)),
    setTourId: id => dispatch(setTourId(id)),
    setTourPicUrl: url => dispatch(setTourPicUrl(url)),
  };
};

const mapStateToProps = state => {
  return {
    selectTourPicUrl: selectTourPicUrl(state),
    selectTourId: selectTourId(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TourContainer);
