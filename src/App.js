import React, { Component } from "react";
import { Link } from "react-router";

// UI Components
import LoginButtonContainer from "./user/ui/loginbutton/LoginButtonContainer";

// Styles
import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";

class Address extends Component {
  componentWillMount() {
    setInterval(() => this.forceRedraw(), 1000);
  }


  forceRedraw() {
    if(window.web3Provider === 'metamask')
      this.setState({_random: Math.random()})
    else if(window.web3Provider === 'fortmatic')
      this.setState({_account: window.web3.currentProvider.account})
    else if(window.web3Provider === 'uport')
      this.setState({_account: window.web3.currentProvider.account})
  }

  render() {
    return <span>{window.web3.eth.accounts[0] || "Please log in..."}</span>
  }
}

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
  }

  loadAccounts() {
    if (window.web3.eth.accounts[0] !== this.state.account)
      this.setState({
        hasWeb3: true,
        account: window.web3.eth.accounts[0]
      });
  }

  forceRedraw() {
    this.setState({_random: Math.random()})
  }

  render() {

    if (!this.state.hasWeb3)
      return (
        <div>
          <h3 style={{ color: "red" }}>Not connected...</h3>
        </div>
      );

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
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
            <LoginButtonContainer />
            <li
              className="pure-menu-item"
              style={{ fontSize: "85%", color: "white" }}
            >
              Your Address:{" "}
              <Address />
            </li>
          </ul>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App;
