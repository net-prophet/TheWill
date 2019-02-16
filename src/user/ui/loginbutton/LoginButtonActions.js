import { uport } from './../../../util/connectors.js'
import Web3 from 'web3';

export const HANDLE_LOGIN_TYPE = "HANDLE_LOGIN_TYPE";
export function handleLoginType(type) {
  return {
    type: HANDLE_LOGIN_TYPE,
    payload: type
  };
}

export function loginFortmaticUser() {
  return function(){
    window.web3 = new Web3(window.fm.getProvider());
    window.web3Provider = 'fortmatic';
    window.fm.user.login().then(() => {
      window.web3.eth.getAccounts();
    });
  }
}

export function loginUportUser() {
  return function(){
    window.web3 = uport.getWeb3();
    window.web3Provider = 'uport';
    uport.requestCredentials()
  }
}
