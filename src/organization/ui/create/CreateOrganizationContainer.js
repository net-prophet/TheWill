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
    address: ""
  };

  handleTitleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  handleWeightedChange = e => {
      this.setState({ weighted: e.target.checked });
  };

  handleAddressChange = e => {
      this.setState({ address: e.target.value });
  };


  handleSubmit = async e => {
    const { text, description, weighted, address } = this.state;
    const { router } = this.props;
    const symbol = "VOTE";
    const name = "VoteCoin";
    const decimals = 0;
    const tradable = false;
    const maxBalance = 1;
    e.preventDefault();

    const organizationFactoryContract = await getContract("VotingOrganizationFactory").deployed();
    const voteCoinFactoryContract = await getContract("VoteCoinFactory").deployed();

    try {
      const orgAddress = await organizationFactoryContract.newVotingOrganization.call(text, description, {
        from: window.web3.eth.accounts[0]
      });
      //const organization = getContractAt("VotingOrganization", orgAddress);

      if (orgAddress) {
        console.log("Org Address", orgAddress)
        let targetAddress = address;
        if(weighted) {
           try {
             targetAddress = await voteCoinFactoryContract.newVoteCoin.call(symbol, name, decimals, tradable, maxBalance, {
              from: window.web3.eth.accounts[0]
             });
             console.log("Deployed new Coin Address", targetAddress)
             //const coin = getContractAt("VoteCoin", targetAddress);

             //await voteCoinContract.set
           } catch (err) {
             alert(err);
           }
        }

        //await organization.setTargetCoin(targetAddress);


        router.push("/organization/list/"+orgAddress);
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
