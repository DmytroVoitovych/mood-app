import { ElMessage, ElMessageBox, ElNotification, FormItemRule } from "element-plus";
import { FirebaseError } from "firebase/app";
import { fetchSignInMethodsForEmail, getAuth, sendPasswordResetEmail } from "firebase/auth";

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
  cancelled: "auth/popup-closed-by-user",
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
        type: "info",
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

export const errorResetLinkSendingInform = (err: FirebaseError) => {
  return ElMessageBox.alert(err.message || "Error sending reset link. Please try again.", {
    showClose: false,
    confirmButtonText: "OK",
    title: "Error",
    customClass: "errAlertTitle",
  });
};

const send = ({ value }: { value: string }) => {
  return fetchSignInMethodsForEmail(getAuth(), value)
    .then((userList) => !userList.length && Promise.reject(new Error("Email was not registrated")))
    .then(() => sendPasswordResetEmail(getAuth(), value))
    .then(() =>
      ElMessage({
        type: "success",
        message: `We sent reset link on your email`,
      }),
    )
    .catch(errorResetLinkSendingInform);
};

const sendResetLink = () => {
  ElMessageBox.prompt("Please input your e-mail", "Password reset", {
    confirmButtonText: "Send reset link",
    cancelButtonText: "Cancel",
    inputPattern:
      /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: "Invalid Email",
  })
    .then(send)
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Input canceled",
      });
    });
};

export { formEmailRules, formPasswordRules, googleAuthErrorHandler, sendResetLink };
