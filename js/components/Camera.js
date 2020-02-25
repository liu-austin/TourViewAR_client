import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { navigate } from "../redux/render/render.action";
import { selectUserId } from "../redux/user/user.selectors";
import { setTourId, setIsEditable, setIsNew, setSbIndex, setPanoIndex } from "../redux/tour/tour.action";
import { selectTourName, selectTourId } from "../redux/tour/tour.selectors";
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

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

import axios from "axios";

const UseCamera = props => {
  [renderARButton, changeARButtonState] = useState(false);

  const propsvalue = () => {
    return props.forobject;
  };

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
        props.setIsEditable(true);
        props.setIsNew(false);
        const source = { uri: response.uri };

        axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/getpresignedurl/panoimages`)
        .then(results => {
          const xhr = new XMLHttpRequest();
          xhr.open("PUT", results.data.presignedUrl);
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                // alert("Image successfully uploaded to S3");
                axios.post(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/scenes`, {
                    id: props.selectTourId,
                    img_url: results.data.publicUrl
                  })
                  .then((data) => {
                    axios.post(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/object`, {
                      object_type: "scene",
                      // object_value: results.data.publicUrl,
                      // id_pano: props.selectPanoId
                      object_value: JSON.stringify([data.data.panoId, results.data.publicUrl]),
                      id_pano: props.selectPanoId
                    })
                  })          
                    .then(() => {
                      axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/scenes/${props.selectTourId}`)
                        .then(scenes => {
                          props.setTourPanos(scenes.data.rows);
                          changeARButtonState(true);
                        })
                        .catch(err => console.log(err));
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
        if (bool) {
          props.setIsEditable(true);
          props.setIsNew(false);
          const source = { uri: response.uri };
          // alert(JSON.stringify(source));
          axios
            .get(
              `http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/getpresignedurlforobject/panoimages`
            )
            .then(results => {
              const xhr = new XMLHttpRequest();
              xhr.open("PUT", results.data.presignedUrl);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  // alert(xhr.status);
                  if (xhr.status === 200) {
                    // alert("Image successfully uploaded to S3");
                    axios
                      .post(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/object`, {
                        object_type: "image",
                        object_value: results.data.publicUrl,
                        id_pano: props.selectPanoId
                      })
                      .then(() => {
                        axios
                          .get(
                            `http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/scenes/${props.selectTourId}`
                          )
                          .then(scenes => {
                            props.setTourPanos(scenes.data.rows);
                            changeARButtonState(true);
                          })
                          .catch(err => console.log(err));
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
                name: "cameratest.jpg"
              });
            })
            .catch(err => alert(JSON.stringify(err)));
        } else {
          props.setIsEditable(true);
          props.setIsNew(true);
          props.setSbIndex(0);
          props.setPanoIndex(0);
          const source = { uri: response.uri };
          // alert(JSON.stringify(source));
          axios
            .get(
              `http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/getpresignedurl/panoimages`
            )
            .then(results => {
              const xhr = new XMLHttpRequest();
              xhr.open("PUT", results.data.presignedUrl);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                    // alert("Image successfully uploaded to S3");
                    axios
                      .post(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/newtour`, {
                        id: results.data.id,
                        img_url: results.data.publicUrl,
                        tour_name: props.selectTourName,
                        id_user: props.selectUserId
                      })
                      .then(results => {
                        props.setTourId(results.data.tourid);
                        return results.data.tourid;
                      })
                      .then(id_tour => {
                        axios
                          .get(
                            `http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/scenes/${id_tour}`
                          )
                          .then(results => {
                            props.setTourPanos(results.data.rows);
                            changeARButtonState(true);
                          })
                          .catch(err => console.log(err));
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
          }}>
          <Text style={{color: 'white'}}>Back</Text>
        </Button>
      </Left>
      <Body />
      <Right />
    </Header>
      <Content style={{...styles.container, backgroundColor: '#49beb7'}}>
        {props.forobject ? (
          <View style={{ alignItems: "center",
          justifyContent: "center"}}>
            {renderARButton ? (
              <Button 
              style={{backgroundColor: '#fe5f55', 
              width: width * 0.6, 
            }}
              onPress={() => props.navigate("EDIT_AR_PAGE")}>
                <Text style={{color: 'white'}}>Go To AR Scene</Text>
              </Button>
            ) : (
              <View>
                <View style={{ alignItems: "center", marginTop: height * 0.15 }}>
                  <Image
                    source={require("../res/camera.png")}
                    style={{ height: width * 0.6, width: width * 0.6 }}
                  />
              </View>
              <View style={{alignContent: "center", justifyContent: "center", width: width * 0.6, marginLeft: width * 0.2, marginTop: height * 0.05}}>
                  <Text style={{color: 'white', alignItems: 'center'}}>
                      Use your device camera to take a photo for the object. The image will be publically uploaded to AWS S3.
                  </Text>
              </View>
              <View style={{alignContent: "center", justifyContent: "center", marginLeft: width * 0.2}}>
                  <Button style={{marginTop: height * 0.025, backgroundColor: '#fe5f55', width: width * 0.6,
                  alignItems: 'center'}}
                  onPress={() => takePhoto()}>
                      <Text style={{alignContent: "center"}}>
                          Take A Photo
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
              <Button 
              style={{backgroundColor: '#fe5f55', 
              width: width * 0.6, 
              }}
              onPress={() => props.forscene ? (props.navigate("EDIT_AR_PAGE")) : (props.navigate("CREATE_AR_PAGE"))}>
                <Text style={{color: 'white'}}>Go To AR Scene</Text>
              </Button>
            ) : (
            <View>
              <View style={{ alignItems: "center", marginTop: height * 0.15 }}>
                <Image
                  source={require("../res/camera.png")}
                  style={{ height: width * 0.6, width: width * 0.6 }}
                />
            </View>
            <View style={{alignContent: "center", justifyContent: "center", width: width * 0.6, marginLeft: width * 0.2, marginTop: height * 0.05}}>
                <Text style={{color: 'white', alignItems: 'center'}}>
                    Use your device camera to take a photo for the scene. The image will be publically uploaded to AWS S3.
                </Text>
            </View>
            <View style={{alignContent: "center", justifyContent: "center", marginLeft: width * 0.2}}>
                <Button style={{marginTop: height * 0.025, backgroundColor: '#fe5f55', width: width * 0.6,
                alignItems: 'center'}}
                onPress={() => takePhoto()}>
                    <Text style={{alignContent: "center"}}>
                        Take A Photo
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
    selectTourPanos: selectTourPanos(state)
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
    setSbIndex: index => dispatch(setSbIndex(index)),
    setPanoIndex: index => dispatch(setPanoIndex(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UseCamera);
