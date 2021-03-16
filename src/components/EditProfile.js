import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import Request from "../services/Request";

import { AppContext } from "../context/AppContext";

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
}));

const EditProfile = ({handleClose}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { user, setUser, userProfile, setUserProfile } = useContext(AppContext);

  // validation obj
  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("This field is required")
      .min(1, "Must be at least 1 characters")
      .max(30, "Must be a maximum of 30 characters"),
    lastName: yup
      .string()
      .required("This field is required")
      .min(1, "Must be at least 1 characters")
      .max(30, "Must be a maximum of 30 characters"),
    userName: yup
      .string()
      .required("This field is required")
      .min(1, "Must be at least 1 characters")
      .max(30, "Must be a maximum of 30 characters"),
    email: yup
      .string()
      .required("This field is required")
      .email("Invalid e-mail")
      .min(4, "Must be at least 4 characters")
      .max(30, "Must be a maximum of 30 characters"),
    phone: yup
      .string()
      .required("This field is required")
      .min(1, "Must be at least 1 characters")
      .max(20, "Must be a maximum of 20 characters"),
    zipAddress: yup
      .string()
      .required("This field is required")
      .min(1, "Must be at least 1 characters")
      .max(30, "Must be a maximum of 30 characters"),
      address: yup
      .string()
      .required("This field is required")
      .min(1, "Must be at least 1 characters")
      .max(100, "Must be a maximum of 30 characters"),
    aboutMe: yup
      .string()
      .required("This field is required")
      .min(100, "Must be at least 100 characters")
      .max(1500, "Must be a maximum of 1500 characters"),
  });

  // initial values
  const initialValues = {
    firstName: userProfile?.first_name,
    lastName: userProfile?.last_name,
    userName: userProfile?.username,
    email: userProfile?.email,
    phone: userProfile?.phone_number,
    phone2: userProfile?.phone_number2,
    zipAddress: userProfile?.zip_address,
    address: userProfile?.address,
    aboutMe: userProfile?.about_me,
  };

  // handleSubmit
  async function onSubmit(values) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
      body: JSON.stringify({
        email: values.email,
        username: values.userName,
        first_name: values.firstName,
        last_name: values.lastName,
        phone_number: values.phone,
        phone_number2: values.phone2,
        zip_address: values.zipAddress,
        address: values.address,
        about_me: values.aboutMe,
      }),
    };

    const response = await fetch(
      `https://bbank-backend-app.herokuapp.com/auth/user-detail/${user?.username}`,
      requestOptions
    );
    const data = await response.json();
    handleClose();
  }

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={3}>
            {/* firstname */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                autoComplete="fname"
                required
                fullWidth
                autoFocus
                {...formik.getFieldProps("firstName")}
                error={formik.touched.firstName && formik.errors.firstName}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            {/* lastname */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                required
                fullWidth
                {...formik.getFieldProps("lastName")}
                error={formik.touched.lastName && formik.errors.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            {/* username */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="User Name"
                name="userName"
                autoComplete="uname"
                required
                fullWidth
                {...formik.getFieldProps("userName")}
                error={formik.touched.userName && formik.errors.userName}
                helperText={formik.touched.userName && formik.errors.userName}
              />
            </Grid>
            {/* email */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="E-mail"
                name="email"
                autoComplete="email"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            {/* phone number */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                required
                fullWidth
                {...formik.getFieldProps("phone")}
                error={formik.touched.phone && formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
             {/* phone number 2 */}
             <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number 2"
                name="phone2"
                autoComplete="phone2"
                required
                fullWidth
                {...formik.getFieldProps("phone2")}
              />
            </Grid>
            {/* zipaddress */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Zip Address"
                name="zipAddress"
                autoComplete="zaddress"
                required
                fullWidth
                {...formik.getFieldProps("zipAddress")}
                error={formik.touched.zipAddress && formik.errors.zipAddress}
                helperText={
                  formik.touched.zipAddress && formik.errors.zipAddress
                }
              />
            </Grid>
            {/* address */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                name="address"
                autoComplete="address"
                required
                fullWidth
                {...formik.getFieldProps("address")}
                error={formik.touched.address && formik.errors.address}
                helperText={
                  formik.touched.address && formik.errors.address
                }
              />
            </Grid>
            {/* aboutme */}
            <Grid item xs={12} sm={12}>
              <TextField
                label="About Me"
                name="aboutMe"
                autoComplete="ame"
                required
                fullWidth
                {...formik.getFieldProps("aboutMe")}
                error={formik.touched.aboutMe && formik.errors.aboutMe}
                helperText={
                  formik.touched.aboutMe && formik.errors.aboutMe
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </main>
  );
};

export { EditProfile };

{
  /* <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
          Edit Profile
      <Button
              onClick={handleClick}
              fullWidth
              variant="outlined"
              color="secondary"
              value="Login Page"
            >
              Submit
            </Button>
      </Grid>
    </Grid> 

      async function handleClick() {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ }),
      };
  
      const response = await fetch(
        "https://bbank-backend-app.herokuapp.com/auth/email-verify/",
        requestOptions
      );
      const data = await response.json();
  };



*/
}
