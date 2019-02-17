import React, { Component } from "react";
import { connect } from "react-redux";
import CreateProposal from "./CreateProposal";
import { withRouter } from "react-router";
import { getContract } from "../../../util/contracts.js";
import {} from "./CreateOrganizationActions";
// import { withRouter } from "react-router-dom";

class CreateProposalContainer extends Component {
  state = {
    text: "",
    description: "",
    duration: 14
  };

  handleTitleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  handleDurationChange = e => {
    this.setState({ duration: e.target.value });
  };

  handleSubmit = async e => {
    const { text, description, duration } = this.state;
    const { router } = this.props;
    e.preventDefault();
    const per_day = 40000 / 7
    window.web3.eth.getBlockNumber((err, currentBlock) => {
        const endBlock = duration * per_day + currentBlock;
        console.log('Duration:', duration, 'Current', currentBlock, 'EndBlock', endBlock)
        try {
          const response = this.props.contract.createProposal(text, description, endBlock,
            {
            from: window.web3.eth.accounts[0]
            },
            (err, response) => {
              
                if (response) {
                    // router.push("/proposals/list");
                }
          });
    
        } catch (err) {
          alert(err);
        }
    })
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
      console.log('render create prop container')
    return (
      <CreateProposal
        {...this.props}
        {...this.state}
        onTitleChange={this.handleTitleChange}
        onDescriptionChange={this.handleDescriptionChange}
        onDurationChange={this.handleDurationChange}
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

const CreateProposalCont = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateProposalContainer)
);

export default CreateProposalCont;
