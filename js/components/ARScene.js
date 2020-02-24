// jshint esversion:8
import React, { Component } from "react";

import {
  ViroSpinner,
  ViroSkyBox,
  Viro360Image,
  ViroUtils,
  ViroARScene,
  ViroConstants,
  ViroMaterials,
  ViroNode,
  ViroAnimations
} from "react-viro";

import axios from "axios";

const SceneElement = require("../custom_controls/SceneElement");
const TextElement = require("../custom_controls/TextElement");
const InfoElement = require("../custom_controls/InfoElement");
const BackElement = require("../custom_controls/BackElement");

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
      uri: '',
      sb: [],
      sbimages: [],
      usesb: false,
      sbindices: []
    };
    this._onInitialized = this._onInitialized.bind(this);
    this._onDragCreate = this._onDragCreate.bind(this);
    this._goBack = this._goBack.bind(this);
    this._resetAndGoHome = this._resetAndGoHome.bind(this);
  }

  componentDidMount() {
    this.props.sceneNavigator.viroAppProps.setSelectedText('');

    if (!this.props.sceneNavigator.viroAppProps.selectIsNew && this.props.sceneNavigator.viroAppProps.selectIsEditable) {
        axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/tour/${this.props.sceneNavigator.viroAppProps.selectTourId}`)
        .then(results => {
            let foundtours = results;
            // alert(JSON.stringify(results.data.rows[0]));
            this.setState({sb: foundtours.data.rows[0].sb, sbindices: foundtours.data.rows[0].skybox_photos}, () => {
            if (results.data.rows[0].sb[this.props.sceneNavigator.viroAppProps.selectSbIndex]) {
                this.props.sceneNavigator.viroAppProps.setForSb(true);
            //   this.props.sceneNavigator.viroAppProps.setSceneHistory([results.data.rows[0].skybox_photos[this.state.sb.slice(0, this.props.sceneNavigator.viroAppProps.selectSbIndex + 1).filter(elem => elem).length - 1]]);
              axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/getskybox`, {
                  count: results.data.rows[0].skybox_photos[results.data.rows[0].sb.slice(0, this.props.sceneNavigator.viroAppProps.selectSbIndex + 1).filter(elem => elem).length - 1]
              }).then((skyboxphotos) => this.setState({sbimages: skyboxphotos.data.rows}, () => this.setState({usesb: true}, () => {
                  let skyboxid = foundtours.data.rows[0].skybox_photos[results.data.rows[0].sb.slice(0, this.props.sceneNavigator.viroAppProps.selectSbIndex + 1).filter(elem => elem).length - 1];
                  axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/objectsskybox/${skyboxid}`)
                  .then(sbobjects => {
                      if (sbobjects.data.rows.filter(elem => elem.object_type = "scene").length) {
                        this.props.sceneNavigator.viroAppProps.setObjSceneCap(true);
                      } else {
                        this.props.sceneNavigator.viroAppProps.setObjSceneCap(false);
                      }
                      this.setState({
                          objects: sbobjects.data.rows
                      }, () => this.props.sceneNavigator.viroAppProps.setSkyboxId(skyboxid));
                  });
            }))).catch(err => console.log(err));
            } else {
                this.props.sceneNavigator.viroAppProps.setForSb(false);
                // this.props.sceneNavigator.viroAppProps.setSceneHistory(this.props.sceneNavigator.viroAppProps.selectSceneHistory.concat([this.props.sceneNavigator.viroAppProps.selectTourPanos[this.props.sceneNavigator.viroAppProps.selectPanoIndex].id]));
                this.setState({uri: this.props.sceneNavigator.viroAppProps.selectTourPanos[this.props.sceneNavigator.viroAppProps.selectPanoIndex].img_url}, () => {
                axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/objects/${this.props.sceneNavigator.viroAppProps.selectTourPanos[this.props.sceneNavigator.viroAppProps.selectPanoIndex].id}`)
                .then(results => {
                    if (results.data.rows.filter(elem => elem.object_type = "scene").length) {
                        this.props.sceneNavigator.viroAppProps.setObjSceneCap(true);
                      } else {
                        this.props.sceneNavigator.viroAppProps.setObjSceneCap(false);
                      }
                    this.setState({
                    objects: results.data.rows
                    }, () => this.setState({usesb: false}, () => this.props.sceneNavigator.viroAppProps.setPanoId(this.props.sceneNavigator.viroAppProps.selectTourPanos[this.props.sceneNavigator.viroAppProps.selectPanoIndex].id)));
                })
                .catch(err => {
                    alert("There was an error loading this tour. Please try again.");
                    this._resetAndGoHome();
                });
                });
            }
        });
    }).catch(err => console.log(err));

    } else if (this.props.sceneNavigator.viroAppProps.selectIsNew) {
        this.props.sceneNavigator.viroAppProps.setObjSceneCap(false);
        axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/tour/${this.props.sceneNavigator.viroAppProps.selectTourId}`)
        .then(results => {
            alert(JSON.stringify(results.data.rows[0]));
            this.setState({sb: results.data.rows[0].sb, sbindices: results.data.rows[0].skybox_photos}, () => {
            if (results.data.rows[0].sb[this.props.sceneNavigator.viroAppProps.selectSbIndex]) {
                this.props.sceneNavigator.viroAppProps.setForSb(true);
              this.props.sceneNavigator.viroAppProps.setSceneHistory([results.data.rows[0].skybox_photos[results.data.rows[0].sb.slice(0, this.props.sceneNavigator.viroAppProps.selectSbIndex + 1).filter(elem => elem).length - 1]]);
              axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/getskybox`, {
                  count: results.data.rows[0].skybox_photos[results.data.rows[0].sb.slice(0, this.props.sceneNavigator.viroAppProps.selectSbIndex + 1).filter(elem => elem).length - 1]
              }).then((skyboxphotos) => this.setState({sbimages: skyboxphotos.data.rows}, () => this.setState({usesb: true}, () => this.props.sceneNavigator.viroAppProps.setSkyboxId(results.data.rows[0].skybox_photos[results.data.rows[0].sb.slice(0, this.props.sceneNavigator.viroAppProps.selectSbIndex + 1).filter(elem => elem).length - 1])))).catch(err => console.log(err));
            } else {
                this.props.sceneNavigator.viroAppProps.setForSb(false);
              this.setState({uri: this.props.sceneNavigator.viroAppProps.selectTourPanos[0].img_url}, () => this.setState({usesb: false}, () => {
                this.props.sceneNavigator.viroAppProps.setSceneHistory([this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id]);
                this.props.sceneNavigator.viroAppProps.setPanoId(this.props.sceneNavigator.viroAppProps.selectTourPanos[0].id);
              }));
            }
          });
        }).catch(err => console.log(err));

    } else {
        this.props.sceneNavigator.viroAppProps.setObjSceneCap(false);
        axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/tour/${this.props.sceneNavigator.viroAppProps.selectTourId}`)
        .then(results => {
            let foundtours = results;
            // alert(JSON.stringify(results.data.rows[0]));
            this.setState({sb: foundtours.data.rows[0].sb, sbindices: foundtours.data.rows[0].skybox_photos}, () => {
            if (foundtours.data.rows[0].sb[this.props.sceneNavigator.viroAppProps.selectSbIndex]) {
                this.props.sceneNavigator.viroAppProps.setForSb(true);
            //   this.props.sceneNavigator.viroAppProps.setSceneHistory([results.data.rows[0].skybox_photos[this.state.sb.slice(0, this.props.sceneNavigator.viroAppProps.selectSbIndex + 1).filter(elem => elem).length - 1]]);
                axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/getskybox`, {
                    count: foundtours.data.rows[0].skybox_photos[foundtours.data.rows[0].sb.slice(0, this.props.sceneNavigator.viroAppProps.selectSbIndex + 1).filter(elem => elem).length - 1]
                }).then((skyboxphotos) => this.setState({sbimages: skyboxphotos.data.rows}, () => this.setState({usesb: true}, () => {
                    let skyboxid = foundtours.data.rows[0].skybox_photos[foundtours.data.rows[0].sb.slice(0, this.props.sceneNavigator.viroAppProps.selectSbIndex + 1).filter(elem => elem).length - 1];
                    axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/objectsskybox/${skyboxid}`)
                    .then(sbobjects => {
                        this.setState({
                            objects: sbobjects.data.rows
                        }, () => this.props.sceneNavigator.viroAppProps.setSkyboxId(skyboxid));
                    });
            }))).catch(err => console.log(err));
            } else {
                this.props.sceneNavigator.viroAppProps.setForSb(true);
                // this.props.sceneNavigator.viroAppProps.setSceneHistory(this.props.sceneNavigator.viroAppProps.selectSceneHistory.concat([this.props.sceneNavigator.viroAppProps.selectTourPanos[this.props.sceneNavigator.viroAppProps.selectPanoIndex].id]));
                this.setState({uri: this.props.sceneNavigator.viroAppProps.selectTourPanos[this.props.sceneNavigator.viroAppProps.selectPanoIndex].img_url}, () => {
                axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/objects/${this.props.sceneNavigator.viroAppProps.selectTourPanos[this.props.sceneNavigator.viroAppProps.selectPanoIndex].id}`)
                .then(results => {
                    this.setState({
                    objects: results.data.rows
                    }, () => this.setState({usesb: false}, () => this.props.sceneNavigator.viroAppProps.setPanoId(this.props.sceneNavigator.viroAppProps.selectTourPanos[this.props.sceneNavigator.viroAppProps.selectPanoIndex].id)));
                })
                .catch(err => {
                    alert("There was an error loading this tour. Please try again.");
                    this._resetAndGoHome();
                });
                });
            }
        });
    }).catch(err => console.log(err));
  }
}

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
      {
          this.state.usesb && this.state.sbimages.length ? 
          (
            <ViroSkyBox source={{nx: {uri: this.state.sbimages[0].img_url},
                     px: {uri: this.state.sbimages[1].img_url},
                     ny: {uri: this.state.sbimages[2].img_url},
                     py: {uri: this.state.sbimages[3].img_url},
                     nz: {uri: this.state.sbimages[4].img_url},
                     pz: {uri: this.state.sbimages[5].img_url}}} />
          ) 
          : 
          (
            <Viro360Image
            source={{uri: this.state.uri}}
            onLoadStart={() => this.setState({sceneloaded: false})}
            onLoadEnd={() => this.setState({sceneloaded: true})}
          />
          )
      }

        <ViroNode
          position={[-0.75, -0.75, 0]}
          dragType="FixedDistance"
        >
          <BackElement
            goBack={() => this._goBack()}
            contentCardScale={[1, 1, 1]}
            position={polarToCartesian([-5, 0, 0])}
          />
        </ViroNode>
        {
          this.state.sceneloaded ? 
          (
            null
          ) 
          : 
          (
            <ViroSpinner 
              type='Light'
              scale={[0.25, 0.25, 0.25]}
              position={[0, 0, 0]}/>
          )
        }
        {this.state.objects.length ? (
          this.state.objects.map((object, i) => {
            if (object.object_type === "text") {
              let onDrag = this._onDragCreate(object.id, this.props.sceneNavigator.viroAppProps.selectObjectId, this.props.sceneNavigator.viroAppProps.setObjectId, this.props.sceneNavigator.viroAppProps.selectObjectXCoordinate, this.props.sceneNavigator.viroAppProps.setObjectXCoordinate, this.props.sceneNavigator.viroAppProps.selectObjectYCoordinate, this.props.sceneNavigator.viroAppProps.setObjectYCoordinate, this.props.sceneNavigator.viroAppProps.selectObjectZCoordinate, this.props.sceneNavigator.viroAppProps.setObjectZCoordinate, this.props.sceneNavigator.viroAppProps.selectIsEditable);
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
              let onDrag = this._onDragCreate(object.id, this.props.sceneNavigator.viroAppProps.selectObjectId, this.props.sceneNavigator.viroAppProps.setObjectId, this.props.sceneNavigator.viroAppProps.selectObjectXCoordinate, this.props.sceneNavigator.viroAppProps.setObjectXCoordinate, this.props.sceneNavigator.viroAppProps.selectObjectYCoordinate, this.props.sceneNavigator.viroAppProps.setObjectYCoordinate, this.props.sceneNavigator.viroAppProps.selectObjectZCoordinate, this.props.sceneNavigator.viroAppProps.setObjectZCoordinate, this.props.sceneNavigator.viroAppProps.selectIsEditable);
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
              let onDrag = this._onDragCreate(object.id, this.props.sceneNavigator.viroAppProps.selectObjectId, this.props.sceneNavigator.viroAppProps.setObjectId, this.props.sceneNavigator.viroAppProps.selectObjectXCoordinate, this.props.sceneNavigator.viroAppProps.setObjectXCoordinate, this.props.sceneNavigator.viroAppProps.selectObjectYCoordinate, this.props.sceneNavigator.viroAppProps.setObjectYCoordinate, this.props.sceneNavigator.viroAppProps.selectObjectZCoordinate, this.props.sceneNavigator.viroAppProps.setObjectZCoordinate, this.props.sceneNavigator.viroAppProps.selectIsEditable);
                let switchScene = () => {
                  axios.put(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/object`, {
                    x: Number(this.props.sceneNavigator.viroAppProps.selectObjectXCoordinate.toFixed(2)),
                    y: Number(this.props.sceneNavigator.viroAppProps.selectObjectYCoordinate.toFixed(2)),
                    z: Number(this.props.sceneNavigator.viroAppProps.selectObjectZCoordinate.toFixed(2)),
                    scalex: 1,
                    scaley: 1,
                    scalez: 1,
                    id_object: object.id
                  }).then(() => {
                      let nextindex = this.props.sceneNavigator.viroAppProps.selectSbIndex + 1;
                      if (object.id_pano) {

                        this.setState({uri: JSON.parse(object.object_value)[1]}, () => {
                            this.props.sceneNavigator.viroAppProps.setForSb(false);
                            this.props.sceneNavigator.viroAppProps.setSbIndex(nextindex);
                            this.props.sceneNavigator.viroAppProps.setSelectedText('');
                            axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/objects/${JSON.parse(object.object_value)[0]}`)
                            .then(results => {
                                if (results.data.rows.filter(elem => elem.object_type = "scene").length) {
                                    this.props.sceneNavigator.viroAppProps.setObjSceneCap(true);
                                  } else {
                                    this.props.sceneNavigator.viroAppProps.setObjSceneCap(false);
                                  }
                              // alert(JSON.stringify(results.data.rows))
                              this.props.sceneNavigator.viroAppProps.setSceneHistory(this.props.sceneNavigator.viroAppProps.selectSceneHistory.concat([JSON.parse(object.object_value)[0]]));
                              // alert(JSON.stringify(this.props.sceneNavigator.viroAppProps.selectSceneHistory))
                              this.setState({objects: results.data.rows, usesb: false}, () => this.props.sceneNavigator.viroAppProps.setPanoId(JSON.parse(object.object_value)[0]));

                            })
                            .catch(err => {
                              alert("There was an error loading this tour. Please try again.");
                              this._resetAndGoHome();
                            });
                          });

                      } else {

                        axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/getskybox`, {
                            count: JSON.parse(object.object_value)[0]
                        }).then(images => {
                            this.setState({sbimages: images.data.rows}, () => {
                                this.props.sceneNavigator.viroAppProps.setForSb(true);
                                this.props.sceneNavigator.viroAppProps.setSbIndex(nextindex);
                                this.props.sceneNavigator.viroAppProps.setSelectedText('');
                                axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/objectsskybox/${JSON.parse(object.object_value)[0]}`)
                                .then(results => {
                                    if (results.data.rows.filter(elem => elem.object_type = "scene").length) {
                                        this.props.sceneNavigator.viroAppProps.setObjSceneCap(true);
                                      } else {
                                        this.props.sceneNavigator.viroAppProps.setObjSceneCap(false);
                                      }
                                  // alert(JSON.stringify(results.data.rows))
                                  this.props.sceneNavigator.viroAppProps.setSceneHistory(this.props.sceneNavigator.viroAppProps.selectSceneHistory.concat([JSON.parse(object.object_value)[0]]));
                                  // alert(JSON.stringify(this.props.sceneNavigator.viroAppProps.selectSceneHistory))
                                  this.setState({objects: results.data.rows, usesb: true}, () => this.props.sceneNavigator.viroAppProps.setSkyboxId(JSON.parse(object.object_value)[0]));

                                })
                                .catch(err => {
                                  alert("There was an error loading this tour. Please try again.");
                                  this._resetAndGoHome();
                                });
                            });
                        }).catch(err => console.log(err));
                      }

                  }).catch(err => alert('There was an error loading this tour. Please try again.'));
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
            } else {
              return null;
            }
          })
        ) : (
          <ViroNode
          position={[0, 0, 0]}
          dragType="FixedDistance"
          >
            <TextElement
              pickText={() => this.props.sceneNavigator.viroAppProps.setSelectedText('Welcome to your new scene! To go back, press the green diamond behind you.')}
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

  _goBack() {
    if (this.props.sceneNavigator.viroAppProps.selectSceneHistory.length === 1) {
      this._resetAndGoHome();
    } else {
        this.props.sceneNavigator.viroAppProps.setObjSceneCap(true);
        if (this.state.sb[this.props.sceneNavigator.viroAppProps.selectSbIndex - 1]) {
            this.props.sceneNavigator.viroAppProps.setForSb(true);

            let prev = this.state.sb.slice(0, this.props.sceneNavigator.viroAppProps.selectSbIndex).filter(elem => elem).length - 1;

            axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/getskybox`, {
                count: this.state.sbindices[prev]
            }).then(images => this.setState({sbimages: images.data.rows, sceneloaded: false}, () => {
                let newindex = this.state.sbindices[prev];
                axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/objectsskybox/${newindex}`)
                .then(results => {
                  this.setState({objects: results.data.rows, sceneloaded: true, usesb: true}, () => {
                    this.props.sceneNavigator.viroAppProps.setSbIndex(this.props.sceneNavigator.viroAppProps.selectSbIndex - 1);
                    this.props.sceneNavigator.viroAppProps.setSkyboxId(newindex);
                    this.props.sceneNavigator.viroAppProps.setSceneHistory(this.props.sceneNavigator.viroAppProps.selectSceneHistory.slice(0, this.props.sceneNavigator.viroAppProps.selectSceneHistory.length - 1));
                  })
                }).catch(err => alert('There was an error loading objects:', err))
            }));

        } else {
            this.props.sceneNavigator.viroAppProps.setForSb(false);

            let prev = this.state.sb.slice(0, this.props.sceneNavigator.viroAppProps.selectSbIndex).filter(elem => !elem).length - 1;
            this.setState({ sceneloaded: false, uri: this.props.sceneNavigator.viroAppProps.selectTourPanos[prev].img_url}, () => {
                axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/objects/${this.props.sceneNavigator.viroAppProps.selectTourPanos[prev].id}`)
                .then(results => {
                  this.setState({objects: results.data.rows, sceneloaded: true, usesb: false}, () => {
                    this.props.sceneNavigator.viroAppProps.setSbIndex(this.props.sceneNavigator.viroAppProps.selectSbIndex - 1);
                    this.props.sceneNavigator.viroAppProps.setPanoId(this.props.sceneNavigator.viroAppProps.selectTourPanos[prev].id);
                    this.props.sceneNavigator.viroAppProps.setSceneHistory(this.props.sceneNavigator.viroAppProps.selectSceneHistory.slice(0, this.props.sceneNavigator.viroAppProps.selectSceneHistory.length - 1));
                  })
                }).catch(err => alert('There was an error loading objects:', err))
              });

        }
    }
  }

  _resetAndGoHome() {
    this.props.sceneNavigator.viroAppProps.setObjSceneCap(false);
    this.props.sceneNavigator.viroAppProps.setSceneHistory([]);
    this.props.sceneNavigator.viroAppProps.setPanoId('');
    this.props.sceneNavigator.viroAppProps.setSkyboxId(null);
    this.props.sceneNavigator.viroAppProps.selectSbIndex(0);
    this.props.sceneNavigator.viroAppProps.navigate('REACT_NATIVE_HOME');
  }

  _onDragCreate(id, objectid, setobjectid, xcoordinate, setxcoordinate, ycoordinate, setycoordinate, zcoordinate, setzcoordinate, editable ) {
    return function(draggedToPosition, source) {
      if (editable) {
        if (objectid !== id && objectid) {
          axios
          .put(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/object`, {
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
      } 
    };
  }
}

/* ----- COMPONENT STYLES ----- */
// ViroMaterials.createMaterials({
//   bg: {
//     diffuseTexture: {uri: "https://lh3.googleusercontent.com/dB3Dvgf3VIglusoGJAfpNUAANhTXW8K9mvIsiIPkhJUAbAKGKJcEMPTf0mkSexzLM5o=w300"},
//   },
//   grid: {
//     diffuseTexture: require("../res")
//   },
//   frontMaterial: {
//     diffuseColor: '#FFFFFF',
//   },
//   backMaterial: {
//     diffuseColor: '#FF0000',
//   },
//   sideMaterial: {
//     diffuseColor: '#0000FF',
//   },
// });

// ViroAnimations.registerAnimations({
//   rotate: {
//     properties: {
//       rotateY: "+=90"
//     },
//     duration: 250
//   }
// });

module.exports = HelloWorldSceneAR;
