import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const BtnBar = ({ handleClick, activeLib, libraries }) => {
  const classes = useStyles();
  return (
    <div>
      <Button className={classes.button}>{libraries[0]}</Button>
    </div>
  );
};
export default BtnBar;
