export const setUserId = id => {
  return {
    type: "SET_USER_ID",
    payload: id
  };
};

export const setUserEmail = email => {
  return {
    type: "SET_USER_EMAIL",
    payload: email
  };
};

export const setUserName = name => {
  return {
    type: "SET_USER_NAME",
    payload: name
  };
};

export const setUserPassword = password => {
  return {
    type: "SET_USER_PASSWORD",
    payload: password
  };
};

export const setUserProfilePic = pic => {
  return {
    type: "SET_USER_PROFILE_PIC",
    payload: pic
  };
};

export const setUserCreatedTours = tour => {
  return {
    type: "SET_USER_CREATED_TOURS",
    payload: tour
  };
};
