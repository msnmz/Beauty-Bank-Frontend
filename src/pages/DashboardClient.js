import React, { useState, useEffect, useContext } from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import { LayoutClient, SetTicketDate, Stepper } from "../components/Index";
import clsx from "clsx";
import { AppContext } from "../context/AppContext";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";

import { FormatDate, FormatDateTime } from "../helper/FormatDate";
import { SetTicketFeedback } from "../components/SetTicketFeedback";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: "flex",
    overflow: "none",
    flexDirection: "column",
    marginBottom: theme.spacing(10),
  },
  fixedHeight: {
    height: 240,
  },
  paperModal: {
    position: "absolute",
    top: "3vh",
    left: "35vw",
    width: 700,
    height: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    width: 150,
  },
}));

const DashboardClient = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const history = useHistory();

  const { user } = useContext(AppContext);

  const [ticketsData, setTicketsData] = useState([]);

  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);
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

    setTicketsData(data.results);
    console.log("DATA: ", data.results);
  }, [open, openDate]);

  const handleOpenDate = (ticket) => {
    setOpenDate(true);
    setSelectedTicket(ticket);
  };
  const handleOpen = (ticket) => {
    setOpen(true);
    setSelectedTicket(ticket);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDate(false);
  };

  const modalBody = (
    <div className={classes.paperModal}>
      <h1 id="simple-modal-title">Set Ticket Date</h1>
      <SetTicketDate
        selectedTicket={selectedTicket}
        handleClose={handleClose}
      />
    </div>
  );
  const modalBodyFeedback = (
    <div className={classes.paperModal}>
      <h1 id="simple-modal-title">Set Ticket Feedback </h1>
      <SetTicketFeedback
        selectedTicket={selectedTicket}
        handleClose={handleClose}
      />
    </div>
  );

  return (
    <LayoutClient pageTitle="Dashboard">
      <Modal
        open={openDate}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBodyFeedback}
      </Modal>
      <Grid container spacing={3}>
        {/* Stepper */}
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <Stepper activeStep={ticketsData[0]?.ticket_status} />
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
                  <TableCell>Create Date</TableCell>
                  <TableCell>Appointment Date</TableCell>
                  <TableCell>Pro Confirm</TableCell>
                  <TableCell>Approve&Set Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ticketsData?.slice(0).map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>{ticket.id}</TableCell>
                    <TableCell>{FormatDate(ticket.created_at)}</TableCell>
                    <TableCell>
                      {ticket?.appointment_date
                        ? FormatDateTime(ticket?.appointment_date)
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {ticket?.appointment_date
                        ? "Waiting"
                        : ticket.is_pro_confirm
                        ? "Confirmed"
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          ticket?.appointment_date
                            ? alert("You already set the date!")
                            : handleOpenDate(ticket);
                        }}
                        variant="outlined"
                        color={
                          ticket?.appointment_date ? "primary" : "secondary"
                        }
                        disabled={ticket?.terms_approved ? false : true}
                        value="Confirm"
                        className={classes.button}
                      >
                        {ticket?.appointment_date
                          ? "Date Setted"
                          : ticket?.terms_approved
                          ? "Set Ticket Date"
                          : "Approve Terms"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {ticket?.ticket_status == "4" && (
                        <Button
                          onClick={() => {
                            handleOpen(ticket);
                          }}
                          variant="outlined"
                          color={"primary"}
                          disabled={ticket?.ticket_status == "4" ? false : true}
                          value="Feedback"
                          className={classes.button}
                        >
                          Feedback
                        </Button>
                      )}
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
