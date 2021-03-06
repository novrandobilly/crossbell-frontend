import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import './fonts/Lato/Lato-Regular.ttf';
import './fonts/Lato/Lato-Bold.ttf';
import { LoginContextProvider } from './store/LoginContext';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import jobReducers from './store/reducers/job-reducers';
import companyReducers from './store/reducers/company-reducers';
import applicantReducers from './store/reducers/applicant-reducers';
import authReducers from './store/reducers/auth-reducers';
import feedbackReducers from './store/reducers/feedback-reducers';
import financeReducers from './store/reducers/finance-reducer';
import adminReducers from './store/reducers/admin-reducers';
import notificationReducers from './store/reducers/notification-reducers';

const rootReducers = combineReducers({
  job: jobReducers,
  company: companyReducers,
  applicant: applicantReducers,
  auth: authReducers,
  feedback: feedbackReducers,
  finance: financeReducers,
  admin: adminReducers,
  notification: notificationReducers,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <LoginContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </LoginContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
