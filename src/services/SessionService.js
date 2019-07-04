import _ from "lodash";

import Constants from "utils/Constants";
import UserSessionService from "services/sessions/UserSessionService";
import UtilSessionService from "services/sessions/UtilSessionService";

class SessionService {
  constructor() {
    this.userSession = {};
    _.extend(this, UtilSessionService, UserSessionService);
  }
  getUserSession() {
    return this.userSession;
  }
  getBaseUrl() {
    return Constants.baseUrl;
  }
  getApiBaseUrl() {
    return Constants.api.baseUrl;
  }
  clearSession() {
    this.userSession = null;
  }
}

export default new SessionService();
