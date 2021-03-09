import React, { useState, useEffect, useContext } from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import { LayoutClient, OrganizeTicket, Steps } from "../components/Index";
import clsx from "clsx";
import { AppContext } from "../context/AppContext";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import { ConfirmTicketModal } from '../components/Index'

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
  paperModal: {
    position: "absolute",
    top: "10vh",
    left: "35vw",
    width: 700,
    height: 700,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const DashboardClient = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const history = useHistory();

  const { user, setUser, userProfile, setUserProfile } = useContext(AppContext);

  console.log('CLIENT USER:', user);

  const [ticketsData, setTicketsData] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState([]);

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
  

  const handleOpen = (ticket) => {
    setOpen(true);
    setSelectedTicket(ticket);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const modalBody = (
    <div className={classes.paperModal}>
      <h1 id="simple-modal-title">Set Ticket Date</h1>
      <OrganizeTicket selectedTicket={selectedTicket} handleClose={handleClose}/>
    </div>
  );

  return (
    <LayoutClient pageTitle="Dashboard">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
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
                  <TableCell>Confirm</TableCell>
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
                    <TableCell>
                      <Button
                        onClick={() => {ticket?.is_client_confirm ? alert('Already Confirmed!') : handleOpen(ticket)}}
                        variant="outlined"
                        color={ticket?.is_client_confirm ? "primary" : "secondary"}
                        disabled={ticket?.terms_approved ? false : true}
                        value="Confirm"
                      >
                        {ticket?.terms_approved ? 'Set Ticket Date' : 'Approve Terms'}
                      </Button>
                    </TableCell>
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
