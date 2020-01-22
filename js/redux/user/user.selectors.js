import { createSelector } from "reselect";

const selectUser = state => state.user;

export const selectUserId = createSelector([selectUser], user => user.id);

export const selectUserEmail = createSelector([selectUser], user => user.email);

export const selectUserName = createSelector(
  [selectUser],
  user => user.username
);

export const selectUserPassword = createSelector([selectUser], user => user.pw);

export const selectUserProfilePic = createSelector(
  [selectUser],
  user => user.profile_pic_url
);

export const selectUserCreatedTours = createSelector(
  [selectUser],
  user => user.created_tours
);
