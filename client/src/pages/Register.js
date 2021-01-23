import React, { useState } from "react";
import { Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert"
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { formStyles } from "../util/common-styling";
import { useForm } from "../util/form-hooks";

export default function Register(props) {
    const classes = formStyles();

    const [errors, setErrors] = useState({});

    const registerUser = () => console.log("Registering users");
    const { onChange, onSubmit, passwordVisibility, confirmPasswordVisibility, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmedPassword: false
    });

    return (
        <Container maxWidth="md">
            <h1>This is the register page</h1>
            <form className={classes.form} noValidate autoComplete="off">
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
                            <EmailIcon fontSize="large" />
                        </Grid>

                        <Grid item className={classes.gridItem}>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                value={values.email}
                                onChange={onChange}
                                variant="outlined"
                                fullWidth
                                className={classes.input}
                                error={errors.email ? true : false}
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
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon fontSize="large" />
                        </Grid>

                        <Grid item className={classes.gridItem}>
                            <FormControl className={classes.input} variant="outlined" fullWidth error={errors.confirmPassword ? true : false} required>
                                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={values.showConfirmPassword ? 'text' : 'password'}
                                    value={values.confirmPassword}
                                    onChange={onChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={confirmPasswordVisibility}
                                                edge="end"
                                                className={classes.visibilityIcon}
                                            >
                                                {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={160}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.formInput}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Register
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