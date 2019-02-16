import React, { Component } from "react";
import { Link } from "react-router";
import { HiddenOnlyAuth, VisibleOnlyAuth } from "./util/wrappers.js";

// UI Components
<<<<<<< HEAD
import LogoutButtonContainer from "./user/ui/logoutbutton/LogoutButtonContainer";
=======
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'
>>>>>>> 2f4b54d95bbd0b23952e9232513531ca08e2e895

// Styles
import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";

class App extends Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);
    this.state = {
      hasWeb3: false,
      account: null
    };
  }

  componentWillMount() {
    this.loadAccounts();
    setTimeout(() => this.loadAccounts(), 500);
    setInterval(() => this.loadAccounts(), 1000);
  }

  loadAccounts() {
    if (window.web3.eth.accounts[0] !== this.state.account)
      this.setState({
        hasWeb3: true,
        account: window.web3.eth.accounts[0]
      });
  }

  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() => (
=======

  constructor(props) {
    super(props)
    this.state = {
      hasWeb3 : false,
      account : null
    }

  }

  componentWillMount() {
    this.loadAccounts()
    setTimeout(() => this.loadAccounts(), 500)
    setInterval(() => this.loadAccounts(), 1000)
  }

  loadAccounts() {
    if(window.web3.eth.accounts[0] !== this.state.account)
      this.setState({
        hasWeb3: true,
        account: window.web3.eth.accounts[0]
      })
  }


  render() {

    const OnlyAuthLinks = VisibleOnlyAuth(() =>
>>>>>>> 2f4b54d95bbd0b23952e9232513531ca08e2e895
      <span>
        <li className="pure-menu-item">
          <Link to="/dashboard" className="pure-menu-link">
            Dashboard
          </Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/profile" className="pure-menu-link">
            Profile
          </Link>
        </li>
        <LogoutButtonContainer />
      </span>
    ));

<<<<<<< HEAD
    if (!this.state.hasWeb3)
      return (
        <div>
          <h3 style={{ color: "red" }}>Not connected...</h3>
        </div>
      );
=======
    if(!this.state.hasWeb3)
      return <div><h3 style={{color: 'red'}}>Not connected...</h3></div>

>>>>>>> 2f4b54d95bbd0b23952e9232513531ca08e2e895

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <Link to="/" className="pure-menu-heading pure-menu-link">
            Truffle Box
          </Link>
          <ul className="pure-menu-list navbar-right">
<<<<<<< HEAD
            <li
              className="pure-menu-item"
              style={{ fontSize: "85%", color: "white" }}
            >
              Your Address:{" "}
              {window.web3.eth.accounts[0] || "Please log in to metamask"}
=======
            <li className="pure-menu-item" style={{fontSize: "85%", color: "white"}}>
              Your Address: {window.web3.eth.accounts[0] || "Please log in to metamask"}
>>>>>>> 2f4b54d95bbd0b23952e9232513531ca08e2e895
            </li>
            <OnlyAuthLinks />
          </ul>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App;
