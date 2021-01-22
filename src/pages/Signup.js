import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import {
    Avatar,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Typography,
    Container,
    InputAdornment,
    IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Request from '../helper/Request';
import 'react-toastify/dist/ReactToastify.css';

// style function
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Signup = () => {
    const classes = useStyles();
    const history = useHistory();

    // states
    const [isShowPassword, setIsShowPassword] = useState(false);

    // validation obj
    const validationSchema = yup.object().shape({
        firstName: yup.string().required('This field is required'),
        lastName: yup.string().required('This field is required'),
        email: yup.string().required('This field is required').email('Invalid e-mail'),
        password: yup.string().required('This field is required'),
        // TODO: search whether there is extra validation for password.
    });

    // initial values
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }

    // handleSubmit
    const onSubmit = (values) => {
        alert(JSON.stringify(values)); //TODO: Don't forget deleting
        Request.getData('..............', values) //TODO: Don't forget path
            .then(() => {
                toast.success('Successfully registered');
                history.push('/login');
            })
            .catch(error => {
                toast.error(error?.message || 'An error occured');
            })
    }

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    // handle functions
    const handleClickShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container component='main' maxWidth='xs'>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete='fname'
                                name='firstName'
                                variant='outlined'
                                required
                                fullWidth
                                label='First Name'
                                autoFocus
                                {...formik.getFieldProps('firstName')}
                                error={formik.touched.firstName && formik.errors.firstName}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                label='Last Name'
                                name='lastName'
                                autoComplete='lname'
                                {...formik.getFieldProps('lastName')}
                                error={formik.touched.lastName && formik.errors.lastName}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                {...formik.getFieldProps('email')}
                                error={formik.touched.email && formik.errors.email}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type={isShowPassword ? 'text' : 'password'}
                                autoComplete='current-password'
                                InputProps={{
                                    endAdornment:
                                        (<InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {isShowPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                {...formik.getFieldProps('password')}
                                error={formik.touched.password && formik.errors.password}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox name='extraMail' value='allowExtraEmails' color='primary' {...formik.getFieldProps('ExtraMail')} />}
                                label='I want to receive inspiration, marketing promotions and updates via email.'
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Link href='#' variant='body2'>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export { Signup };