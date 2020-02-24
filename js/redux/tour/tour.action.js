export const setTourId = id => {
  return {
    type: "SET_TOUR_ID",
    payload: id
  };
};

export const setTourName = name => {
  return {
    type: "SET_TOUR_NAME",
    payload: name
  };
};

export const setTourPanoPhoto = photo => {
  return {
    type: "SET_TOUR_PANO_PHOTO",
    payload: photo
  };
};

export const setTourIdUser = id => {
  return {
    type: "SET_TOUR_ID_USER",
    payload: id
  };
};

export const setTourPicUrl = url => {
  return {
    type: "SET_TOUR_PIC_URL",
    payload: url
  };
};

export const setIsNew = bool => {
  return {
    type: "SET_IS_NEW",
    payload: bool
  }
};

export const setIsEditable = bool => {
  return {
    type: "SET_IS_EDITABLE",
    payload: bool
  }
};

export const setSkyboxId = id => {
  return {
    type: "SET_SKYBOX_ID",
    payload: id
  }
};

export const setSbIndex = index => {
  return {
    type: "SET_SB_INDEX",
    payload: index
  }
};

export const setPanoIndex = index => {
  return {
    type: "SET_PANO_INDEX",
    payload: index
  }
};