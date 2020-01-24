const INITIAL_STATE = {
  id: '',
  img_url: '',
  panos: []
}

const PanoReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_PANO_ID':
      return ({
        ...state,
        id: action.payload
      });
    case 'SET_PANO_IMG_URL':
      return ({
        ...state,
        img_url: action.payload
      });
    case 'SET_TOUR_PANOS':
      return ({
        ...state,
        panos: action.payload
      });
    default:
      return state;
  }
}

export default PanoReducer;