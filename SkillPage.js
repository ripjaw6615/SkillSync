import { useEffect, useState } from "react";
import Header from "../components/Header";
import PersonCard from "../components/PersonCard";
import { getSkillsByTitle } from "../Backend/skill";

export default function SkillPage({
  skill,
  theme,
  onBack,
  onOpenUser,
  onToggleDarkMode,
}) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
          console.log("Fetching people for skill:", skill.title);

      const result = await getSkillsByTitle(skill.title);
          console.log("RESULT FROM FIREBASE:", result);

      setPeople(result);
      setLoading(false);
      console.log("People fetched:", result);

    };

    fetchPeople();

  }, [skill.title]);

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

      <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
        <button onClick={onBack} style={{ marginBottom: "16px" }}>
          ← Back
        </button>

        <h2>{skill.title}</h2>
        <p style={{ color: theme.subtext, marginBottom: "20px" }}>
          People offering this skill
        </p>

        {loading && <p>Loading…</p>}

        {!loading && people.length === 0 && (
          <p>No one has added this skill yet.</p>
        )}

        {people.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            onClick={() => onOpenUser(person)}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}
