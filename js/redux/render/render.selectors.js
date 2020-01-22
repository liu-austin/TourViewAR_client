import { createSelector } from "reselect";

const selectRender = state => state.render;

export const selectNavigator = createSelector(
  [selectRender],
  render => render.navigation
);
