const INITIAL_STATE = {
  navigation: "LOGIN_PAGE"
};

const RenderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "RENDER_PAGE":
      return {
        ...state,
        navigation: action.payload
      };
    default:
      return state;
  }
};

export default RenderReducer;
