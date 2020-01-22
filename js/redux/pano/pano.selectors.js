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