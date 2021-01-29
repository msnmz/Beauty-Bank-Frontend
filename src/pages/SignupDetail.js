import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper, Grid, Typography, Avatar, TextField, Checkbox, Button, Link, InputAdornment, IconButton, Select, MenuItem, FormControl, InputLabel,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Modal } from '../components/Index';
// import Request from '../helper/Request';
// import { Label } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(10),
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(10),
            padding: theme.spacing(3),
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        minWidth: '100%',
    },
}));

const SignupDetail = () => {
    const classes = useStyles();
    // const history = useHistory();
    const { id } = useParams();

    //states
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [modal, setModal] = useState({ isOpen: false, message: '' });

    // validation obj
    const validationSchema = yup.object().shape({
        firstName: yup.string().required('This field is required').min(1, 'Must be at least 1 characters').max(30, 'Must be a maximum of 30 characters'),
        lastName: yup.string().required('This field is required').min(1, 'Must be at least 1 characters').max(30, 'Must be a maximum of 30 characters'),
        userName: yup.string().required('This field is required').min(1, 'Must be at least 1 characters').max(30, 'Must be a maximum of 30 characters'),
        email: yup.string().required('This field is required').email('Invalid e-mail').min(4, 'Must be at least 4 characters').max(30, 'Must be a maximum of 30 characters'),
        password: yup.string().required('This field is required').min(6, 'Must be at least 6 characters').max(30, 'Must be a maximum of 30 characters'),
        passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
        zip: yup.string().required('This field is required').min(1, 'Must be at least 1 characters').max(30, 'Must be a maximum of 8 characters'),
        phone: yup.string().required('This field is required').min(1, 'Must be at least 1 characters').max(20, 'Must be a maximum of 20 characters'),
        aboutMe: yup.string().required('This field is required').min(1, 'Must be at least 1 characters').max(1500, 'Must be a maximum of 1500 characters'),
        conditions: yup.bool().oneOf([true], 'This field is required'),
        companyName: yup.string().max(100, 'Must be a maximum of 100 characters'),
        gender: yup.number().min(0).max(2),
        capacity: yup.number(),
        // TODO: search whether there is extra validation for password.
    });

    // initial values
    const initialValues = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        zip: '',
        phone: '',
        aboutMe: '',
        companyName: '',
        gender: null,
        capacity: 0,
        conditions: false
    }

    // handleSubmit
    const onSubmit = (values) => {
        // Request.getData('..............', values) //TODO: Don't forget path
        //     .then(() => {
        //         history.push('/login');
        //     })
        //     .catch(error => {
        //         modalTrigger();
        //     })
        console.log(values);
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

    const modalTrigger = () => {
        setModal({ isOpen: !modal.isOpen, message: 'Successfully registered' })
    }


    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Register
                </Typography>
                < form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        {/* firstname */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='First Name'
                                name='firstName'
                                autoComplete='fname'
                                required
                                fullWidth
                                autoFocus
                                {...formik.getFieldProps('firstName')}
                                error={formik.touched.firstName && formik.errors.firstName}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                        </Grid>
                        {/* lastname */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Last Name'
                                name='lastName'
                                autoComplete='lname'
                                required
                                fullWidth
                                {...formik.getFieldProps('lastName')}
                                error={formik.touched.lastName && formik.errors.lastName}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        </Grid>
                        {/* username */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='User Name'
                                name='userName'
                                autoComplete='uname'
                                required
                                fullWidth
                                {...formik.getFieldProps('userName')}
                                error={formik.touched.userName && formik.errors.userName}
                                helperText={formik.touched.userName && formik.errors.userName}
                            />
                        </Grid>
                        {/* email */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label='E-mail'
                                name='email'
                                autoComplete='email'
                                {...formik.getFieldProps('email')}
                                error={formik.touched.email && formik.errors.email}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        {/* password */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Password'
                                name='password'
                                autoComplete='password'
                                required
                                fullWidth
                                type={isShowPassword ? 'text' : 'password'}
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
                        {/* password confirm */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Confirm'
                                name='passwordConfirm'
                                autoComplete='passwordConfirm'
                                required
                                fullWidth
                                type={isShowPassword ? 'text' : 'password'}
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
                                {...formik.getFieldProps('passwordConfirm')}
                                error={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                                helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                            />
                        </Grid>
                        {/* company name */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Company'
                                name='companyName'
                                autoComplete="companyName"
                                fullWidth
                                {...formik.getFieldProps('companyName')}
                                error={formik.touched.companyName && formik.errors.companyName}
                                helperText={formik.touched.companyName && formik.errors.companyName}
                            />
                        </Grid>
                        {/* for gender */}
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="gender-select-helper-label">Gender</InputLabel>
                                <Select
                                    labelId="gender-select-helper-label"
                                    id="gender-select-helper"
                                    name='gender'
                                    {...formik.getFieldProps('gender')}
                                    error={formik.touched.companyName && formik.errors.companyName}
                                    helperText={formik.touched.companyName && formik.errors.companyName}
                                >
                                    <MenuItem value={null}><em>None</em></MenuItem>
                                    <MenuItem value={0}>Female</MenuItem>
                                    <MenuItem value={1}>Male</MenuItem>
                                    <MenuItem value={2}>I don't say</MenuItem>
                                </Select>
                                {/* <FormHelperText>Some important helper text</FormHelperText> */}
                            </FormControl>
                        </Grid>
                        {/* reservred_capacity */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Capacity'
                                name='capacity'
                                autoComplete='capacity'
                                fullWidth
                                type='number'
                                {...formik.getFieldProps('capacity')}
                                error={formik.touched.capacity && formik.errors.capacity}
                                helperText={formik.touched.capacity && formik.errors.capacity}
                            />
                        </Grid>
                        {/* zip */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Zip / Postal code'
                                name='zip'
                                autoComplete='zip'
                                required
                                fullWidth
                                {...formik.getFieldProps('zip')}
                                error={formik.touched.zip && formik.errors.zip}
                                helperText={formik.touched.zip && formik.errors.zip}
                            />
                        </Grid>
                        {/* phone number */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Phone Number'
                                name='phone'
                                autoComplete='phone'
                                required
                                fullWidth
                                {...formik.getFieldProps('phone')}
                                error={formik.touched.phone && formik.errors.phone}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
                        </Grid>
                        {/* about me */}
                        <Grid item xs={12} >
                            <TextField
                                label='About Me'
                                name='aboutMe'
                                autoComplete='aboutMe'
                                multiline
                                required
                                fullWidth
                                {...formik.getFieldProps('aboutMe')}
                                error={formik.touched.aboutMe && formik.errors.aboutMe}
                                helperText={formik.touched.aboutMe && formik.errors.aboutMe}
                            />
                        </Grid>
                        {/* detail */}
                        <Grid item xs={12}>
                            <Checkbox
                                {...formik.getFieldProps('conditions')}
                                name='conditions'
                                id='conditions'
                            />
                            <label for='conditions'>I have read the <span style={{ fontSize: 'bold' }}>Terms and Conditions </span></label>
                            {formik.errors.conditions ? <label style={{ color: 'red' }}>{formik.errors.conditions}</label> : null}
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
                    <Grid container justify='flex-end' spacing={3}>
                        <Grid item>
                            Already have an account?{'  '}
                            <Link href='/login' variant='body2'>
                                Log in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Modal isOpen={modal.isOpen} message={modal.message} modalTrigger={modalTrigger} />
        </main >
    );
}

export { SignupDetail };