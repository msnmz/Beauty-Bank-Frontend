import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 600,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(2),
  },
  buttonsWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ConfirmTicketModal = ({ selectedTicket, handleClose }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12}>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <Typography className={classes.title}>
              Your Ticket Appointment Date:
            </Typography>
            {selectedTicket?.appointment_date}
          </CardContent>
        </Card>
      </Grid>
      <div className={classes.buttonsWrapper}>
        <Grid item xs={6} className={classes.button}>
          <Button
            onClick={handleClose}
            fullWidth
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.button}>
          <Button
            onClick={() => {history.push(`/ticket/confirm/${selectedTicket.id}`);}}
            fullWidth
            variant="contained"
            color="secondary"
          >
            Confirm
          </Button>
        </Grid>
      </div>
    </Grid>
  );
};

export { ConfirmTicketModal };
