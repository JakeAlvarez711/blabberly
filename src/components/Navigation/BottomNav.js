import { Home, PlusSquare, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function BottomNav() {
  const { pathname } = useLocation();

  const iconStyle = (active) => ({
    color: active ? "#fff" : "rgba(255,255,255,0.6)",
  });

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "56px",
        background: "#000",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        zIndex: 9999,
      }}
    >
      {/* Home */}
      <Link to="/" style={iconStyle(pathname === "/")}>
        <Home />
      </Link>

      {/* Create */}
      <Link
        to="/create"
        style={{
          color: "#fff",
          transform: "translateY(-4px)",
        }}
      >
        <PlusSquare size={32} />
      </Link>

      {/* Profile */}
      <Link to="/profile" style={iconStyle(pathname === "/profile")}>
        <User />
      </Link>
    </nav>
  );
}

export default BottomNav;
