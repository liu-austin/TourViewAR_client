const INITIAL_STATE = {
  id: '',
  tour_name: '',
  pano_photos: [],
  id_user: '',
  pic_url: 'something random',
  iseditable: false,
  isnew: false,
  skybox_id: null,
  sbindex: 0,
  panoindex: 0
}

const TourReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_TOUR_ID':
      return ({
        ...state,
        id: action.payload
      });
    case 'SET_TOUR_NAME':
      return ({
        ...state,
        tour_name: action.payload
      });
    case 'SET_TOUR_PANO_PHOTO':
      return ({
        ...state,
        pano_photos: action.payload
      });
    case 'SET_TOUR_ID_USER':
      return ({
        ...state,
        id_user: action.payload
      });
    case 'SET_TOUR_PIC_URL':
      return ({
        ...state,
        pic_url: action.payload
      });
    case 'SET_IS_EDITABLE':
      return ({
        ...state,
        iseditable: action.payload
      });
    case 'SET_IS_NEW':
      return ({
        ...state,
        isnew: action.payload
      });
    case 'SET_SKYBOX_ID':
      return ({
        ...state,
        skybox_id: action.payload
      });
    case 'SET_SB_INDEX':
      return ({
        ...state,
        sbindex: action.payload
      });
    case 'SET_PANO_INDEX':
      return ({
        ...state,
        panoindex: action.payload
      });
    default:
      return state;
  }
};

export default TourReducer;