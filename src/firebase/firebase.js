import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getRedirectResult,
} from 'firebase/auth';
import { auth, googleProvider } from './config.js';

const provider = new GoogleAuthProvider();
export const signUp = (user) => {
  createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      const userCreated = userCredential.user;
      console.log(userCredential);

      return userCreated;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, "", errorMessage);
      return error;
    });
};

export const signInGoogle = () => {
  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = googleProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log('Este usuario se logueo con google',
        user,
        'y el token',
        token);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = googleProvider.credentialFromError(error);
      console.log(credential);
      console.log(errorCode, errorMessage, email);
    });
};

// SignIn
export const signIn = (user) => {
  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      console.log('usefb', userCredential);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};