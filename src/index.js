import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import jobReducers from './store/reducers/job-reducers';
import companyReducers from './store/reducers/company-reducers';
import applicantReducers from './store/reducers/applicant-reducers';
import authhReducers from './store/reducers/auth-reducers';
import feedbackReducers from './store/reducers/feedback-reducers';
import financeReducers from './store/reducers/finance-reducer';
import adminReducers from './store/reducers/admin-reducers';
import './fonts/NexaRegular.otf';

const rootReducers = combineReducers({
  job: jobReducers,
  company: companyReducers,
  applicant: applicantReducers,
  auth: authhReducers,
  feed: feedbackReducers,
  finance: financeReducers,
  admin: adminReducers,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
