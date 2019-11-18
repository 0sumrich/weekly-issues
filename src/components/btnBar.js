import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => {
  console.log(theme);
  return {
    wrapper: {
      textAlign: "center"
    },
    button: {
      cursor: "pointer",
      margin: theme.spacing(0.5)
    }
  };
});

const BtnBar = ({ handleClick, activeLib, libraries }) => {
  const classes = useStyles();
  return (
    <div>
      {libraries.map(lib => {
        return (
          <Button variant="outlined" className={classes.button}>
            {lib}
          </Button>
        );
      })}
    </div>
  );
};
export default BtnBar;
