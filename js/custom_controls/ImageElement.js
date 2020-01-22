import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ViroImage,
  ViroNode,
  ViroAnimations,
  ViroAnimatedComponent,
} from 'react-viro';

/**
 * Pull in all the images needed for this control.
 */
var IconImage = require('../res/icon_info.png');

export default class ImageElement extends Component {
    constructor(props) {
      super(props);

      // set initial state here
      this.state = {
        iconCardAnimation:"showIconAnim",
        contentCardAnimation:"hideAnim",
        runInfoCardAnimation:false,
        runIconCardAnimation:false,
      }

      // bind `this` to functions
      this._onCardClick = this._onCardClick.bind(this);
      this._animateIconCard = this._animateIconCard.bind(this);
      this._animateContentCard = this._animateContentCard.bind(this);
      this._animateIconCardFinished = this._animateIconCardFinished.bind(this);
      this._animateContentCardFinished = this._animateContentCardFinished.bind(this);
    }

    render() {
      return (
        <ViroNode onClick={this._onCardClick} {...this.props}>
          {/* Info Card */}
          <ViroImage
            transformBehaviors={["billboard"]}
            width={1}
            height={1}
            opacity={1.0}
            scale={[0.5, 0.5, 0.5]}
            source={infoIconImage}
            animation={{ name:this.state.iconCardAnimation,
                         run : this.state.runIconCardAnimation,
                         loop:false,
                         onFinish:this._animateIconCardFinished }}/>

          {/* Content Card*/}
          <ViroNode scale={[this.props.contentCardScale[0], this.props.contentCardScale[1], this.props.contentCardScale[2]]}
                    transformBehaviors={["billboard"]}>
            <ViroImage
              width={1}
              height={1}
              opacity={0.0}
              scale={[.1,.1,.1]}
              source={{uri: this.props.content}}
              animation={{ name:this.state.contentCardAnimation,
                           run : this.state.runInfoCardAnimation,
                           loop:false,
                           onFinish:this._animateContentCardFinished }}/>
          </ViroNode>
        </ViroNode>
      );
    }

    _onCardClick() {
        var showContentCard = this.state.contentCardAnimation == "hideAnim";
        if (showContentCard == true) {
            this._animateIconCard(!showContentCard);
        } else {
            this._animateContentCard(showContentCard);
        }
    }

    /**
     * Show and hide animations for both the Icon and Content Card in this control.
     */
    _animateIconCard(isVisible) {
        this.setState({
            iconCardAnimation: isVisible? "showIconAnim": "hideAnim",
            runIconCardAnimation:true,
        });
    }

    _animateContentCard(isVisible) {
        this.setState({
            contentCardAnimation: isVisible? "showContentCardAnim": "hideAnim",
            runInfoCardAnimation:true,
        });
    }

    /**
     * Animation callbacks for displaying either the Content
     * card after hiding the Icon card and vice versa.
     */
    _animateIconCardFinished() {
        if (this.state.iconCardAnimation == "hideAnim") {
            this._animateContentCard(true);
        }
    }

    _animateContentCardFinished() {
        if (this.state.contentCardAnimation == "hideAnim") {
            this._animateIconCard(true);
        }
    }
}

ViroAnimations.registerAnimations({
    hideAnim: {properties:{scaleX:.1, scaleY:.1, scaleZ:.1, opacity:0.0}, easing:"Bounce", duration:100},
    showContentCardAnim: {properties:{scaleX:1, scaleY:1, scaleZ:1, opacity:1.0}, easing:"PowerDecel", duration:150},
    showIconAnim: {properties:{scaleX:.5, scaleY:.5, scaleZ:.5, opacity:1.0}, easing:"PowerDecel", duration:150},
});