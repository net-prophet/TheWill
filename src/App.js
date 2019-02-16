import React, { Component } from "react";
import { Link } from "react-router";
import { HiddenOnlyAuth, VisibleOnlyAuth } from "./util/wrappers.js";


// UI Components
import LogoutButtonContainer from "./user/ui/logoutbutton/LogoutButtonContainer";

// Styles
import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";

class App extends Component {
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

    if (!this.state.hasWeb3)
      return (
        <div>
          <h3 style={{ color: "red" }}>Not connected...</h3>
        </div>
      );

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal" style={{height: 54}}>
          <div style={{
            display: 'inline-block',
            color: 'white',
            fontFamily: "Great Vibes",
            fontSize: '1.5em',
            textAlign: 'center',
            padding: '0.2em',
            lineHeight: '85%',
            fontWeight: '500'
            }}>
            The Will<br />Of The People
          </div>
          <ul className="pure-menu-list navbar-right">
            <li
              className="pure-menu-item"
              style={{ fontSize: "85%", color: "white" }}
            >
              Your Address:{" "}
              {window.web3.eth.accounts[0] || "Please log in to metamask"}
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
