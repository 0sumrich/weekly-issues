import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonGroup, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    cursor: "pointer"    
  }
}));

const BtnBar = ({ handleClick, activeLib, libraries }) => {
  const classes = useStyles();
  return (
    <ButtonGroup>
      {libraries.map(lib => {
        return (
          <Button variant="outlined" className={classes.button}>
            {lib}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
export default BtnBar;
