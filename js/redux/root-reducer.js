// jshint esversion:6
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import TourReducer from "./tour/tour.reducer";
import UserReducer from "./user/user.reducer";
import ObjectReducer from "./object/object.reducer";
import RenderReducer from "./render/render.reducer";
import PanoReducer from "./pano/pano.reducer";

const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  tour: TourReducer,
  user: UserReducer,
  object: ObjectReducer,
  render: RenderReducer,
  pano: PanoReducer
});

export default persistReducer(persistConfig, rootReducer);
