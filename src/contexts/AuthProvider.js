import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const UpdatePassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    const varification = await reauthenticateWithCredential(user, credential);

    if (!varification?.user) {
      throw new Error("Validation Error");
    }

    await updatePassword(user, newPassword);

    return "Successfully Reset";
  };
  const ResetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const DeleteAccount = () => {
    return deleteUser(auth.currentUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const EmailVarification = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const authInfo = {
    createUser,
    signIn,
    updateUser,
    logOut,
    UpdatePassword,
    ResetPassword,
    EmailVarification,
    DeleteAccount,
    user,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
