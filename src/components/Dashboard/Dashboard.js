import React from "react"
import clsx from "clsx"

import { Grid, Paper, Typography, Modal, CircularProgress } from "@material-ui/core"

import {Stepper} from "../Stepper"
import {List} from './List'


export const Dashboard = ({Layout, classes, tickets, modals, hasStepper, list, pagination}) => {
  const fixedHeightPaper = hasStepper ? clsx(classes.paper, classes.fixedHeight) : 0

  return (
    <Layout pageTitle="Dashboard">
      {modals.map((modal, idx) =>
      (<Modal
        key={modal.title}
        open={modal.open}
        onClose={modal.onModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paperModal}>
          <h1 className="simple-modal-title">{modal.title}</h1>
          {modal.content}
        </div>
      </Modal>
      ))}
      <Grid container spacing={3}>
        {
          hasStepper &&
          <Grid item xs={12}>
            <Paper className={fixedHeightPaper}>
              <Stepper activeStep={Number(tickets[0]?.ticket_status)} />
            </Paper>
          </Grid>
        }
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
            >
              {list.title}
            </Typography>
            {tickets.length && <List list={list} tickets={tickets} pagination={pagination} />}
            {!tickets.length && <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <CircularProgress color="secondary" />
              </div>}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}
