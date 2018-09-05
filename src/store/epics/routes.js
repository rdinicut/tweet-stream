import 'rxjs';
import {combineEpics} from 'redux-observable';
import {createMatchSelector, LOCATION_CHANGE} from "react-router-redux";

export const createRouteEpic = () => {
  return combineEpics(logout);
};

const logout = (action$, store) => {
  return action$.ofType(LOCATION_CHANGE).filter(() => {
    let state = store.getState();
    return createMatchSelector({
      path: `/logout`,
      exact: true
    })(state);
  }).map(() => {
    return {type:"some action"};
  });
};
