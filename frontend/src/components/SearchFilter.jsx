export default function SearchFilter({ department, setDepartment, search }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <div style={{ position: "relative", flex: 1 }}>
        <span style={{
          position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
          color: "#475569", pointerEvents: "none", display: "flex", alignItems: "center",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          className="form-input"
          placeholder="Filter by department…"
          value={department}
          onChange={e => setDepartment(e.target.value)}
          onKeyDown={e => e.key === "Enter" && search()}
          style={{ paddingLeft: 36 }}
        />
      </div>
      <button className="btn btn-primary" onClick={search}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        Search
      </button>
    </div>
  );
}