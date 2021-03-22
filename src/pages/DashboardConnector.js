import { LayoutConnector } from "../components/LayoutConnector";

import { AssignPro } from "../components/Index";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
//   paper: {
//     padding: theme.spacing(2),
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: theme.spacing(10),
//   },
//   fixedHeight: {
//     height: 240,
//   },
//   paperModal: {
//     position: "absolute",
//     top: "15vh",
//     left: "35vw",
//     width: 700,
//     height: 650,
//     backgroundColor: theme.palette.background.paper,
//     border: "2px solid #000",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
//   button: {
//     width: 150,
//   },
// }));

const DashboardConnector = () => {

  

  useEffect(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    };

    const response = await fetch(
      `https://bbank-backend-app.herokuapp.com/ticket/ticket-list/?page=${page}`,
      requestOptions
    );
    const data = await response.json();
    console.log("DATA", data);
    setPageSize(Math.floor(data.count / 10));

    setTicketsData(data.results);
  }, [open, page]);

  const handleOpen = (ticket) => {
    setOpen(true);
    setSelectedTicket(ticket);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div className={classes.paperModal}>
      <h1 id="simple-modal-title">Assign Pro</h1>
      <AssignPro selectedTicket={selectedTicket} handleClose={handleClose} />
    </div>
  );

  return (
    <LayoutConnector pageTitle="Dashboard">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
      <Grid container spacing={3}>
        {/* Stepper */}
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>{/* <Steps /> */}</Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
            >
              All Tickets
            </Typography>

            {ticketsData.length > 0 ? (
              <>
                <Pagination
                  count={pageSize}
                  color="secondary"
                  onChange={(event, page) => setPage(page)}
                />
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ticket ID</TableCell>
                      <TableCell>Owner</TableCell>
                      <TableCell>Create Date</TableCell>
                      <TableCell>Appointment Date</TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Assign Pro</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ticketsData?.slice(0).map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>{ticket.id}</TableCell>
                        <TableCell>{`${ticket.owner.first_name} ${ticket.owner.last_name}`}</TableCell>
                        <TableCell>{FormatDate(ticket.created_at)}</TableCell>
                        <TableCell>
                          {ticket?.appointment_date
                            ? FormatDateTime(ticket?.appointment_date)
                            : "-"}
                        </TableCell>
                        <TableCell>{ticket.phone_number}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              handleOpen(ticket);
                            }}
                            variant="outlined"
                            color={ticket?.pro ? "primary" : "secondary"}
                            value="Choose"
                            className={classes.button}
                          >
                            {ticket?.pro ? "Pro Assigned" : "Assign Pro"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <CircularProgress color="secondary" />
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </LayoutConnector>
  );
};

export { DashboardConnector };
