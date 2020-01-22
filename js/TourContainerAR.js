"use strict";

import React, { Component } from "react";
import { selectTourPicUrl, selectTourId } from "./redux/tour/tour.selectors";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";

import {
  ViroSceneNavigator,
  ViroScene,
  Viro360Video,
  Viro360Image,
  ViroUtils,
  ViroPortal,
  ViroPortalScene,
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
  ViroImage
} from "react-viro";

var InfoElement = require("./custom_controls/InfoElement");
let polarToCartesian = ViroUtils.polarToCartesian;
// var slutWindowCard = require("./res/infocard_slut.png");
var julianWhy = require("./res/julian_why.jpg");

class TourContainerAR extends Component {
  constructor() {
    super();
    this.state = {
      text: "Initializing AR..."
    };
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <Viro360Image
          source={{
            uri:
              // this.props.selectTourPicUrl
              "https://i.pinimg.com/originals/15/19/65/1519654484f5159bd5d0cd87f0a2c42f.jpg"
          }}
        />
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          poition={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />
        <ViroNode
          position={[0, -1, 0]}
          dragType="FixedToWorld"
          onDrag={() => {}}
        >
          <InfoElement
            content={julianWhy}
            contentCardScale={[3.67, 4, 1]}
            position={polarToCartesian([-5, 0, 0])}
          />
        </ViroNode>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Initializing AR..."
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

/* ----- COMPONENT STYLES ----- */

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require("./res/grid_bg.jpg")
  }
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250
  }
});


// const mapDispatchToProps = dispatch => {
//   return {
//     navigate: render => dispatch(navigate(render)),
//     setUserName: name => dispatch(setUserName(name)),
//     setUserPassword: password => dispatch(setUserPassword(password)),
//     setUserProfilePic: pic => dispatch(setUserProfilePic(pic)),
//     setUserId: id => dispatch(setUserId(id))
//   };
// };

const mapStateToProps = state => {
  return {
    selectTourPicUrl: selectTourPicUrl(state),
    selectTourId: selectTourId(state)
  };
};

export default connect(mapStateToProps, null)(TourContainerAR);

module.exports = TourContainerAR;