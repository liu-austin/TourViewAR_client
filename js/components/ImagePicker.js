import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { navigate } from "../redux/render/render.action";
import { setTourId, setIsEditable, setIsNew } from "../redux/tour/tour.action";
import { selectTourName, selectTourId } from "../redux/tour/tour.selectors";
import { selectPanoId, selectTourPanos } from "../redux/pano/pano.selectors";
import { setTourPanos, setPanoId } from "../redux/pano/pano.action";
import { selectUserId } from "../redux/user/user.selectors";
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";

import axios from "axios";

const ImageUpload = props => {
  [renderARButton, changeARButtonState] = useState(false);
  const propsvalue = () => {
    return props.forobject;
  };
  const chooseFile = bool => {
    const options = {};
    ImagePicker.launchImageLibrary(options, response => {
      if (props.forscene) {
        props.setIsEditable(true);
        props.setIsNew(false);
        const source = { uri: response.uri };

        axios.get(`http://tourviewarserver.herokuapp.com/api/getpresignedurl/panoimages`)
        .then(results => {
          const xhr = new XMLHttpRequest();
          xhr.open("PUT", results.data.presignedUrl);
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                // alert("Image successfully uploaded to S3");
                axios.post(`http://tourviewarserver.herokuapp.com/api/scenes`, {
                    id: props.selectTourId,
                    img_url: results.data.publicUrl
                  })
                  .then((data) => {
                    axios.post(`http://tourviewarserver.herokuapp.com/api/object`, {
                      object_type: "scene",
                      // object_value: results.data.publicUrl,
                      // id_pano: props.selectPanoId
                      object_value: JSON.stringify([data.data.panoId, results.data.publicUrl]),
                      id_pano: props.selectPanoId
                    })
                  })          
                    .then(() => {
                      axios.get(`http://tourviewarserver.herokuapp.com/api/scenes/${props.selectTourId}`)
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
        }).catch(err => alert(JSON.stringify(err)));
      } else {
        if (bool) {
          props.setIsEditable(true);
          props.setIsNew(false);
          const source = { uri: response.uri };
          // alert(JSON.stringify(source));
          axios.get(`http://tourviewarserver.herokuapp.com/api/getpresignedurlforobject/arobjectimages`)
            .then(results => {
              const xhr = new XMLHttpRequest();
              xhr.open("PUT", results.data.presignedUrl);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                    // alert("Image successfully uploaded to S3");
                    axios
                      .post(`http://tourviewarserver.herokuapp.com/api/object`, {
                        object_type: "image",
                        object_value: results.data.publicUrl,
                        id_pano: props.selectPanoId
                      })
                      .then(results => {
                        axios
                          .get(
                            `http://tourviewarserver.herokuapp.com/api/scenes/${props.selectTourId}`
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
                name: "cameratest.jpg"
              });
            })
            .catch(err => alert(JSON.stringify(err)));
        } else {
          props.setIsEditable(true);
          props.setIsNew(true);
          const source = { uri: response.uri };
          // alert(JSON.stringify(source));
          axios
            .get(
              `http://tourviewarserver.herokuapp.com/api/getpresignedurl/panoimages`
            )
            .then(results => {
              const xhr = new XMLHttpRequest();
              xhr.open("PUT", results.data.presignedUrl);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  console.log(xhr.status);
                  console.log(xhr);
                  if (xhr.status === 200) {
                    // alert("Image successfully uploaded to S3");
                    axios
                      .post(`http://tourviewarserver.herokuapp.com/api/newtour`, {
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
                            `http://tourviewarserver.herokuapp.com/api/scenes/${id_tour}`
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
    <Container style={{ width: 400, height: 700 }}>
      <Header>
        <Left>
          <Button
            hasText
            transparent
            onPress={() => {
              props.navigate("REACT_NATIVE_HOME");
            }}
          >
            <Text>Back</Text>
          </Button>
        </Left>
        <Body />
        <Right />
      </Header>
      <View style={styles.container}>
        {props.forobject ? (
          <View>
            {renderARButton ? (
              <Button onPress={() => props.navigate("EDIT_AR_PAGE")}>
                <Text>Go To AR Scene</Text>
              </Button>
            ) : (
              <Text
                style={{ color: "#3FA4F0" }}
                onPress={() => chooseFile(propsvalue())}
              >
                Upload A Photo
              </Text>
            )}
          </View>
        ) : (
          <View>
            {renderARButton ? (
              <Button onPress={() => props.navigate("CREATE_AR_PAGE")}>
                <Text>Go To AR Scene</Text>
              </Button>
            ) : (
              <Text
                style={{ color: "#3FA4F0" }}
                onPress={() => chooseFile(propsvalue())}
              >
                Upload A Photo
              </Text>
            )}
          </View>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    selectTourName: selectTourName(state),
    selectTourId: selectTourId(state),
    selectPanoId: selectPanoId(state),
    selectTourPanos: selectTourPanos(state),
    selectUserId: selectUserId(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render)),
    setTourId: id => dispatch(setTourId(id)),
    setTourPanos: tours => dispatch(setTourPanos(tours)),
    setIsEditable: bool => dispatch(setIsEditable(bool)),
    setIsNew: bool => dispatch(setIsNew(bool)),
    setPanoId: id => dispatch(setPanoId(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
