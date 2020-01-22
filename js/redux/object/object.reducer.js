const INITIAL_STATE = {
  id: '',
  x: 0,
  y: 0,
  object_value: '',
  scale: [],
  id_pano: ''
}

const ObjectReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
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
    case 'SET_OBJECT_VALUE':
      return ({
        ...state,
        object_value: action.payload
      });
    case 'SET_OBJ_SCALE':
      return ({
        ...state,
        scale: action.payload
      })
    case 'SET_ID_PANO':
      return ({
        ...state,
        id_pano: action.payload
      })
    default:
      return state;
  }
};

export default ObjectReducer;