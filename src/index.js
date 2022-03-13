import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Main from './Pages/Main/Main'
import reportWebVitals from './reportWebVitals';
import RoutesDef from "./routes/Routes"
import { ToastProvider } from 'react-toast-notifications';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './State/reducers/rootReducer';

const store = createStore(
  rootReducer,
); 
ReactDOM.render(
    <Router>
      <ToastProvider>
        <Provider store={store}>
          <RoutesDef />
        </Provider>
      </ToastProvider>
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
