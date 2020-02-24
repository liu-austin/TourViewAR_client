const INITIAL_STATE = {
  id: null,
  x: 0,
  y: 0,
  z: 0,
  object_value: '',
  scale: [],
  id_pano: '',
  object_text: '',
  objects: [],
  selected_text: '',
  forsb: false,
  objscenecap: false
}

const ObjectReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_OBJECT_TEXT':
      return ({
        ...state,
        object_text: action.payload
      });
    case 'SET_SELECTED_TEXT':
      return ({
        ...state,
        selected_text: action.payload
      });
    case 'SET_OBJECTS':
      return ({
        ...state,
        objects: []
      });
    case 'SET_ID':
      return ({
        ...state,
        id: action.payload
      });
    case 'SET_X_COORDINATE':
      return ({
        ...state,
        x: action.payload
      });
    case 'SET_Y_COORDINATE':
      return ({
        ...state,
        y: action.payload
      });
    case 'SET_Z_COORDINATE':
      return ({
        ...state,
        z: action.payload
      });
    case 'SET_OBJECT_VALUE':
      return ({
        ...state,
        object_value: action.payload
      });
    case 'SET_OBJ_SCALE':
      return ({
        ...state,
        scale: action.payload
      });
    case 'SET_ID_PANO':
      return ({
        ...state,
        id_pano: action.payload
      });
    case 'SET_FOR_SB':
      return ({
        ...state,
        forsb: action.payload
      });
    case 'SET_OBJ_SCENE_CAP':
      return ({
        ...state,
        objscenecap: action.payload
      });
    default:
      return state;
  }
};

export default ObjectReducer;