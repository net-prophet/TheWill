// import { Connect } from 'uport-connect'
//
// export let uport = new Connect('TruffleBox')
import Web3 from 'web3';

if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
        window.ethereum.enable();
    } catch(e) { console.log('Error getting Metamask', e) }
}