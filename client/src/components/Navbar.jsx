import { Code2, LayoutDashboard, ListChecks, LogOut } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import socket from "../services/socket";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleLeaveRoom = () => {
    const roomCode = location.pathname.split("/")[2];
    socket.emit("leave-room", { roomCode });
    navigate("/dashboard");
  };
  return (
    <header className="navbar">
      <Link className="brand" to="/dashboard">
        <span className="brand-mark">
          <Code2 size={19} />
        </span>
        CodeSync
      </Link>
      <nav className="nav-links">
        <NavLink to="/dashboard">
          <LayoutDashboard size={16} /> Workspace
        </NavLink>
        <NavLink to="/problems">
          <ListChecks size={16} /> Problems
        </NavLink>
      </nav>
      {location.pathname.startsWith("/room/") && (
        <button className="leave-room-nav" onClick={handleLeaveRoom} title="Leave room">
          <LogOut size={15} /> Leave room
        </button>
      )}
      <div className="nav-profile">
        <span className="avatar">{user?.name?.slice(0, 1).toUpperCase()}</span>
        <span className="profile-name">{user?.name}</span>
        <button className="icon-button" onClick={handleLogout} title="Log out">
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
};
export default Navbar;
