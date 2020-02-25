import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { navigate } from "../redux/render/render.action";
import { selectUserId } from "../redux/user/user.selectors";
import { setTourId, setIsEditable, setIsNew, setSkyboxId, setSbIndex, setPanoIndex } from "../redux/tour/tour.action";
import { selectTourName, selectTourId, selectSkyboxId } from "../redux/tour/tour.selectors";
import { setTourPanos, setPanoId } from "../redux/pano/pano.action";
import { selectPanoId, selectTourPanos } from "../redux/pano/pano.selectors";
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Body,
  Right,
  Button,
  Footer,
  FooterTab
} from "native-base";
const phases = ['Take Skybox Front Photo', 'Take Skybox Left Photo', 'Take Skybox Back Photo', 'Take Skybox Right Photo', 'Take Skybox Top Photo', 'Take Skybox Bottom Photo'];
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

import axios from "axios";

const SkyboxCamera = props => {
  [renderARButton, changeARButtonState] = useState(false);

  const takePhoto = () => {
    let options = {
      storageOptions: {
        cameraRoll: true,
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.launchCamera(options, response => {
      if (props.forscene) {
        if (props.num === 1) {
          props.setIsEditable(true);
          props.setIsNew(false);
          axios.get(
            `http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/getpresignedurlforskybox/panoimages`, {
              index: props.num
            }
          )
          .then(results => {
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", results.data.url);
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  // alert("Image successfully uploaded to S3");
                  axios
                    .post(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/skyboxscene`, {
                      img_url: results.data.publicUrl,
                      id: props.selectTourId
                    })
                    .then(() => {
                        changeARButtonState(true);
                    })
                    .catch(err => alert(err));
                } else {
                  alert("Error while sending the image to S3");
                }
              }
            };
            xhr.setRequestHeader("Content-Type", "image/jpeg");
            xhr.send({
              uri: source.uri,
              type: "image/jpeg",
              name: "pickertest.jpg"
            });
          })
          .catch(err => alert(JSON.stringify(err)));
        } else {
          axios.get(
            `http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/getpresignedurlforskybox/panoimages`, {
              index: props.num
            }
          )
          .then(results => {
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", results.data.url);
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  // alert("Image successfully uploaded to S3");
                  axios
                    .post(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/skyboximage`, {
                      img_url: results.data.publicUrl,
                      count: results.data.id
                    })
                    .then(() => {
                        changeARButtonState(true);
                    })
                    .catch(err => alert(err));
                } else {
                  alert("Error while sending the image to S3");
                }
              }
            };
            xhr.setRequestHeader("Content-Type", "image/jpeg");
            xhr.send({
              uri: source.uri,
              type: "image/jpeg",
              name: "pickertest.jpg"
            });
          })
          .catch(err => alert(JSON.stringify(err)));
        }

      } else {
        if (props.num === 1) {
          props.setIsEditable(true);
          props.setIsNew(true);
          props.setSbIndex(0);
          props.setPanoIndex(0);
          axios.get(
            `http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/getpresignedurlforskybox/panoimages`, {
              index: props.num
            }
          )
          .then(results => {
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", results.data.url);
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  // alert("Image successfully uploaded to S3");
                  axios
                    .post(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/skyboxtours`, {
                      img_url: results.data.publicUrl,
                      tour_name: props.selectTourName,
                      id_user: props.selectUserId
                    })
                    .then(results => {
                      props.setTourId(results.data.tourid);
                      return results.data.tourid;
                    })
                    .then(id_tour => {
                        changeARButtonState(true);
                    })
                    .catch(err => alert(err));
                } else {
                  alert("Error while sending the image to S3");
                }
              }
            };
            xhr.setRequestHeader("Content-Type", "image/jpeg");
            xhr.send({
              uri: source.uri,
              type: "image/jpeg",
              name: "pickertest.jpg"
            });
          })
          .catch(err => alert(JSON.stringify(err)));
        } else {
          axios.get(
            `http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/getpresignedurlforskybox/panoimages`, {
              index: props.num
            }
          )
          .then(results => {
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", results.data.url);
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  // alert("Image successfully uploaded to S3");
                  axios
                    .post(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/skyboximage`, {
                      img_url: results.data.publicUrl,
                      count: results.data.id
                    })
                    .then(() => {
                        changeARButtonState(true);
                    })
                    .catch(err => alert(err));
                } else {
                  alert("Error while sending the image to S3");
                }
              }
            };
            xhr.setRequestHeader("Content-Type", "image/jpeg");
            xhr.send({
              uri: source.uri,
              type: "image/jpeg",
              name: "pickertest.jpg"
            });
          })
          .catch(err => alert(JSON.stringify(err)));
        }
      }
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
      <Content style={{...styles.container, backgroundColor: '#49beb7'}}>
        {props.forscene ? (
          <View style={{ alignItems: "center",
          justifyContent: "center"}}>
            {renderARButton ? (
              <View>
                <View style={{ alignItems: "center", marginTop: height * 0.15 }}>
                  <Image
                    source={require("../res/world.png")}
                    style={{ height: width * 0.6, width: width * 0.6 }}
                  />
                </View>
                <View style={{alignItems: "center", width: width * 0.6, marginTop: height * 0.05}}>
                  <Text style={{color: 'white', alignItems: 'center'}}>
                      Follow Button Instructions Below.
                  </Text>
                </View>
                <View View style={{alignItems: "center"}}>
                  <Button 
                  style={{marginTop: height * 0.025, backgroundColor: '#fe5f55', width: width * 0.6,
                  alignItems: 'center'}}
                  onPress={() => {
                    if (props.num === 6) {
                      props.navigate("EDIT_AR_PAGE");
                    } else {
                      props.navigate(`SKYBOX_GUIDE_${props.num+1}_SCENE`);
                    }
                  }}>
                    <Text style={{color: 'white'}}>{props.num === 6 ? `Go To AR Scene` : phases[props.num + 1]}</Text>
                  </Button>
                </View>
              </View>
            ) : (
              <View>
                <View style={{ alignItems: "center", marginTop: height * 0.15 }}>
                  <Image
                    source={require("../res/camera.png")}
                    style={{ height: width * 0.6, width: width * 0.6 }}
                  />
              </View>
              <View style={{alignItems: "center", width: width * 0.6, marginTop: height * 0.05}}>
                  <Text style={{color: 'white', alignItems: 'center'}}>
                      Use your device camera to take a photo for the skybox scene. The images will be publically uploaded to AWS S3.
                  </Text>
              </View>
              <View style={{alignItems: "center"}}>
                  <Button style={{marginTop: height * 0.025, backgroundColor: '#fe5f55', width: width * 0.6,
                  alignItems: 'center'}}
                  onPress={() => takePhoto()}>
                      <Text style={{alignContent: "center"}}>
                      {phases[props.num]}
                      </Text>
                  </Button>
              </View>
            </View>
            )}
          </View>
        ) : (
          <View style={{ alignItems: "center",
          justifyContent: "center"}}>
            {renderARButton ? (
              <View>
                <View style={{ alignItems: "center", marginTop: height * 0.15 }}>
                  <Image
                    source={require("../res/world.png")}
                    style={{ height: width * 0.6, width: width * 0.6 }}
                  />
                </View>
                <View style={{alignItems: "center", width: width * 0.6, marginTop: height * 0.05}}>
                  <Text style={{color: 'white', alignItems: 'center'}}>
                      Follow Button Instructions Below.
                  </Text>
                </View>
                <View View style={{alignItems: "center"}}>
                  <Button 
                  style={{marginTop: height * 0.025, backgroundColor: '#fe5f55', width: width * 0.6,
                  alignItems: 'center'}}
                  onPress={() => {
                    if (props.num === 6) {
                      props.navigate("CREATE_AR_PAGE");
                    } else {
                      props.navigate(`SKYBOX_GUIDE_${props.num+1}`);
                    }
                  }}>
                    <Text style={{color: 'white'}}>{props.num === 6 ? `Go To AR Scene` : phases[props.num + 1]}</Text>
                  </Button>
                </View>
              </View>
            ) : (
              <View>
                <View style={{ alignItems: "center", marginTop: height * 0.15 }}>
                  <Image
                    source={require("../res/camera.png")}
                    style={{ height: width * 0.6, width: width * 0.6 }}
                  />
              </View>
              <View style={{alignItems: "center", width: width * 0.6, marginTop: height * 0.05}}>
                  <Text style={{color: 'white', alignItems: 'center'}}>
                      Use your device camera to take a photo for the skybox scene. The images will be publically uploaded to AWS S3.
                  </Text>
              </View>
              <View style={{alignItems: "center"}}>
                  <Button style={{marginTop: height * 0.025, backgroundColor: '#fe5f55', width: width * 0.6,
                  alignItems: 'center'}}
                  onPress={() => takePhoto()}>
                      <Text style={{alignContent: "center"}}>
                      {phases[props.num]}
                      </Text>
                  </Button>
              </View>
            </View>
            )}
          </View>
        )}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

const mapStateToProps = state => {
  return {
    selectTourName: selectTourName(state),
    selectTourId: selectTourId(state),
    selectUserId: selectUserId(state),
    selectPanoId: selectPanoId(state),
    selectTourPanos: selectTourPanos(state),
    selectSkyboxId: selectSkyboxId(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render)),
    setTourId: id => dispatch(setTourId(id)),
    setTourPanos: tours => dispatch(setTourPanos(tours)),
    setIsEditable: bool => dispatch(setIsEditable(bool)),
    setIsNew: bool => dispatch(setIsNew(bool)),
    setPanoId: id => dispatch(setPanoId(id)),
    setSkyboxId: id => dispatch(setSkyboxId(id)),
    setSbIndex: index => dispatch(setSbIndex(index)),
    setPanoIndex: index => dispatch(setPanoIndex(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkyboxCamera);
