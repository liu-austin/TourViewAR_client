import React, { useState, Component } from "react";
import { setTourId, setTourPicUrl } from "../redux/tour/tour.action";
import { selectTourPicUrl, selectTourId } from "../redux/tour/tour.selectors";
import { setTourPanos } from "../redux/pano/pano.action";
import { navigate } from "../redux/render/render.action";
import { connect } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Dimensions
} from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

import axios from 'axios';

const TourContainer = (props) => {

  const [confirm, setConfirm] = useState(false);
    // if (this.state.navigator === "PROFILE") {
      return (
        <View style={localStyles.tourContainer}>
          <View style={{marginTop: height * 0.01, marginBottom: height * 0.01}}>
          <Text style={{color: 'white', fontSize: 20}}>{`${props.tour.tour_name}`}</Text>
          </View>
          <Image
            style={localStyles.icon}
            source={{
              uri:
                `${props.tour.pic_url}`
            }}
          />
          <Button
          style={localStyles.button}
          onPress={() => {                        
            confirm ? 
            (
              props.navigate('VIEW_AR_PAGE')
            ) 
            : 
            (
              // alert(JSON.stringify(props.tour))
              // alert(props.tour.id)
              axios.get(`http://tourviewarserver-dev.us-west-1.elasticbeanstalk.com/api/scenes/${props.tour.id}`)
              .then(results => {
                props.setTourId(props.tour.id);
                props.setTourPanos(results.data.rows);
                setConfirm(true);
              })
            )
          }}
          title={confirm ? `CONFIRM` : `VIEW EXPERIENCE`}
        />
        </View>
      );
    // } else if (this.state.navigator === "AR") {
    //   // this should pass upwards to the Profile container so that it overtakes the entire page instead of rendering in context of the other experience pods
    //   return <ViroARSceneNavigator initialScene={{ scene: InitialARScene }}/>
    // }

}

var localStyles = StyleSheet.create({
  tourContainer: {
    flex: 1,
    width: width * 0.9,
    margin: width * 0.02,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: width * 0.05,
    backgroundColor: "#00a8cc"
  },
  icon: {
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
    width: width * 0.75,
    height: width * 0.75
  },
  button: {
    backgroundColor: '#fe5f55',
    marginTop: width * 0.02
  }
});

const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render)),
    setTourId: id => dispatch(setTourId(id)),
    setTourPicUrl: url => dispatch(setTourPicUrl(url)),
    setTourPanos: tours => dispatch(setTourPanos(tours))
  };
};

const mapStateToProps = state => {
  return {
    selectTourPicUrl: selectTourPicUrl(state),
    selectTourId: selectTourId(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TourContainer);
