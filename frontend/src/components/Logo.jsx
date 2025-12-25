import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();
  return (
    <div className="logo-container" onClick={() => navigate("/homepage")}>
      <div className="logo">🎮</div>
      <h1 className="store-name">Game Store</h1>
    </div>
  );
}

export default Logo;
