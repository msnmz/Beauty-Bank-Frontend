import React from 'react';
import { Typography, Container, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    footer: {
        position: 'fixed',
        bottom: '0',
        right: '0',
        left: '0',
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        // TODO:backgroundcolor duzeltilecek.
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography variant="body2" color="textSecondary" align="center">
                    Copyright © BeautyBank
                    {` ${new Date().getFullYear()}.`}
                </Typography>
            </Container>
        </footer>
    );
}

export { Footer }

// TODO: site ismi degistirilebilir.