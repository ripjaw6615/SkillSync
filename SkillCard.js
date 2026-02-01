import { useState } from "react";

export default function SkillCard({ skill, onClick, theme }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "18px",
        borderRadius: "14px",
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 10px 20px rgba(0,0,0,0.08)"
          : "none",
        transition: "all 0.18s ease",
      }}
    >
      {/* Card text must define its own color */}
      <div>
        <h3
          style={{
            margin: "0 0 6px 0",
            fontSize: "16px",
            fontWeight: 600,
            color: theme.text,
          }}
        >
          {skill.title}
        </h3>

        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: theme.subtext,
          }}
        >
          {skill.count} people offering this
        </p>
      </div>

      {/* Primary button text NEVER changes */}
      <button
        onClick={onClick}
        style={{
          marginTop: "16px",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          background: theme.primary,
          color: "#ffffff",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        View people
      </button>
    </div>
  );
}
