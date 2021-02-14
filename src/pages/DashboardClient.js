import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import { Layout, TicketTable, Steps } from '../components/Index';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({

    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const DashboardClient = () => {

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Layout>
            <Grid container spacing={3}>
                {/* Stepper */}
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        <Steps />
                    </Paper>
                    <Paper className={fixedHeightPaper}>
                        <Steps />
                    </Paper>
                </Grid>

                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <TicketTable />
                    </Paper>
                </Grid>

            </Grid>
        </Layout>
    )
}

export { DashboardClient };