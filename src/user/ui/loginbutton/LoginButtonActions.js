// import { uport } from './../../../util/connectors.js'
import { browserHistory } from "react-router";

export const HANDLE_LOGIN_TYPE = "HANDLE_LOGIN_TYPE";
export function handleLoginType(type) {
  return {
    type: HANDLE_LOGIN_TYPE,
    payload: type
  };
}

export function loginUser() {
  return function(dispatch) {
    // UPort and its web3 instance are defined in ./../../../util/wrappers.
    // Request uPort persona of account passed via QR
    // uport.requestCredentials().then((credentials) => {
    //   dispatch(userLoggedIn(credentials))
    //   // Used a manual redirect here as opposed to a wrapper.
    //   // This way, once logged in a user can still access the home page.
    //   var currentLocation = browserHistory.getCurrentLocation()
    //   if ('redirect' in currentLocation.query)
    //   {
    //     return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    //   }
    //   return browserHistory.push('/dashboard')
    // })
  };
}
