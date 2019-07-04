import Constants from "utils/Constants";
import openSocket from "socket.io-client";

class WebsocketService {
  constructor(options) {
    this.socket = {};
  }

  connect(url) {
    this.socket = openSocket(url || Constants.originUrl);
    return this.socket;
  }

  on({ eventName, listenEvent, subscribe, updateInterval }) {
    this.socket.on(eventName, listenEvent);
    if (subscribe) {
      this.socket.emit(`Subscribe-${eventName}`, { updateInterval: updateInterval || 3000 });
    }
  }

  subscribeItem(subItem = {}) {}

  sendItem(item) {}

  subscribe(options = {}) {}

  unsubscribe(stubObj) {}

  send(options) {}

  destroyConnection(options) {}
}

export default new WebsocketService();