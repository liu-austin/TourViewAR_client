export const navigate = render => {
  return {
    type: "RENDER_PAGE",
    payload: render
  };
};

export const navigate2 = render => {
  return ({
    type: "RENDER_PAGE2",
    payload: render
  });
};
