import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Signin = () => {
    // constants
    const classes = useStyles();
    const history = useHistory();

    // states
    const [isShowPassword, setIsShowPassword] = useState(false);

    // validation schema
    const validationSchema = yup.object().shape({
        email: yup.string().required('This field is required').email('Invalid e-mail'),
        password: yup.string().required('This field is required'),
    });

    // initial values
    const initialValues = {
        email: '',
        password: '',
    }

    // handleSubmit
    const onSubmit = values => {
        alert(JSON.stringify(values));  //TODO: Don't forget deleting
        Request.postData('............', values) //TODO: Don't forget path 
            .then(() => {
                history.push('/');
            })
            .catch(error => {
                toast(error.message || 'An error occured');
            })
    }

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    // handle functions
    const handleClickShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        {...formik.getFieldProps('email')}
                        error={formik.touched.email && formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type={isShowPassword ? 'text' : 'password'}
                        id='password'
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
                    <FormControlLabel
                        control={<Checkbox name='isRemember' value='remember' color='primary' {...formik.getFieldProps('isRemember')} />}
                        label='Remember me'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href='#' variant='body2'>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            Don't have an account?{' '}
                            <Link href='/register' variant='body2'>
                                Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export { Signin };