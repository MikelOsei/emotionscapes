import { useEffect, useState, useRef } from "react";
import {
  doc,
  addDoc,
  updateDoc,
  collection,
  setDoc,
  onSnapshot,
  arrayUnion,
  increment
} from "firebase/firestore";
import { db } from "../firebase";
import { useSearchParams, useRouter } from "next/navigation";

const useSession = (existingSession) => {
  const params = useSearchParams();
  const router = useRouter();
  const [data, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(existingSession);
  const [docRef, setDocRef] = useState(null);

  const sessionIdRef = useRef(existingSession);

    useEffect(() => {
      console.log("useEffect triggered with sessionId:", sessionId);
      const sessions = collection(db, "sessions");
      
      async function fetchDoc() {
        console.log("fetch");
        if (sessionIdRef.current) {
          console.log("Session already exists, skipping creation and adding user to:", sessionIdRef.current);
          const userSession = doc(db, "sessions", sessionIdRef.current);-


          
          await updateDoc(userSession, {
              players: increment(1)
          });
          
        
          // need to set session data to keep up with doc
          setDocRef(userSession);
          setSessionId(sessionIdRef.current);
          setLoading(false);
          return;
        }

        console.log("Creating a new session...");
        const initialData = {
          players: 0,
          landscapeState: "neutral",
          meme: "some-url",
          createdAt: new Date(),
          gameState: "waiting",
          playerPage: ""
        };
    
        const newDocRef = await addDoc(sessions, initialData);
        console.log("created new session: " + newDocRef.id);
        
        sessionIdRef.current = newDocRef.id; // stores immediately
        
        setDocRef(newDocRef);
        setSessionId(newDocRef.id);
        setLoading(false);

        updateSession({"playerPage": "qr-join?sessionId=" + newDocRef.id}, newDocRef.id);

      }
    
      fetchDoc();
    
    }, []); // Runs only once
    
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
  const updateSession = async (newData, id = sessionId) => {
    console.log("update session called")
    if (!id) return;
    console.log("update session called with id")

    try {
      const sessionRef = doc(db, "sessions", id);
      await setDoc(sessionRef, { ...data, ...newData }, { merge: true });
    } catch (err) {
      setError("Error updating session: " + err.message);
      return false;
    }
  };


  return { data, loading, error, sessionId, updateSession };
};

export default useSession;
