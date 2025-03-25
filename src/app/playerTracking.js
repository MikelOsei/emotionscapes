import { db } from './firebase.js'
import { useState, useEffect } from 'react'
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

export default function playerTracking() {
    const [players, setPlayers] = useState(null);

    useEffect(() => {
        const session = collection(db, "sessions");

        const unsubscribe = onSnapshot(playerRef, (snapshot) => {
            const playerList = snapshot.docs.map((doc) =>({ 
                id: doc.id, 
                ...doc.data() 
            }));
            setPlayers(playerList);
        });

        return () => unsubscribe();
    }, []);

    return players.length;
};

const addPlayer = async (playerName) => {
    try {
        await addDoc(collection(db, "players"), { name: playerName, joinedAt: new Date() });
    } catch (error) {
        console.error("Error adding player:", error);
    }
};

return { players, addPlayer };