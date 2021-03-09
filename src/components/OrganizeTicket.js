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

import TextField from "@material-ui/core/TextField";

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
    minWidth: "95%",
  },
  formInputs: {
    display: "flex",
    flexDirection: "row",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    minWidth: "100%",
  },
}));

const OrganizeTicket = ({ selectedTicket, handleClose }) => {
  // constants
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();

  const { user, setUser, userProfile, setUserProfile } = useContext(AppContext);
  const [userData, setUserData] = useState([]);

  console.log("USER:", user);

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

  const [proList, setProList] = useState([]);
  const [connectorList, setConnectorList] = useState([]);

  useEffect(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    };

    const response = await fetch(
      `https://bbank-backend-app.herokuapp.com/auth/user-list/`,
      requestOptions
    );
    const data = await response.json();

    const filteredPro = data.filter((item) => {
      if (item.is_pro) return item;
    });
    setProList(filteredPro);

    const filteredConnector = data.filter((item) => {
      if (item.is_connector) return item;
    });
    setConnectorList(filteredConnector);
  }, []);

  // initial values

  const initialValues = {
    ticketContent: "",
  };

  // handleSubmit

  async function onSubmit(values) {
    const data = {
      service_type: sendingServiceType,
      appointment_date: datePicker,
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `https://bbank-backend-app.herokuapp.com/ticket/client-tickets/${selectedTicket.id}`,
      requestOptions
    );

    console.log('RESPONSE:', response);

    handleClose();
  }

  // formik
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const [serviceType, setServiceType] = useState(selectedTicket?.service_type);
  const [sendingServiceType, setSendingServiceType] = useState(0);
  const [selectConnector, setSelectConnector] = useState("");
  const [datePicker, setDatePicker] = useState("");

  const handleChangeServiceType = (event) => {
    setServiceType(event.target.value);
    if(serviceType=="kapper"){
      setSendingServiceType(0);
    } else if (serviceType=="schoonheidsspecialiste") {
      setSendingServiceType(1)
    } else if (serviceType=="pedicure") {
      setSendingServiceType(2)
    } else if (serviceType=="visagist") {
      setSendingServiceType(3)
    } else if (serviceType=="styliste") {
      setSendingServiceType(4)
    } else if (serviceType=="nagelstyliste") {
      setSendingServiceType(5)
    } else if (serviceType=="haarwerken") {
      setSendingServiceType(6)
    }
  };

  const handleChangeConnector = (event) => {
    setSelectConnector(event.target.value);
  };

  const handleDatePicker = (event) => {
    setDatePicker(event.target.value);
  };

  // console.log('SELECTED TICKET:', selectedTicket);
  // console.log('SERVICE TYPE:', serviceType);
  console.log('SERVICE TYPE:', sendingServiceType);

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
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
                      selectedTicket?.owner.username.charAt(0).toUpperCase() +
                      selectedTicket?.owner.username.slice(1)
                    }'s Ticket`}</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.email}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.first_name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Last Name</TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.last_name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gender</TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.gender}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Zip Code</TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.zip_address}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone Number</TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.phone_number}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Grid item xs={12}>
              <CardContent>
                <Typography variant="body2">About me:</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {selectedTicket?.owner.about_me}
                </Typography>
              </CardContent>
            </Grid>
            <form
              className={classes.form}
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <div className={classes.formInputs}>
                <Grid item xs={6}>
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
                      onChange={handleChangeServiceType}
                      label="Select Pro"
                    >
                      <MenuItem value={"kapper"}>Kapper</MenuItem>
                      <MenuItem value={"schoonheidsspecialiste"}>Schoonheidsspecialiste</MenuItem>
                      <MenuItem value={"pedicure"}>Pedicure</MenuItem>
                      <MenuItem value={"visagist"}>Visagist</MenuItem>
                      <MenuItem value={"styliste"}>Styliste</MenuItem>
                      <MenuItem value={"nagelstyliste"}>Nagelstyliste</MenuItem>
                      <MenuItem value={"haarwerken"}>Haarwerken</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    id="datetime-local"
                    label="Next appointment"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    onChange={handleDatePicker}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Select Connector
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={selectConnector}
                    onChange={handleChangeConnector}
                    label="Select Connector"
                  >
                    {connectorList?.map((connector) => (
                      <MenuItem value={connector?.id}>{connector?.email}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Organize Ticket
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
};

export { OrganizeTicket };
