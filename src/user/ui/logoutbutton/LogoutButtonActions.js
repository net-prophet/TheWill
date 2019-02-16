import { browserHistory } from "react-router";
import Web3 from 'web3';

export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
function userLoggedOut(user) {
  return {
    type: USER_LOGGED_OUT,
    payload: user
  };
}

export function logoutUser() {
  return function(dispatch) {
    window.fm.user.logout()
    window.web3 = new Web3(window.ethereum);
    window.web3Provider = 'metamask';
  };
}
