import { useState } from "react";
import CultureExplorer from "./CultureExplorerr";
import MathBuddy from "./mathbuddy/MathBuddy";

function App() {
  const [activeApp, setActiveApp] = useState("culture");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      {/* Portal switcher */}
      <div style={{
        background: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 50%, #fffbeb 100%)",
        borderBottom: "4px solid #f97316",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
        position: "sticky",
        top: 0,
        zIndex: 2000,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "32px" }}>🇮🇳</span>
          <div>
            <div style={{ fontWeight: "900", fontSize: "20px", color: "#7c2d12", lineHeight: 1.1 }}>
              Curious Kids Portal
            </div>
            <div style={{ fontSize: "12px", color: "#9a3412", fontWeight: "600" }}>
              India Culture & Math Explorer
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => setActiveApp("culture")}
            style={{
              padding: "10px 22px", borderRadius: "9999px",
              fontWeight: "bold", fontSize: "16px",
              border: "3px solid",
              cursor: "pointer", transition: "all 0.2s",
              borderColor:     activeApp === "culture" ? "#ea580c" : "#fed7aa",
              backgroundColor: activeApp === "culture" ? "#ea580c" : "white",
              color:           activeApp === "culture" ? "white"   : "#c2410c",
              boxShadow:       activeApp === "culture" ? "0 4px 12px rgba(234,88,12,0.4)" : "none",
              transform:       activeApp === "culture" ? "scale(1.05)" : "scale(1)"
            }}
          >
            🏛️ Culture Explorer
          </button>
          <button
            onClick={() => setActiveApp("math")}
            style={{
              padding: "10px 22px", borderRadius: "9999px",
              fontWeight: "bold", fontSize: "16px",
              border: "3px solid",
              cursor: "pointer", transition: "all 0.2s",
              borderColor:     activeApp === "math" ? "#7c3aed" : "#ddd6fe",
              backgroundColor: activeApp === "math" ? "#7c3aed" : "white",
              color:           activeApp === "math" ? "white"   : "#6d28d9",
              boxShadow:       activeApp === "math" ? "0 4px 12px rgba(124,58,237,0.4)" : "none",
              transform:       activeApp === "math" ? "scale(1.05)" : "scale(1)"
            }}
          >
            🔢 Math Buddy
          </button>
        </div>
      </div>

      {activeApp === "culture" ? <CultureExplorer /> : <MathBuddy />}
    </div>
  );
}

export default App;
