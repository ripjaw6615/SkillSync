import { useEffect, useState } from "react";
import Header from "../components/Header";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "../Backend/firebase";

export default function Requests({ user, theme, onBack, onOpenRequests }) {
  const [incoming, setIncoming] = useState([]);
  const [sent, setSent] = useState([]);

  useEffect(() => {
    const fetchIncoming = async () => {
      const q = query(
        collection(db, "connections"),
        where("to_user_email", "==", user.email),
        where("status", "==", "pending")
      );
      const snap = await getDocs(q);
      setIncoming(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    const fetchSent = async () => {
      const q = query(
        collection(db, "connections"),
        where("from_user_email", "==", user.email)
      );
      const snap = await getDocs(q);
      setSent(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    fetchIncoming();
    fetchSent();
  }, [user.email]);

  const acceptRequest = async (id) => {
    await updateDoc(doc(db, "connections", id), { status: "accepted" });
    setIncoming(prev => prev.filter(r => r.id !== id));
  };

  const rejectRequest = async (id) => {
    await updateDoc(doc(db, "connections", id), { status: "rejected" });
    setIncoming(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div style={{ background: theme.background, minHeight: "100vh" }}>
      <Header theme={theme} onOpenRequests={onOpenRequests} />

      <div style={{ maxWidth: "700px", margin: "auto", padding: "24px" }}>
        <button onClick={onBack}>← Back</button>

        <h2>Incoming Requests</h2>
        {incoming.length === 0 && <p>No incoming requests</p>}

        {incoming.map(req => (
          <div key={req.id}>
            <p>{req.from_user_email}</p>
            <button onClick={() => acceptRequest(req.id)}>Accept</button>
            <button onClick={() => rejectRequest(req.id)}>Reject</button>
          </div>
        ))}

        <h2 style={{ marginTop: "32px" }}>Sent Requests</h2>
        {sent.length === 0 && <p>No sent requests</p>}

        {sent.map(req => (
          <div key={req.id}>
            <p>To: {req.to_user_email}</p>
            <p>Status: {req.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
