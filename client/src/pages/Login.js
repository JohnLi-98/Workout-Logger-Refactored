import React, { useContext, useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";
import { useMutation } from "@apollo/client";

import { formStyles } from "../util/common-styling";
import { useForm } from "../util/form-hooks";
import { LOGIN_USER } from "../util/graphql-operations";
import { AuthContext } from "../context/auth";

export default function Login(props) {
  const classes = formStyles();
  const context = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    console.log("backdrop closing");
  };
  const handleToggle = () => {
    setOpen(!open);
    console.log("backdrop");
  };

  const [errors, setErrors] = useState({});
  const loginUserCallback = () => {
    handleToggle();
    loginUser();
  };
  const { onChange, onSubmit, passwordVisibility, values } = useForm(
    loginUserCallback,
    {
      username: "",
      password: "",
      showPassword: false,
    }
  );

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      handleClose();
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  return (
    <Container maxWidth="md">
      <div className={classes.heading}>
        <h1>LOGIN</h1>
      </div>

      <form
        onSubmit={onSubmit}
        className={classes.form}
        noValidate
        autoComplete="off"
      >
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
              <FormControl
                className={classes.input}
                variant="outlined"
                fullWidth
                error={errors.password ? true : false}
                required
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={values.showPassword ? "text" : "password"}
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
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
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

      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
