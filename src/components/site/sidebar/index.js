import React from "react";
import classNames from "classnames";

//@material-ui
import { withStyles, List, ListItem, ListItemIcon, ListItemText, Divider, Drawer } from "@material-ui/core";
import { MoveToInbox as InboxIcon, Mail as MailIcon } from "@material-ui/icons";

import styles from "./styles";

const SideBar = ({ handleDrawerClose, open, theme, classes, routes }) => {
	return (
		<Drawer
			variant="permanent"
			className={classNames(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open
			})}
			classes={{
				paper: classNames({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open
				})
			}}
			open={open}
		>
			<div
				className={classNames(classes.toolbar, {
					[classes.toolbarOpen]: open,
					[classes.toolbarClose]: !open
				})}
			>
				<h4>TEst</h4>
			</div>
			<Divider />
			<List>
				{["Dashboard"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						{open ? <ListItemText primary={text} /> : null}
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["All mail"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							<MailIcon />
						</ListItemIcon>
						{open ? <ListItemText primary={text} /> : null}
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};

export default withStyles(styles)(SideBar);