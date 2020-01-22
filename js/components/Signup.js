import React, { useCallback } from "react";
import axios from "axios";
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
  Right
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
      <Header>
        <Left>
          <Button
            hasText
            transparent
            onPress={() => {
              props.navigate("LOGIN_PAGE");
            }}
          >
            <Text>Back</Text>
          </Button>
        </Left>
        <Body>
          <Title>Sign Up</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input
              onChangeText={text => {
                props.setUserName(text);
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={text => {
                props.setUserPassword(text);
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label>Confirm Password</Label>
            <Input secureTextEntry={true} />
          </Item>
          <Item floatingLabel>
            <Label>E-mail</Label>
            <Input
              onChangeText={text => {
                props.setUserEmail(text);
              }}
            />
          </Item>
        </Form>

        <Button
          block
          light
          style={{ marginTop: 100 }}
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
