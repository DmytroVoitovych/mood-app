import { ElNotification } from "element-plus";

const registrationFirebaseCode: { email: string; weak: string; exists: string } = {
  email: "auth/invalid-email",
  weak: "auth/weak-password",
  exists: "auth/email-already-in-use",
};

const firebaseCode: { email: string; password: string; account: string } = {
  email: "auth/invalid-credential",
  password: "auth/wrong-password",
  account: "auth/user-not-found",
};

const registrationErrorHandler = (errorCode: string) => {
  switch (errorCode) {
    case registrationFirebaseCode.email:
      ElNotification({
        title: "Registration error",
        message: "Please enter a valid email address",
        type: "error",
      });
      break;
    case registrationFirebaseCode.weak:
      ElNotification({
        title: "Registration error",
        message: "Password should be at least 6 characters long",
        type: "error",
      });
      break;
    case registrationFirebaseCode.exists:
      ElNotification({
        title: "Registration error",
        message: "An account with this email already exists",
        type: "error",
      });
      break;
    default:
      ElNotification({
        title: "Registration error",
        message: "Registration failed. Please try again",
        type: "error",
      });
      break;
  }
};

const authErrorHandler = (errorCode: string) => {
  console.log(errorCode);
  switch (errorCode) {
    case firebaseCode.email:
      ElNotification({
        title: "Login error",
        message: "invalid-credential",
        type: "error",
        customClass: "successInfo ",
      });
      break;
    case firebaseCode.password:
      ElNotification({
        title: "Login error",
        message: "incorect password",
        type: "error",
        customClass: "successInfo ",
      });
      break;
    case firebaseCode.account:
      ElNotification({
        title: "Login error",
        message: "Account does not exist",
        type: "error",
        customClass: "successInfo ",
      });
      break;
    default:
      ElNotification({
        title: "Login error",
        message: "wrong password or email",
        type: "error",
        customClass: "successInfo ",
      });
      break;
  }
};

export { registrationErrorHandler, authErrorHandler };
