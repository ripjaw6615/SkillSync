import { useEffect, useState } from "react";
import Header from "../components/Header";
import SkillCard from "../components/SkillCard";
import { getAllSkills } from "../Backend/skill";

export default function Home({
  user,
  onOpenProfile,
  onOpenSkill,
  onOpenRequests,
  theme,
  onToggleDarkMode,
}) {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills();
        setSkills(data);
      } catch (err) {
        console.error("Error fetching skills:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const groupSkillsByTitle = (skills) => {
  const map = {};

  skills.forEach((skill) => {
    if (!map[skill.title]) {
      map[skill.title] = {
        title: skill.title,
        count: 1,
      };
    } else {
      map[skill.title].count += 1;
    }
  });

  return Object.values(map);
};

const groupedSkills = groupSkillsByTitle(skills);


  return (
    <div
      style={{
        background: theme.background,
        minHeight: "100vh",
        color: theme.text,
      }}
    >
      <Header
        onProfileClick={onOpenProfile}
        onOpenRequests={onOpenRequests}
        search={search}
        setSearch={setSearch}
        onToggleDarkMode={onToggleDarkMode}
        theme={theme}
      />

      <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "6px" }}>Discover skills</h2>
        <p style={{ color: theme.subtext, marginBottom: "20px" }}>
          Find people around you who can help you learn.
        </p>

        {loading ? (
          <p>Loading skills...</p>
        ) : skills.length === 0 ? (
          <p>No skills added yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {groupedSkills
              .filter((skill) =>
                skill.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  onClick={() => onOpenSkill(skill)}
                  theme={theme}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
