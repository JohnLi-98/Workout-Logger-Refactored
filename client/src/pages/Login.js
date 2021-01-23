import React, { useState } from 'react';
import { Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/client';

import { formStyles } from '../util/common-styling';
import { useForm } from '../util/form-hooks';

export default function Login() {
    const classes = formStyles();

    const [errors, setErrors] = useState({});
    const loginUserCallback = () => console.log("Logging in");
    const { onChange, onSubmit, passwordVisibility, values } = useForm(loginUserCallback, {
        username: '',
        password: '',
        showPassword: false,
    });

    return (
        <Container maxWidth="md">
            <h1>This is the login page</h1>
            <form onSubmit={onSubmit} className={classes.form} noValidate autoComplete="off" >
                <div className={classes.formInput}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle fontSize="large" />
                        </Grid>

                        <Grid item className={classes.gridItem}>
                            <TextField
                                id="username"
                                name="username"
                                label="Username"
                                type="text"
                                value={values.username}
                                onChange={onChange}
                                variant="outlined"
                                fullWidth
                                className={classes.input}
                                error={errors.username ? true : false}
                                required
                            />
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.formInput}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon fontSize="large" />
                        </Grid>

                        <Grid item className={classes.gridItem}>
                            <FormControl className={classes.input} variant="outlined" fullWidth error={errors.password ? true : false} required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    name="password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={onChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={passwordVisibility}
                                                edge="end"
                                                className={classes.visibilityIcon}
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={90}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.formInput}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                </Button>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className={classes.formInput}>
                        <Alert variant="filled" severity="error">
                            {Object.values(errors).map((value) => (
                                <li key={value}>{value}</li>
                            ))}
                        </Alert>
                    </div>
                )}
            </form>
        </Container>
        
    )
}