import { createSelector } from 'reselect';

const selectObject = state => state.object;

export const selectObjectId = createSelector(
  [selectObject],
  object => object.id
);

export const selectObjectXCoordinate = createSelector(
  [selectObject],
  object => object.x
);

export const selectObjectYCoordinate = createSelector(
  [selectObject],
  object => object.y
);

export const selectObjectValue = createSelector(
  [selectObject],
  object => object.object_value
);

export const selectObjectScale = createSelector(
  [selectObject],
  object => object.scale
);

export const selectObjectIdPano = createSelector(
  [selectObject],
  object => object.id_pano
);