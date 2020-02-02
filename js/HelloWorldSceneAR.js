import React, { Component } from "react";

import {
  ViroSpinner,
  Viro360Image,
  ViroUtils,
  ViroARScene,
  ViroConstants,
  ViroMaterials,
  ViroNode,
  ViroAnimations
} from "react-viro";

import axios from "axios";

var SceneElement = require("./custom_controls/SceneElement");
var TextElement = require("./custom_controls/TextElement");
var InfoElement = require("./custom_controls/InfoElement");
let polarToCartesian = ViroUtils.polarToCartesian;

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    this.state = {
      text: "Initializing AR...",
      editmode: false,
      showtextinput: false,
      objects: [],
      objectname: "",
      selectimage: false,
      draggedtox: null,
      draggedtoy: null,
      sceneloaded: false,
      uri: ''
    };
    this._onInitialized = this._onInitialized.bind(this);
    this._onDragCreate = this._onDragCreate.bind(this);
  }

  componentDidMount() {
    if (!this.props.sceneNavigator.viroAppProps.selectIsNew && this.props.sceneNavigator.viroAppProps.selectIsEditable && !this.props.sceneNavigator.viroAppProps.goBack) {
      // if (this.props.sceneNavigator.viroAppProps.selectSceneHistory[this.props.sceneNavigator.viroAppProps.selectSceneHistory.length - 1] !== (this.props.sceneNavigator.viroAppProps.selectPanoId)) {
      //   this.props.sceneNavigator.viroAppProps.setSceneHistory(this.props.sceneNavigator.viroAppProps.selectSceneHistory.concat([this.props.sceneNavigator.viroAppProps.selectPanoId]));
      // }
      this.setState({uri: this.props.sceneNavigator.viroAppProps.selectTourPanos[this.props.sceneNavigator.viroAppProps.selectSceneHistory.length - 1].img_url}, () => {
        this.props.sceneNavigator.viroAppProps.setSelectedText('');
        axios.get(`http://tourviewarserver.herokuapp.com/api/objects/${this.props.sceneNavigator.viroAppProps.selectTourPanos[this.props.sceneNavigator.viroAppProps.selectSceneHistory.length-1].id}`)
          .then(results => {
            // alert(JSON.stringify(results.data.rows))
            this.setState({
              objects: results.data.rows
            });
          })
          .catch(err => {
            alert("There was an error loading this tour. Please try again.");
            this.props.sceneNavigator.viroAppProps.navigate("REACT_NATIVE_HOME");
          });
      });
    } else if (this.props.sceneNavigator.viroAppProps.selectIsNew) {
      this.props.sceneNavigator.viroAppProps.setGoBack(false);
      this.props.sceneNavigator.viroAppProps.setSelectedText('');
      this.props.sceneNavigator.viroAppProps.setSceneHistory([this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id]);
      this.setState({
        uri: this.props.sceneNavigator.viroAppProps.selectTourPanos[0].img_url
      });
      this.props.sceneNavigator.viroAppProps.setPanoId(
        this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id
      );
    } else if (this.props.sceneNavigator.viroAppProps.goBack) {
      this.props.sceneNavigator.viroAppProps.setGoBack(false);
      this.props.sceneNavigator.viroAppProps.setSelectedText('');
      this.setState({uri: this.props.sceneNavigator.viroAppProps.selectTourPanos[this.props.sceneNavigator.viroAppProps.selectSceneHistory.length - 1].img_url}, () => {
        axios.get(`http://tourviewarserver.herokuapp.com/api/objects/${this.props.sceneNavigator.viroAppProps.selectTourPanos[this.props.sceneNavigator.viroAppProps.selectSceneHistory.length-1].id}`)
          .then(results => {
            // alert(JSON.stringify(results.data.rows))
            this.setState({
              objects: results.data.rows
            });
          })
          .catch(err => {
            alert("There was an error loading this tour. Please try again.");
            this.props.sceneNavigator.viroAppProps.navigate("REACT_NATIVE_HOME");
          });
      });

    } else {
      this.props.sceneNavigator.viroAppProps.setGoBack(false);
      this.props.sceneNavigator.viroAppProps.setSelectedText('');
      this.props.sceneNavigator.viroAppProps.setSceneHistory([this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id]);
      this.setState({uri: this.props.sceneNavigator.viroAppProps.selectTourPanos[0].img_url});
      this.props.sceneNavigator.viroAppProps.setPanoId(
        this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id
      );
        axios.get(`http://tourviewarserver.herokuapp.com/api/objects/${this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id}`)
          .then(results => {
            this.setState({
              objects: results.data.rows
            });
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
          source={{uri: this.state.uri}}
          onLoadStart={() => this.setState({sceneloaded: false})}
          onLoadEnd={() => this.setState({sceneloaded: true})}
        />
        {
          this.state.sceneloaded ? 
          (
            null
          ) 
          : 
          (
            <ViroSpinner 
              type='Light'
              position={[0, 0, -1]}
            />
          )
        }
        {this.state.objects.length ? (
          this.state.objects.map((object, i) => {
            if (object.object_type === "text") {
              let onDrag = this._onDragCreate(object.id, this.props.sceneNavigator.viroAppProps.selectObjectId, this.props.sceneNavigator.viroAppProps.setObjectId, this.props.sceneNavigator.viroAppProps.selectObjectXCoordinate, this.props.sceneNavigator.viroAppProps.setObjectXCoordinate, this.props.sceneNavigator.viroAppProps.selectObjectYCoordinate, this.props.sceneNavigator.viroAppProps.setObjectYCoordinate, this.props.sceneNavigator.viroAppProps.selectObjectZCoordinate, this.props.sceneNavigator.viroAppProps.setObjectZCoordinate);
              return (
                <ViroNode
                key={i}
                position={[Number(object.x), Number(object.y), Number(object.z)]}
                dragType="FixedDistance"
                onDrag={(dragToPos, source) => onDrag(dragToPos, source)}
              >
                <TextElement
                  pickText={() => this.props.sceneNavigator.viroAppProps.setSelectedText(object.object_value)}
                  contentCardScale={[1, 1, 1]}
                  position={polarToCartesian([-5, 0, 0])}
                />
              </ViroNode>
              );
            } else if (object.object_type === "image") {
              let onDrag = this._onDragCreate(object.id, this.props.sceneNavigator.viroAppProps.selectObjectId, this.props.sceneNavigator.viroAppProps.setObjectId, this.props.sceneNavigator.viroAppProps.selectObjectXCoordinate, this.props.sceneNavigator.viroAppProps.setObjectXCoordinate, this.props.sceneNavigator.viroAppProps.selectObjectYCoordinate, this.props.sceneNavigator.viroAppProps.setObjectYCoordinate, this.props.sceneNavigator.viroAppProps.selectObjectZCoordinate, this.props.sceneNavigator.viroAppProps.setObjectZCoordinate);
              return (
                <ViroNode
                key={i}
                position={[Number(object.x), Number(object.y), Number(object.z)]}
                dragType="FixedDistance"
                onDrag={(dragToPos, source) => onDrag(dragToPos, source)}
              >
                <InfoElement
                  content={object.object_value}
                  contentCardScale={[1.5, 1.5, 1]}
                  position={polarToCartesian([-5, 0, 0])}
                />
              </ViroNode>
              );
            } else if (object.object_type === "scene") {
              let onDrag = this._onDragCreate(object.id);
                let switchScene = () => {
                  this.setState({uri: JSON.parse(object.object_value)[1]}, () => {
                    this.props.sceneNavigator.viroAppProps.setSelectedText('');
                    axios.get(`http://tourviewarserver.herokuapp.com/api/objects/${JSON.parse(object.object_value)[0]}`)
                    .then(results => {
                      // alert(JSON.stringify(results.data.rows))
                      this.props.sceneNavigator.viroAppProps.setSceneHistory([this.props.sceneNavigator.viroAppProps.selectSceneHistory.concat([JSON.parse(object.object_value)[0]])]);
                      this.setState({objects: results.data.rows});
                      this.props.sceneNavigator.viroAppProps.setPanoId(JSON.parse(object.object_value)[0]);
                    })
                    .catch(err => {
                      alert("There was an error loading this tour. Please try again.");
                      this.props.sceneNavigator.viroAppProps.navigate("REACT_NATIVE_HOME");
                    });
                  });
                };
              return (
                <ViroNode
                key={i}
                position={[Number(object.x), Number(object.y), Number(object.z)]}
                dragType="FixedDistance"
                onDrag={(dragToPos, source) => onDrag(dragToPos, source)}>
                  <SceneElement
                    switchScenes={switchScene.bind(this)}
                    contentCardScale={[1, 1, 1]}
                    position={polarToCartesian([-5, 0, 0])}
                  />
              </ViroNode>
              );
            }
          })
        ) : (
          <ViroNode
          position={[0, -1, 0]}
          dragType="FixedDistance"
          onDrag={() => {}}
        >
          <InfoElement
            content={'https://panoimages.s3-us-west-1.amazonaws.com/images/myimage239.jpg'}
            contentCardScale={[1, 1, 1]}
            position={polarToCartesian([-5, 0, 0])}
          />
        </ViroNode>
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

  _onDragCreate(id, objectid, setobjectid, xcoordinate, setxcoordinate, ycoordinate, setycoordinate, zcoordinate, setzcoordinate ) {
    return function(draggedToPosition, source) {
      if (objectid !== id && objectid) {
        (alert('testing'))
        axios
        .put(`http://tourviewarserver.herokuapp.com/api/object`, {
          x: Number(xcoordinate.toFixed(2)),
          y: Number(ycoordinate.toFixed(2)),
          z: Number(zcoordinate.toFixed(2)),
          scalex: 1,
          scaley: 1,
          scalez: 1,
          id_object: objectid
        })
        .then(results => {
          setobjectid(id);
          setxcoordinate(
            draggedToPosition[0]
          );
          setycoordinate(
            draggedToPosition[1]
          );
          setzcoordinate(
            draggedToPosition[2]
          );
        })
        .catch(err => console.log(err));
      } else {
        setobjectid(id);
        setxcoordinate(
          draggedToPosition[0]
        );
        setycoordinate(
          draggedToPosition[1]
        );
        setzcoordinate(
          draggedToPosition[2]
        );
      }
    };
    //   if (this.props.sceneNavigator.viroAppProps.selectObjectId !== id && this.props.sceneNavigator.viroAppProps.selectObjectId) {
    //     axios
    //     .put(`http://tourviewarserver.herokuapp.com/api/object`, {
    //       x: this.props.sceneNavigator.viroAppProps.selectObjectXCoordinate,
    //       y: this.props.sceneNavigator.viroAppProps.selectObjectYCoordinate,
    //       scalex: 1,
    //       scaley: 1,
    //       scalez: 1,
    //       id_object: this.props.sceneNavigator.viroAppProps.selectObjectId
    //     })
    //     .then(results => {
    //       this.props.sceneNavigator.viroAppProps.setObjectId(id);
    //       this.props.sceneNavigator.viroAppProps.setObjectXCoordinate(
    //         draggedToPosition[0]
    //       );
    //       this.props.sceneNavigator.viroAppProps.setObjectYCoordinate(
    //         draggedToPosition[1]
    //       );
    //     })
    //     .catch(err => console.log(err));
    //   } else {
    //     this.props.sceneNavigator.viroAppProps.setObjectId(id);
    //     this.props.sceneNavigator.viroAppProps.setObjectXCoordinate(
    //       draggedToPosition[0]
    //     );
    //     this.props.sceneNavigator.viroAppProps.setObjectYCoordinate(
    //       draggedToPosition[1]
    //     );
    //   }
    // };
  }
}

/* ----- COMPONENT STYLES ----- */
ViroMaterials.createMaterials({
  bg: {
    diffuseTexture: {uri: "https://lh3.googleusercontent.com/dB3Dvgf3VIglusoGJAfpNUAANhTXW8K9mvIsiIPkhJUAbAKGKJcEMPTf0mkSexzLM5o=w300"},
  },
  grid: {
    diffuseTexture: require("./res/grid_bg.jpg")
  },
  frontMaterial: {
    diffuseColor: '#FFFFFF',
  },
  backMaterial: {
    diffuseColor: '#FF0000',
  },
  sideMaterial: {
    diffuseColor: '#0000FF',
  },
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
