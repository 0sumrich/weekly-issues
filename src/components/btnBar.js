import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

const useStyles = makeStyles(theme => {
  console.log(theme.palette.grey[500]);
  return {
    wrapper: {
      textAlign: "center"
    },
    button: {
      cursor: "pointer",
      margin: theme.spacing(0.5)
    },
    active: {
      color: "red"
    }
  };
});

const BtnBar = ({ handleClick, activeLib, libraries }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {libraries.map(lib => {
        console.log(clsx(classes.button, { active: lib === activeLib }));
        return (
          <Button
            key={lib}
            variant="outlined"
            className={clsx({ active: lib === activeLib }, classes.button)}
          >
            {lib}
          </Button>
        );
      })}
    </div>
  );
};
export default BtnBar;
