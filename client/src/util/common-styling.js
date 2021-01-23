import { makeStyles } from "@material-ui/core";

export const formStyles = makeStyles((theme) => ({
    form: {
        margin: "auto",
        [theme.breakpoints.up("sm")]: {
          width: "500px",
        },
      },
      formInput: {
        margin: theme.spacing(2),
      },
      gridItem: {
        flexGrow: 1,
      },
      input: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ffffff",
          borderWidth: 2,
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "#99aab5",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#7289da",
        },
        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: "#f44336",
        },
        "& .MuiOutlinedInput-input": {
          color: "#ffffff",
        },
        "&:hover .MuiOutlinedInput-input": {
          color: "#99aab5",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
          color: "#7289da",
        },
        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-input": {
          color: "#f44336",
        },
        "& .MuiInputLabel-outlined": {
          color: "#ffffff",
        },
        "&:hover .MuiInputLabel-outlined": {
          color: "#99aab5",
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
          color: "#7289da",
        },
        "& .MuiInputLabel-outlined.Mui-error": {
          color: "#f44336",
        },
      },
      visibilityIcon: {
        color: "white",
      },
}));