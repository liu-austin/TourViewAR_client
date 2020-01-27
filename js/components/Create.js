import React, { Component, useState, useCallback } from "react";
import axios from "axios";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { navigate } from "../redux/render/render.action";
import { setTourName } from "../redux/tour/tour.action";
import { selectTourName } from "../redux/tour/tour.selectors";
import { selectUserId } from "../redux/user/user.selectors";

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
const Create = props => {
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
          <Text>{`${props.selectTourName}`} </Text>
        </Right>
      </Header>
      <Content>
        <View style={{ marginTop: 50 }}>
          <Item floatingLabel>
            <Label>ENTER TOUR NAME</Label>
            <Input
              onChangeText={text => {
                props.setTourName(text);
              }}
            />
          </Item>
          <Button
            block
            onPress={() => {
              props.navigate("CREATE_OPTIONS");
            }}
            full
          >
            <Text>SUBMIT</Text>
          </Button>
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
const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render)),
    setTourName: name => dispatch(setTourName(name))
  };
};

const mapStateToProps = state => {
  return {
    selectTourName: selectTourName(state)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Create);
