import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const STAT_CARDS = [
  {
    id: "total-employees",
    label: "Total Employees",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "#6366f1",
  },
  {
    id: "avg-performance",
    label: "Avg Performance",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    color: "#10b981",
  },
  {
    id: "avg-experience",
    label: "Avg Experience",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    color: "#f59e0b",
  },
  {
    id: "departments",
    label: "Departments",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
    color: "#8b5cf6",
  },
];

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/employees", { headers: { Authorization: `Bearer ${token}` } });
        setEmployees(res.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const total = employees.length;
  const avgPerf = total ? Math.round(employees.reduce((s, e) => s + e.performanceScore, 0) / total) : 0;
  const avgExp  = total ? (employees.reduce((s, e) => s + e.experience, 0) / total).toFixed(1) : 0;
  const depts   = total ? new Set(employees.map(e => e.department)).size : 0;

  const statValues = [total, `${avgPerf}%`, `${avgExp} yrs`, depts];

  // Top performers
  const topPerformers = [...employees].sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5);

  // Department breakdown
  const deptMap = {};
  employees.forEach(e => { deptMap[e.department] = (deptMap[e.department] || 0) + 1; });
  const deptList = Object.entries(deptMap).sort((a, b) => b[1] - a[1]);

  const deptColors = ["#6366f1","#8b5cf6","#10b981","#f59e0b","#ec4899","#06b6d4"];

  return (
    <div>
      <Navbar />
      <div className="page-content">
        {/* Header */}
        <div className="animate-fade-up" style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 28, margin: 0 }}>Analytics Dashboard</h1>
              <p style={{ marginTop: 6, fontSize: 14 }}>Monitor your team performance and insights</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Link to="/employees" className="btn btn-ghost" style={{ fontSize: 13 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                Add Employee
              </Link>
              <Link to="/recommend" className="btn btn-primary" style={{ fontSize: 13 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
                AI Insights
              </Link>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 32 }}>
          {STAT_CARDS.map((card, i) => (
            <div key={card.id} id={card.id} className="card animate-fade-up" style={{ padding: "22px 24px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: 13, color: "#64748b", marginBottom: 8, fontWeight: 500 }}>{card.label}</p>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#f1f5f9", lineHeight: 1 }}>
                    {loading ? <div style={{ width: 60, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.07)", animation: "pulse 1.5s ease infinite" }} /> : statValues[i]}
                  </div>
                </div>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `${card.color}20`,
                  border: `1px solid ${card.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: card.color,
                }}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Two column: Top performers + Department breakdown */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Top Performers */}
          <div className="card animate-fade-up" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, margin: 0 }}>Top Performers</h2>
              <Link to="/employees" style={{ fontSize: 12, color: "#a78bfa" }}>View all →</Link>
            </div>
            {loading ? (
              <div style={{ color: "#475569", fontSize: 14, textAlign: "center", padding: "20px 0" }}>Loading…</div>
            ) : topPerformers.length === 0 ? (
              <div style={{ color: "#475569", fontSize: 14, textAlign: "center", padding: "20px 0" }}>No employees yet</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {topPerformers.map((emp, idx) => {
                  const colors = ["#6366f1","#8b5cf6","#ec4899","#06b6d4","#10b981"];
                  const initials = emp.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
                  const c = colors[emp.name.charCodeAt(0) % colors.length];
                  return (
                    <div key={emp._id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 20, fontSize: 12, color: "#475569", fontWeight: 600, flexShrink: 0 }}>#{idx + 1}</span>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${c}33`, border: `1.5px solid ${c}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{initials}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 500, color: "#f1f5f9", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{emp.name}</p>
                        <p style={{ fontSize: 11, margin: "2px 0 0" }}>{emp.department}</p>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: emp.performanceScore >= 80 ? "#10b981" : emp.performanceScore >= 60 ? "#6366f1" : "#f59e0b", flexShrink: 0 }}>
                        {emp.performanceScore}%
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Department Breakdown */}
          <div className="card animate-fade-up" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, margin: 0 }}>By Department</h2>
              <span style={{ fontSize: 12, color: "#475569" }}>{depts} dept{depts !== 1 ? "s" : ""}</span>
            </div>
            {loading ? (
              <div style={{ color: "#475569", fontSize: 14, textAlign: "center", padding: "20px 0" }}>Loading…</div>
            ) : deptList.length === 0 ? (
              <div style={{ color: "#475569", fontSize: 14, textAlign: "center", padding: "20px 0" }}>No data yet</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {deptList.map(([dept, count], idx) => {
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  const col = deptColors[idx % deptColors.length];
                  return (
                    <div key={dept}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>{dept}</span>
                        <span style={{ fontSize: 12, color: "#475569" }}>{count} · {pct}%</span>
                      </div>
                      <div className="score-bar-track">
                        <div className="score-bar-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${col}99,${col})` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="card animate-fade-up" style={{
          marginTop: 20,
          padding: "28px 32px",
          background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.10))",
          border: "1px solid rgba(99,102,241,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}>
          <div>
            <h2 style={{ fontSize: 18, margin: "0 0 6px" }}>Ready for AI-powered insights?</h2>
            <p style={{ fontSize: 14 }}>Generate smart promotion, training and feedback recommendations for your team.</p>
          </div>
          <Link to="/recommend" className="btn btn-primary" style={{ flexShrink: 0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
            Generate Recommendations
          </Link>
        </div>
      </div>
    </div>
  );
}