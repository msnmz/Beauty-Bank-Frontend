import React, { useState, useEffect, useContext } from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import { LayoutClient, Steps } from "../components/Index";
import clsx from "clsx";
import { AppContext } from "../context/AppContext";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    marginBottom: theme.spacing(10),
  },
  fixedHeight: {
    height: 240,
  },
}));

const DashboardClient = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { user, setUser, userProfile, setUserProfile } = useContext(AppContext);

  const [ticketsData, setTicketsData] = useState([]);

  useEffect(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    };

    const response = await fetch(
      `https://bbank-backend-app.herokuapp.com/ticket/ticket-list/`,
      requestOptions
    );
    const data = await response.json();

    const filteredData = data.filter((item) => {
      if (item.owner.username == user.username) return item;
    });
    setTicketsData(filteredData);
  }, []);

  return (
    <LayoutClient pageTitle="Dashboard">
      <Grid container spacing={3}>
        {/* Stepper */}
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <Steps />
          </Paper>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
            >
              My Tickets
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Ticket ID</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Create Date</TableCell>
                  <TableCell>Service Type</TableCell>
                  <TableCell>Phone Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ticketsData?.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>{ticket.id}</TableCell>
                    <TableCell>{ticket.owner.username}</TableCell>
                    <TableCell>{ticket.created_at}</TableCell>
                    <TableCell>{ticket.service_type}</TableCell>
                    <TableCell>{ticket.phone_number}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </LayoutClient>
  );
};

export { DashboardClient };
