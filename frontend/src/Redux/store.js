import { createStore } from 'redux';
import reducers from './Reducer/index';

const store = createStore(reducers);

export default store;
