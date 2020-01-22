const INITIAL_STATE = {
  id: '',
  email: '',
  username: '',
  pw: '',
  profile_pic_url: '',
  created_tours: []
}

const UserReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER_ID':
      return ({
        ...state,
        id: action.payload
      });
    case 'SET_USER_EMAIL':
      return ({
        ...state,
        email: action.payload
      });
    case 'SET_USER_NAME':
      return ({
        ...state,
        username: action.payload
      })
    case 'SET_USER_PASSWORD':
      return ({
        ...state,
        pw: action.payload
      });
    case 'SET_USER_PROFILE_PIC':
      return ({
        ...state,
        profile_pic_url: action.payload
      });
    case 'SET_USER_CREATED_TOURS':
      return ({
        ...state,
        created_tours: action.payload
      });
    default:
      return state;
  }
};

export default UserReducer;