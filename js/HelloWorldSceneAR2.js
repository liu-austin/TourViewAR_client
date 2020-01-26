"use strict";

import React, { Component } from "react";

import { StyleSheet, View } from "react-native";

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
var slutWindowCard = require("./res/infocard_slut.png");
import axios from 'axios';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    this.state = {
        text: "Initializing AR...",
        editmode: false,
        showtextinput: false,
        objects: [],
        objectname: '',
        currentSceneId: null,
        sceneIdHistory: [],
        selectimage: false
    };
    this._onInitialized = this._onInitialized.bind(this);
  }

  componentDidMount() {
    if (!this.props.sceneNavigator.viroAppProps.selectIsNew && this.props.sceneNavigator.viroAppProps.selectIsEditable) {
      axios.get(`http://tourviewarserver.herokuapp.com/api/objects/${this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id}`)
      .then(results => {
          this.setState({objects: results.data, currentSceneId: this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id, sceneIdHistory: [this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id]});
          this.props.sceneNavigator.viroAppProps.setPanoId(this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id);
      })
      .catch(err => {
          alert('There was an error loading this tour. Please try again.');
          this.props.sceneNavigator.viroAppProps.navigate('REACT_NATIVE_HOME');
      });
    } else if (this.props.sceneNavigator.viroAppProps.selectIsNew) {
        this.setState({currentSceneId: this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id, sceneIdHistory: [this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id]});
        this.props.sceneNavigator.viroAppProps.setPanoId(this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id);
    } else {
      axios.get(`http://tourviewarserver.herokuapp.com/api/objects/${this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id}`)
      .then(results => {
          this.setState({objects: results.data, currentSceneId: this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id, sceneIdHistory: [this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id]});
          this.props.sceneNavigator.viroAppProps.setPanoId(this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id);
      })
      .catch(err => {
          alert('There was an error loading this tour. Please try again.');
          this.props.sceneNavigator.viroAppProps.navigate('REACT_NATIVE_HOME');
      });
    }
}

render() {
  return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
          {
              this.props.sceneNavigator.viroAppProps.selectTourPanos.length ? 
                  (
                      <View>
                          <Viro360Image source={{ uri: this.props.sceneNavigator.viroAppProps.selectTourPanos[0].img_url}}/>
                          {
                              this.state.objects.length ?
                              (
                                  this.state.objects.map((object, i) => {
                                      let toRender;
                                      if (object.type === 'text') {
                                          toRender = (
                                              <ViroNode objectid={object.id} key={i} position={[object.x, object.y, -2]} dragType="FixedToWorld" onDrag={() => this._onDrag}>
                                                  <TextElement content={object.value} contentCardScale={[object.scale.x, object.scale.y, object.scale.z]} position={polarToCartesian([-5, 0, 0])}/>
                                              </ViroNode>
                                          );
                                      } else if (object.type === 'image') {
                                          toRender = (
                                              <ViroNode objectid={object.id} key={i} position={[object.x, object.y, -2]} dragType="FixedToWorld" onDrag={() => this._onDrag}>
                                                  <ImageElement content={object.value} contentCardScale={[object.scale.x, object.scale.y, object.scale.z]} position={polarToCartesian([-5, 0, 0])}/>
                                              </ViroNode>
                                          );
                                      } else {
                                          toRender = null;
                                      }
                                      return toRender;
                                  })
                              ) 
                              : 
                              (
                                  null
                              )
                          }
                      </View>
                  ) 
                  : 
                  (
                      null
                  )
              }
      </ViroARScene>
  )};

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

module.exports = HelloWorldSceneAR;

{
  /* <Viro360Image source={require('./res/amsterdam.jpg')} /> */
}
{
  /* <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} /> */
}
{
  /* <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: true, loop: true}} /> */
}
{
  /* <Viro3DObject source={require('./res/emoji_smile/emoji_smile.vrx')} position={[0, -.5, 0]} scale={[.2, .2, .2]} type="VRX" /> */
}
