import { useState } from "react";

export default function PersonCard({ person, onClick, theme }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "16px",
        borderRadius: "12px",
        marginBottom: "14px",
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        cursor: "pointer",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 10px 20px rgba(0,0,0,0.08)"
          : "none",
        transition: "all 0.18s ease",
      }}
    >
      {/* Explicit text colors */}
      <strong style={{ color: theme.text }}>
        {person.user_email}
      </strong>

      <p
        style={{
          margin: "6px 0 0 0",
          fontSize: "14px",
          color: theme.subtext,
        }}
      >
        Level: {person.level}
      </p>

      <p
        style={{
          margin: "2px 0 0 0",
          fontSize: "13px",
          color: theme.subtext,
        }}
      >
        Trust: {person.trust}
      </p>
    </div>
  );
}
