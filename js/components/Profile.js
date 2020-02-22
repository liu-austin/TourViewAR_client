import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Image, Dimensions } from "react-native";
import TourContainer from "./TourContainer";
import { connect } from "react-redux";
import { navigate } from "../redux/render/render.action";
import {
  selectUserName,
  selectUserProfilePic,
  selectUserCreatedTours,
  selectUserId
} from "../redux/user/user.selectors";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

import {} from "../redux/tour/tour.selectors";
import axios from "axios";
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

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      view: "MAIN",
      userTours: []
    };
    this.getUserTours = this.getUserTours.bind(this);
  }
  render() {
    if (this.state.view === "MAIN") {
      return (
        <Container style={localStyles.mainProfileContainer}>
          <Header style={{backgroundColor: '#2a7886'}}>
            <Left>
            <Button
            style={{backgroundColor: '#fe5f55'}}
            onPress={() => {
              this.props.navigate("REACT_NATIVE_HOME");
            }}
          >
            <Text style={{color: 'white'}}>Back</Text>
          </Button>
            </Left>
            <Body>
              <Title style={{color: 'white'}}>Profile</Title>
            </Body>
            <Right />
          </Header>
          <Content style={{backgroundColor: '#49beb7'}}>
              <View style={{ alignItems: "center", marginTop: 0.07 * height, marginBottom: 0.03 * height }}>
                <Image
                style={{ width: 0.3 * width, height: 0.3 * width, justifyContent: "center" }}
                source={require("../res/camera.png")}
                />
              </View>
              <View style={{ flex: 1, alignItems: "center",
              justifyContent: "center"}}>
              <Text style={{fontSize: 28, justifyContent: "center", color: 'white'}}>{`${this.props.selectUserName}'s Profile`}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center",
              justifyContent: "center"}}>
              <Button style={{
                marginTop: 0.035 * height,
                marginBottom: 0.035 * height,
                color: 'white',
                backgroundColor: '#fe5f55',
                width: width * 0.6,
                justifyContent: "center"
              }} onPress={this.getUserTours}>
                <Text>View My Tours</Text>
              </Button>
              <Button
              style={{
                color: 'white',
                backgroundColor: '#fe5f55',
                width: width * 0.6,
                justifyContent: "center"
              }}
                onPress={() => {
                  this.props.navigate("CREATE_TOUR");
                }}
              >
                <Text>Create New Tour</Text>
              </Button>
              </View>

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
    } else if (this.state.view === "USER_TOURS") {
      return (
        <Container style={localStyles.mainProfileContainer}>
        <Header style={{backgroundColor: '#2a7886'}}>
        <Left>
        <Button
        style={{backgroundColor: '#fe5f55'}}
        onPress={() => {
          this.props.navigate("REACT_NATIVE_HOME");
        }}
      >
        <Text style={{color: 'white'}}>Back</Text>
      </Button>
        </Left>
        <Body>
          <Title style={{color: 'white'}}>Profile</Title>
        </Body>
        <Right />
      </Header>
      <Content style={{backgroundColor: '#49beb7'}}>
            <View style={{ alignItems: "center", marginTop: 0.07 * height, marginBottom: 0.03 * height }}>
            <Image
            style={{ width: 0.3 * width, height: 0.3 * width, justifyContent: "center" }}
            source={require("../res/camera.png")}
            />
          </View>
          <View style={{ flex: 1, alignItems: "center",
          justifyContent: "center"}}>
          <Text style={{fontSize: 28, justifyContent: "center", color: 'white'}}>{`${this.props.selectUserName}'s Profile`}</Text>
          </View>
              <ScrollView style={localStyles.scrollViewContainer}>
                {this.state.userTours.map((tour, i) => (
                  <TourContainer key={i} tour={tour} />
                ))}
              </ScrollView>
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
    }
  }

  getUserTours() {
    axios
      .get(
        `http://tourviewarserver.herokuapp.com/api/tours/${this.props.selectUserId}`,
        { headers: { "Content-Type": "application/json" } }
      )
      .then(results => {
        this.setState({
          userTours: results.data.rows,
          view: "USER_TOURS"
        });
      })
      .catch(err => {
        alert(err);
      });
  }
}

const localStyles = StyleSheet.create({
  mainProfileContainer: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    width: "100%",
    height: "100%"
  },
  myToursContainer: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  scrollViewContainer: {
    flex: 1,
    alignContent: "center",
    marginTop: 0.03 * height,
    marginLeft: 0.03 * width
  },
  profileImgSmall: {
    marginTop: 30,
    width: 60,
    height: 60,
    borderRadius: 10
  },
  profileImgLarge: {
    marginTop: 30,
    width: 100,
    height: 100,
    borderRadius: 10
  }
});

const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render))
  };
};

const mapStateToProps = state => {
  return {
    selectUserProfilePic: selectUserProfilePic(state),
    selectUserName: selectUserName(state),
    selectUserCreatedTours: selectUserCreatedTours(state),
    selectUserId: selectUserId(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
