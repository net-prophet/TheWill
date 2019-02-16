import React, { Component } from "react";
import { connect } from "react-redux";
import ListOrganizations from "./ListOrganizations";
import { getContract, getContractAt } from "../../../util/contracts.js";
// import {} from "./CreateOrganizationActions";
// import { withRouter } from "react-router-dom";

class ListOrganizationsContainer extends Component {
  state = {
    organiCount: 0,
    organizations: []
  };

  //   handleTitleChange = e => {
  //     this.setState({ text: e.target.value });
  //   };

  //   handleDescriptionChange = e => {
  //     this.setState({ description: e.target.value });
  //   };

  async componentWillMount() {
    const contract = await getContract("VotingOrganizationFactory").deployed();

    try {
      const count = (await contract.getContractCount()).toNumber();

      if (count) {
        const promises = [];

        for (let i = 0; i < count; i++) {
          promises[i] = contract.getContractAddressByIndex(i);
        }

        const addresses = await Promise.all(promises);

        if (addresses) {
          let organizations = addresses.map(address => {
            return getContractAt("VotingOrganization", address);
          });
          console.log(organizations);
          this.setState({ organizations });
        }
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
