import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function getScoreColor(score) {
  if (score >= 80) return { color: "#10b981", badge: "badge-green", label: "Excellent" };
  if (score >= 60) return { color: "#6366f1", badge: "badge-purple", label: "Good" };
  return { color: "#f59e0b", badge: "badge-yellow", label: "Needs Growth" };
}

function RecommendCard({ emp, index }) {
  const si = getScoreColor(emp.performanceScore || 0);
  const initials = emp.name ? emp.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase() : "?";
  const avatarColors = ["#6366f1","#8b5cf6","#ec4899","#06b6d4","#10b981"];
  const ac = avatarColors[emp.name ? emp.name.charCodeAt(0) % avatarColors.length : 0];

  return (
    <div
      className="card animate-fade-up"
      style={{ padding: "24px", animationDelay: `${index * 0.07}s` }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
          background: `linear-gradient(135deg, ${ac}aa, ${ac}44)`,
          border: `2px solid ${ac}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 700, color: "#fff",
        }}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: 16, margin: 0 }}>{emp.name}</h3>
          <p style={{ fontSize: 12, marginTop: 3 }}>{emp.department}</p>
        </div>
        <span className={`badge ${si.badge}`}>{si.label}</span>
      </div>

      {/* Insights grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          {
            icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
            label: "Promotion",
            value: emp.promotion,
            color: "#6366f1",
          },
          {
            icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
            label: "Ranking",
            value: emp.ranking,
            color: "#8b5cf6",
          },
          {
            icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
            label: "Training",
            value: emp.training,
            color: "#10b981",
          },
          {
            icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
            label: "Feedback",
            value: emp.feedback,
            color: "#f59e0b",
          },
        ].map(item => (
          <div key={item.label} style={{
            background: `${item.color}0d`,
            border: `1px solid ${item.color}22`,
            borderRadius: 10,
            padding: "12px 14px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6, color: item.color }}>
              {item.icon}
              <span style={{ fontSize: 11, fontWeight: 600, color: item.color, textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</span>
            </div>
            <p style={{ fontSize: 13, color: "#cbd5e1", margin: 0, lineHeight: 1.5 }}>{item.value || "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AIRecommendations() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState("");

  const getRecommendations = async () => {
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await API.post("/ai/recommend", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(response.data.employees);
      setGenerated(true);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to generate recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="page-content">
        {/* Header */}
        <div className="animate-fade-up" style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                </div>
                <h1 style={{ fontSize: 28, margin: 0 }}>AI Insights</h1>
              </div>
              <p style={{ fontSize: 14 }}>Generate smart recommendations for promotions, training, and team feedback.</p>
            </div>

            <button
              id="generate-recommendations"
              className="btn btn-primary"
              onClick={getRecommendations}
              disabled={loading}
              style={{ padding: "12px 22px", fontSize: 14 }}
            >
              {loading ? <span className="spinner" /> : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              )}
              {loading ? "Analyzing team…" : generated ? "Regenerate" : "Generate Recommendations"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="animate-fade-up" style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 10, padding: "12px 16px", marginBottom: 24,
            fontSize: 13, color: "#fca5a5", display: "flex", alignItems: "center", gap: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="animate-fade-up" style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "80px 40px", gap: 16,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2))",
              border: "2px solid rgba(99,102,241,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "pulseGlow 2s ease infinite",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <p style={{ fontSize: 15, color: "#94a3b8" }}>AI is analyzing employee data…</p>
            <p style={{ fontSize: 13, color: "#475569" }}>Evaluating performance, experience, and skills</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !generated && (
          <div className="card animate-fade-up" style={{
            padding: "80px 40px",
            textAlign: "center",
            background: "linear-gradient(135deg,rgba(99,102,241,0.06),rgba(139,92,246,0.04))",
            border: "1px dashed rgba(99,102,241,0.25)",
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%", margin: "0 auto 20px",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <h2 style={{ fontSize: 20, marginBottom: 10 }}>No insights yet</h2>
            <p style={{ fontSize: 14, maxWidth: 400, margin: "0 auto 24px" }}>
              Click <strong style={{ color: "#a78bfa" }}>Generate Recommendations</strong> to get AI-powered insights on promotions, rankings, training needs, and personalized feedback for your team.
            </p>
            <button className="btn btn-primary" onClick={getRecommendations} style={{ margin: "0 auto" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              Get Started
            </button>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <>
            <div className="animate-fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="badge badge-purple">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                  AI Generated
                </span>
                <span style={{ fontSize: 14, color: "#64748b" }}>{results.length} recommendation{results.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 16 }}>
              {results.map((emp, i) => (
                <RecommendCard key={i} emp={emp} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}