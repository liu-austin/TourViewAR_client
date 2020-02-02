export const setPanoId = id => {
  return ({
    type: 'SET_PANO_ID',
    payload: id
  });
};

export const setPanoImgUrl = url => {
  return ({
    type: 'SET_PANO_IMG_URL',
    payload: url
  });
};

export const setTourPanos = panos => {
  return ({
    type: 'SET_TOUR_PANOS',
    payload: panos
  });
}

export const setSceneHistory = scenes => {
  return ({
    type: 'SET_SCENE_HISTORY',
    payload: scenes
  });
};

export const setGoBack = bool => {
  return ({
    type: 'SET_GO_BACK',
    payload: bool
  });
};