import React, { useCallback } from "react";
import axios from "axios";
import { Dimensions } from 'react-native';
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

const Signup = props => {
  const axiosRequest = useCallback(() => {
    axios
      .post(
        "http://tourviewarserver.herokuapp.com/api/signup",
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
              this.props.navigate("LOGIN_PAGE");
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
          style={{ marginTop: height * 0.2, color: 'white', backgroundColor: '#fe5f55' }}
          onPress={() => {
            axiosRequest();
          }}
        >
          <Text>Sign Up</Text>
        </Button>
      </Content>
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
