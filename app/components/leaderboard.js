import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'leaderboard'));
        const data = querySnapshot.docs.map(doc => {
          const [name, wins] = doc.data();
          return { id: doc.id, name, wins };
        });
        setLeaders(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
      <div>
        <h2>Leaderboard</h2>
        <ul>
          {leaders.map(leader => (
              <li key={leader.id}>{leader.name}: {leader.wins} wins</li>
          ))}
        </ul>
      </div>
  );
};

export default Leaderboard;

