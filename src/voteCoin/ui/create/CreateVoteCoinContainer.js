import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getContract } from "../../../util/contracts.js";
import CreateVoteCoin from "../../../voteCoin/ui/create/CreateVoteCoin";
import {getContractAt} from "../../../util/contracts";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    // handleLoginType: event => {
    //   dispatch(handleLoginType(event.target.value));
    // }
  };
};

class CreateVoteCoinContainer extends Component {
    state = {
        weighted: false,
        address: ""
    };

    handleWeightedChange = e => {
        this.setState({ weighted: e.target.checked });
    };

    handleAddressChange = e => {
        this.setState({ address: e.target.value });
    };

    handleSubmit = async e => {
    const { weighted, address} = this.state;
    const { router } = this.props;
    e.preventDefault();
    const symbol = "VOTE";
    const name = "VoteCoin";
    const decimals = 0;
    const tradable = false;
    const maxBalance = 1;

    const contract = await getContract("VoteCoinFactory").deployed();
    const organizationContract = getContractAt("VotingOrganization", address);

    try {
      const response = await contract.newVoteCoin(symbol, name, decimals, tradable, maxBalance);

      if (response) {
        console.log(response);
      }
    } catch (err) {
      alert(err);
    }
    // .then(instance => {
    //   return instance.newVotingOrganization(text, description, {
    //     from: window.web3.eth.accounts[0]
    //   });
    // })
    // .then(() => {

    // }).catch(() => {
    //   e.preventDefault();
    //   alert('There was a problem')
    // });
  };

  render() {
    console.log({...this.state.props})

    return (
      <CreateVoteCoin
        {...this.props}
        {...this.state}
        onAddressChange={this.handleAddressChange}
        onWeightedChange={this.handleWeightedChange}
        onSubmit={this.handleSubmit}
      />
    );
  }

}

const CreateVoteCoinCont = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateVoteCoinContainer)
);

export default CreateVoteCoinCont;
