const INITIAL_STATE = {
  navigation: "LOGIN_PAGE",
  navigation2: []
};

const RenderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "RENDER_PAGE":
      return {
        ...state,
        navigation: action.payload
      };
    case "RENDER_PAGE2":
      return {
        ...state,
        navigation2: action.payload
      };
    default:
      return state;
  }
};

export default RenderReducer;
