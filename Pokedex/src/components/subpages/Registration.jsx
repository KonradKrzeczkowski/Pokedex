import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useContext } from 'react';
import { z } from 'zod';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
const schema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email('Invalid email'),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\\[\]:;"'<>,.?/~`|\\-]).{8,}$/,
        {
          message:
            'Password must contain: 1 uppercase letter, 1 digit, 1 special character, and be at least 8 characters long',
        }
      ),
    checkPassword: z.string().min(1, { message: 'Confirm password' }),
  })
  .refine((data) => data.password === data.checkPassword, {
    message: 'Passwords must match',
    path: ['checkPassword'],
  });
const Registration = () => {
  const { theme } = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [usersName, setUserName] = useState(false);
  const [email, setEmail] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(
    { resolver: zodResolver(schema) },
    {
      defaultValues: {
        weight: '',
        height: '',
        experience: '',
      },
    }
  );
  const onSubmit = async (data) => {
    try {
      const check = await axios.get(
        `http://localhost:3000/users?email=${data.email}`
      );
      if (check.data.length > 0) {
        setEmail(true);
      } else setEmail(false);

      const nameUsers = await axios.get(
        `http://localhost:3000/users?name=${data.name}`
      );
      if (nameUsers.data.length > 0) {
        setUserName(true);

        return;
      } else setUserName(false);
      const response = await axios.post('http://localhost:3000/users', data);
      console.log(' Add User:', response.data);
      setSubmittedData(response.data);
      navigate('/log');
      reset();
    } catch (error) {
      console.error(' Error during saving":', error);
    }
  };
  console.log(submittedData);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  

  return (
    <DivRegistration style={theme}>
      <DivRegistrationStyle style={theme}>
        <h1>Rejestracja</h1>
        <FormRegistration
          style={theme}
          onSubmit={handleSubmit(onSubmit, console.log('hello'))}
        >
          <TextField
            id="outlined-basic1"
            label="Name"
            variant="outlined"
            name="name"
            required
            {...register('name')}
            sx={{
              backgroundColor: theme.background,
              input: {
                color: theme.color,
              },
              '& label': {
                color: theme.color,
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.color,
                },
              },
            }}
          />
          {usersName && <p>Username is taken</p>}
          <TextField
            sx={{
              backgroundColor: theme.background,
              input: {
                color: theme.color,
              },
              '& label': {
                color: theme.color,
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.color,
                },
              },
            }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            required
            {...register('email')}
          />
          {email && <p>Email is already taken</p>}
          {errors.email && <p>{errors.email.message}</p>}

          <TextField
            sx={{
              backgroundColor: theme.background,
              input: {
                color: theme.color,
              },
              '& label': {
                color: theme.color,
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.color,
                },
              },
            }}
            id="outlined-password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            required
            fullWidth
            {...register('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide password' : 'show password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: '#1976d2' }} />
                    ) : (
                      <Visibility sx={{ color: '#1976d2' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {errors.password && <p>{errors.password.message}</p>}

          <TextField
            sx={{
              backgroundColor: theme.background,
              input: {
                color: theme.color,
              },
              '& label': {
                color: theme.color,
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.color,
                },
              },
            }}
            id="outlined-password2"
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            required
            fullWidth
            {...register('checkPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide password' : 'show password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: '#1976d2' }} />
                    ) : (
                      <Visibility sx={{ color: '#1976d2' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors.checkPassword && <p>{errors.checkPassword.message}</p>}
          <Button
            type="submit"
            variant="outlined"
            sx={{
              borderColor: 'blue',
              color: 'blue',
              '&:hover': {
                borderColor: 'darkblue',
                backgroundColor: 'rgba(0, 0, 255, 0.04)',
              },
            }}
          >
            Register
          </Button>
        </FormRegistration>
      </DivRegistrationStyle>
    </DivRegistration>
  );
};

export default Registration;
const DivRegistration = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const FormRegistration = styled.form`
  display: grid;
  grid-trmplate-columns: repeat(1, 1fr);
  gap: 10px;
`;

const DivRegistrationStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(1, auto);
  max-width: 400px;
  max-height: 500px;
`;
