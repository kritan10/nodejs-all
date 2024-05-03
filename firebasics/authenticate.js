import { getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";

async function signInUser(email, password) {
  try {
    const firebase = getApp();
    const auth = getAuth(firebase);
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

async function signUpUser(email, password) {
  try {
    const firebase = getApp();
    const auth = getAuth(firebase);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

async function sendEmailVerifyMail(email) {
  try {
    const firebase = getApp();
    const auth = getAuth(firebase);
    const res = await sendEmailVerification(auth, email, password);
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export { signInUser, signUpUser };
