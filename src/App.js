import React from "react";
import { HashRouter } from "react-router-dom";
import { withRouter } from "react-router";
import { createBrowserHistory } from "history";
import { ToastContainer } from "react-toastify";

// Material helpers
import { ThemeProvider } from "@material-ui/styles";

// Theme
import theme from "./theme";

import BaseContainer from "components/site/BaseContainer";
import BaseComponent, { LoadingHelper } from "components/site/BaseComponent";
import { ScrollToTop } from "components/helper";
import DefaultRouter from "routes";

const history = createBrowserHistory();
export default class App extends BaseComponent {
  constructor(props) {
    super(props);
    this.routes = DefaultRouter;
    this.state = {
      loading: true
    };
  }

  setLoading(state) {
    this.setState({
      loading: state
    });
  }

  render() {
    const BaseContainerWithRouter = withRouter(props => <BaseContainer {...props} routes={this.routes} />);
    return (
      <ThemeProvider theme={theme}>
        <LoadingHelper loading={this.loading}>
          <HashRouter history={history}>
            <div>
              <BaseContainerWithRouter />
            </div>
          </HashRouter>
        </LoadingHelper>
        <ToastContainer />
        <ScrollToTop scrollStepInPx="50" delayInMs="16.66" />
      </ThemeProvider>
    );
  }
}