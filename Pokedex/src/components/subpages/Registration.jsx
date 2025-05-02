import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { z } from 'zod';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
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
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, auto)' }}>
      <h1>Rejestracja</h1>
      <form
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '10px',
        }}
        onSubmit={handleSubmit(onSubmit, console.log('hello'))}
      >
        <TextField
          id="outlined-basic1"
          label="Name"
          variant="outlined"
          name="name"
          required
          {...register('name')}
        />
        {usersName && <p>Username is taken</p>}
        <TextField
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
          id="outlined-password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          required
          fullWidth
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
        {errors.password && <p>{errors.password.message}</p>}
        <TextField
          id="outlined-password2"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          required
          fullWidth
          {...register('checkPassword')}
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
        {errors.checkPassword && <p>{errors.checkPassword.message}</p>}
        <Button type="submit">Zarejestruj</Button>
      </form>
    </div>
  );
};

export default Registration;
