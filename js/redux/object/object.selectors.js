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

export const selectObjectZCoordinate = createSelector(
  [selectObject],
  object => object.z
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

export const selectObjectText = createSelector(
  [selectObject],
  object => object.object_text
);

export const selectObjects = createSelector(
  [selectObject],
  object => object.objects
);

export const selectSelectedText = createSelector(
  [selectObject],
  object => object.selected_text
);

export const selectForSb = createSelector(
  [selectObject],
  object => object.forsb
);

export const selectObjSceneCap = createSelector(
  [selectObject],
  object => object.objscenecap
);