import React, { Component } from "react";
import { connect } from "react-redux";
import ListProposals from "./ListProposals";
import { getContract, getContractAt } from "../../../util/contracts.js";

class ListProposalsContainer extends Component {
  state = {
    organiCount: 0,
    addresses: []
  };

  async componentWillMount() {
    const contract = await getContract("VotingOrganization").deployed();

    try {
      const count = (await contract.getProposalCount(console.log)).toNumber();
      console.log(count)
      if (count) {
        const addiPromises = [];

        for (let i = 0; i < count; i++) {
          addiPromises[i] = contract.getContractAddressByIndex(i);
        }

        const addresses = await Promise.all(addiPromises);

        this.setState({ addresses });
      }
    } catch (err) {
      alert(err);
    }
  }

  render() {
    return <ListProposals {...this.state} />;
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

const ListProposalsCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProposalsContainer);

export default ListProposalsCont;
