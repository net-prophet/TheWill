import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { getContractAt } from "../../../util/contracts";
import { withRouter } from "react-router";

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

class OrganizationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      loading: false
    };
  }

  //   componentWillMount() {
  //     if (this.props.address) {
  //       console.log("MAKING NEW ORG CARD", this.props);
  //       this.contract = getContractAt("VotingOrganization", this.props.address);
  //       this.contract.getOrgDetails((err, result) =>
  //         this.setState({
  //           title: result[0],
  //           description: result[1],
  //           loading: false,
  //           loaded: true
  //         })
  //       );
  //     }
  //   }
  render() {
    console.log(this.props);
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
          <CardContent>Address: {params.detail}</CardContent>
          <CardActions />
        </Card>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(OrganizationDetail));
