import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSnackbar } from 'notistack';
import { LoginContext } from '../../context/LoginContext';

const Log = () => {
  const { setIsLoggedIn } = useContext(LoginContext);
  const { register, handleSubmit, reset } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users?name=${data.name}`
      );
      const user = response.data[0];
      if (!user) {
        enqueueSnackbar("This user doesn't exist", { variant: 'error' });
        setIsLoggedIn(false);
        localStorage.setItem('user', JSON.stringify(user));
        return;
      }
      if (user.password !== data.password) {
        enqueueSnackbar('The password you entered is incorrect ', {
          variant: 'error',
        });
        setIsLoggedIn(false);
        return;
      }
      enqueueSnackbar(`Logged in as ${user.name}`, { variant: 'success' });
      reset();
      navigate('/');
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      enqueueSnackbar('Server connection error', { variant: 'error' });
      setIsLoggedIn(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <DivForm>
      <div>
        <h1>Zaloguj się</h1>
        <Form onSubmit={handleSubmit(onSubmit, console.log('hello'))}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            required
            {...register('name')}
          />
          <TextField
            id="outlined-password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            required
            fullWidth
            placeholder="Password"
            {...register('password')}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? 'hide password' : 'show password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button type="submit">Zaloguj</Button>
        </Form>
        <LinkRegistration onClick={() => navigate('registration')}>
          Don't have an account? Register here
        </LinkRegistration>
      </div>
    </DivForm>
  );
};

export default Log;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-constent: center;
  max-width: 400px;
  gap: 20px;
`;
const DivForm = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
  width:100vw;
  height:100vh;
`;
const LinkRegistration = styled.a`
  color: red;
`;
