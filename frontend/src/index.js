import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/* Modal */
import ReactModal from 'react-modal';
/* Redux , Redux Persist */
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from './Redux/Reducer/index';

import App from './App';
import reportWebVitals from './reportWebVitals';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

ReactModal.setAppElement('#root');

/* Redux Persist */
const store = createStore(rootReducer);
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
