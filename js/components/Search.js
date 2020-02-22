import React, { Component, useState, useCallback } from "react";
import { ScrollView, View, StyleSheet, Image, TextInput, Dimensions } from "react-native";
import axios from "axios";
import TourContainer from "./TourContainer";
import { connect } from "react-redux";
import { navigate } from "../redux/render/render.action";
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Body,
  Right,
  Button,
  Title,
  Footer,
  FooterTab
} from "native-base";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const Search = props => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([[]]);
  const searchRequest = useCallback(() => {
    axios
      .get("http://tourviewarserver.herokuapp.com/api/search",
        {
          params: {
            search: search
          }
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(results => {
        if (results.data[0][0] === undefined) {
          alert("No Search has been found!");
          setSearchResults([[]]);
        } else {
          setSearchResults(results.data);
        }
      })
      .catch(err => {
        alert(err);
      });
  });

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
        <Body>
          <Title style={{color: 'white'}}>Search Tours</Title>
        </Body>
        <Right />
      </Header>
      <Content style={{backgroundColor: '#49beb7'}}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "center",
            marginTop: 30
          }}
        >
          {/* <Text>SEARCH</Text> */}
          <TextInput
            style={{
              height: height * 0.05,
              width: width * 0.75,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 4,
              backgroundColor: "white"
            }}
            placeholder="Search Tour Name"
            onChangeText={text => {
              setSearch(text);
            }}
          ></TextInput>
          <Button
            primary
            onPress={() => {
              searchRequest();
            }}
          >
            <Text>Search</Text>
          </Button>
        </View>
        <ScrollView style={localStyles.container}>
          {searchResults[0].map((tour, i) => (
            <TourContainer key={i} tour={tour} />
          ))}
        </ScrollView>
      </Content>
    </Container>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: width * 0.03,
    marginTop: height * 0.03
  }
});

const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render))
  };
};

export default connect(null, mapDispatchToProps)(Search);