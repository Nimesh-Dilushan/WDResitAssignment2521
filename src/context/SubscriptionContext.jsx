import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "./AuthContext";

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setSubscriptions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(
      collection(db, "subscriptions"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        }));
        setSubscriptions(items);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore sync error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const addSubscription = async (subData) => {
    if (!currentUser) {
      throw new Error("User is not authenticated");
    }
    return await addDoc(collection(db, "subscriptions"), {
      ...subData,
      userId: currentUser.uid,
      createdAt: new Date().toISOString()
    });
  };

  const updateSubscription = async (id, updatedData) => {
    if (!currentUser) {
      throw new Error("User is not authenticated");
    }
    const subRef = doc(db, "subscriptions", id);
    return await updateDoc(subRef, {
      ...updatedData,
      updatedAt: new Date().toISOString()
    });
  };

  const deleteSubscription = async (id) => {
    if (!currentUser) {
      throw new Error("User is not authenticated");
    }
    const subRef = doc(db, "subscriptions", id);
    return await deleteDoc(subRef);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        loading,
        addSubscription,
        updateSubscription,
        deleteSubscription
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptions = () => useContext(SubscriptionContext);