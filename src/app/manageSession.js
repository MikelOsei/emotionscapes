import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Session({ sessionId }) {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const docRef = doc(db, "sessions", sessionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSessionData(docSnap.data());
          console.log("Found something...." + docSnap.data);
        } else {
          setError("No session with id: " + sessionId + "!");
        }
      } catch (err) {
        setError("Error fetching session " + sessionId + " data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId]);

  return (
    <></>
  );
}

export default Session;
