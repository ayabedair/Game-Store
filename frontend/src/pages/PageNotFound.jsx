import { useNavigate } from "react-router-dom";

function PageNotFound({ id }) {
  const navigate = useNavigate();
  const messages = [
    "What are you doing here 🤨? This is not even a real store.",
    "404 Page Not found",
  ];
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a1a2e",
        color: "white",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "8rem", color: "#ff7b00", margin: 0 }}>404</h1>
      <h2 style={{ fontSize: "2.5rem", color: "#ff7b00", marginTop: "20px" }}>
        {messages[id]}
      </h2>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "30px",
          padding: "15px 30px",
          fontSize: "1.2rem",
          backgroundColor: "#ff7b00",
          color: "white",
          border: "none",
          borderRadius: "50px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Return
      </button>
    </div>
  );
}

export default PageNotFound;
