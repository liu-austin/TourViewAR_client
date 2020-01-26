import React, { Component } from "react";

import { StyleSheet } from "react-native";

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

import axios from 'axios';

var SceneElement = require('./custom_controls/SceneElement');
var TextElement = require('./custom_controls/TextElement');
var ImageElement = require('./custom_controls/ImageElement');
var InfoElement = require("./custom_controls/InfoElement");
let polarToCartesian = ViroUtils.polarToCartesian;
var slutWindowCard = require("./res/infocard_slut.png");

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
        <Viro360Image
          source={{
            uri: this.props.sceneNavigator.viroAppProps.selectTourPanos[0].img_url
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
            content={slutWindowCard}
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

  _onDrag(draggedToPosition, source) {

    axios.put(`http://tourviewarserver.herokuapp.com/api/object`, {
        x: draggedToPosition[0],
        y: draggedToPosition[1],
        scalex: 1,
        scaley: 1,
        scalez: 1,
        id_object: this.props.selectObjectId
    }).then(results => console.log(results))
    .catch(err => console.log(err));
  }

  _createTextObject(text) {
    axios.post(`http://tourviewarserver.herokuapp.com/api/object`, {
        object_type: 'text',
        object_value: text,
        id_pano: this.props.sceneNavigator.viroAppProps.selectPanoId
    }).then((results) => {
        this.props.sceneNavigator.viroAppProps.setObjectId(results.data.id);
        let textobject = {
            id: results.data.id,
            type: 'text',
            x: 0,
            y: 0, 
            value: text,
            scale: {x: 1, y: 1, z: 1},
            id_pano: this.props.sceneNavigator.viroAppProps.selectPanoId
        };
        this.setState({objects: [...this.state.objects, textobject]});
    }).catch(err => alert('There was an error creating this object'));

}

_createImageObject(publicUrl) {
    axios.post(`http://tourviewarserver.herokuapp.com/api/object`, {
        object_type: 'image',
        object_value: publicUrl,
        id_pano: this.props.sceneNavigator.viroAppProps.selectPanoId
    }).then((results) => {
        this.props.sceneNavigator.viroAppProps.setObjectId(results.data.id);
        let textobject = {
            id: results.data.id,
            type: 'image',
            x: 0, 
            y: 0,
            value: publicUrl,
            scale: {x: 1, y: 1, z: 1},
            id_pano: this.props.sceneNavigator.viroAppProps.selectPanoId
        };
        this.setState({objects: [...this.state.objects, textobject]});
    }).catch(err => alert('There was an error creating this object'));
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