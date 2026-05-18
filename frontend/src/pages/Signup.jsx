import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await API.post("/auth/signup", form);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = e => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}>
      <div className="card animate-fade-up" style={{ width: "100%", maxWidth: 420, padding: "40px 36px" }}>
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
            marginBottom: 16,
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </div>
          <h1 style={{ fontSize: 24, marginBottom: 4 }}>Create account</h1>
          <p style={{ fontSize: 14, textAlign: "center" }}>Start managing your team with AI-powered insights</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: 20,
            fontSize: 13,
            color: "#fca5a5",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="input-group">
            <label>Full name</label>
            <input
              id="signup-name"
              className="form-input"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="name"
            />
          </div>

          <div className="input-group">
            <label>Email address</label>
            <input
              id="signup-email"
              className="form-input"
              name="email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              id="signup-password"
              className="form-input"
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="new-password"
            />
          </div>

          <button
            id="signup-submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: "100%", justifyContent: "center", padding: "12px 20px", marginTop: 4, fontSize: 15 }}
          >
            {loading ? <span className="spinner" /> : null}
            {loading ? "Creating account…" : "Create account"}
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
          <hr className="divider" style={{ flex: 1 }} />
          <span style={{ fontSize: 12, color: "#475569" }}>OR</span>
          <hr className="divider" style={{ flex: 1 }} />
        </div>

        <p style={{ textAlign: "center", fontSize: 14 }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#a78bfa", fontWeight: 500 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}