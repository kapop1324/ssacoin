/* eslint-disable */

import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
// ocalStorage에 저장하고 싶으면 import storage from 'redux-persist/lib/storage'
// session Storage에 저장하고 싶으면 import storageSession from 'redux-persist/lib/storage/session'
import storage from "redux-persist/lib/storage";

import Auth from './Auth';

const persistConfig = {
  // key : reducer 객체의 어느 지점에서부터 데이터를 저장할 것인지 설정해주는 것
  key: "root",
  // storage : 위에 import 한 성격의 storage를 지정해준다.
  storage,
  // whitelist : localstorage에 저장할 Reducer 데이터.
  whitelist: ["Auth"]
  // blacklist : 그것만 제외.
};

const rootReducer = combineReducers({
  Auth,
});

export default persistReducer(persistConfig, rootReducer);

