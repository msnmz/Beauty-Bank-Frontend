import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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

const AssignPro = ({ selectedTicket, handleClose }) => {
  
  // Constants
  const classes = useStyles();
  const { user } = useContext(AppContext);
  const [proList, setProList] = useState([]);
  const [selectPro, setSelectPro] = useState("");


  // Get Pro list
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

    const filteredPro = data.results.filter((item) => {
      if (item.is_pro) return item;
    });
    setProList(filteredPro);
  }, []);


  // Assign Pro
  async function onSubmit() {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
      body: JSON.stringify({
        pro: selectPro,
        service_type: 0,
      }),
    };

    const response = await fetch(
      `https://bbank-backend-app.herokuapp.com/ticket/connector-tickets/${selectedTicket.id}`,
      requestOptions
    ).then(r => console.log("PRO RES: ", r))
    handleClose();
  }

  const handleChangePro = (event) => {
    setSelectPro(event.target.value);
  };

  // initial values
  const initialValues = {};

  // formik
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

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
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Select Pro
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={selectPro}
                      onChange={handleChangePro}
                      label="Select Pro"
                    >
                      {proList?.map((pro) => (
                        <MenuItem value={pro?.id}>{`${pro?.first_name} ${pro?.last_name} (✉${pro?.email}) (☎${pro?.phone_number})`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Assign Pro
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
};

export { AssignPro };
