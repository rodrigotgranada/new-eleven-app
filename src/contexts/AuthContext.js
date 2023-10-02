import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db, storage } from "../firebase";
import useLogs from "../hooks/useLogs";
import useAuthData from "../hooks/useAuthData";
import useWhatsappApi from "../hooks/useWhatsappApi";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState([]);
  const { logUser } = useLogs();
  const { sendWelcome, sendConfirm, sendAgendamento, sendConfirmPT } =
    useWhatsappApi();

  const { getDataId } = useAuthData();

  const signup = async (
    email,
    password,
    name,
    surname,
    telefone,
    documento,
    images,
    rule
  ) => {
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
                    .then(async (usuario) => {
                      const user = usuario.user;
                      console.log(`userSignUp`, user);
                      await sendEmailVerification(user);
                      await updateProfile(user, {
                        displayName: name,
                        photoURL: downloadURL,
                      });
                      await setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        displayName: name,
                        sobrenome: surname,
                        documento: documento,
                        telefone: telefone,
                        email,
                        photoURL: downloadURL,
                        rule: rule,
                        checked: false,
                        owner: false,
                      });
                    })
                    .catch((error) => console.log(error));
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

  const signup2 = async (
    email,
    password,
    name,
    surname,
    telefone,
    documento,
    images,
    rule
  ) => {
    try {
      const codAuth = Math.floor(Math.random() * 900000) + 100000;
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (usuario) => {
          const user = usuario.user;
          console.log(`userSignUp`, user);
          await sendEmailVerification(user);
          await updateProfile(user, {
            displayName: name,
          });

          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: name,
            sobrenome: surname,
            documento: documento,
            telefone: telefone,
            email,
            photoURL: images,
            rule: rule,
            status: true,
            checked: false,
            owner: false,
            codAuth: codAuth,
          });
        })
        .then(async (user) => {
          console.log("usss", user);
          console.log("codAuth", codAuth);
          await sendConfirmPT(telefone, codAuth);
        })
        .then(async () => await signOut(auth))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error.message);
    }
  };

  const atualizaVerificado = async (usuario) => {
    try {
      const docRef = doc(db, "users", usuario.uid);
      const snap = await updateDoc(docRef, { checked: true }).then(
        async (e) => {
          const colletionRef = doc(db, "users", usuario.uid);
          const docSnap = await getDoc(colletionRef);
          const userFull = { ...usuario };
          userFull.usuario = docSnap.data();
          setCurrentUser(userFull);
        }
      );

      return snap;
    } catch (error) {
      toast.error(error.message);
    }
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const login = async (email, password) => {
    const validacao = await signInWithEmailAndPassword(auth, email, password);
    return validacao;
  };

  const logout = async () => {
    const sair = signOut(auth);

    return sair;
  };

  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateEmail = async (usuario, email) => {
    return updateEmail(usuario, email);
  };

  const updatePassword = async (usuario, password) => {
    return updatePassword(usuario, password);
  };

  const verifyUser = () => {
    const verify = sendEmailVerification(auth.currentUser)
      .then((result) => {})
      .catch((message) => console.log(message));
    return verify;
  };

  const compareStatus = (authStatus, userStatus) => {
    return authStatus ? (authStatus != userStatus ? true : false) : false;
  };

  const atualizaStatus = async (id, status) => {
    try {
      const docRef = doc(db, "users", id);
      const snap = await updateDoc(docRef, { checked: status }).then(
        async (e) => {
          const colletionRef = doc(db, "users", id);
          const docSnap = await getDoc(colletionRef);
          const userFull = { ...user };
          userFull.usuario = docSnap.data();
          setCurrentUser(userFull);
          return docSnap.data();
        }
      );

      return snap;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateTelefoneUser = async (usuario, telefone) => {
    try {
      const docRef = doc(db, "users", usuario.uid);
      const snap = await updateDoc(docRef, { telefone: telefone }).then(
        async (e) => {
          const colletionRef = doc(db, "users", usuario.uid);
          const docSnap = await getDoc(colletionRef);
          const userFull = { ...usuario };
          userFull.usuario = docSnap.data();
          setCurrentUser(userFull);
        }
      );

      return snap;
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const buscaUsuario = async (collectionName, id) => {
  //   try {
  //     const meuUsuario = await getDataId(collectionName, id);
  //     console.log("meu Usuario", meuUsuario);
  //     return meuUsuario;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (user) {
  //     console.log("userrrr", user);
  //   }
  // }, [user]);

  // const onAuthStateChange = () => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log("usssser", user);
  //       setCurrentUser(user);
  //       buscaUsuario("users", user.uid);
  //       setLoading(false);
  //     }
  //   });
  // };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const colletionRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(colletionRef);
        const userFull = { ...user };
        userFull.usuario = docSnap.data();
        setCurrentUser(userFull);
      } else {
        setCurrentUser(user);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // useEffect(() => {

  // setUser(user);
  // const atualiza = compareStatus(user.emailVerified, meuUsuario?.checked);
  // const userFull = { ...user };
  // if (atualiza) {
  //   console.log("atualiza?", atualiza);
  //   const novoUsuario = await atualizaStatus(
  //     user.uid,
  //     user.emailVerified
  //   );
  //   userFull.usuario = novoUsuario;
  //   logUser("app", "add", userFull);
  // } else {
  //   userFull.usuario = meuUsuario;
  // }
  // // console.log("meuUsuario2", meuUsuario);
  // setCurrentUser(userFull);

  // console.log("uns", unsubscribe);
  // }, []);

  const value = {
    currentUser,
    login,
    signup,
    signup2,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateTelefoneUser,
    verifyUser,
    atualizaVerificado,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
