import React, {useState, useEffect, useContext} from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../context/AppContext";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Steps } from "../components/Index";
import { LayoutProfessional } from "../components/Index";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {FormatDate, FormatDateTime} from '../helper/FormatDate'


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

const DashboardProfessional = () => {
  const classes = useStyles();
  const { user } = useContext(AppContext);
  const [ticketsData, setTicketsData] = useState();

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

    if(response?.status==200){
        setTicketsData(data.results);
    }

  }, [user]);

  return (
    <LayoutProfessional pageTitle="Dashboard">
      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
            >
               Tickets Assigned to Me
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Ticket ID</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Create Date</TableCell>
                  <TableCell>Appointment Date</TableCell>
                  <TableCell>Phone Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ticketsData?.slice(0)?.reverse()?.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>{ticket.id}</TableCell>
                    <TableCell>{`${ticket.owner.first_name} ${ticket.owner.last_name}`}</TableCell>
                    <TableCell>{FormatDate(ticket.created_at)}</TableCell>
                    <TableCell>{ticket?.appointment_date ? FormatDateTime(ticket?.appointment_date) : '-'}</TableCell>
                    <TableCell>{ticket.phone_number}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </LayoutProfessional>
  );
};

export { DashboardProfessional };
