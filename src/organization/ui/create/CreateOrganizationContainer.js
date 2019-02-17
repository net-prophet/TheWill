import React, {Component} from "react";
import {connect} from "react-redux";
import CreateOrganization from "./CreateOrganization";
import {withRouter} from "react-router";
import {getContract, getContractAt} from "../../../util/contracts.js";

// import { withRouter } from "react-router-dom";

class CreateOrganizationContainer extends Component {
  state = {
    text: "",
    description: "",
    weighted: false,
    address: "",
    switch_label: "1 Person 1 Vote"
  };

  handleTitleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  handleWeightedChange = e => {
      this.setState({ weighted: e.target.checked });
      if (e.target.checked)
        this.setState({switch_label: "Votes are Stake Weighted"})
      else
        this.setState({switch_label: "1 Person 1 Vote"})
  };

  handleAddressChange = e => {
      this.setState({ address: e.target.value });
  };


  handleSubmit = async e => {
    const { text, description, weighted, address, switch_label } = this.state;
    const { router } = this.props;
    const symbol = "VOTE";
    const name = "VoteCoin";
    const decimals = 0;
    const tradable = false;
    const maxBalance = 1;
    e.preventDefault();

    const organizationFactoryContract = await getContract("VotingOrganizationFactory").deployed();
    const voteCoinFactoryContract = await getContract("VoteCoinFactory").deployed();
    let from = {from: window.web3.eth.accounts[0]}

    try {
      const createOrg = await organizationFactoryContract.newVotingOrganization(text, description, from);

      const orgAddress = createOrg.logs[0].args.at;
      const organization = getContractAt("VotingOrganization", orgAddress);

      if (orgAddress) {
        console.log("Org Address", orgAddress)
        let targetAddress = address;

        if(!weighted) {
           try {
             const createCoin = await voteCoinFactoryContract.newVoteCoin(symbol, name, decimals, tradable, maxBalance, from);
             targetAddress = createCoin.logs[0].args.at;
           } catch (err) {
             alert(err);
           }

           console.log("Deployed new Coin Address", targetAddress)
           const coin = getContractAt("VoteCoin", targetAddress);
           //coin.setTargetVotingOrganization(orgAddress, from, async (err, ok) => { console.log('Set voting org OK!') });
        } else {
          console.log('Using stake-weighted coin at', targetAddress)
        }
        await organization.setTargetCoin(targetAddress, from, (err, ok) => {
          console.log('Set target coin OK!');
          setTimeout(() => router.push("/organization/"+orgAddress), 1000);
        })
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
    return (
      <CreateOrganization
        {...this.props}
        {...this.state}
        onTitleChange={this.handleTitleChange}
        onDescriptionChange={this.handleDescriptionChange}
        onWeightedChange={this.handleWeightedChange}
        onAddressChange={this.handleAddressChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}
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

const CreateOrganizationCont = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateOrganizationContainer)
);

export default CreateOrganizationCont;
