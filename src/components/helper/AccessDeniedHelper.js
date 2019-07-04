import React from "react";

const AccessDeniedHelper = props => {
  const { getLinkOnClick, content } = props;
  const navigateToDashBoard = () => {
    let targetUrl = getLinkOnClick();
    window.location.href = targetUrl;
  };

  return content ? (
    content
  ) : (
    <div className="text-center">
      <h2 className="red">
        <i className="nicon-user-lock" />
        Access Denied
      </h2>
      <div className="teal m-t-md">
        <h4>You do not have access to the requested page</h4>
        {getLinkOnClick ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              navigateToDashBoard();
            }}
          >
            Go to Dashboard
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default AccessDeniedHelper;