import Constants from "utils/Constants";
import ApiHelper from "utils/ApiHelper";
import querystring from "querystring";
import fetchIntercept from "fetch-intercept";
import { isString, includes, isObject, each } from "lodash";

import SessionService from "services/SessionService";
import { getLinkOnLogoClick } from "utils/Utils";
import { NotificationHelper, AccessDeniedHelper } from "components/helper";
import ReactDOM from "react-dom";
import React from "react";
import _ from "lodash";
const isProd = false;

let fetchInterceptInstance = null, // singleton object ref
  contentBlobTypes = Constants.mimeTypeFormat.formate.split(",");

export default class BaseService {
  constructor(options) {
    this.sessionService = SessionService;
    if (!fetchInterceptInstance) {
      fetchInterceptInstance = fetchIntercept.register({
        request: this.beforeCallInterceptors, // Modify the url or config here
        requestError: function(error) {
          // Called when an error occurred during another 'request' interceptor call
          return Promise.reject(error);
        },
        response: this.onResponseInterceptors, // Modify the response object
        responseError: this.onErrorInterceptors // Handle an fetch error
      });
    }
  }

  unregisterInterceptors() {
    fetchInterceptInstance();
  }
  checkStatus(response) {
    // 3. Based on the status send promise state.
    if (response.status >= 200 && response.status < 300) {
      if (!isProd) {
        console.log(this.constructor.name + "_Sucess=>" + response.url, response.data);
      }
      return response;
    } else {
      console.log(this.constructor.name + "_Errror=>" + response.url, response);
      return this.onErrorInterceptors(response);
      // throw error
    }
  }

  parseJSON(response) {
    // 2. Parse the data.
    var contentType = response.headers.get("content-type");
    if (response.status === 204 && !contentType) {
      return Promise.resolve({ data: null, status: response.status, statusText: response.statusText, url: response.url });
    }
    if (contentType && contentType.indexOf("application/json") > -1) {
      if (response.status === 204) {
        return Promise.resolve({ data: null, status: response.status, statusText: response.statusText, url: response.url });
      } else {
        return response.json().then(data => {
          return { data: data, status: response.status, statusText: response.statusText, url: response.url };
        });
      }
    } else if (includes(contentBlobTypes, contentType)) {
      return response.blob().then(blob => {
        return { data: blob, status: response.status, statusText: response.statusText, url: response.url, body: response.body };
      });
    } else {
      return response.text().then(data => {
        return { data: data, status: response.status, statusText: response.statusText, url: response.url };
      });
    }
  }
  onResponseInterceptors = response => {
    // 1. First response Interceptor calls
    if (response && response.redirected && response.url) {
      window.location.href = response.url;
      return Promise.resolve({ data: null, status: response.status, statusText: response.statusText, url: response.url });
    } else {
      return this.parseJSON(response).then(responseJSON => {
        // 3. check the status.
        return this.checkStatus(responseJSON);
      });
    }
  };
  onErrorInterceptors = error => {
    let setErrorMessage = function(msg = "Something Went wrong!!") {
      if (isString(error.data)) {
        error.data = {
          msgDesc: msg
        };
      } else {
        error.data.msgDesc = error.data && error.data.msgDesc ? error.data.msgDesc : msg;
      }
    };
    if (error && error.status === 401) {
      setErrorMessage("Authentication failed !!");
      window.location = "logout.html?ts=" + Date.now();
    } else if (error && error.status === 403) {
      setErrorMessage("Sorry, you don't have permission to perform this operation");
      ReactDOM.render(<AccessDeniedHelper getLinkOnClick={getLinkOnLogoClick} />, document.getElementById("r_content"));
    } else if (error && error.status === 504) {
      setErrorMessage("Please check your internet connection");
    } else {
      setErrorMessage();
    }
    NotificationHelper.notifyError({ message: error.data.msgDesc });
    return Promise.reject(error);
  };
  beforeCallInterceptors = (config = {}) => {
    let url = "";
    if (config && config.url) {
      if (config.skipApiHelper) {
        url = config.url;
      } else {
        url = this.getApiUrl(config.url, config.pathParam);
      }
    } else if (isString(config)) {
      url = config;
    }
    var defaultHeaders = {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest"
    };
    if (config && isObject(config)) {
      if (config.body && typeof config.body === "object") {
        if (config.method === "POST" || config.method === "PUT") {
          defaultHeaders["Content-Type"] = "application/json";
          if (config.querystring) {
            config.body = querystring.stringify(config.body);
          } else if (config.formData) {
            // if we delete/unset the content-type header, Expecting the plugin to add the content-type on its own
            delete defaultHeaders["Content-Type"];
            var form = new FormData();
            each(config.body, function(v, k) {
              let value = v;
              if (k === "fileObj") {
                let file = value.file;
                if (value.paramName && file.name && file.mimeType) {
                  form.append(value.paramName, new Blob([file.name], { type: file.mimeType }), file.name);
                }
              } else {
                if (_.isObject(value)) {
                  value = JSON.stringify(value);
                }
                form.append(k, value);
              }
            });
            config.body = form;
          } else {
            config.body = JSON.stringify(config.body);
          }
        }
      }
      if (config.queryParam) {
        _.extend(config.queryParam, { t: new Date().getTime() });
      } else {
        config.queryParam = {
          t: new Date().getTime()
        };
      }
      if (querystring && config.queryParam) {
        url = url + "?" + querystring.stringify(config.queryParam);
      }
      if (!config.replaceHeaders) {
        config.headers = Object.assign(defaultHeaders, config.headers);
      }
      Object.assign(config, { credentials: "include" });
    }
    return [url, _.isObject(config) ? config : {}];
  };
  getApiUrl(url, pathParam) {
    let urlString = url.split(".").reduce(function(prev, curr) {
      return prev ? prev[curr] : null;
    }, ApiHelper);
    if (pathParam) {
      _.keys(pathParam).forEach(key => {
        urlString = _.replace(urlString, ":" + key, pathParam[key]);
      });
    }
    return urlString;
  }
  getBaseUrl() {
    return this.sessionService.getBaseUrl();
  }
  getApiBaseUrl() {
    return this.sessionService.getApiBaseUrl();
  }
}