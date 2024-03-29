// Material helpers
import { createMuiTheme } from "@material-ui/core";

import palette from "./palette";
import typography from "./typography";
import overrides from "./overrides";

const theme = createMuiTheme({
	palette,
	typography,
	overrides,
	drawerWidth: 240,
	collapsedDrawerWidth: 57,
	zIndex: {
		appBar: 1200,
		drawer: 1100
	}
});

export default theme;