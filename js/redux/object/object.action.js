export const setObjectId = (id) => {
  return ({
    type: 'SET_ID',
    payload: id
  });
};

export const setObjectXCoordinate = (coordinate) => {
  return ({
    type: 'SET_X_COORDINATE',
    payload: coordinate
  });
};

export const setObjectYCoordinate = (coordinate) => {
  return ({
    type: 'SET_Y_COORDINATE',
    payload: coordinate
  });
};

export const setObjectValue = (value) => {
  return ({
    type: 'SET_OBJECT_VALUE',
    payload: value
  });
};

export const setObjectScale = (scale) => {
  return ({
    type: 'SET_OBJ_SCALE',
    payload: scale
  });
};

export const setObjectIdPano = (id) => {
  return ({
    type: 'SET_ID_PANO',
    payload: id
  });
};