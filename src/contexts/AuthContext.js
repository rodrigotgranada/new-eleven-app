import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db, storage } from "../firebase";
import useLogs from "../hooks/useLogs";
import useAuthData from "../hooks/useAuthData";
import useWhatsappApi from "../hooks/useWhatsappApi";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
                  const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                  )
                    .then(async (usuario) => {
                      const user = usuario.user;
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

  const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

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
    const meuEmail = email;
    const meuPassword = password;
    try {
      const codAuth = Math.floor(Math.random() * 900000) + 100000;
      await createUserWithEmailAndPassword(auth, meuEmail, meuPassword)
        .then(async (usuario) => {
          const user = usuario.user;
          await sendEmailVerification(user);
          await updateProfile(user, {
            displayName: name,
          });

          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: name,
            sobrenome: surname,
            documento: onlyNumbers(documento),
            telefone: onlyNumbers(telefone),
            email,
            photoURL: images,
            rule: rule,
            status: true,
            checked: false,
            owner: false,
            codAuth: codAuth,
          });
        })
        // .then(async (user) => {
        //   await sendConfirmPT(telefone, codAuth);
        // })
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
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  // function getRandomInt(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min) + min);
  // }

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

  const updateUserEmail = async (usuario, email, password) => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );

    reauthenticateWithCredential(auth.currentUser, credential)
      .then((teste) => {
        updateEmail(auth.currentUser, email).then(async (dados, dados2) => {
          const docRef = doc(db, "users", auth.currentUser.uid);
          const snap = await updateDoc(docRef, { email: email }).then(
            async (e) => {
              const colletionRef = doc(db, "users", auth.currentUser.uid);
              const docSnap = await getDoc(colletionRef);
              const userFull = { ...user };
              userFull.usuario = docSnap.data();
              setCurrentUser(userFull);
              toast.success("E-mail atualizado com sucesso", {
                position: toast.POSITION.BOTTOM_CENTER,
              });
              return docSnap.data();
            }
          );
        });
      })
      .catch((error) => {
        toast.error("Senha Incorreta", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
  };

  const updateUserPassword = async (oldPassword, password) => {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        oldPassword
      );

      reauthenticateWithCredential(auth.currentUser, credential)
        .then((teste) => {
          updatePassword(auth.currentUser, password).then((user) => {
            toast.success("Senha atualizada com sucesso", {
              position: toast.POSITION.BOTTOM_CENTER,
            });
            navigate("/");
          });
        })
        .catch((err) =>
          toast.error("Senha Incorreta", {
            position: toast.POSITION.BOTTOM_CENTER,
          })
        );
    } catch (err) {
      console.log(err);
    }
  };

  const verifyUser = () => {
    const verify = sendEmailVerification(auth.currentUser)
      .then((result) => {})
      .catch((message) => console.log(message));
    return verify;
  };

  // const compareStatus = (authStatus, userStatus) => {
  //   return authStatus ? (authStatus != userStatus ? true : false) : false;
  // };

  // const atualizaStatus = async (id, status) => {
  //   try {
  //     const docRef = doc(db, "users", id);
  //     const snap = await updateDoc(docRef, { checked: status }).then(
  //       async (e) => {
  //         const colletionRef = doc(db, "users", id);
  //         const docSnap = await getDoc(colletionRef);
  //         const userFull = { ...user };
  //         userFull.usuario = docSnap.data();
  //         setCurrentUser(userFull);
  //         return docSnap.data();
  //       }
  //     );

  //     return snap;
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

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
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const atualizaDados = async (usuario, nome, sobrenome, foto) => {
    try {
      const docRef = doc(db, "users", usuario.uid);
      const snap = await updateDoc(docRef, {
        displayName: nome,
        sobrenome: sobrenome,
        photoURL: foto,
      }).then(async (e, f) => {
        await updateProfile(auth.currentUser, {
          displayName: nome,
        }).then(async (e) => {
          const colletionRef = doc(db, "users", usuario.uid);
          const docSnap = await getDoc(colletionRef);
          const userFull = { ...usuario };
          userFull.usuario = docSnap.data();
          setCurrentUser(userFull);
        });
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const atualizaCheck = async (usuario, check) => {
    try {
      const docRef = doc(db, "users", usuario);
      const snap = await updateDoc(docRef, {
        checked: check,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const atualizaAdmin = async (usuario, rule) => {
    try {
      const docRef = doc(db, "users", usuario);
      const snap = await updateDoc(docRef, {
        rule: rule,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    if (currentUser) {
      const colRef = collection(db, "users");
      const q = query(colRef, where("uid", "==", currentUser?.uid));

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach(async (change) => {
          const atual = currentUser?.usuario?.checked;
          const novo = change.doc.data()?.checked;

          setCurrentUser(change.doc.data());
          if (atual != novo) {
            try {
              await logout();
              toast.success("Logged out", {
                position: toast.POSITION.BOTTOM_CENTER,
              });
              navigate("/");
            } catch (err) {
              toast.error(err.message, {
                position: toast.POSITION.BOTTOM_CENTER,
              });
              // setError("Failed to log out");
            }
          }
        });
      });
    }

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

  const value = {
    setCurrentUser,
    currentUser,
    login,
    signup,
    signup2,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    updateTelefoneUser,
    verifyUser,
    atualizaVerificado,
    atualizaDados,
    atualizaCheck,
    atualizaAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
