import { useEffect, useState } from "react";
export default function Search({ theme }) {
  const dummySkills = [
    {
      id: 1,
      title: "Photography",
      description: "Portrait + editing",
      trust: 3,
    },
    {
      id: 2,
      title: "Guitar",
      description: "Beginner lessons",
      trust: 1,
    },
    {
      id: 3,
      title: "Badminton",
      description: "Practice partner",
      trust: 5,
    },
  ];

  return (
    <div>
      <h3>Discover Skills</h3>

      {dummySkills.map((skill) => (
    <div
  key={skill.id}
style={{
  background: "#fafafa",
  borderRadius: "10px",
  padding: "14px",
  marginBottom: "12px",
  border: "1px solid #eee",
}}

>

        
<h4 style={{ marginBottom: "4px" }}>{skill.title}</h4>
<p style={{ margin: "4px 0", color: "#555", fontSize: "14px" }}>
  {skill.description}
</p>
<p style={{ fontSize: "13px", color: "#777" }}>
  Trust score: <strong>{skill.trust}</strong>
</p>
<button
  style={{
    marginTop: "8px",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#2563eb",
color: theme && theme.mode === "dark" ? "#9ca3af" : "#555",
,
    cursor: "pointer",
  }}
>
  Connect
</button>
        </div>
      ))}
    </div>
  );
}
