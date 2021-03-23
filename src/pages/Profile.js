import React, { useState, useEffect, useContext } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import {
  LayoutClient,
  LayoutConnector,
  LayoutProfessional,
  LayoutSponsor,
} from "../views";

import axios from 'axios';

import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
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
import Modal from "@material-ui/core/Modal";
import { EditProfile } from "../components/Index";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
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
    width: 1200,
    textAlign: "center",
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
    textAlign: "left",
  },
  button: {
    textAlign: "right",
    margin: theme.spacing(2),
  },
  table: {
    margin: theme.spacing(10),
    width: 1000,
  },
  paperModal: {
    position: "absolute",
    top: "20vh",
    left: "35vw",
    width: 700,
    height: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  profile_image: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    display: 'none',
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { user, setUser, userProfile, setUserProfile } = useContext(AppContext);
  const [userData, setUserData] = useState([]);
  const [open, setOpen] = useState(false);

  let Layout;
  switch (user?.role) {
    case "Client":
      Layout = LayoutClient;
      break;
    case "Connector":
      Layout = LayoutConnector;
      break;
    case "Pro":
      Layout = LayoutProfessional;
      break;
    case "Sponsor":
      Layout = LayoutSponsor;
      break;
    default:
      break;
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleUploadImage = async (event) => {
    let image = await event.target.files[0];
    let form_data = await new FormData();
    await form_data.append('profile_image', image);

    axios.patch( `https://bbank-backend-app.herokuapp.com/auth/user-detail/${user?.username}`, form_data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.tokens?.access}`
      }
    })
    .then(res => setUserData([...userData, userData.profile_image=res.data.profile_image]))
    .catch((err) => console.log(err));
  }

  const modalBody = (
    <div className={classes.paperModal}>
      <h1 id="simple-modal-title">Edit Profile</h1>
      <EditProfile handleClose={handleClose} />
    </div>
  );

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
  }, [open, userData]);

  setUserProfile(userData);

  return (
    <Layout pageTitle="Profile">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
      <Paper className={classes.paper}>
        <div className={classes.button}>
          <Button
            onClick={handleOpen}
            variant="outlined"
            color="secondary"
            value="Edit Profile"
            // size="small"
          >
            Edit Profile
          </Button>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={6} className={classes.profile_image}>
            <Avatar
              alt={userData?.email}
              src={userData?.profile_image}
              className={classes.large}
            />
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleUploadImage}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                component="span"
              >
                Upload
              </Button>
            </label>
          </Grid>
          <Grid item xs={6}>
            <CardContent className={classes.about}>
              <Typography gutterBottom variant="h5" component="h2">
                About me:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {userData?.about_me}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table
                className={classes.table}
                aria-label="a dense table"
                size="small"
              >
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
                    <TableCell>Gender</TableCell>
                    <TableCell align="left">
                      {userData?.gender == 1
                        ? "Female"
                        : userData?.gender == 2
                        ? "Male"
                        : "Other"}
                    </TableCell>
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
                  <TableRow>
                    <TableCell>Phone Number 2</TableCell>
                    <TableCell align="left">
                      {userData?.phone_number2}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export { Profile };
