import React, { Component } from "react";
import { connect } from "react-redux";
import CreateOrganization from "./CreateOrganization";
import { withRouter } from "react-router";
import { getContract } from "../../../util/contracts.js";
import {} from "./CreateOrganizationActions";
// import { withRouter } from "react-router-dom";

class CreateOrganizationContainer extends Component {
  state = {
    text: "",
    description: ""
  };

  handleTitleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  handleSubmit = async e => {
    const { text, description } = this.state;
    const { router } = this.props;
    e.preventDefault();

    const contract = await getContract("VotingOrganizationFactory").deployed();

    try {
      const response = await contract.newVotingOrganization(text, description, {
        from: window.web3.eth.accounts[0]
      });

      if (response) {
        router.push("/organization/list");
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
