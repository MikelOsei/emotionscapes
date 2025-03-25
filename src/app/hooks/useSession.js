import { useEffect, useState, useRef } from "react";
import {
  doc,
  addDoc,
  collection,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { query } from "firebase/firestore";

const useSession = (existingSession) => {
  const [data, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(existingSession);
  const [docRef, setDocRef] = useState(null);

  const sessionIdRef = useRef(existingSession);

    useEffect(() => {
      console.log("useEffect triggered with sessionId:", sessionId);
      async function fetchDoc() {
        console.log("fetch");
        if (sessionIdRef.current) {
          console.log("Session already exists, skipping creation:", sessionIdRef.current);
          return;
        }
        console.log("Creating a new session...");
        const sessions = collection(db, "sessions");
        const initialData = {
          players: ["host"],
          state: "neutral",
          meme: "some-url",
          createdAt: new Date(),
          gameState: "waiting",
        };
    
        const newDocRef = await addDoc(sessions, initialData);
        console.log("created new session: " + newDocRef.id);
        
        sessionIdRef.current = newDocRef.id; // stores immediately
        setDocRef(newDocRef);
        setSessionId(newDocRef.id);
        setLoading(false);
      }
    
      fetchDoc();
    
    }, [db]); // Runs only when db changes
    
    // onSnapshot event listener
    useEffect(() => {
      if (!docRef) return;
      const unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setSessionData(snapshot.data());
            console.log("snapshotted: " + snapshot.data())
          } else {
            console.log("Session not found: " + docRef.id);
          }
        },
        (err) => {
          setError("Error getting session data: " + err.message);
          setLoading(false);
        }
      );

      
      // Clean up subscription when component unmounts
      return () => unsubscribe();
  }, [docRef]);

  // Function to update the session data
  const updateSession = async (newData) => {
    console.log("updateSession called")
    if (!sessionId) return;

    try {
      const sessionRef = doc(db, "sessions", sessionId);
      await setDoc(sessionRef, { ...data, ...newData }, { merge: true });
      return true;
    } catch (err) {
      setError("Error updating session: " + err.message);
      return false;
    }
  };

  return { data, loading, error, sessionId, updateSession };
};

export default useSession;
