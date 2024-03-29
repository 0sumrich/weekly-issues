import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

const useStyles = makeStyles(theme => {
  return {
    wrapper: {
      textAlign: "center",
      maxWidth: 950,
      margin: "auto"
    },
    button: {
      cursor: "pointer",
      margin: theme.spacing(0.5)
    },
    active: {
      background: theme.palette.grey[200],
      border: `1px solid ${theme.palette.grey[700]}`
    }
  };
});

const BtnBar = ({ handleClick, activeLib, libraries }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {libraries.map(lib => {
        return (
          <Button
            key={lib}
            variant="outlined"
            className={clsx(classes.button, {
              [classes.active]: lib === activeLib
            })}
            onClick={handleClick}
          >
            {lib}
          </Button>
        );
      })}
    </div>
  );
};
export default BtnBar;
