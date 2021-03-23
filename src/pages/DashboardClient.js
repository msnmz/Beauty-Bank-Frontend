import React, {useState, useEffect} from 'react'
import {useSnackbar} from 'notistack'

import {makeStyles, Button} from '@material-ui/core'

import {Dashboard} from '../components/Dashboard'
import {LayoutClient} from '../views/LayoutClient'
import { FormatDate, FormatDateTime } from '../helper/FormatDate'
import {SetTicketDate} from '../components/SetTicketDate'
import {SetTicketFeedback} from '../components/SetTicketFeedback'

import api from '../api'

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

export const DashboardClient = () => {
  const classes = useStyles()
  const {enqueueSnackbar} = useSnackbar()

  const [open, setOpen] = useState(false)
  const [openDate, setOpenDate] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState([])
  const [tickets, setTickets] = useState([])


  const handleOpenDate = (ticket) => {
    setOpenDate(true)
    setSelectedTicket(ticket)
  }

  const handleOpen = (ticket) => {
    setOpen(true)
    setSelectedTicket(ticket)
  };

  const handleClose = () => {
    setOpen(false)
    setOpenDate(false)
  }

  useEffect(() => {
    api.get('ticket/ticket-list/').then(({data}) => {
      setTickets(data.results)
    }).catch(err => enqueueSnackbar(err.message, {variant: 'error'}))
  }, [open, openDate])

  const dateParams = {selectedTicket, handleClose}
  const modalParams = {open, onModalClose: handleClose}

  return <Dashboard
          Layout={LayoutClient}
          classes={classes}
          tickets={tickets}
          hasStepper={true}
          modals={[
            {
              title: "Set Ticket Date",
              content: <SetTicketDate {...dateParams} />,
              ...modalParams
            },
            {
              title: "Set Ticket Feedback",
              content: <SetTicketFeedback {...dateParams} />,
              ...modalParams,
              open: openDate
            },
          ]}
          list={{
            title: "My Tickets",
            headers: [
            "Ticket ID",
            "Create Date",
            "Appointment Date",
            "Pro Confirm",
            "Approve&Set Date"],
            body: [
              t => t.id,
              t => FormatDate(t.created_at),
              t => t?.appointment_date ? FormatDateTime(t.appointment_date) : '-',
              t => t?.appointment_date ? 'Waiting' : t.is_pro_confirm ? 'Confirmed' : '-',
              t => <Button
                    onClick={() => {t?.appointment_date
                        ? alert("You already set the date!")
                        : handleOpenDate(t);
                    }}
                    variant="outlined"
                    color={t?.appointment_date ? "primary" : "secondary"}
                    disabled={!t?.terms_approved}
                    value="Confirm"
                    className={classes.button}
                  >
                    {t?.appointment_date
                      ? "Date Setted"
                      : t?.terms_approved
                      ? "Set Ticket Date"
                      : "Approve Terms"}
                  </Button>,
              t => t?.ticket_status === "4" && (
                  <Button
                    onClick={() => handleOpen(t)}
                    variant="outlined"
                    color={"primary"}
                    disabled={t?.ticket_status === "4" ? false : true}
                    value="Feedback"
                    className={classes.button}
                  >
                    Feedback
                  </Button>
              )
            ]
          }}
      />
}