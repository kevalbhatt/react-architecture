const Constants = {
	baseUrl: window.location.pathname.replace(/\/[\w-]+.(jsp|html)|\/+$/gi, "/"),
	originUrl: window.location.origin
};

Constants.api = {
	baseUrl: Constants.baseUrl + "api"
};

Constants.mimeTypeFormat = {
	formate: "image/jpeg,image/png,application/pdf"
};

export default Constants;