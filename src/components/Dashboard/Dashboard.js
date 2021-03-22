import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import {useSnackbar} from 'notistack'

import { Grid, Paper, makeStyles, 
  Table, TableBody,TableCell, TableHead, 
  TableRow, Typography, Button, Modal, CircularProgress } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import { AppContext } from "../context/AppContext";
import { SetTicketFeedback } from "../components/SetTicketFeedback";
import { FormatDate, FormatDateTime } from "../helper/FormatDate";

import {SetTicketDate, Stepper } from "../components/Index";
import {LayoutClient} from '../views'
import api from '../../api'

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     padding: theme.spacing(2),
//     // marginTop: theme.spacing(2), Client
//     display: "flex",
//     // overflow: "none", Client
//     flexDirection: "column",
//     marginBottom: theme.spacing(10),
//   },
//   fixedHeight: {
//     height: 240,
//   },
//   paperModal: {
//     position: "absolute",
//     top: "3vh",
//     left: "35vw",
//     width: 700,
//     height: 800,
//     backgroundColor: theme.palette.background.paper,
//     border: "2px solid #000",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
//   button: {
//     width: 150,
//   },
// }));

const DashboardClient = () => {
  const {enqueueSnackbar} = useSnackbar()
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { user } = useContext(AppContext);

  const [ticketsData, setTicketsData] = useState([]);

  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(null);

  useEffect(() => {
    api.get('ticket/ticket-list/').then(({data}) => {
      setTicketsData(data.results)
    }).catch(err => enqueueSnackbar(err.message, {variant: 'error'}))
  }, []);

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
            <Stepper activeStep={Number(ticketsData[0]?.ticket_status)} />
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
                {ticketsData?.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>{ticket.id}</TableCell>
                    <TableCell>{FormatDate(ticket.created_at)}</TableCell>
                    <TableCell>{ticket?.appointment_date ? FormatDateTime(ticket?.appointment_date) : '-'}</TableCell>
                    <TableCell>{ticket?.appointment_date ? 'Waiting' : ticket.is_pro_confirm ? 'Confirmed' : '-'}</TableCell>
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
