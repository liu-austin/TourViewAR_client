import { createSelector } from 'reselect';

const selectPano = state => state.pano;

export const selectPanoId = createSelector(
  [selectPano],
  pano => pano.id
);

export const selectPanoImgUrl = createSelector(
  [selectPano],
  pano => pano.img_url
);

export const selectTourPanos = createSelector(
  [selectPano],
  pano => pano.panos
);

export const selectSceneHistory = createSelector(
  [selectPano],
  pano => pano.scenehistory
);

export const selectGoBack = createSelector(
  [selectPano],
  pano => pano.goback
);