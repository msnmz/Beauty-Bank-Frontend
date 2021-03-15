import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { TicketTable } from "../components/Index";
import { Steps } from "../components/Index";
import { AppContext } from "../context/AppContext";
import { LayoutConnector } from "../components/LayoutConnector";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(10),
  },
  fixedHeight: {
    height: 240,
  },
}));

const ConnectorUserList = () => {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { user, setUser, userProfile, setUserProfile } = useContext(AppContext);
  const [ userList, setUserList] = useState([]);

  useEffect(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    };

    const response = await fetch(
      `https://bbank-backend-app.herokuapp.com/auth/user-list/`,
      requestOptions
    );
    const data = await response.json();

    setUserList(data);

  }, []);

  return (
    <LayoutConnector pageTitle="User List">
          <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <Typography component="h2" variant="h6" color="secondary" gutterBottom>
                User List
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Zip Code</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userList?.map((user) => (
                        <TableRow key={user?.id}>
                            <TableCell>{user?.id}</TableCell>
                            <TableCell>{user?.username}</TableCell>
                            <TableCell>{user?.first_name}</TableCell>
                            <TableCell>{user?.last_name}</TableCell>
                            <TableCell>{user?.email}</TableCell>
                            <TableCell>{user?.phone_number}</TableCell>
                            <TableCell>{user?.gender==0 ? 'Male' : user?.gender==1 ? 'Female' : '-' }</TableCell>
                            <TableCell>{user?.zip_address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
              </Paper>
            </Grid>
          </Grid>
    </LayoutConnector>
  );
};

export { ConnectorUserList };
