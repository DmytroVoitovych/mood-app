import MainFormElements from "./MainFormElements.vue";
import ForgotPassword from "./ForgotPassword.vue";
import { ElNotification, FormItemRule } from "element-plus";

import ResetPassword from "./ResetPassword.vue";

const formEmailRules: FormItemRule[] = [
  {
    type: "email",
    message: "Invalid email format.",
    trigger: ["blur"],
  },
];

const formPasswordRules: FormItemRule[] = [
  {
    min: 8,
    trigger: "blur",
    message: "Password must be at least 8 characters",
  },
];

const googleAuthFirebaseCode: { popup: string; cancelled: string; network: string } = {
  popup: "auth/popup-blocked",
  cancelled: "auth/cancelled-popup-request",
  network: "auth/network-request-failed",
};

const googleAuthErrorHandler = (errorCode: string) => {
  switch (errorCode) {
    case googleAuthFirebaseCode.popup:
      ElNotification({
        title: "Google Login Error",
        message: "Please allow popups for this site to login with Google",
        type: "error",
      });
      break;
    case googleAuthFirebaseCode.cancelled:
      ElNotification({
        title: "Google Login Cancelled",
        message: "Google sign in was cancelled",
        type: "error",
      });
      break;
    case googleAuthFirebaseCode.network:
      ElNotification({
        title: "Network Error",
        message: "Please check your internet connection and try again",
        type: "error",
      });
      break;
    default:
      ElNotification({
        title: "Login Error",
        message: "Google sign in failed. Please try again",
        type: "error",
      });
      break;
  }
};

export { formEmailRules, formPasswordRules, googleAuthErrorHandler };
