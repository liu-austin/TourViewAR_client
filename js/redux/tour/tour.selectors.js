import { createSelector } from 'reselect';

const selectTour = state => state.tour;

export const selectTourId = createSelector(
  [selectTour],
  tour => tour.id
);

export const selectTourName = createSelector(
  [selectTour],
  tour => tour.tour_name
);

export const selectTourPanoPhoto = createSelector(
  [selectTour],
  tour => tour.pano_photos
);

export const selectTourIdUser = createSelector(
  [selectTour],
  tour => tour.id_user
);

export const selectTourPicUrl = createSelector(
  [selectTour],
  tour => tour.pic_url
);

export const selectIsEditable = createSelector(
  [selectTour],
  tour => tour.iseditable
);

export const selectIsNew= createSelector(
  [selectTour],
  tour => tour.isnew
);

export const selectSkyboxId= createSelector(
  [selectTour],
  tour => tour.skybox_id
);

export const selectSbIndex= createSelector(
  [selectTour],
  tour => tour.sbindex
);

export const selectPanoIndex= createSelector(
  [selectTour],
  tour => tour.panoindex
);