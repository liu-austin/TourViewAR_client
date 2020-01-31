import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

import {
  ViroSceneNavigator,
  ViroScene,
  Viro360Video,
  Viro360Image,
  ViroUtils,
  ViroFlexView,
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

import axios from "axios";

var SceneElement = require("./custom_controls/SceneElement");
var TextElement = require("./custom_controls/TextElement");
var ImageElement = require("./custom_controls/ImageElement");
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
      objectname: "",
      currentSceneId: null,
      sceneIdHistory: [],
      selectimage: false,
      draggedtox: null,
      draggedtoy: null
    };
    this._onInitialized = this._onInitialized.bind(this);
  }

  componentDidMount() {
    if (
      !this.props.sceneNavigator.viroAppProps.selectIsNew &&
      this.props.sceneNavigator.viroAppProps.selectIsEditable
    ) {
      axios
        .get(
          `http://tourviewarserver.herokuapp.com/api/objects/${this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id}`
        )
        .then(results => {
          // alert(JSON.stringify(results.data.rows))
          this.setState({
            objects: results.data.rows,
            currentSceneId: this.props.sceneNavigator.viroAppProps
              .selectTourPanos[0].id,
            sceneIdHistory: [
              this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id
            ]
          });
          this.props.sceneNavigator.viroAppProps.setPanoId(
            this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id
          );
        })
        .catch(err => {
          alert("There was an error loading this tour. Please try again.");
          this.props.sceneNavigator.viroAppProps.navigate("REACT_NATIVE_HOME");
        });
    } else if (this.props.sceneNavigator.viroAppProps.selectIsNew) {
      this.setState({
        currentSceneId: this.props.sceneNavigator.viroAppProps
          .selectTourPanos[0].id,
        sceneIdHistory: [
          this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id
        ]
      });
      this.props.sceneNavigator.viroAppProps.setPanoId(
        this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id
      );
    } else {
      axios
        .get(
          `http://tourviewarserver.herokuapp.com/api/objects/${this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id}`
        )
        .then(results => {
          this.setState({
            objects: results.data.rows,
            currentSceneId: this.props.sceneNavigator.viroAppProps
              .selectTourPanos[0].id,
            sceneIdHistory: [
              this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id
            ]
          });
          this.props.sceneNavigator.viroAppProps.setPanoId(
            this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id
          );
        })
        .catch(err => {
          alert("There was an error loading this tour. Please try again.");
          this.props.sceneNavigator.viroAppProps.navigate("REACT_NATIVE_HOME");
        });
    }
  }
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <Viro360Image
          source={{
            uri: this.props.sceneNavigator.viroAppProps.selectTourPanos[0]
              .img_url
          }}
        />
        {this.state.objects.length ? (
          this.state.objects.map((object, i) => {
            if (object.object_type === "text") {
              let onDrag = this._onDragCreate(object.id);
              return (
              //   <ViroNode
              //   position={[0, -1, 0]}
              //   dragType="FixedDistance"
              //   onDrag={() => {}}
              // >
              //   <InfoElement
              //     content={slutWindowCard}
              //     contentCardScale={[3.67, 4, 1]}
              //     position={polarToCartesian([-5, 0, 0])}
              //   />
              // </ViroNode>
              // <ViroFlexView materials="bg" style={{ flex: 0.3, flexDirection: 'column' }} >
              //     <ViroText
              //      style={{ flex: 1, color: 'purple', marginLeft:.2 }}
              //      text={object.object_value}
              //      fontSize={12} />
              // </ViroFlexView>
                <ViroNode
                key={i}
                position={[0, -1, 0]}
                dragType="FixedDistance"
                onDrag={() => onDrag}
              >
                <ViroText
                text={object.object_value}
                // textAlign="left"
                // textAlignVertical="top"
                // textLineBreakMode="Justify"
                // textClipMode="ClipToBounds"
                color="#fff"
                width={2} height={2}
                style={{fontFamily:"Arial", fontSize:12, fontWeight:'400', fontStyle:"italic", color:"#fff"}}
                position={polarToCartesian([-5, 0, 0])}
                />
                </ViroNode>
                // <ViroNode
                //   objectid={object.id}
                //   key={i}
                //   position={[object.x, object.y, -2]}
                //   dragType="FixedToWorld"
                //   onDrag={() => onDrag}
                // >
                //   <TextElement
                //     content={object.value}
                //     contentCardScale={[
                //       object.scale.x,
                //       object.scale.y,
                //       object.scale.z
                //     ]}
                //     position={polarToCartesian([-5, 0, 0])}
                //   />
                // </ViroNode>
              );
            } else if (object.object_type === "image") {
              let onDrag = this._onDragCreate(object.id);
              return (
                <ViroNode
                  objectid={object.id}
                  key={i}
                  position={[object.x, object.y, -2]}
                  dragType="FixedToWorld"
                  onDrag={() => onDrag}
                >
                  <ImageElement
                    content={object.object_value}
                    contentCardScale={[
                      object.scale.x,
                      object.scale.y,
                      object.scale.z
                    ]}
                    position={polarToCartesian([-5, 0, 0])}
                  />
                </ViroNode>
              );
            } else {
              return null;
            }
          })
        ) : (
          <ViroNode
          position={[0, -1, 0]}
          dragType="FixedDistance"
          onDrag={() => {}}
        >
          <InfoElement
            content={slutWindowCard}
            contentCardScale={[3.67, 4, 1]}
            position={polarToCartesian([-5, 0, 0])}
          />
        </ViroNode>
          // <ViroText
          // text={'Welcome To AR Sceme'}
          // textAlign="left"
          // textAlignVertical="top"
          // textLineBreakMode="Justify"
          // textClipMode="ClipToBounds"
          // color="#ff0000"
          // width={2} height={2}
          // style={{fontFamily:"Arial", fontSize:12, fontWeight:'400', fontStyle:"italic", color:"#0000FF"}}
          // position={[0,0,-2]}/>
        )}
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
  _onDragCreate(id) {
    return function(draggedToPosition, source) {
      this.props.sceneNavigator.viroAppProps.setObjectId(id);
      this.props.sceneNavigator.viroAppProps.setObjectXCoordinate(
        draggedToPosition[0]
      );
      this.props.sceneNavigator.viroAppProps.setObjectYCoordinate(
        draggedToPosition[1]
      );
    };
  }
}

/* ----- COMPONENT STYLES ----- */
ViroMaterials.createMaterials({
  bg: {
    diffuseTexture: {uri: "https://lh3.googleusercontent.com/dB3Dvgf3VIglusoGJAfpNUAANhTXW8K9mvIsiIPkhJUAbAKGKJcEMPTf0mkSexzLM5o=w300"},
  },
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
