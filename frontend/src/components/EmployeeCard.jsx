function getScoreColor(score) {
  if (score >= 80) return { bar: "#10b981", badge: "badge-green", label: "Excellent" };
  if (score >= 60) return { bar: "#6366f1", badge: "badge-purple", label: "Good" };
  return { bar: "#f59e0b", badge: "badge-yellow", label: "Average" };
}

export default function EmployeeCard({ name, email, department, skills, performanceScore, experience }) {
  const scoreInfo = getScoreColor(performanceScore);
  const initials = name ? name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "??";

  // Consistent avatar color from name
  const colors = ["#6366f1","#8b5cf6","#ec4899","#06b6d4","#10b981","#f59e0b"];
  const colorIdx = name ? name.charCodeAt(0) % colors.length : 0;
  const avatarColor = colors[colorIdx];

  return (
    <div
      className="card animate-fade-up"
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        cursor: "default",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        {/* Avatar */}
        <div style={{
          width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
          background: `linear-gradient(135deg, ${avatarColor}aa, ${avatarColor}55)`,
          border: `2px solid ${avatarColor}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, fontWeight: 700, color: "#fff",
        }}>
          {initials}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ margin: 0, fontSize: 15, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</h3>
          <p style={{ fontSize: 12, marginTop: 2, color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{email}</p>
        </div>

        <span className={`badge ${scoreInfo.badge}`} style={{ flexShrink: 0 }}>
          {scoreInfo.label}
        </span>
      </div>

      {/* Department + Experience */}
      <div style={{ display: "flex", gap: 8 }}>
        <span className="badge badge-purple" style={{ fontSize: 11 }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/>
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          </svg>
          {department}
        </span>
        <span className="badge" style={{ fontSize: 11, background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)" }}>
          {experience} yr{experience !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Performance Score */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>Performance</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: scoreInfo.bar }}>{performanceScore}%</span>
        </div>
        <div className="score-bar-track">
          <div className="score-bar-fill" style={{ width: `${Math.min(performanceScore, 100)}%`, background: `linear-gradient(90deg, ${scoreInfo.bar}bb, ${scoreInfo.bar})` }} />
        </div>
      </div>

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {skills.slice(0, 4).map((skill, i) => (
            <span key={i} style={{
              padding: "2px 8px",
              borderRadius: 4,
              fontSize: 11,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "#94a3b8",
            }}>{skill}</span>
          ))}
          {skills.length > 4 && (
            <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 11, color: "#475569" }}>+{skills.length - 4}</span>
          )}
        </div>
      )}
    </div>
  );
}