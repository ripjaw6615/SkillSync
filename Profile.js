import Header from "../components/Header";
import { useState, useEffect } from "react";
import { addSkill as backendAddSkill, getSkillsByUser } from "../Backend/skill";

const SKILL_OPTIONS = [
  "Photography",
  "Guitar",
  "Video Editing",
  "Web Development",
  "UI/UX Design",
  "Public Speaking",
  "Badminton",
  "Content Writing",
];


export default function Profile({
  user,
  onBack,
  theme,
  onToggleDarkMode,
}) {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("Beginner");

  const [mySkills, setMySkills] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);

  useEffect(() => {
    const fetchMySkills = async () => {
      try {
        const data = await getSkillsByUser(user.email);
        setMySkills(data.map((s) => ({ id: s.id, title: s.title, level: s.level })));
      } catch (err) {
        console.error("Failed to load user skills:", err);
      }
    };

    fetchMySkills();
  }, [user.email]);

  const handleAddSkill = async () => {
    if (!title) return;
    setLoadingAdd(true);
    try {
      await backendAddSkill({ title, description: "", level, user_email: user.email });
      const data = await getSkillsByUser(user.email);
      setMySkills(data.map((s) => ({ id: s.id, title: s.title, level: s.level })));
      setTitle("");
      setLevel("Beginner");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to add skill");
    } finally {
      setLoadingAdd(false);
    }
  };

  return (
    <div
      style={{
        background: theme.background,
        minHeight: "100vh",
        color: theme.text,
      }}
    >
      <Header
        onProfileClick={() => {}}
        onToggleDarkMode={onToggleDarkMode}
        theme={theme}
      />

      <div style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
        {/* Back */}
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: theme.primary,
            cursor: "pointer",
            marginBottom: "16px",
          }}
        >
          ← Back
        </button>

        {/* Profile info */}
        <h2>My Profile</h2>
        <p style={{ color: theme.subtext, marginBottom: "24px" }}>
          {user.email}
        </p>

        {/* Add Skill */}
        <h3 style={{ marginBottom: "12px" }}>Add a skill</h3>

<select
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: `1px solid ${theme.border}`,
    background: theme.surface,
    color: theme.text,
    marginBottom: "12px",
  }}
>
  <option value="">Select a skill</option>
  {SKILL_OPTIONS.map((skill) => (
    <option key={skill} value={skill}>
      {skill}
    </option>
  ))}
</select>


        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: `1px solid ${theme.border}`,
            background: theme.surface,
            color: theme.text,
            marginBottom: "16px",
          }}
        >
          <option>Beginner</option>
          <option>Comfortable</option>
          <option>Advanced</option>
        </select>

        <button
          onClick={handleAddSkill}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            background: theme.primary,
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          {loadingAdd ? "Adding..." : "Add Skill"}
        </button>

        {/* Divider */}
        <hr
          style={{
            margin: "32px 0",
            borderColor: theme.border,
          }}
        />

        {/* My Skills list */}
        <h3 style={{ marginBottom: "16px" }}>My skills</h3>

        {mySkills.map((skill) => (
          <div
            key={skill.id}
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: `1px solid ${theme.border}`,
              background: theme.surface,
              marginBottom: "12px",
            }}
          >
            <strong style={{ color: theme.text }}>
              {skill.title}
            </strong>
            <p
              style={{
                margin: "4px 0 0 0",
                fontSize: "13px",
                color: theme.subtext,
              }}
            >
              Level: {skill.level}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
