import React from "react";
import classNames from "classnames";

//@material-ui
import { AppBar, Toolbar, IconButton, withStyles } from "@material-ui/core";
import { Menu as MenuIcon, Close as CloseIcon } from "@material-ui/icons";

import styles from "./styles";

const Header = ({ handleDrawerOpen, handleDrawerClose, open, classes }) => {
  return (
    <AppBar
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: open
      })}
    >
      <Toolbar>
        {open ? (
          <IconButton aria-label="Close drawer" onClick={handleDrawerClose} edge="start" className={classNames(classes.menuButton)}>
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton aria-label="Open drawer" onClick={handleDrawerOpen} edge="start" className={classNames(classes.menuButton)}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Header);