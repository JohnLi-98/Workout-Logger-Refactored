import React from "react";
import { Container, makeStyles, Paper } from "@material-ui/core";
import { useQuery } from "@apollo/client";

import { FETCH_WORKOUT_LOGS } from "../util/graphql-operations";
import WorkoutLogsTable from "../components/logs-content/WorkoutLogsTable";

const useStyles = makeStyles({
    paper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "300px"
    }
})

export default function WorkoutLogs() {
    const classes = useStyles();

    const { loading, data: { getAllWorkoutLogs: workoutLogs } = {} } = useQuery(
        FETCH_WORKOUT_LOGS,
        {
            fetchPolicy: "cache-and-network"
        }
    );
    
    return (
        <Container maxWidth="md">
            <Paper>
                <h1>Workout Logs</h1>
            </Paper>
            {loading ? (
                <Paper className={classes.paper}>
                   <h1>Retrieving logs...</h1> 
                </Paper>
                
            ) : (
                <>
                <WorkoutLogsTable workouts={workoutLogs} />                 
                </>
            )}            
        </Container>
    )
}