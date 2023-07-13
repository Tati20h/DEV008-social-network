import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth';
import {
  setDoc,
  doc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import {
  auth,
  googleProvider,
  db,
} from './config.js';

/*
|-----------------------------------------|
|             Register - SignUp           |
|-----------------------------------------|
*/
export const signUp = async (user) => {
  try {
    const firebaseUser = await createUserWithEmailAndPassword(auth, user.email, user.password);

    await setDoc(doc(db, 'users', firebaseUser.user.uid), {
      first_name: user.name,
      last_name: user.lastName,
      username: user.username,
      email: user.email,
      picture: '',
    });
    window.location.assign('/login');
    window.alert('Registro exitoso');
  } catch (error) {
    console.log({ error });
  }
};

// export const getUser = async (email) => new Promise((resolve, reject) => {
//   const user = [];
//   const usersRef = collection(db, 'users');
//   const q = query(usersRef, where('email', '==', email));
//   getDocs(q)
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         user.push(doc.data());
//         return doc.data();
//       });
//       console.log(user);
//       resolve(user[0]);
//     }).catch((error) => {
//       reject(error);
//     });
// });

export const getCurrentUser = () => auth.currentUser.email;
/*
|-----------------------------------------|
|             Loguin - signInGoogle       |
|-----------------------------------------|
*/
export const signInGoogle = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredentials = await signInWithPopup(auth, googleProvider);
    await setDoc(doc(db, 'users', userCredentials.user.uid), {
      first_name: userCredentials.user.displayName,
      last_name: '',
      username: userCredentials.user.displayName,
      email: userCredentials.user.email,
      picture: userCredentials.user.photoURL,
    });
    localStorage.setItem('userCredentials', JSON.stringify({
      userID: userCredentials.user.uid,
      username: userCredentials.user.displayName,
      picture: userCredentials.user.photoURL,
    }));
    window.location.assign('/feed');
    window.alert('Ingreso Exitoso');
  } catch (error) {
    console.error(error);
  }
};

/*
|-----------------------------------------|
|              Loguin - signIn            |
|-----------------------------------------|
*/
export const signIn = async (user) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredentials = await signInWithEmailAndPassword(auth, user.email, user.password);

    console.log(userCredentials);
    localStorage.setItem('userCredentials', JSON.stringify({
      email: userCredentials.user.email,
      userID: userCredentials.user.uid,
    }));
    window.location.assign('/feed');
    window.alert('Ingreso Exitoso');
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
};
/*
|-----------------------------------------|
|             POST - savePost             |
|-----------------------------------------|
*/
export const savePost = async (text) => (
  addDoc(collection(db, 'post'), {
    text,
    author: doc(db, '/users', auth.currentUser.uid),
    timeline: Date.now(),
    liked_by: [],
  })
);
/*
|-----------------------------------------|
|             POST - showPosts            |
|-----------------------------------------|
*/
export const showPosts = async () => getDocs(query(collection(db, 'post'), orderBy('timeline', 'asc')));
/*
|-----------------------------------------|
|             POST - updatePost           |
|-----------------------------------------|
*/
export const updatePost = (newPost, post) => {
  const user = auth.currentUser.uid;
  const connDocRef = doc(db, 'post', post);
  return updateDoc(connDocRef, { postContent: newPost, nowdate: serverTimestamp() });
};
/*
|-----------------------------------------|
|             POST - deletePost           |
|-----------------------------------------|
*/
export const deletePost = (post) => {
  const user = auth.currentUser.uid;
  deleteDoc(doc(db, 'post', post))
    .then(() => {
      console.log('Post eliminado', post);
      console.log('del Usuario', user);
    })
    .catch((error) => {
      console.error('Error al eliminar el post:', error);
    });
};
/*
|-----------------------------------------|
|             Recover password            |
|-----------------------------------------|
*/
export const listenPost = (addPost) => {
  onSnapshot(
    collection(db, 'post'),
    (querySnapshot) => {
      querySnapshot.forEach((document) => {
        addPost(document.data());
      });
    },
  );
};

export const getUserByUserID = (userid) => getDoc(doc(db, 'users', userid))
  .then((user) => user.data());
