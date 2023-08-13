import React, { useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState([]);
  

  const signup = async (email, password, name, cpf, images, rule) => {
    const promises = [];
    try {
      const docRef = collection(db, "users");
      if (images) {
        images.map((image) => {
          const storageRef = ref(storage, `users/${email}/${image?.name}`);
          const uploadTask = uploadBytesResumable(storageRef, image);
          promises.push(uploadTask);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

              console.log("Upload is " + progress + "% done");
              setProgress(progress);
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  break;
              }
            },
            (error) => {
              switch (error.code) {
                case "storage/unauthorized":
                  break;
                case "storage/canceled":
                  break;
                case "storage/unknown":
                  break;
                default:
                  break;
              }
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  console.log("url", downloadURL);
                  const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                  )                  
                  const user = userCredential.user;
                  console.log(`userSignUp`, user)
                  await sendEmailVerification(user)
                  await updateProfile(user, {
                    displayName: name,
                    photoURL: downloadURL,
                  });

                  await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    displayName: name,
                    cpf: cpf,
                    email,
                    photoURL: downloadURL,
                    rule: rule
                  });
                }
              );
            }
          );
        });
      }
    } catch (error) {
      console.log(error.message);
    }

    // return userCredential
  };

  const login = async (email, password) => {
    const validacao = await signInWithEmailAndPassword(auth, email, password);
    return validacao;
  }

  const logout = async () => {
    return signOut(auth);
  }

  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  }

  const updateEmail = async (usuario, email) => {
    return updateEmail(usuario, email);
  }

  const updatePassword = async (usuario, password) => {
    return updatePassword(usuario, password);
  }

  const verifyUser = () => {
    const verify = sendEmailVerification(auth.currentUser).then(result => {
    }).catch(message => console.log(message))
    return verify
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const colletionRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(colletionRef);
        const userFull = { ...user }
        userFull.usuario = docSnap.data();
        setCurrentUser(userFull);
      } else {
        setCurrentUser(user);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    verifyUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
