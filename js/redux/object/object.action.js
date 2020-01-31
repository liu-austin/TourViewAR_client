export const setObjectId = (id) => {
  return ({
    type: 'SET_ID',
    payload: id
  });
};

export const setObjects = (objects) => {
  return ({
    type: 'SET_OBJECTS',
    payload: objects
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

export const setObjectText = (text) => {
  return ({
    type: 'SET_OBJECT_TEXT',
    payload: text
  });
};

export const setSelectedText = (text) => {
  return ({
    type: 'SET_SELECTED_TEXT',
    payload: text
  });
};