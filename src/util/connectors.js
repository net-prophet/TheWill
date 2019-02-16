import { Connect } from "uport-connect";
import Fortmatic from "fortmatic";
import Portis from "@portis/web3";

export let uport = new Connect("TruffleBox");
import Web3 from "web3";
window.fm = new Fortmatic("pk_live_5BD0579D88BAEDAE");
window.portis = new Portis("910b5643-01dd-4e00-a4b6-26ac0c81c692", "mainnet");

if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  try {
    window.ethereum.enable();
    window.web3Provider = "metamask";
  } catch (e) {
    console.log("Error getting Metamask", e);
  }
}
