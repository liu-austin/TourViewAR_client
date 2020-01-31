import React, { Component, useState, useCallback } from "react";
import axios from "axios";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { navigate } from "../redux/render/render.action";
import { setObjectText, setObjectId, setObjects } from '../redux/object/object.action';
import { selectObjectText, selectObjects } from '../redux/object/object.selectors';
import { selectPanoId } from '../redux/pano/pano.selectors';

import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Body,
  Right,
  Button,
  Item,
  Label,
  Input
} from "native-base";
const CreateTextObject = props => {
  [loaded, setLoaded] = useState(false);
  return (
    <Container style={{ width: "100%", height: "100%" }}>
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
        <Right>
        </Right>
      </Header>
      <Content>
        <View style={{ marginTop: 50 }}>
          <Item floatingLabel>
            <Label>ENTER AR TEXT</Label>
            <Input
              onChangeText={text => {
                props.setObjectText(text);
              }}
            />
          </Item>
          {
            loaded ? 
            (
              <Button
              block
              onPress={() => {
                props.navigate("EDIT_AR_PAGE")
              }}full>
              <Text>GO TO AR SCENE</Text>
            </Button>
            ) 
            : 
            (
              <Button
              block
              onPress={() => {
                  axios
                  .post(`http://tourviewarserver.herokuapp.com/api/object`, {
                    object_type: "text",
                    object_value: props.selectObjectText,
                    id_pano: props.selectPanoId
                  })
                  .then(results => {
                    props.setObjectId(results.data.id);
                  //   let textobject = {
                  //     id: results.data.id,
                  //     type: "text",
                  //     x: 0,
                  //     y: 0,
                  //     value: props.selectObjectText,
                  //     scale: { x: 1, y: 1, z: 1 },
                  //     id_pano: props.selectPanoId
                  //   };
                  //     props.setObjects(props.selectObjects.concat([textobject])); 
                      setLoaded(true);
                  })
                  .catch(err => alert("There was an error creating this object"));
              }}full>
              <Text>SUBMIT</Text>
            </Button>
            )
          }

        </View>
      </Content>
    </Container>
  );
};
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  },
  profileImg: {
    marginTop: 30,
    width: 60,
    height: 60,
    borderRadius: 10
  }
});

const mapStateToProps = state => {
    return {
      selectObjectText: selectObjectText(state),
      selectPanoId: selectPanoId(state),
      selectObjects: selectObjects(state)
    };
  };

const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render)),
    setObjectText: text => dispatch(setObjectText(text)),
    setObjectId: id => dispatch(setObjectId(id)),
    setObjects: objects => dispatch(setObjects(objects))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTextObject);
