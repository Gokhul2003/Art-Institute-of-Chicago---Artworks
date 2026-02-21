import React from "react";
import ArtworkTable from "./components/ArtworkTable";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const App: React.FC = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Art Institute of Chicago - Artworks</h2>
      <ArtworkTable />
    </div>
  );
};

export default App;