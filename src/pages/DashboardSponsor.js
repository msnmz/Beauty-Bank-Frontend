import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { TicketTable } from "../components/Index";
import { LayoutSponsor } from "../views";


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "none",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const DashboardSponsor = () => {
  const classes = useStyles();

  return (
    <LayoutSponsor pageTitle="Dashboard">
      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TicketTable />
          </Paper>
        </Grid>
      </Grid>
    </LayoutSponsor>
  );
};

export { DashboardSponsor };
