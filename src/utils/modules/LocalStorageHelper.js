"use strict";
import { extend, merge, isObject, isStringJSON } from "lodash";

const _merge = merge;
const LocalStorageHelper = {
  remove: function(key) {
    localStorage.removeItem(key);
  },
  get: function(key) {
    if (key) {
      let data = localStorage.getItem(key);
      if (data) {
        return isStringJSON(data) ? JSON.parse(data) : data;
      } else {
        return data;
      }
    }
  },
  set: function({ key, val, replace, merge, specificKey }) {
    if (isObject(val)) {
      if (!replace && !merge) {
        let storeData = this.get(key) || {};
        if (specificKey && storeData[specificKey] && val[specificKey]) {
          val = extend({}, storeData, val[specificKey]);
        } else {
          val = extend({}, storeData, val);
        }
      } else if (merge) {
        let storeData = this.get(key);
        val = _merge(storeData, val);
      }
      val = JSON.stringify(val);
    }
    localStorage.setItem(key, val);
  },
  replace: function(options) {
    this.set(extend(options, { replace: true }));
  },
  has: function(key) {
    return this.get(key) ? true : false;
  }
};
export default LocalStorageHelper;