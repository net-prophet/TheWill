import React, { Component } from "react";
import { connect } from "react-redux";
import ListOrganizations from "./ListOrganizations";
import { getContract } from "../../../util/contracts.js";

class ListOrganizationsContainer extends Component {
  state = {
    organiCount: 0,
    addresses: []
  };

  async componentWillMount() {
    const contract = await getContract("VotingOrganizationFactory").deployed();

    try {
      const count = (await contract.getContractCount()).toNumber();

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
    return <ListOrganizations {...this.state} />;
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

const ListOrganizationsCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOrganizationsContainer);

export default ListOrganizationsCont;
