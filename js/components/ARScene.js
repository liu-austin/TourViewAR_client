import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";

import axios from 'axios';

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

import {Fab, Button, Container, Footer, FooterTab, Input, Item, Text} from 'native-base';

import { setObjectId, setObjectXCoordinate, setObjectYCoordinate, setObjectValue, setObjectScale, setObjectIdPano } from '../redux/object/object.action';
import { selectObjectId, selectObjectXCoordinate, selectObjectYCoordinate, selectObjectValue, selectObjectScale, selectObjectIdPano } from '../redux/object/object.selectors';
import { setPanoId } from '../redux/pano/pano.action';
import { selectPanoId, selectTourPanos } from '../redux/pano/pano.selectors';
import { navigate } from '../redux/render/render.action';
import {selectIsEditable, selectIsNew} from '../redux/tour/tour.selectors';

var ImageElement = require("../custom_controls/ImageElement");
var SceneElement = require("../custom_controls/SceneElement");
var TextElement = require("../custom_controls/TextElement");
let polarToCartesian = ViroUtils.polarToCartesian;

class ARScene extends Component {
  constructor(props) {
    super(props);

    // Set initial state here
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
    
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  componentDidMount() {
      if (!this.props.selectIsNew && this.props.selectIsEditable) {
        axios.get(`http://tourviewarserver.herokuapp.com/api/objects/${this.props.selectTourPanos[0].id}`)
        .then(results => {
            this.setState({objects: results.data, currentSceneId: this.props.selectTourPanos[0].id, sceneIdHistory: [this.props.selectTourPanos[0].id]});
            this.props.setPanoId(this.props.selectTourPanos[0].id);
        })
        .catch(err => {
            alert('There was an error loading this tour. Please try again.');
            this.props.navigate('REACT_NATIVE_HOME');
        });
      } else if (this.props.isnew) {
          this.setState({currentSceneId: this.props.selectTourPanos[0].id, sceneIdHistory: [this.props.selectTourPanos[0].id]});
          this.props.setPanoId(this.props.selectTourPanos[0].id);
      } else {
        axios.get(`http://tourviewarserver.herokuapp.com/api/objects/${this.props.scenes[0].id}`)
        .then(results => {
            this.setState({objects: results.data, currentSceneId: this.props.selectTourPanos[0].id, sceneIdHistory: [this.props.selectTourPanos[0].id]});
            this.props.setPanoId(this.props.selectTourPanos[0].id);
        })
        .catch(err => {
            alert('There was an error loading this tour. Please try again.');
            this.props.navigate('REACT_NATIVE_HOME');
        });
      }
  }

  render() {
    return (
        <ViroARScene onTrackingUpdated={this._onInitialized}>
            {
                <View>
                    {
                        <View>
                this.props.selectTourPanos.length ? 
                (
                    <Viro360Image source={{ uri: this.props.selectTourPanos[0].img_url}}/>
                    <View>
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
                </View>
            }
            </View>
    }
        </ViroARScene>

    )};
 


  _createTextObject(text) {
      axios.post(`http://tourviewarserver.herokuapp.com/api/object`, {
          object_type: 'text',
          object_value: text,
          id_pano: this.props.selectPanoId
      }).then((results) => {
          this.props.setObjectId(results.data.id);
          let textobject = {
              id: results.data.id,
              type: 'text',
              x: 0,
              y: 0, 
              value: text,
              scale: {x: 1, y: 1, z: 1},
              id_pano: this.props.selectPanoId
          };
          this.setState({objects: [...this.state.objects, textobject]});
      }).catch(err => alert('There was an error creating this object'));

  }

  _createImageObject(publicUrl) {
      axios.post(`http://tourviewarserver.herokuapp.com/api/object`, {
          object_type: 'image',
          object_value: publicUrl,
          id_pano: this.props.selectPanoId
      }).then((results) => {
          this.props.setObjectId(results.data.id);
          let textobject = {
              id: results.data.id,
              type: 'image',
              x: 0, 
              y: 0,
              value: publicUrl,
              scale: {x: 1, y: 1, z: 1},
              id_pano: this.props.selectPanoId
          };
          this.setState({objects: [...this.state.objects, textobject]});
      }).catch(err => alert('There was an error creating this object'));
  }

  _onInitialized(state, reason) {
      if (state == ViroConstants.TRACKING_NORMAL) {
        this.setState({text: "ADHd!!!!!"});
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
}

const mapStateToProps = state => {
    return {
        selectObjectId: selectObjectId(state),
        selectObjectXCoordinate: selectObjectXCoordinate(state),
        selectObjectYCoordinate: selectObjectYCoordinate(state),
        selectObjectValue: selectObjectValue(state),
        selectObjectScale: selectObjectScale(state),
        selectObjectIdPano: selectObjectIdPano(state),
        selectPanoId: selectPanoId(state),
        selectTourPanos: selectTourPanos(state),
        selectObjectXCoordinate: selectObjectXCoordinate(state),
        selectObjectYCoordinate: selectObjectYCoordinate(state),
        selectIsEditable: selectIsEditable(state),
        selectIsNew: selectIsNew(state)
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setObjectId: id => dispatch(setObjectId(id)),
        setObjectXCoordinate: x => dispatch(setObjectXCoordinate(x)),
        setObjectYCoordinate: y => dispatch(setObjectYCoordinate(y)),
        setObjectValue: value => dispatch(setObjectValue(value)),
        setObjectScale: scale => dispatch(setObjectScale(scale)),
        setObjectIdPano: idpano => dispatch(setObjectIdPano(idpano)),
        navigate: page => dispatch(navigate(page)),
        setPanoId: id => dispatch(setPanoId(id)),
        setObjectXCoordinate: x => dispatch(setObjectXCoordinate(x)),
        setObjectYCoordinate: y => dispatch(setObjectYCoordinate(y))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ARScene);
module.exports = ARScene;