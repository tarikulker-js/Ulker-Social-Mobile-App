const initialState = [];

export const pageNameReducer = (state = initialState, action) => {
  if (action.type == "setPageName") {
    return action.payload;
  }

  return state;
};

export const homeRefreshing = (state = initialState, action) => {
  if (action.type == "setHomeRefreshing") {
    return action.payload;
  }

  return state;
};

export const likeReel = (state = initialState, action) => {
  if (action.type == "setLikeReel") {
    return action.payload;
  }

  return state;
};

export const unLikeReel = (state = initialState, action) => {
  if (action.type == "setUnLikeReel") {
    return action.payload;
  }

  return state;
};
