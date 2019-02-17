import React, { Component } from "react";
import { connect } from "react-redux";
import ListProposals from "./ListProposals";
import {  getContractAt } from "../../../util/contracts.js";

class ListProposalsContainer extends Component {
  state = {
    organiCount: 0,
    proposals: []
  };

  async componentWillMount() {
    const contract = getContractAt("VotingOrganization", this.props.organizationAddress);

    try {
      contract.getProposalCount(async (err, count) => {
        if (count.toNumber() > 0) {
          const addiPromises = [];
          for (let i = 0; i < count; i++) {
            addiPromises[i] = contract.fetchProposal(i, (err, proposal) => {
              let newState = Object.assign({}, this.state);
              newState.proposals[i] = proposal
              this.setState(newState);
            });
          }
  
          await Promise.all(addiPromises);
  
        }
       })
    } catch (err) {
      alert(err);
    }
  }

  render() {
    return <ListProposals {...this.state} contract={this.props.contract} />;
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
