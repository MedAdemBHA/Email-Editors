import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ThemeProvider from "./context/ThemeContext.tsx";
import Temp from "./section/template.tsx";
import Temp2 from "./section/template2.tsx";
import Temp3 from "./section/template3.tsx";

const App = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("Mailui");

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "Mailui":
        return <Temp />;
      case "BEEFREE SDK":
        return <Temp2 />;
      case "EASYemailpro":
        return <Temp3 />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          <option value="Mailui">Mailui</option>
          <option value="BEEFREE SDK">BEEFREE SDK</option>
          <option value="EASYemailpro">EASYemailpro</option>
        </select>
        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          {renderTemplate()}
        </div>
      </div>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
