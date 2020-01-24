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