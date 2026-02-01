export default function Header({
  onProfileClick,
  onOpenRequests,
  search,
  setSearch,
  onToggleDarkMode,
  theme,
}) {
  return (
    <div
      style={{
        height: "60px",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: theme.surface,
        borderBottom: `1px solid ${theme.border}`,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left */}
      <div>
        <h2 style={{ margin: 0, fontSize: "28px", color: theme.text }}>
          IITR Skill Hub
        </h2>
        <p style={{ margin: 0, color: theme.subtext }}>
          Discover skills on campus
        </p>
      </div>

      {/* Search */}
      {setSearch && (
        <input
          placeholder="Search skills"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "600px",
            padding: "8px",
            borderRadius: "8px",
            border: `1px solid ${theme.border}`,
            background: theme.background,
            color: theme.text,
          }}
        />
      )}

      {/* Right */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button onClick={onToggleDarkMode}>
          {theme.mode === "dark" ? "☀️" : "🌙"}
        </button>

        <button onClick={onOpenRequests}>Requests</button>

        <div
          onClick={onProfileClick}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: theme.primary,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          U
        </div>
      </div>
    </div>
  );
}
