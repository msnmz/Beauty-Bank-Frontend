import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { AppContext } from "../context/AppContext";

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const TermsApproved = () => {
  const classes = useStyles();
  const params = useParams();
  const [isVerified, setVerified] = useState(false);
  const history = useHistory();
  const { user, setUser, userProfile, setUserProfile } = useContext(AppContext);

  console.log('USER:', user);
  console.log('USER ACCESS TOKEN:', user?.tokens?.access);

  useEffect(async () => {
    const id = params.id;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
      body: JSON.stringify({ "id": `${id}` }),
    };

    console.log('REQUEST OPTIONS: ', requestOptions);

    const response = await fetch(
      `https://bbank-backend-app.herokuapp.com/ticket/terms_approved/`,
      requestOptions
    );
    const data = await response.json();

    console.log('TERMS DATA:', data);

    if (data.messages == "Confirm  Ticket Successfuly") {
      setVerified(true);
    }
  }, []);

  const handleClick = () => {
    history.push("/login");
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title}>
              <img src="../images/logo.jpg" className={classes.avatar} />
              Terms Approve
            </Typography>
            {isVerified ? (
              <Alert severity="success">
                You approved terms successfully!
              </Alert>
            ) : (
              <Alert severity="error">You did not approve terms!</Alert>
            )}
          </CardContent>
          <CardActions>
            <Button
              onClick={handleClick}
              fullWidth
              variant="outlined"
              color="secondary"
              value="Login Page"
            >
              Go to Login Page
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export { TermsApproved };
