import React, { useState, useEffect, useContext } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Layout } from "../components/Index";
import clsx from "clsx";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { AppContext } from "../context/AppContext";

import Avatar from "@material-ui/core/Avatar";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  media: {
    height: 140,
  },

  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: 1000,
  },
  fixedHeight: {
    height: 240,
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  about: {
    width: theme.spacing(60),
    height: theme.spacing(40),
    marginLeft: theme.spacing(30),
  },
  table: {
    width: 960,
    minWidth: 650,
  },
}));

const ProfileClient = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { user, setUser } = useContext(AppContext);
  const [userData, setUserData] = useState([]);

  useEffect(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    };

    const response = await fetch(
      `https://bbank-backend-app.herokuapp.com/auth/user-detail/${user?.username}`,
      requestOptions
    );
    const data = await response.json();

    setUserData(data);
  }, []);

  console.log(userData);

  return (
    <Layout pageTitle="Profile">
      <div>
        <div className={classes.root}>
          <Avatar
            alt={userData?.email}
            src={userData?.profile_image}
            className={classes.large}
          />
          <div>
            <CardContent className={classes.about}>
              <Typography gutterBottom variant="h5" component="h2">
                About me:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {userData?.about_me}
              </Typography>
            </CardContent>
          </div>
        </div>

        <div className={classes.info}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TableContainer>
                  <Table className={classes.table} aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>{`${
                          user?.username.charAt(0).toUpperCase() +
                          user?.username.slice(1)
                        }'s Profile`}</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Last Login</TableCell>
                        <TableCell align="right">{userData?.last_login}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell align="left">{userData?.email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell align="left">{userData?.first_name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Last Name</TableCell>
                        <TableCell align="left">{userData?.last_name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Birth Date</TableCell>
                        <TableCell align="left">{userData?.birth_date}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Gender</TableCell>
                        <TableCell align="left">{userData?.gender}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell align="left">{userData?.address}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Zip Code</TableCell>
                        <TableCell align="left">{userData?.zip_address}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Phone Number</TableCell>
                        <TableCell align="left">{userData?.phone_number}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
};

export { ProfileClient };
