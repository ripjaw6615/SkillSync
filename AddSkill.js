import { useState } from "react";
import { addSkill } from "../Backend/skill";

const SKILL_OPTIONS = [
  "Photography",
  "Video Editing",
  "Guitar",
  "Piano",
  "Web Development",
  "App Development",
  "UI/UX Design",
  "Machine Learning",
  "Public Speaking",
  "Content Writing",
  "Badminton",
  "Cricket",
];

export default function AddSkill({ user, onBack }) {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title) {
      alert("Please select a skill");
      return;
    }

    setLoading(true);
    await addSkill({
      title,
      level,
      description,
      user_email: user.email,
    });
    setLoading(false);
    onBack();
  };

  return (
    <div style={{ padding: "24px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Add a skill</h2>

      {/* Skill dropdown */}
      <select
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
      >
        <option value="">Select a skill</option>
        {SKILL_OPTIONS.map((skill) => (
          <option key={skill} value={skill}>
            {skill}
          </option>
        ))}
      </select>

      {/* Level */}
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
      >
        <option>Beginner</option>
        <option>Comfortable</option>
        <option>Advanced</option>
      </select>

      {/* Description */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your experience"
        style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Adding..." : "Add Skill"}
      </button>

      <button onClick={onBack} style={{ marginLeft: "10px" }}>
        Cancel
      </button>
    </div>
  );
}
