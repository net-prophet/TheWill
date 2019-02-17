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
      this.contract.getOrgDetails((err, result) =>
        this.setState({
          title: result[0],
          description: result[1],
          loading: false,
          loaded: true
        })
      );
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
          <HidingDropdown label="+ Create a proposal">
            <CreateProposalCont contract={this.contract} />
          </HidingDropdown>
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
