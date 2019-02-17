import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { getContractAt } from "../../../util/contracts";
import { withRouter, Link } from "react-router";
import CreateProposalCont from "../create/CreateProposalContainer";
import ListProposalsCont from "../list/ListProposalsContainer";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  card: {
    width: "60%",
    margin: 10
  },
  gridFormContainer: {
    boxSizing: "border-box",
    width: "100%",
    padding: "55px 20px"
  }
});

class HidingDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  render() {
    if (!this.state.show)
      return (
        <Button onClick={() => this.setState({ show: true })}>
          {this.props.label || "Click To Show"}
        </Button>
      );
    else return this.props.children;
  }
}

class AddBoardMemberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ""
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.contract.addBoardMember(
      this.state.address.trim(),
      { from: window.web3.eth.accounts[0] },
      (err, result) => {
        window.location.reload();
      }
    );
    return false;
  }

  render() {
    return (
      <div>
        <h2>Add A Board Member</h2>
        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="center"
        >
          <TextField
            id="standard-name"
            label="Address"
            type="text"
            value={this.state.address}
            onChange={e => this.setState({ address: e.target.value })}
            margin="normal"
            variant="outlined"
          />
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={e => this.onSubmit(e)}
            >
              Add Board Member
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

class Delegates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ""
    };
  }

  componentWillMount() {
    console.log("Geting current delegate");
    this.props.contract.getDelegate(
      window.web3.eth.accounts[0],
      (err, delegate) => {
        console.log("Got delegate", delegate);
        this.setState({ currentDelegate: delegate });
      }
    );
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.contract.setDelegate(
      this.state.address.trim(),
      { from: window.web3.eth.accounts[0] },
      (err, result) => {
        window.location.reload();
      }
    );
    return false;
  }

  render() {
    return (
      <div>
        <h2>My Delegate: </h2>
        {this.state.currentDelegate || "Not set"}
        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="center"
        >
          <TextField
            id="standard-name"
            label="Address of someone who will vote in my absence"
            type="text"
            value={this.state.address}
            onChange={e => this.setState({ address: e.target.value })}
            margin="normal"
            variant="outlined"
          />
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={e => this.onSubmit(e)}
            >
              Set my delegate
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

class OrganizationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      loading: false
    };
  }
  componentWillMount() {
    if (this.props.params.address) {
      this.contract = getContractAt(
        "VotingOrganization",
        this.props.params.address
      );
      this.contract.getOrgDetails((err, result) => {
        this.setState({
          title: result[0],
          description: result[1],
          loading: false,
          loaded: true
        });
        this.contract.isBoardMember(
          window.web3.eth.accounts[0],
          (err, result) =>
            this.setState({
              imOnTheBoard: true
            })
        );
      });
    }
  }
  render() {
    const { classes, params } = this.props;
    if (this.state.loading) return <div>Loading...</div>;
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.gridFormContainer}
      >
        <Card className={classes.card} raised>
          <CardContent>
            <h2>
              <img
                alt="Contract blockie"
                src={
                  "https://blockies.shipchain.io/" +
                  params.address +
                  ".png?size=small"
                }
              />{" "}
              &nbsp;
              <Link to={`/organization/list/${params.address}`}>
                {this.state.title}
              </Link>
            </h2>
            {this.state.description}
          </CardContent>
          <HidingDropdown label="+ My Delegate ">
            <Delegates contract={this.contract} />
          </HidingDropdown>
          <HidingDropdown label="+ Create a proposal">
            <CreateProposalCont contract={this.contract} />
          </HidingDropdown>
          {this.state.imOnTheBoard ? (
            <HidingDropdown label="+ Add A Board Member">
              <AddBoardMemberForm contract={this.contract} />
            </HidingDropdown>
          ) : null}
          <CardActions />
        </Card>

        <ListProposalsCont
          contract={this.contract}
          organizationAddress={params.address}
        />
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(OrganizationDetail));
