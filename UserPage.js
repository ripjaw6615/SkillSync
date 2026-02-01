import { useState } from "react";
import Header from "../components/Header";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Backend/firebase";

export default function UserPage({
  user,
  person,
  skill,
  theme,
  onBack,
  onOpenRequests,
  onToggleDarkMode,
}) {
  const [requestSent, setRequestSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🛡 Safety check (prevents crash)
  if (!skill || !person) {
    return (
      <div style={{ padding: "24px" }}>
        <p>Something went wrong. Please go back.</p>
        <button onClick={onBack}>← Back</button>
      </div>
    );
  }

  const sendRequest = async () => {
    if (loading || requestSent) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "connections"), {
        from_user_email: user.email.toLowerCase(),
        to_user_email: person.user_email.toLowerCase(),
        skill_title: skill.title,
        status: "pending",
        created_at: Date.now(),
      });

      setRequestSent(true);
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: theme.background, minHeight: "100vh" }}>
      <Header
        theme={theme}
        onOpenRequests={onOpenRequests}
        onToggleDarkMode={onToggleDarkMode}
      />

      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "24px" }}>
        <button
          onClick={onBack}
          style={{ marginBottom: "16px", cursor: "pointer" }}
        >
          ← Back
        </button>

        <h2 style={{ color: theme.text }}>
          {person.user_email}
        </h2>

        <p style={{ color: theme.subtext }}>
          Skill: <b>{skill.title}</b>
        </p>

        {requestSent ? (
          <p style={{ color: theme.primary, marginTop: "16px" }}>
            ✅ Request sent
          </p>
        ) : (
          <button
            onClick={sendRequest}
            disabled={loading}
            style={{
              marginTop: "16px",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              background: theme.primary,
              color: "#fff",
              cursor: "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Sending..." : "Connect"}
          </button>
        )}
      </div>
    </div>
  );
}
