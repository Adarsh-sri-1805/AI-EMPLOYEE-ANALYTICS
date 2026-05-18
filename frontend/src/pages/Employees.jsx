import { useEffect, useState } from "react";
import API from "../services/api";
import EmployeeCard from "../components/EmployeeCard";
import SearchFilter from "../components/SearchFilter";
import Navbar from "../components/Navbar";

const EMPTY_FORM = { name: "", email: "", department: "", skills: "", performanceScore: "", experience: "" };

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => { fetchEmployees(); }, []);

  const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

  const fetchEmployees = async () => {
    setFetching(true);
    try {
      const res = await API.get("/employees", { headers: authHeader() });
      setEmployees(res.data);
    } catch (e) { console.error(e); }
    finally { setFetching(false); }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError(""); setSuccess("");
    setLoading(true);
    try {
      await API.post("/employees", {
        ...form,
        skills: form.skills.split(",").map(s => s.trim()).filter(Boolean),
        performanceScore: Number(form.performanceScore),
        experience: Number(form.experience),
      }, { headers: authHeader() });
      setSuccess("Employee added successfully!");
      setForm(EMPTY_FORM);
      setShowForm(false);
      fetchEmployees();
      setTimeout(() => setSuccess(""), 3000);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  const search = async () => {
    setFetching(true);
    try {
      const res = await API.get(`/employees/search?department=${department}`, { headers: authHeader() });
      setEmployees(res.data);
    } catch (e) { console.error(e); }
    finally { setFetching(false); }
  };

  const FIELDS = [
    { name: "name",             label: "Full Name",           placeholder: "Jane Smith",         type: "text"   },
    { name: "email",            label: "Email Address",       placeholder: "jane@company.com",   type: "email"  },
    { name: "department",       label: "Department",          placeholder: "Engineering",         type: "text"   },
    { name: "skills",           label: "Skills (comma-sep.)", placeholder: "React, Node, Python", type: "text"   },
    { name: "performanceScore", label: "Performance Score",   placeholder: "85",                 type: "number" },
    { name: "experience",       label: "Experience (years)",  placeholder: "3",                  type: "number" },
  ];

  return (
    <div>
      <Navbar />
      <div className="page-content">
        {/* Page header */}
        <div className="animate-fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 14 }}>
          <div>
            <h1 style={{ fontSize: 28, margin: 0 }}>Employees</h1>
            <p style={{ marginTop: 6, fontSize: 14 }}>
              {fetching ? "Loading…" : `${employees.length} employee${employees.length !== 1 ? "s" : ""} in total`}
            </p>
          </div>
          <button
            id="toggle-add-form"
            className={showForm ? "btn btn-ghost" : "btn btn-primary"}
            onClick={() => setShowForm(v => !v)}
          >
            {showForm ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                Cancel
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                Add Employee
              </>
            )}
          </button>
        </div>

        {/* Success toast */}
        {success && (
          <div className="animate-fade-up" style={{
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 10,
            padding: "12px 16px",
            marginBottom: 20,
            fontSize: 13,
            color: "#34d399",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            {success}
          </div>
        )}

        {/* Add Employee Form */}
        {showForm && (
          <div className="card animate-fade-up" style={{ padding: "28px 28px 24px", marginBottom: 24 }}>
            <h2 style={{ fontSize: 17, margin: "0 0 22px" }}>New Employee</h2>

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 8, padding: "10px 14px", marginBottom: 18,
                fontSize: 13, color: "#fca5a5", display: "flex", alignItems: "center", gap: 8,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "14px 20px", marginBottom: 22 }}>
              {FIELDS.map(f => (
                <div key={f.name} className="input-group">
                  <label>{f.label}</label>
                  <input
                    id={`emp-${f.name}`}
                    className="form-input"
                    name={f.name}
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.name]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                id="add-employee-submit"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <span className="spinner" /> : null}
                {loading ? "Adding…" : "Add Employee"}
              </button>
              <button className="btn btn-ghost" onClick={() => { setShowForm(false); setForm(EMPTY_FORM); setError(""); }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="card animate-fade-up" style={{ padding: "16px 20px", marginBottom: 24 }}>
          <SearchFilter department={department} setDepartment={setDepartment} search={search} />
        </div>

        {/* Employee Grid */}
        {fetching ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card" style={{ padding: 20, height: 180, background: "rgba(255,255,255,0.03)" }} />
            ))}
          </div>
        ) : employees.length === 0 ? (
          <div className="card animate-fade-up" style={{ padding: "60px 40px", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>👥</div>
            <h2 style={{ fontSize: 18, marginBottom: 8 }}>No employees found</h2>
            <p style={{ fontSize: 14 }}>Add your first employee or adjust the search filter.</p>
          </div>
        ) : (
          <div
            className="stagger"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}
          >
            {employees.map(emp => (
              <EmployeeCard key={emp._id} {...emp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}