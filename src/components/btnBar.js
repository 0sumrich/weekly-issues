import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  wrapper: {
    textAlign: 'center'
  },
  button: {
    cursor: "pointer",
    margin: theme.spacing(1)
  }
}));

const BtnBar = ({ handleClick, activeLib, libraries }) => {  
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Button variant="outlined" className={classes.button}>
        {libraries[0]}
      </Button>
    </div>
  );
};
export default BtnBar;
