import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './input';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const history = useHistory();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };
  const googleFailure = () => {
    console.log('Google sign in was unsuccesfull. Try later again');
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };
  //KcvYNfC82T5LfqL2ncSPCJWO
  return (
    <Container component={'main'} maxWidth={'xs'}>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant={'h5'}>
          {isSignup ? 'Sign Up' : 'Sign in'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name={'firstName'}
                  label={'First name'}
                  handleChange={handleChange}
                  half
                />
                <Input
                  name={'lastName'}
                  label={'Last Name'}
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name={'email'}
              label={'Email Address'}
              handleChange={handleChange}
              type={'email'}
            />
            <Input
              name={'password'}
              label={'Password'}
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name={'confirmPassword'}
                label={'Repeat password'}
                handleChange={handleChange}
                type={'password'}
              />
            )}
          </Grid>
          <Button
            type={'submit'}
            fullWidth
            variant={'contained'}
            color={'primary'}
            className={classes.submit}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId={
              '190554547061-iuqb552g25jm3gp4csectnkn3sm9lq17.apps.googleusercontent.com'
            }
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color={'primary'}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant={'contained'}
                fullWidth
              >
                Google Sign in
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
          />
          <Grid container justify={'flex-end'}>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an Account? Sign in'
                  : 'Dont have an account sign up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
