import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../context/AppContext";

import {
  Paper,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { LayoutClient } from "../components/Index";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(10),
      padding: theme.spacing(3),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateTicket = () => {
  // constants
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();

  const { user, setUser, userProfile, setUserProfile } = useContext(AppContext);
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

  // validation obj
  // const validationSchema = yup.object().shape({
  // firstName: yup
  //   .string()
  //   .required("This field is required")
  //   .min(1, "Must be at least 1 characters")
  //   .max(30, "Must be a maximum of 30 characters"),
  // lastName: yup
  //   .string()
  //   .required("This field is required")
  //   .min(1, "Must be at least 1 characters")
  //   .max(30, "Must be a maximum of 30 characters"),
  // userName: yup
  //   .string()
  //   .required("This field is required")
  //   .min(1, "Must be at least 1 characters")
  //   .max(30, "Must be a maximum of 30 characters"),
  // email: yup
  //   .string()
  //   .required("This field is required")
  //   .email("Invalid e-mail")
  //   .min(4, "Must be at least 4 characters")
  //   .max(30, "Must be a maximum of 30 characters"),
  // password: yup
  //   .string()
  //   .required("This field is required")
  //   .min(6, "Must be at least 6 characters")
  //   .max(30, "Must be a maximum of 30 characters"),
  // passwordConfirm: yup
  //   .string()
  //   .oneOf([yup.ref("password"), null], "Passwords must match"),
  // phone: yup
  //   .string()
  //   .required("This field is required")
  //   .min(1, "Must be at least 1 characters")
  //   .max(20, "Must be a maximum of 20 characters"),
  // conditions: yup.bool().oneOf([true], "This field is required"),
  // ...(id === "professional" && {
  //   zip: yup
  //     .string()
  //     .required("This field is required")
  //     .min(1, "Must be at least 1 characters")
  //     .max(30, "Must be a maximum of 8 characters"),
  //   aboutMe: yup
  //     .string()
  //     .required("This field is required")
  //     .min(1, "Must be at least 1 characters")
  //     .max(1500, "Must be a maximum of 1500 characters"),
  //   companyName: yup.string().max(100, "Must be a maximum of 100 characters"),
  //   gender: yup.number().min(0).max(2),
  //   capacity: yup.number().min(0),
  // }),
  // TODO: search whether there is extra validation for password.
  // });

  // initial values

  const initialValues = {
    ticketContent: "",
  };

  // handleSubmit

  async function onSubmit(values) {
    if (
      userData.email &&
      userData.first_name &&
      userData.last_name &&
      userData.gender &&
      userData.address &&
      userData.zip_address &&
      userData.phone_number &&
      userData.about_me
    ) {
      const data = {
        service_type: serviceType,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.tokens?.access}`,
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        "https://bbank-backend-app.herokuapp.com/ticket/create/",
        requestOptions
      );

      if (response?.status == 201) {
        alert("Your ticket succesfully created!");
        history.push("/client");
      }
    } else {
      alert("Please update and fill in all the information in your profile!");
    }
  }

  // formik
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const [serviceType, setServiceType] = React.useState("");

  const handleChange = (event) => {
    setServiceType(event.target.value);
  };

  return (
    <LayoutClient pageTitle="Create Ticket">
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <img src="../images/logo.jpg" className={classes.avatar} />
          <Typography component="h1" variant="h5">
            Create Ticket
          </Typography>
          <Grid container spacing={3}>
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
                      }'s Credentials`}</TableCell>
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
                      <TableCell align="left">{userData?.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Address</TableCell>
                      <TableCell align="left">{userData?.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Zip Code</TableCell>
                      <TableCell align="left">
                        {userData?.zip_address}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Phone Number</TableCell>
                      <TableCell align="left">
                        {userData?.phone_number}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid item xs={12}>
                <CardContent>
                  <Typography variant="body2">About me:</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {userData?.about_me}
                  </Typography>
                </CardContent>
              </Grid>
              <form
                className={classes.form}
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Service Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={serviceType}
                      onChange={handleChange}
                      label="Service Type"
                    >
                      <MenuItem value={0}>Kapper</MenuItem>
                      <MenuItem value={1}>Schoonheidsspecialiste</MenuItem>
                      <MenuItem value={2}>Pedicure</MenuItem>
                      <MenuItem value={3}>Visagist</MenuItem>
                      <MenuItem value={4}>Styliste</MenuItem>
                      <MenuItem value={5}>Nagelstyliste</MenuItem>
                      <MenuItem value={6}>Haarwerken</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Create Ticket
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </LayoutClient>
  );
};

export { CreateTicket };
