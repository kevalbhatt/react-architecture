export default theme => ({
	drawer: {
		width: theme.drawerWidth,
		boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
		flexShrink: 0,
		whiteSpace: "nowrap",
		"& img.logo": {
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			})
		}
	},
	drawerOpen: {
		width: theme.drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		"& img.logo": {
			width: `calc(${theme.drawerWidth}px - 34px)`
		}
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.down("sm")]: {
			width: theme.spacing(7) + 1
		},
		"& img.logo": {
			width: `${theme.collapsedDrawerWidth}px`
		}
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		...theme.mixins.toolbar
	},
	toolbarOpen: {
		padding: "17px"
	},
	toolbarClose: {
		padding: "10px"
	}
});