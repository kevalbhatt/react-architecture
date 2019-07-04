import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  progress: {
    marginLeft: "50%"
  }
}));

export default function LoadingHelper(props) {
  const classes = useStyles();
  const { loading, children, component } = props;

  return loading !== undefined && (loading === null || loading === true || loading.length === 0) ? (
    component ? (
      component
    ) : (
      <CircularProgress className={classes.progress} />
    )
  ) : (
    children || null
  );
}

LoadingHelper.defaultProps = {
  component: null
};