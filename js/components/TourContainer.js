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
  Button
} from "react-native";

import axios from 'axios';

const TourContainer = (props) => {

  const [confirm, setConfirm] = useState(false);
    // if (this.state.navigator === "PROFILE") {
      return (
        <View style={localStyles.tourContainer}>
          <Image
            style={localStyles.icon}
            source={{
              uri:
                `${props.tour.pic_url}`
            }}
          />
          <Text>{`${props.tour.tour_name}`}</Text>
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
                axios.get(`http://tourviewarserver.herokuapp.com/api/scenes/${props.tour.id}`)
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
    width: 300,
    margin: 5,
    flexDirection: "column",
    alignItems: "flex-start",
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 3,
    backgroundColor: "#d3d3d3"
  },
  icon: {
    width: 50,
    height: 50
  },
  button: {
    marginTop: 5
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
