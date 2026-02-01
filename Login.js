import { loginWithGoogle  } from "./Backend/auth";

export default function Login({ setUser }) {
const handleLogin = async () => {
  try {
    const user = await loginWithGoogle();
    setUser(user);
  } catch (err) {
    alert(err.message);
  }
};

return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f5f7fb",
      fontFamily: "Inter, sans-serif",
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        width: "320px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>IITR Skill Hub</h2>
      <p style={{ color: "#666", fontSize: "14px", marginBottom: "20px" }}>
        Discover and share skills inside campus
      </p>

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          background: "#4f46e5",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Login with IITR Email
      </button>
    </div>
  </div>
);

}
