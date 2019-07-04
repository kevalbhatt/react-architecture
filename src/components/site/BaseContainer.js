import React, { Fragment } from "react";
import Header from "components/site/header";
import Sidebar from "components/site/sidebar";
import { Redirect } from "react-router";
import { Route, Switch } from "react-router-dom";
import { extend } from "lodash";

//@material-ui
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function BaseContainer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { routes } = props;

  const propsMerge = extend({}, props, {
    theme: theme,
    open: open
  });

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <Header {...propsMerge} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
        <Sidebar {...propsMerge} handleDrawerClose={handleDrawerClose} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {routes.map(val => {
              return <Route exact={true} path={val.path} key={val.key} component={c_props => <val.component {...propsMerge} {...c_props} />} />;
            })}
            <Redirect from="/" to="dashboard" />
          </Switch>
        </main>
      </div>
    </Fragment>
  );
}