import { toast } from "react-toastify";
import { extend } from "lodash";

toast.configure({
  autoClose: 8000,
  draggable: false,
  position: toast.POSITION.TOP_LEFT
});

export default {
  notifySuccess(options = {}) {
    toast.success();
  },
  notifyError(options = {}) {
    options = extend(
      {
        message: "Something went wrong please try again later!"
      },
      options
    );
    toast.error();
  },
  notifyInfo(options = {}) {
    toast.info();
  },
  notifyWarning(options = {}) {
    toast.warn();
  }
};