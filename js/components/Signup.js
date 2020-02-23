import React, { useCallback } from "react";
import axios from "axios";
import { Dimensions, View, Image } from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Title,
  Button,
  Text,
  Left,
  Body,
  Right,
  Footer
} from "native-base";
import { connect } from "react-redux";
import {
  selectUserName,
  selectUserPassword,
  selectUserEmail
} from "../redux/user/user.selectors";
import { navigate } from "../redux/render/render.action";
import {
  setUserName,
  setUserPassword,
  setUserEmail
} from "../redux/user/user.action";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const Signup = props => {
  const axiosRequest = useCallback(() => {
    axios
      .post(
        "http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/signup",
        {
          username: props.selectUserName,
          pw: props.selectUserPassword,
          email: props.selectUserEmail
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(() => {
        alert(`User ${props.selectUserName} has been created!`);
        props.navigate("LOGIN_PAGE");
      })
      .catch(err => alert(err));
  });

  return (
    <Container style={{ width: "100%", height: "100%" }}>
          <Header style={{backgroundColor: '#2a7886'}}>
            <Left>
            <Button
            style={{backgroundColor: '#fe5f55'}}
            onPress={() => {
               props.navigate("LOGIN_PAGE");
            }}
          >
            <Text style={{color: 'white'}}>Back</Text>
          </Button>
            </Left>
            <Body>
              <Title style={{color: 'white'}}>Sign Up</Title>
            </Body>
            <Right />
          </Header>
          <Content style={{backgroundColor: '#49beb7'}}>
        <Form>
          <Item floatingLabel>
            <Label style={{color: 'white'}}>Username</Label>
            <Input style={{color: 'white'}}
              onChangeText={text => {
                props.setUserName(text);
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label style={{color: 'white'}}>Password</Label>
            <Input style={{color: 'white'}}
              secureTextEntry={true}
              onChangeText={text => {
                props.setUserPassword(text);
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label style={{color: 'white'}}>Confirm Password</Label>
            <Input style={{color: 'white'}} secureTextEntry={true} />
          </Item>
          <Item floatingLabel>
            <Label style={{color: 'white'}}>E-mail</Label>
            <Input style={{color: 'white'}}
              onChangeText={text => {
                props.setUserEmail(text);
              }}
            />
          </Item>
        </Form>
        <Button
          block
          light
          style={{ marginLeft: 0.2 * width, width: width * 0.6, marginTop: height * 0.07, backgroundColor: '#fe5f55' }}
          onPress={() => {
            axiosRequest();
          }}
        >
          <Text style={{color: 'white'}}>Sign Up</Text>
        </Button>
        <View style={{ alignItems: "center", marginTop: 0.06 * height, marginBottom: 0.035 * height }}>
        <Image
          style={{ width: 0.6 * width, height: 0.6 * width, justifyContent: "center" }}
          source={require("../res/camera.png")}
        ></Image>
      </View>
      </Content>
      <Footer style={{backgroundColor: '#2a7886'}}/>
    </Container>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render)),
    setUserName: id => dispatch(setUserName(id)),
    setUserPassword: password => dispatch(setUserPassword(password)),
    setUserEmail: email => dispatch(setUserEmail(email))
  };
};

const mapStateToProps = state => {
  return {
    selectUserName: selectUserName(state),
    selectUserPassword: selectUserPassword(state),
    selectUserEmail: selectUserEmail(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
