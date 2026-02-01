import { useState } from "react";
import Login from "./Login";
import Home from "./pages/Home";
import SkillPage from "./pages/SkillPage";
import UserPage from "./pages/UserPage";
import Profile from "./pages/Profile";
import Requests from "./pages/Requests";

const lightTheme = {
  mode: "light",
  background: "#f9fafb",
  surface: "#ffffff",
  border: "#e5e7eb",
  text: "#111827",
  subtext: "#6b7280",
  primary: "#4f46e5",
};

const darkTheme = {
  mode: "dark",
  background: "#0f172a",
  surface: "#020617",
  border: "#1e293b",
  text: "#e5e7eb",
  subtext: "#94a3b8",
  primary: "#6366f1",
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const openRequests = () => setPage("requests");

  if (!user) return <Login setUser={setUser} />;

  if (page === "requests") {
    return (
      <Requests
        user={user}
        theme={theme}
        onBack={() => setPage("home")}
        onOpenRequests={openRequests}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    );
  }

  if (page === "profile") {
    return (
      <Profile
        user={user}
        theme={theme}
        onBack={() => setPage("home")}
        onOpenRequests={openRequests}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    );
  }

  if (page === "skill") {
    return (
      <SkillPage
        skill={selectedSkill}
        theme={theme}
        onBack={() => setPage("home")}
        onOpenRequests={openRequests}
        onOpenUser={(person) => {
          setSelectedUser(person);
          setPage("user");
        }}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    );
  }

  if (page === "user") {
  return (
    <UserPage
      user={user}
      person={selectedUser}
      skill={selectedSkill}   // ✅ THIS WAS MISSING
      theme={theme}
      onBack={() => setPage("skill")}
      onOpenRequests={() => setPage("requests")}
      onToggleDarkMode={() => setDarkMode(!darkMode)}
    />
  );
}


  return (
    <Home
      user={user}
      theme={theme}
      onOpenProfile={() => setPage("profile")}
      onOpenRequests={openRequests}
      onOpenSkill={(skill) => {
        setSelectedSkill(skill);
        setPage("skill");
      }}
      onToggleDarkMode={() => setDarkMode(!darkMode)}
    />
  );
}
