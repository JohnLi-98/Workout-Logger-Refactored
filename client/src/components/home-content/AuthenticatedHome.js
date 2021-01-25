import React from "react";
import {
  ButtonBase,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import workoutImage from "../../images/workout.png";
import exerciseImage from "../../images/exercise.png";
import AddSetModal from "./AddSetModal";

const useStyles = makeStyles((theme) => ({
  heading: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 0"
  },
  addSetIcon: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingRight: "30px !important"
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.up("sm")]: {
        height: 250,
      },
    [theme.breakpoints.up("md")]: {
      height: 300,
    },
    [theme.breakpoints.up("lg")]: {
        height: 350,
      },
    width: "100%",
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.6,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

export default function AuthenticatedHome({ user }) {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <div className={classes.heading}>
            <h1>Welcome back, {user.username}.</h1>
          </div>
        </Grid>

        <Grid item xs={2} className={classes.addSetIcon}>
            <AddSetModal />
        </Grid>


        <Grid item xs={6}>
          <ButtonBase
            key="Workout"
            className={classes.image}
            component={RouterLink}
            to="/my-workout-logs"
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${workoutImage})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                Workout Logs
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        </Grid>

        <Grid item xs={6}>
          <ButtonBase
            key="Exercise"
            className={classes.image}
            component={RouterLink}
            to="/my-exercise-logs"
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${exerciseImage})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                Exercise Logs
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        </Grid>
      </Grid>
    </Container>
  );
}
