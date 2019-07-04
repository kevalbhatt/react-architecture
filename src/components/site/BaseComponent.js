import React, { Component } from "react";
import { LoadingHelper } from "components/helper";

export default class BaseComponent extends Component {
	showLoader(options) {
		if (options.type === "fa") {
			return <i className="nicon-spinner10 nicon-spinning" {...options} />;
		} else {
			return <LoadingHelper loading={true} type={"ball-pulse"} {...options} />;
		}
	}
}
export { LoadingHelper };